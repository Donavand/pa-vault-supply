export type WomenSection = 'clothes' | 'accessories'

export type WomenBrand = 'all' | 'alo' | 'lulu' | 'coach'

export type WomenSizeStock = {
  size: string
  quantity: number | 'sold'
}

export type WomenTier = {
  qty: number
  total: number
  each: number
}

export type WomenItem = {
  id: number
  section: WomenSection
  slug: string
  name: string
  brand: string
  price: number
  quantity?: number | 'sold'
  sizes?: WomenSizeStock[]
  tiers?: WomenTier[]
  options?: string[]
  optionLabel?: string
  image?: string
  description: string
}

function s(size: string, quantity: number | 'sold'): WomenSizeStock {
  return { size, quantity }
}

const aloSetTiers: WomenTier[] = [
  { qty: 1, total: 70, each: 70 },
  { qty: 2, total: 126, each: 63 },
  { qty: 3, total: 183, each: 61 },
  { qty: 4, total: 232, each: 58 },
  { qty: 5, total: 285, each: 57 },
  { qty: 6, total: 336, each: 56 },
  { qty: 7, total: 385, each: 55 },
  { qty: 8, total: 432, each: 54 },
  { qty: 9, total: 477, each: 53 },
  { qty: 10, total: 520, each: 52 },
  { qty: 15, total: 750, each: 50 },
  { qty: 20, total: 960, each: 48 },
  { qty: 50, total: 2250, each: 45 },
  { qty: 100, total: 4200, each: 42 },
]

const coachTiers: WomenTier[] = [
  { qty: 1, total: 55, each: 55 },
  { qty: 2, total: 102, each: 51 },
  { qty: 3, total: 150, each: 50 },
  { qty: 4, total: 196, each: 49 },
  { qty: 5, total: 240, each: 48 },
  { qty: 6, total: 282, each: 47 },
  { qty: 7, total: 322, each: 46 },
  { qty: 8, total: 360, each: 45 },
  { qty: 9, total: 396, each: 44 },
  { qty: 10, total: 430, each: 43 },
  { qty: 15, total: 630, each: 42 },
  { qty: 20, total: 820, each: 41 },
  { qty: 50, total: 1900, each: 38 },
]


