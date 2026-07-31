const SHEET_ID = '1_7DxMpcep_AF2eU7iBtE2Lnsazq7pKk-E-XnPDk3ZtI'

export type SheetQty = number | 'sold'

export type SheetSizeStock = {
  size: string
  quantity: SheetQty
}

export type SheetProduct = {
  catalog: string
  slug: string
  name: string
  brand: string
  price: number
  image: string
  description: string
  category: string
  lowThreshold: number
  sizes: SheetSizeStock[]
  quantity: SheetQty | null
}

export type CatalogResponse = {
  ok: boolean
  products: SheetProduct[]
  updatedAt?: string
  source?: string
  error?: string
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

async function fetchFromAppsScript(): Promise<CatalogResponse | null> {
  const url = process.env.INVENTORY_APPS_SCRIPT_URL
  if (!url) return null
  const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}action=catalog`, {
    method: 'GET',
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`)
  const data = (await res.json()) as CatalogResponse
  return { ...data, source: 'apps-script' }
}

/** Public CSV export when sheet is shared as “Anyone with the link can view”. */
async function fetchFromPublicCsv(): Promise<CatalogResponse | null> {
  const id = process.env.GOOGLE_SHEET_ID || SHEET_ID
  const gids = (process.env.GOOGLE_SHEET_GIDS || '0,902254665')
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)

  const products: SheetProduct[] = []
  const sources: string[] = []

  for (const gid of gids) {
    const url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`
    const res = await fetch(url, { redirect: 'follow' })
    const text = await res.text()
    if (!res.ok || text.includes('<!DOCTYPE html>') || text.includes('Sign in')) {
      continue
    }
    const parsed = parseSheetCsv(text)
    if (parsed.products.length) {
      products.push(...parsed.products)
      sources.push(parsed.source)
    }
  }

  if (products.length === 0) return null
  return {
    ok: true,
    products,
    updatedAt: new Date().toISOString(),
    source: sources.join('+') || 'public-csv',
  }
}

function parseSheetCsv(text: string): { products: SheetProduct[]; source: string } {
  if (isAloLayout(text)) {
    return { products: parseAloCsv(text), source: 'alo-sheet' }
  }
  if (isCologneLayout(text)) {
    return { products: parseCologneCsv(text), source: 'cologne-sheet' }
  }
  const stock = parseStockCsv(text)
  return { products: stock, source: 'public-csv' }
}

/** Map sheet #N → site slug (matches src/data/products.ts ids). */
const COLOGNE_SLUG_BY_ID: Record<number, string> = {
  1: 'baccarat-rouge-540',
  2: 'lv-imagination',
  3: 'baccarat-rouge-540-white',
  4: 'creed-aventus',
  5: 'lv-california-dream',
  6: 'dior-sauvage-elixir',
  7: 'jpg-le-male-elixir',
  8: 'valentino-intense',
  9: 'tom-ford-lost-cherry',
  10: 'tom-ford-bitter-peach',
  11: 'valentino-green-stravaganza',
  12: 'valentino-donna-green-stravaganza',
  13: 'dior-sauvage-edp',
  14: 'xerjoff-erba-pura',
  17: 'tom-ford-oud-wood',
  18: 'valentino-coral-fantasy',
  19: 'ysl-y-edp',
  20: 'creed-silver-mountain-water',
  21: 'ysl-myself',
  22: 'tom-ford-fucking-fabulous',
  23: 'tom-ford-tobacco-vanille',
  24: 'valentino-donna-pink',
  25: 'chanel-coco-mademoiselle',
  26: 'bleu-de-chanel-edp',
  27: 'acqua-di-gio-profumo',
  28: 'prada-paradoxe-intense',
  29: 'acqua-di-gio-edt',
  30: 'ysl-mon-paris',
  31: 'good-girl-blush',
  32: 'miss-dior',
  33: 'initio-side-effect',
  34: 'le-labo-santal-33',
  35: 'paco-1-million',
  36: 'pdm-delina-exclusif',
  37: 'tom-ford-ombre-leather',
  38: 'versace-eros',
  39: 'valentino-extradose',
  40: 'versace-eros-flame',
  41: 'paco-1-million-elixir',
  42: 'bad-boy-elixir',
  43: 'jpg-le-male-le-parfum-intense',
  44: 'bond-greenwich-village',
  45: 'jpg-ultra-male',
  46: 'jpg-le-beau-le-parfum',
  47: 'valentino-pink-pp',
  48: 'gucci-bloom',
  49: 'armaf-club-de-nuit',
  50: 'ysl-libre',
  51: 'chanel-no5-leau',
  52: 'bleu-de-chanel-parfum',
  53: 'chance-chanel-edt',
  54: 'chance-eau-splendide',
  55: 'burberry-her-elixir',
  56: 'burberry-her-edp',
  57: 'versace-bright-crystal',
  58: 'dior-jadore-edp',
  59: 'dg-light-blue-pour-homme',
  60: 'dg-light-blue',
  61: 'lv-city-of-stars',
  62: 'lv-pacific-chill',
  63: 'pdm-layton',
  64: 'gucci-flora-jasmine',
  65: 'prada-ocean-edp',
  66: 'spicebomb-extreme',
  67: 'tom-ford-vanilla-sex',
  68: 'azzaro-most-wanted',
  69: 'kilian-angels-share',
  70: 'invictus-edt',
  71: 'pdm-delina',
  72: 'pdm-layton-royal-essence',
  73: 'chance-eau-fraiche',
  74: 'carolina-212-men',
  75: 'my-burberry-blush',
  76: 'gucci-guilty',
  77: 'creed-millesime-imperial',
  78: 'stronger-with-you',
  79: 'very-good-girl',
  80: 'bad-boy-cobalt-elixir',
  81: 'dior-homme-parfum',
  82: 'initio-absolute-aphrodisiac',
  83: 'initio-oud-for-greatness',
  84: 'paco-phantom',
  85: 'good-girl',
  86: 'gabrielle-chanel',
  87: 'baccarat-oud-silk-mood',
  88: 'tom-ford-black-orchid',
  89: 'tom-ford-rose-prick',
  90: 'baccarat-grand-soir',
  91: 'jpg-divine',
  92: 'jpg-eau-de-toilette',
  93: 'byredo-rose-of-no-mans-land',
  94: 'jpg-paradise-garden',
}

const LV_IDS = new Set([2, 5, 61, 62])

const ALO_SLUG_BY_ID: Record<number, string> = {
  1: 'black-alo-set',
  2: 'white-alo-set',
  3: 'pink-alo-set',
  4: 'blue-alo-set',
  5: 'grey-alo-set',
  6: 'navy-alo-set',
}

const SIZE_LABELS = new Set(['XS', 'S', 'M', 'L', 'XL', 'XXL'])

function isAloLayout(csv: string): boolean {
  return /alo\s+set/i.test(csv.slice(0, 2500))
}

function isCologneLayout(csv: string): boolean {
  if (isAloLayout(csv)) return false
  const head = csv.slice(0, 400).toLowerCase()
  return head.includes('price-colognes') || head.includes('price- all lv')
}

/** Parse Alo set tab: #N Name + Size/Quantity columns (gid 902254665). */
function parseAloCsv(csv: string): SheetProduct[] {
  const rows = parseCsv(csv)
  const titleRe = /^#(\d+)\s+(.+)$/
  const products: SheetProduct[] = []
  let unitPrice = 70

  // Pull unit price from first "1- $70" tier if present
  for (const row of rows.slice(0, 25)) {
    for (const cell of row) {
      const m = String(cell).match(/^1\s*[-–]\s*\$?\s*([\d,]+)/i)
      if (m) {
        unitPrice = Number(m[1].replace(/,/g, '')) || 70
        break
      }
    }
  }

  for (let i = 0; i < rows.length; i++) {
    const row = padRow(rows[i], 8)
    for (let c = 0; c < row.length; c++) {
      const match = row[c].trim().match(titleRe)
      if (!match) continue
      const id = Number(match[1])
      const slug = ALO_SLUG_BY_ID[id]
      if (!slug) continue

      const name = match[2].trim()
      const sizeCol = c + 1
      const qtyCol = c + 2
      const sizes: SheetSizeStock[] = []

      for (let j = i + 1; j < Math.min(i + 20, rows.length); j++) {
        const r = padRow(rows[j], 8)
        // Stop if we hit another product title in this column pair
        if (titleRe.test(r[c].trim()) || titleRe.test(r[0].trim()) && j > i + 2) {
          // only break early when a new # title appears in name columns
        }
        if (titleRe.test(r[c].trim())) break
        if (c === 0 && titleRe.test(r[0].trim()) && j > i) break

        const size = r[sizeCol].trim().toUpperCase()
        if (!SIZE_LABELS.has(size)) continue
        sizes.push({ size, quantity: parseQty(r[qtyCol]) })
      }

      // Also scan without requiring nameCol empty — titles at col 0/4
      if (sizes.length === 0) {
        for (let j = i + 1; j < Math.min(i + 20, rows.length); j++) {
          const r = padRow(rows[j], 8)
          if (titleRe.test(r[0].trim()) || titleRe.test(r[4].trim())) {
            if (j > i + 1) break
          }
          const size = r[sizeCol].trim().toUpperCase()
          if (!SIZE_LABELS.has(size)) continue
          sizes.push({ size, quantity: parseQty(r[qtyCol]) })
        }
      }

      products.push({
        catalog: 'women-clothes',
        slug,
        name,
        brand: 'Alo',
        price: unitPrice,
        image: '',
        description: '',
        category: 'clothes',
        lowThreshold: 5,
        sizes,
        quantity: null,
      })
    }
  }

  // Dedupe by slug (later wins)
  const bySlug = new Map<string, SheetProduct>()
  for (const p of products) bySlug.set(p.slug, p)
  return [...bySlug.values()]
}

/** Parse the human cologne inventory sheet (paired #N Name + Quantity columns). */
function parseCologneCsv(csv: string): SheetProduct[] {
  const rows = parseCsv(csv)
  const found: { id: number; name: string; quantity: SheetQty }[] = []
  const titleRe = /^#(\d+)\s+(.+)$/

  for (let i = 0; i < rows.length; i++) {
    const row = padRow(rows[i], 7)
    for (const [nameCol, qtyCol] of [
      [0, 1],
      [4, 5],
    ] as const) {
      const cell = row[nameCol].trim()
      const match = cell.match(titleRe)
      if (!match) continue
      const id = Number(match[1])
      const name = match[2].trim()
      let quantity: SheetQty = 'sold'
      for (let j = i; j < Math.min(i + 12, rows.length); j++) {
        const q = padRow(rows[j], 7)[qtyCol].trim()
        if (/^\d+$/.test(q)) {
          quantity = parseQty(q)
          break
        }
      }
      found.push({ id, name, quantity })
    }
  }

  const byId = new Map<number, (typeof found)[number]>()
  for (const item of found) byId.set(item.id, item)

  const products: SheetProduct[] = []
  for (const [id, item] of byId) {
    const slug = COLOGNE_SLUG_BY_ID[id]
    if (!slug) continue
    const isLv = LV_IDS.has(id) || /\blv\b/i.test(item.name)
    products.push({
      catalog: 'colognes',
      slug,
      name: item.name,
      brand: '',
      price: isLv ? 65 : 40,
      image: '',
      description: '',
      category: isLv ? 'lv' : 'cologne',
      lowThreshold: 5,
      sizes: [],
      quantity: item.quantity,
    })
  }
  return products
}

function padRow(row: string[], min: number): string[] {
  if (row.length >= min) return row
  return [...row, ...Array(min - row.length).fill('')]
}

function parseStockCsv(csv: string): SheetProduct[] {
  const rows = parseCsv(csv)
  if (rows.length < 2) return []
  const headers = rows[0].map((h) => h.trim().toLowerCase())
  const idx = (name: string) => headers.indexOf(name)
  if (idx('catalog') < 0 || idx('slug') < 0) return []

  const byKey = new Map<string, SheetProduct>()

  for (const row of rows.slice(1)) {
    const catalog = (row[idx('catalog')] || '').trim()
    const slug = (row[idx('slug')] || '').trim()
    if (!catalog || !slug) continue
    const key = `${catalog}::${slug}`
    let product = byKey.get(key)
    if (!product) {
      product = {
        catalog,
        slug,
        name: (row[idx('name')] || slug).trim(),
        brand: (row[idx('brand')] || '').trim(),
        price: Number(row[idx('price')]) || 0,
        image: (row[idx('image')] || '').trim(),
        description: (row[idx('description')] || '').trim(),
        category: (row[idx('category')] || '').trim(),
        lowThreshold: Number(row[idx('low_threshold')]) || 5,
        sizes: [],
        quantity: null,
      }
      byKey.set(key, product)
    }

    const sizeRaw = (row[idx('size')] || '').trim()
    const size = sizeRaw || '-'
    const quantity = parseQty(row[idx('quantity')])
    if (size === '-') product.quantity = quantity
    else product.sizes.push({ size, quantity })
  }

  return [...byKey.values()]
}

function parseQty(value: string): SheetQty {
  const raw = String(value ?? '')
    .trim()
    .toUpperCase()
  if (!raw || raw === 'SOLD' || raw === 'OUT') return 'sold'
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return 'sold'
  return n
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
      continue
    }
    if (ch === '"') {
      inQuotes = true
      continue
    }
    if (ch === ',') {
      row.push(cell)
      cell = ''
      continue
    }
    if (ch === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      continue
    }
    if (ch === '\r') continue
    cell += ch
  }
  if (cell.length || row.length) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}

export async function loadCatalog(): Promise<CatalogResponse> {
  try {
    const fromScript = await fetchFromAppsScript()
    if (fromScript?.ok && (fromScript.products?.length ?? 0) > 0) {
      return fromScript
    }
  } catch (error) {
    console.error('[inventory] apps script failed', error)
  }

  try {
    const fromCsv = await fetchFromPublicCsv()
    if (fromCsv?.ok) return fromCsv
  } catch (error) {
    console.error('[inventory] public csv failed', error)
  }

  return {
    ok: false,
    products: [],
    error:
      'Sheet not connected. Deploy inventory/AppsScript.gs and set INVENTORY_APPS_SCRIPT_URL, or share the sheet as Anyone with the link can view.',
    source: 'none',
  }
}

export async function sellViaAppsScript(body: {
  catalog: string
  slug: string
  size?: string
  qty?: number
}): Promise<Record<string, unknown>> {
  const url = process.env.INVENTORY_APPS_SCRIPT_URL
  if (!url) {
    return {
      ok: false,
      error: 'INVENTORY_APPS_SCRIPT_URL is not set',
    }
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    body: JSON.stringify({ action: 'sell', ...body }),
  })
  return (await res.json()) as Record<string, unknown>
}

export { SHEET_ID }
