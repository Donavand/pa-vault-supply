/**
 * PA Vault Supply — Inventory Apps Script
 *
 * Works with your EXISTING cologne sheet (Quantity columns) AND optional Stock tab.
 *
 * SETUP
 * 1. Open your sheet → Extensions → Apps Script
 * 2. Paste this entire file into Code.gs → Save
 * 3. Select setupSheet → Run → approve permissions
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy Web App URL into .env.local / Vercel:
 *    INVENTORY_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *
 * Cologne tab: keep your #1 Name + Quantity layout — sells decrement those cells.
 * Stock tab: optional for clothes/bags (catalog, slug, size, quantity, …).
 */

var STOCK_HEADERS = [
  'catalog',
  'slug',
  'name',
  'brand',
  'price',
  'size',
  'quantity',
  'image',
  'description',
  'category',
  'low_threshold',
]

var SALES_HEADERS = [
  'timestamp',
  'catalog',
  'slug',
  'name',
  'size',
  'qty_sold',
  'remaining',
  'low',
]

/** Site slug → sheet # number (matches src/data/products.ts). */
var COLOGNE_ID_BY_SLUG = {
  'baccarat-rouge-540': 1,
  'lv-imagination': 2,
  'baccarat-rouge-540-white': 3,
  'creed-aventus': 4,
  'lv-california-dream': 5,
  'dior-sauvage-elixir': 6,
  'jpg-le-male-elixir': 7,
  'valentino-intense': 8,
  'tom-ford-lost-cherry': 9,
  'tom-ford-bitter-peach': 10,
  'valentino-green-stravaganza': 11,
  'valentino-donna-green-stravaganza': 12,
  'dior-sauvage-edp': 13,
  'xerjoff-erba-pura': 14,
  'tom-ford-oud-wood': 17,
  'valentino-coral-fantasy': 18,
  'ysl-y-edp': 19,
  'creed-silver-mountain-water': 20,
  'ysl-myself': 21,
  'tom-ford-fucking-fabulous': 22,
  'tom-ford-tobacco-vanille': 23,
  'valentino-donna-pink': 24,
  'chanel-coco-mademoiselle': 25,
  'bleu-de-chanel-edp': 26,
  'acqua-di-gio-profumo': 27,
  'prada-paradoxe-intense': 28,
  'acqua-di-gio-edt': 29,
  'ysl-mon-paris': 30,
  'good-girl-blush': 31,
  'miss-dior': 32,
  'initio-side-effect': 33,
  'le-labo-santal-33': 34,
  'paco-1-million': 35,
  'pdm-delina-exclusif': 36,
  'tom-ford-ombre-leather': 37,
  'versace-eros': 38,
  'valentino-extradose': 39,
  'versace-eros-flame': 40,
  'paco-1-million-elixir': 41,
  'bad-boy-elixir': 42,
  'jpg-le-male-le-parfum-intense': 43,
  'bond-greenwich-village': 44,
  'jpg-ultra-male': 45,
  'jpg-le-beau-le-parfum': 46,
  'valentino-pink-pp': 47,
  'gucci-bloom': 48,
  'armaf-club-de-nuit': 49,
  'ysl-libre': 50,
  'chanel-no5-leau': 51,
  'bleu-de-chanel-parfum': 52,
  'chance-chanel-edt': 53,
  'chance-eau-splendide': 54,
  'burberry-her-elixir': 55,
  'burberry-her-edp': 56,
  'versace-bright-crystal': 57,
  'dior-jadore-edp': 58,
  'dg-light-blue-pour-homme': 59,
  'dg-light-blue': 60,
  'lv-city-of-stars': 61,
  'lv-pacific-chill': 62,
  'pdm-layton': 63,
  'gucci-flora-jasmine': 64,
  'prada-ocean-edp': 65,
  'spicebomb-extreme': 66,
  'tom-ford-vanilla-sex': 67,
  'azzaro-most-wanted': 68,
  'kilian-angels-share': 69,
  'invictus-edt': 70,
  'pdm-delina': 71,
  'pdm-layton-royal-essence': 72,
  'chance-eau-fraiche': 73,
  'carolina-212-men': 74,
  'my-burberry-blush': 75,
  'gucci-guilty': 76,
  'creed-millesime-imperial': 77,
  'stronger-with-you': 78,
  'very-good-girl': 79,
  'bad-boy-cobalt-elixir': 80,
  'dior-homme-parfum': 81,
  'initio-absolute-aphrodisiac': 82,
  'initio-oud-for-greatness': 83,
  'paco-phantom': 84,
  'good-girl': 85,
  'gabrielle-chanel': 86,
  'baccarat-oud-silk-mood': 87,
  'tom-ford-black-orchid': 88,
  'tom-ford-rose-prick': 89,
  'baccarat-grand-soir': 90,
  'jpg-divine': 91,
  'jpg-eau-de-toilette': 92,
  'byredo-rose-of-no-mans-land': 93,
  'jpg-paradise-garden': 94,
}