export const womenItems: WomenItem[] = [
  // Alo Sets
  {
    id: 1,
    section: 'clothes',
    slug: 'black-alo-set',
    name: 'Black Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 7), s('M', 7), s('L', 7), s('XL', 2)],
    tiers: aloSetTiers,
    image: '/products/alo-set-black.png',
    description:
      'Matching Alo set in black — soft stretch fabric, vault-ready fit. Top and bottom included.',
  },
  {
    id: 2,
    section: 'clothes',
    slug: 'white-alo-set',
    name: 'White Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 9), s('M', 8), s('L', 8), s('XL', 2)],
    tiers: aloSetTiers,
    image: '/products/alo-set-white.png',
    description:
      'Matching Alo set in white. Clean athletic silhouette for studio and street.',
  },
  {
    id: 3,
    section: 'clothes',
    slug: 'pink-alo-set',
    name: 'Pink Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 6), s('M', 10), s('L', 10), s('XL', 3)],
    tiers: aloSetTiers,
    image: '/products/alo-set-pink.png',
    description:
      'Matching Alo set in pink. Soft stretch, full set — grab your size.',
  },
  {
    id: 4,
    section: 'clothes',
    slug: 'blue-alo-set',
    name: 'Blue Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 8), s('M', 7), s('L', 'sold'), s('XL', 2)],
    tiers: aloSetTiers,
    image: '/products/alo-set-blue.png',
    description:
      'Matching Alo set in blue. L is cleared — S, M, and XL still in the vault.',
  },
  {
    id: 5,
    section: 'clothes',
    slug: 'grey-alo-set',
    name: 'Grey Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 6), s('M', 7), s('L', 7), s('XL', 2)],
    tiers: aloSetTiers,
    image: '/products/alo-set-grey.png',
    description:
      'Matching Alo set in grey. Everyday athletic staple from the vault.',
  },
  {
    id: 6,
    section: 'clothes',
    slug: 'navy-alo-set',
    name: 'Navy Alo Set',
    brand: 'Alo',
    price: 70,
    sizes: [s('S', 3), s('M', 7), s('L', 3), s('XL', 'sold')],
    tiers: aloSetTiers,
    image: '/products/alo-set-navy.png',
    description:
      'Matching Alo set in navy. XL sold out — act fast on S, M, and L.',
  },

  // Lulu Sets (sizes 2 / 4 / 6 / 8)
  {
    id: 18,
    section: 'clothes',
    slug: 'black-lulu-set',
    name: 'Black Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 6), s('4', 'sold'), s('6', 2), s('8', 'sold')],
    tiers: aloSetTiers,
    image: '/products/lulu-set-black.png',
    description:
      'Matching Lulu set in black — soft stretch fabric, vault-ready fit. Top and bottom included.',
  },
  {
    id: 19,
    section: 'clothes',
    slug: 'light-pink-lulu-set',
    name: 'Light Pink Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 4), s('4', 4), s('6', 7), s('8', 1)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-light-pink.png',
    description:
      'Matching Lulu set in light pink. Soft stretch, full set — grab your size.',
  },
  {
    id: 20,
    section: 'clothes',
    slug: 'red-lulu-set',
    name: 'Red Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 7), s('4', 5), s('6', 4), s('8', 3)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-red.png',
    description:
      'Matching Lulu set in bold red. Athletic silhouette for studio and street.',
  },
  {
    id: 21,
    section: 'clothes',
    slug: 'white-lulu-set',
    name: 'White Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 7), s('4', 7), s('6', 7), s('8', 1)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-white.png',
    description:
      'Matching Lulu set in white. Clean athletic look — top and bottom included.',
  },
  {
    id: 22,
    section: 'clothes',
    slug: 'leopard-lulu-set',
    name: 'Leopard Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 'sold'), s('4', 1), s('6', 4), s('8', 1)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-leopard.png',
    description:
      'Matching Lulu set in leopard print. Statement vault piece with soft stretch.',
  },
  {
    id: 23,
    section: 'clothes',
    slug: 'taupe-lulu-set',
    name: 'Taupe Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 8), s('4', 9), s('6', 9), s('8', 2)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-taupe.png',
    description:
      'Matching Lulu set in warm taupe. Everyday neutral that layers clean.',
  },
  {
    id: 24,
    section: 'clothes',
    slug: 'light-blue-lulu-set',
    name: 'Light Blue Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 7), s('4', 7), s('6', 9), s('8', 3)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-light-blue.png',
    description:
      'Matching Lulu set in light blue. Soft stretch, full set from the vault.',
  },
  {
    id: 25,
    section: 'clothes',
    slug: 'burgundy-lulu-set',
    name: 'Burgundy Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 7), s('4', 5), s('6', 8), s('8', 2)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-burgundy.png',
    description:
      'Matching Lulu set in deep burgundy. Rich tone with a fitted vault cut.',
  },
  {
    id: 26,
    section: 'clothes',
    slug: 'bright-pink-lulu-set',
    name: 'Bright Pink Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 8), s('4', 9), s('6', 9), s('8', 2)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-bright-pink.png',
    description:
      'Matching Lulu set in bright pink. Bold colorway, soft stretch fabric.',
  },
  {
    id: 27,
    section: 'clothes',
    slug: 'purple-lulu-set',
    name: 'Purple Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 7), s('4', 7), s('6', 9), s('8', 3)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-purple.png',
    description:
      'Matching Lulu set in purple. Soft stretch, full set — grab your size.',
  },
  {
    id: 28,
    section: 'clothes',
    slug: 'sky-blue-lulu-set',
    name: 'Sky Blue Lulu Set',
    brand: 'Lululemon',
    price: 70,
    sizes: [s('2', 8), s('4', 8), s('6', 9), s('8', 3)],
    tiers: aloSetTiers,
    image: '/products/lulu-set-sky-blue.png',
    description:
      'Matching Lulu set in sky blue. Clean athletic silhouette from the vault.',
  },

  // Accessories — Coach (from sheet)
  {
    id: 12,
    section: 'accessories',
    slug: 'coach-light-blue',
    name: 'Coach Light Blue',
    brand: 'Coach',
    price: 55,
    quantity: 'sold',
    tiers: coachTiers,
    image: '/products/coach-light-blue.png',
    description:
      'Small Coach mini bag in light blue pebbled leather with gold hardware. From $55.',
  },
  {
    id: 13,
    section: 'accessories',
    slug: 'coach-dark-blue',
    name: 'Coach Dark Blue',
    brand: 'Coach',
    price: 55,
    quantity: 'sold',
    tiers: coachTiers,
    image: '/products/coach-dark-blue.png',
    description:
      'Small Coach mini bag in deep navy leather with gold hardware. From $55.',
  },
  {
    id: 14,
    section: 'accessories',
    slug: 'coach-red',
    name: 'Coach Red',
    brand: 'Coach',
    price: 55,
    quantity: 'sold',
    tiers: coachTiers,
    image: '/products/coach-red.png',
    description:
      'Coach shoulder bag in bold red leather with gold hardware. From $55.',
  },
  {
    id: 15,
    section: 'accessories',
    slug: 'coach-leopard',
    name: 'Coach Leopard',
    brand: 'Coach',
    price: 55,
    quantity: 'sold',
    tiers: coachTiers,
    image: '/products/coach-leopard.png',
    description:
      'Coach shoulder bag in leopard print with gold hardware. From $55.',
  },
  {
    id: 16,
    section: 'accessories',
    slug: 'coach-black',
    name: 'Coach Black',
    brand: 'Coach',
    price: 55,
    quantity: 'sold',
    tiers: coachTiers,
    image: '/products/coach-black.png',
    description:
      'Small Coach mini bag in classic black leather with gold hardware. From $55.',
  },
  {
    id: 17,
    section: 'accessories',
    slug: 'coach-c-black',
    name: 'Coach C Black',
    brand: 'Coach',
    price: 55,
    quantity: 2,
    tiers: coachTiers,
    image: '/products/coach-c-black.png',
    description:
      'Coach C signature canvas bag in black with leather trim. From $55 — only 2 left.',
  },

]

