export type WomenSection = 'clothes' | 'bags'

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
  // Essentials
  {
    id: 7,
    section: 'clothes',
    slug: 'cropped-hoodie-black',
    name: 'Cropped Hoodie Black',
    brand: 'Essentials',
    price: 55,
    sizes: [s('XS', 8), s('S', 14), s('M', 11), s('L', 6), s('XL', 'sold')],
    image: '/products/women-cropped-hoodie.png',
    description:
      'Cropped fleece hoodie with the Essentials mark. Soft hand-feel, fitted vault cut.',
  },
  {
    id: 8,
    section: 'clothes',
    slug: 'soft-tee-light-oat',
    name: 'Soft Tee Light Oat',
    brand: 'Essentials',
    price: 28,
    sizes: [s('XS', 12), s('S', 20), s('M', 18), s('L', 9), s('XL', 4)],
    image: '/products/women-soft-tee.png',
    description:
      'Lightweight essentials tee in light oat. Clean fit for everyday drops.',
  },
  {
    id: 9,
    section: 'clothes',
    slug: 'wide-leg-pants-dark-oat',
    name: 'Wide Leg Pants Dark Oat',
    brand: 'Essentials',
    price: 58,
    sizes: [s('XS', 5), s('S', 9), s('M', 7), s('L', 'sold'), s('XL', 3)],
    image: '/products/women-wide-pants.png',
    description:
      'Wide-leg sweatpants in dark oat. Relaxed vault silhouette with soft fleece.',
  },
  {
    id: 10,
    section: 'clothes',
    slug: 'ribbed-tank-stretch-limo',
    name: 'Ribbed Tank Stretch Limo',
    brand: 'Essentials',
    price: 32,
    sizes: [s('XS', 10), s('S', 16), s('M', 12), s('L', 8), s('XL', 2)],
    image: '/products/women-ribbed-tank.png',
    description:
      'Ribbed stretch limo tank. Layer it or wear solo — clean Essentials finish.',
  },
  {
    id: 11,
    section: 'clothes',
    slug: 'fleece-mini-skirt-coral',
    name: 'Fleece Mini Skirt Coral',
    brand: 'Essentials',
    price: 42,
    sizes: [s('XS', 'sold'), s('S', 4), s('M', 6), s('L', 3), s('XL', 'sold')],
    image: '/products/women-mini-skirt.png',
    description:
      'Soft fleece mini skirt in coral. Low stock — grab your size while it lasts.',
  },
  // Bags
  {
    id: 12,
    section: 'bags',
    slug: 'champagne-mini-crossbody',
    name: 'Champagne Mini Crossbody',
    brand: 'PA Vault Supply',
    price: 75,
    quantity: 9,
    options: ['Champagne', 'Black'],
    optionLabel: 'Color',
    image: '/products/women-mini-crossbody.png',
    description:
      'Compact crossbody with gold-tone hardware. Fits phone, cards, and keys.',
  },
  {
    id: 13,
    section: 'bags',
    slug: 'soft-tote-black',
    name: 'Soft Tote Black',
    brand: 'PA Vault Supply',
    price: 95,
    quantity: 7,
    options: ['Black', 'Bone'],
    optionLabel: 'Color',
    image: '/products/women-soft-tote.png',
    description:
      'Everyday soft tote with room for a laptop sleeve and night-drop essentials.',
  },
  {
    id: 14,
    section: 'bags',
    slug: 'plum-mini-shoulder',
    name: 'Plum Mini Shoulder',
    brand: 'PA Vault Supply',
    price: 68,
    quantity: 4,
    options: ['Plum', 'Black'],
    optionLabel: 'Color',
    image: '/products/women-mini-shoulder.png',
    description:
      'Structured mini shoulder in plum. Low stock — act fast.',
  },
  {
    id: 15,
    section: 'bags',
    slug: 'bone-clutch',
    name: 'Bone Clutch',
    brand: 'PA Vault Supply',
    price: 55,
    quantity: 'sold',
    options: ['Bone', 'Black'],
    optionLabel: 'Color',
    image: '/products/women-clutch.png',
    description:
      'Evening clutch in bone with gold clasp. Sold out — join the restock list.',
  },
]

export const womenSectionMeta: Record<
  WomenSection,
  { title: string; lede: string }
> = {
  clothes: {
    title: 'Women · Clothes',
    lede: 'Alo sets and Essentials pieces for her — size up and checkout.',
  },
  bags: {
    title: 'Women · Bags',
    lede: 'Crossbodies, totes, shoulders, and clutches from the vault.',
  },
}

export function womenBySection(section: WomenSection): WomenItem[] {
  return womenItems.filter((item) => item.section === section)
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