var LV_IDS = { 2: true, 5: true, 61: true, 62: true }

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sales = ss.getSheetByName('Sales') || ss.insertSheet('Sales')
  if (sales.getLastRow() === 0) {
    sales.appendRow(SALES_HEADERS)
    sales.setFrozenRows(1)
  }
  // Optional Stock tab for clothes/bags — do not overwrite cologne layout.
  var stock = ss.getSheetByName('Stock')
  if (!stock) {
    stock = ss.insertSheet('Stock')
    stock.appendRow(STOCK_HEADERS)
    stock.setFrozenRows(1)
  } else if (stock.getLastRow() === 0) {
    stock.appendRow(STOCK_HEADERS)
    stock.setFrozenRows(1)
  }
}

function doGet(e) {
  setupSheet()
  var action = (e && e.parameter && e.parameter.action) || 'catalog'
  if (action === 'ping') {
    return json_({ ok: true, sheetId: SpreadsheetApp.getActiveSpreadsheet().getId() })
  }
  if (action === 'tabs') {
    return json_({ ok: true, tabs: listTabs_() })
  }
  return json_({
    ok: true,
    products: readCatalog_(),
    updatedAt: new Date().toISOString(),
  })
}

/** List every tab + first rows so we can map your real layouts. */
function listTabs_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheets = ss.getSheets()
  var out = []
  for (var i = 0; i < sheets.length; i++) {
    var sh = sheets[i]
    var values = sh.getDataRange().getValues()
    var sample = []
    for (var r = 0; r < Math.min(8, values.length); r++) {
      sample.push(values[r].map(function (c) {
        return String(c == null ? '' : c)
      }))
    }
    out.push({
      name: sh.getName(),
      gid: sh.getSheetId(),
      rows: values.length,
      cols: values.length ? values[0].length : 0,
      sample: sample,
    })
  }
  return out
}

function doPost(e) {
  setupSheet()
  var body = {}
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}')
  } catch (err) {
    return json_({ ok: false, error: 'Invalid JSON' })
  }

  var action = body.action || 'sell'
  if (action === 'sell') return sell_(body)
  if (action === 'set') return setQuantity_(body)
  return json_({ ok: false, error: 'Unknown action' })
}

function sell_(body) {
  var catalog = String(body.catalog || '').trim()
  var slug = String(body.slug || '').trim()
  var size = String(body.size || body.variant || '-').trim() || '-'
  var qty = Math.max(1, Number(body.qty) || 1)
  if (!catalog || !slug) return json_({ ok: false, error: 'Missing catalog/slug' })

  // Prefer Stock tab when the SKU exists there.
  var stockResult = sellFromStock_(catalog, slug, size, qty)
  if (stockResult) return stockResult

  // Colognes → your existing #N + Quantity layout.
  if (isCologneCatalog_(catalog)) {
    return sellFromCologne_(slug, qty)
  }

  return json_({ ok: false, error: 'SKU not found' })
}

function sellFromStock_(catalog, slug, size, qty) {
  var stock = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stock')
  if (!stock || stock.getLastRow() < 2) return null

  var values = stock.getDataRange().getValues()
  var idx = indexMap_(values[0])
  if (idx.catalog === undefined || idx.slug === undefined) return null

  for (var r = 1; r < values.length; r++) {
    var row = values[r]
    if (
      String(row[idx.catalog]) === catalog &&
      String(row[idx.slug]) === slug &&
      normalizeSize_(row[idx.size]) === normalizeSize_(size)
    ) {
      return applySell_(stock, r, idx, catalog, slug, size, qty, String(row[idx.name] || slug))
    }
  }
  return null
}

function applySell_(sheet, rowIndex, idx, catalog, slug, size, qty, name) {
  var current = parseQty_(sheet.getRange(rowIndex + 1, idx.quantity + 1).getValue())
  if (current === 'sold' || current <= 0) {
    return json_({ ok: false, error: 'Sold out', remaining: 0 })
  }
  if (current < qty) {
    return json_({ ok: false, error: 'Not enough stock', remaining: current })
  }

  var remaining = current - qty
  var nextValue = remaining <= 0 ? 'SOLD' : remaining
  sheet.getRange(rowIndex + 1, idx.quantity + 1).setValue(nextValue)

  var threshold = idx.low_threshold !== undefined
    ? Number(sheet.getRange(rowIndex + 1, idx.low_threshold + 1).getValue()) || 5
    : 5
  var low = remaining > 0 && remaining < threshold

  logSale_(catalog, slug, name, size, qty, nextValue, low)
  if (low || remaining <= 0) {
    notifyLow_(name, catalog, slug, normalizeSize_(size), nextValue)
  }

  return json_({
    ok: true,
    remaining: remaining <= 0 ? 'sold' : remaining,
    low: low,
    soldOut: remaining <= 0,
  })
}