export const womenSectionMeta: Record<
  WomenSection,
  { title: string; lede: string }
> = {
  clothes: {
    title: 'Women · Clothes',
    lede: 'Alo and Lulu sets from the vault — size up and checkout.',
  },
  accessories: {
    title: 'Women · Accessories',
    lede: 'Coach bags from the vault — claim yours and checkout.',
  },
}

export function womenBySection(section: WomenSection): WomenItem[] {
  return womenItems.filter((item) => item.section === section)
}

const womenBrandMap: Record<string, Exclude<WomenBrand, 'all'>> = {
  Alo: 'alo',
  Lululemon: 'lulu',
  Coach: 'coach',
}

export const womenBrandTabs: Record<
  WomenSection,
  { id: WomenBrand; label: string }[]
> = {
  clothes: [
    { id: 'all', label: 'All' },
    { id: 'alo', label: 'Alo' },
    { id: 'lulu', label: 'Lulu' },
  ],
  accessories: [
    { id: 'all', label: 'All' },
    { id: 'coach', label: 'Coach' },
  ],
}

export function parseWomenBrand(
  section: WomenSection,
  value: string | null,
): WomenBrand {
  const allowed = new Set(womenBrandTabs[section].map((t) => t.id))
  if (value && allowed.has(value as WomenBrand)) {
    return value as WomenBrand
  }
  return 'all'
}

export function womenForBrand(
  section: WomenSection,
  brand: WomenBrand,
): WomenItem[] {
  const items = womenBySection(section)
  if (brand === 'all') return items
  return items.filter((item) => womenBrandMap[item.brand] === brand)
}

export function womenGroupedByBrand(
  items: WomenItem[],
): { brand: string; items: WomenItem[] }[] {
  const order = ['Alo', 'Lululemon', 'Coach']
  const groups = new Map<string, WomenItem[]>()
  for (const item of items) {
    const list = groups.get(item.brand) ?? []
    list.push(item)
    groups.set(item.brand, list)
  }
  const sorted = [...groups.entries()].sort((a, b) => {
    const ai = order.indexOf(a[0])
    const bi = order.indexOf(b[0])
    const av = ai === -1 ? 99 : ai
    const bv = bi === -1 ? 99 : bi
    return av - bv || a[0].localeCompare(b[0])
  })
  return sorted.map(([brand, brandItems]) => ({ brand, items: brandItems }))
}

export function getWomenBySlug(
  section: WomenSection,
  slug: string,
): WomenItem | undefined {
  return womenItems.find(
    (item) => item.section === section && item.slug === slug,
  )
}

export function womenImage(item: WomenItem): string {
  return item.image ?? '/products/placeholder.png'
}

export function womenQuantity(item: WomenItem): number | 'sold' {
  if (item.sizes?.length) {
    const available = item.sizes
      .map((entry) => entry.quantity)
      .filter((qty): qty is number => typeof qty === 'number')
    if (available.length === 0) return 'sold'
    return available.reduce((sum, qty) => sum + qty, 0)
  }
  return item.quantity ?? 'sold'
}

export function isWomenSoldOut(item: WomenItem): boolean {
  return womenQuantity(item) === 'sold'
}

export function isWomenLowStock(item: WomenItem): boolean {
  const qty = womenQuantity(item)
  return typeof qty === 'number' && qty < 5
}

export function firstAvailableWomenSize(item: WomenItem): string | null {
  return (
    item.sizes?.find((entry) => typeof entry.quantity === 'number')?.size ??
    null
  )
}

export function womenSizeQuantity(
  item: WomenItem,
  size: string,
): number | 'sold' | null {
  return item.sizes?.find((entry) => entry.size === size)?.quantity ?? null
}