function sellFromCologne_(slug, qty) {
  var id = COLOGNE_ID_BY_SLUG[slug]
  if (!id) return json_({ ok: false, error: 'Unknown cologne slug' })

  var hit = findCologneCell_(id)
  if (!hit) return json_({ ok: false, error: 'Cologne not found in sheet' })

  var sheet = hit.sheet
  var current = parseQty_(sheet.getRange(hit.qtyRow, hit.qtyCol).getValue())
  if (current === 'sold' || current <= 0) {
    return json_({ ok: false, error: 'Sold out', remaining: 0 })
  }
  if (current < qty) {
    return json_({ ok: false, error: 'Not enough stock', remaining: current })
  }

  var remaining = current - qty
  var nextValue = remaining <= 0 ? 0 : remaining
  sheet.getRange(hit.qtyRow, hit.qtyCol).setValue(nextValue)

  var low = remaining > 0 && remaining < 5
  logSale_('colognes', slug, hit.name, '-', qty, nextValue <= 0 ? 'SOLD' : nextValue, low)
  if (low || remaining <= 0) {
    notifyLow_(hit.name, 'colognes', slug, '-', nextValue <= 0 ? 'SOLD' : nextValue)
  }

  return json_({
    ok: true,
    remaining: remaining <= 0 ? 'sold' : remaining,
    low: low,
    soldOut: remaining <= 0,
  })
}

/** Find #N title cell and its Quantity cell on the cologne layout sheet. */
function findCologneCell_(id) {
  var sheet = cologneSheet_()
  var values = sheet.getDataRange().getValues()
  var titleRe = new RegExp('^#' + id + '\\s+(.+)$')

  for (var r = 0; r < values.length; r++) {
    var row = values[r]
    for (var c = 0; c < row.length; c++) {
      var cell = String(row[c] || '').trim()
      var match = cell.match(titleRe)
      if (!match) continue

      // Quantity is usually in the next column, within the next ~12 rows.
      var qtyCol = c + 2 // 1-based: name col is c+1, qty is next → c+2
      var qtyRow = null
      for (var j = r; j < Math.min(r + 12, values.length); j++) {
        var q = values[j][c + 1]
        if (q !== '' && q !== null && !isNaN(Number(q))) {
          qtyRow = j + 1
          break
        }
      }
      if (!qtyRow) {
        // Fallback: same row, next column even if empty — create/update there.
        qtyRow = r + 1
      }
      return {
        sheet: sheet,
        name: match[1].trim(),
        qtyRow: qtyRow,
        qtyCol: qtyCol,
      }
    }
  }
  return null
}

function cologneSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  // Prefer first sheet (your cologne inventory), skip Stock/Sales.
  var sheets = ss.getSheets()
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName()
    if (name === 'Stock' || name === 'Sales') continue
    return sheets[i]
  }
  return ss.getSheets()[0]
}

function setQuantity_(body) {
  var catalog = String(body.catalog || '').trim()
  var slug = String(body.slug || '').trim()
  var size = String(body.size || body.variant || '-').trim() || '-'
  var quantity = body.quantity
  if (!catalog || !slug || quantity === undefined) {
    return json_({ ok: false, error: 'Missing fields' })
  }

  if (isCologneCatalog_(catalog)) {
    var id = COLOGNE_ID_BY_SLUG[slug]
    if (!id) return json_({ ok: false, error: 'Unknown cologne slug' })
    var hit = findCologneCell_(id)
    if (!hit) return json_({ ok: false, error: 'Cologne not found' })
    hit.sheet.getRange(hit.qtyRow, hit.qtyCol).setValue(quantity)
    return json_({ ok: true })
  }

  var stock = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stock')
  if (!stock) return json_({ ok: false, error: 'No Stock tab' })
  var values = stock.getDataRange().getValues()
  var idx = indexMap_(values[0])
  for (var r = 1; r < values.length; r++) {
    var row = values[r]
    if (
      String(row[idx.catalog]) === catalog &&
      String(row[idx.slug]) === slug &&
      normalizeSize_(row[idx.size]) === normalizeSize_(size)
    ) {
      stock.getRange(r + 1, idx.quantity + 1).setValue(quantity)
      return json_({ ok: true })
    }
  }
  return json_({ ok: false, error: 'SKU not found' })
}

function readCatalog_() {
  var products = []
  var stock = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stock')
  if (stock && stock.getLastRow() >= 2) {
    products = products.concat(readStockCatalog_(stock))
  }
  products = products.concat(readCologneCatalog_())
  return products
}

function readStockCatalog_(stock) {
  var values = stock.getDataRange().getValues()
  var idx = indexMap_(values[0])
  if (idx.catalog === undefined || idx.slug === undefined) return []
  var byKey = {}

  for (var r = 1; r < values.length; r++) {
    var row = values[r]
    var catalog = String(row[idx.catalog] || '').trim()
    var slug = String(row[idx.slug] || '').trim()
    if (!catalog || !slug) continue

    var key = catalog + '::' + slug
    if (!byKey[key]) {
      byKey[key] = {
        catalog: catalog,
        slug: slug,
        name: String(row[idx.name] || slug),
        brand: String(row[idx.brand] || ''),
        price: Number(row[idx.price]) || 0,
        image: String(row[idx.image] || ''),
        description: String(row[idx.description] || ''),
        category: String(row[idx.category] || ''),
        lowThreshold: Number(row[idx.low_threshold]) || 5,
        sizes: [],
        quantity: null,
      }
    }

    var size = normalizeSize_(row[idx.size])
    var qty = parseQty_(row[idx.quantity])
    if (size === '-') {
      byKey[key].quantity = qty
    } else {
      byKey[key].sizes.push({ size: size, quantity: qty })
    }
  }

  return Object.keys(byKey).map(function (k) {
    return byKey[k]
  })
}

function readCologneCatalog_() {
  var sheet = cologneSheet_()
  var values = sheet.getDataRange().getValues()
  var titleRe = /^#(\d+)\s+(.+)$/
  var found = {}
  var slugById = reverseMap_(COLOGNE_ID_BY_SLUG)

  for (var r = 0; r < values.length; r++) {
    var row = values[r]
    for (var c = 0; c < row.length; c++) {
      var cell = String(row[c] || '').trim()
      var match = cell.match(titleRe)
      if (!match) continue
      var id = Number(match[1])
      var name = match[2].trim()
      var slug = slugById[id]
      if (!slug) continue

      var quantity = 'sold'
      for (var j = r; j < Math.min(r + 12, values.length); j++) {
        var q = values[j][c + 1]
        if (q !== '' && q !== null && !isNaN(Number(q)) && Number(q) > 0) {
          quantity = Number(q)
          break
        }
        if (String(q).toUpperCase() === 'SOLD' || Number(q) === 0) {
          quantity = 'sold'
          break
        }
      }

      found[slug] = {
        catalog: 'colognes',
        slug: slug,
        name: name,
        brand: '',
        price: LV_IDS[id] ? 65 : 40,
        image: '',
        description: '',
        category: LV_IDS[id] ? 'lv' : 'cologne',
        lowThreshold: 5,
        sizes: [],
        quantity: quantity,
      }
    }
  }

  return Object.keys(found).map(function (k) {
    return found[k]
  })
}

function logSale_(catalog, slug, name, size, qty, remaining, low) {
  var sales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sales')
  if (!sales) return
  sales.appendRow([
    new Date().toISOString(),
    catalog,
    slug,
    name,
    normalizeSize_(size),
    qty,
    remaining,
    low ? 'YES' : '',
  ])
}

function notifyLow_(name, catalog, slug, size, remaining) {
  var webhook = PropertiesService.getScriptProperties().getProperty('LOW_STOCK_WEBHOOK_URL')
  if (!webhook) return
  try {
    UrlFetchApp.fetch(webhook, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        content:
          'Low stock: ' +
          name +
          ' (' +
          catalog +
          '/' +
          slug +
          (size !== '-' ? ' · ' + size : '') +
          ') → ' +
          remaining,
      }),
      muteHttpExceptions: true,
    })
  } catch (err) {}
}

function isCologneCatalog_(catalog) {
  return catalog === 'colognes' || catalog === 'cologne'
}

function reverseMap_(obj) {
  var out = {}
  var keys = Object.keys(obj)
  for (var i = 0; i < keys.length; i++) {
    out[obj[keys[i]]] = keys[i]
  }
  return out
}

function parseQty_(value) {
  var raw = String(value == null ? '' : value).trim().toUpperCase()
  if (!raw || raw === 'SOLD' || raw === 'OUT') return 'sold'
  var n = Number(raw)
  if (!isFinite(n) || n <= 0) return 'sold'
  return n
}

function normalizeSize_(value) {
  var s = String(value == null ? '' : value).trim()
  return s ? s : '-'
}

function indexMap_(headers) {
  var map = {}
  for (var i = 0; i < headers.length; i++) {
    map[String(headers[i]).trim()] = i
  }
  return map
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
