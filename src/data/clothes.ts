export type ClothingCategory = 'hoodies' | 'pants' | 'shorts' | 'tees'

export type ClothesLine = 'all' | 'hoodies' | 'pants' | 'essentials'

export type SizeStock = {
  size: string
  quantity: number | 'sold'
}

export type ClothingTier = {
  qty: number
  total: number
  each: number
}

export type ClothingItem = {
  id: number
  slug: string
  name: string
  brand: string
  category: ClothingCategory
  sizes: SizeStock[]
  tiers: ClothingTier[]
  image?: string
  description: string
}

const hoodiePantsTiers: ClothingTier[] = [
  { qty: 1, total: 50, each: 50 },
  { qty: 2, total: 90, each: 45 },
  { qty: 3, total: 132, each: 44 },
  { qty: 4, total: 168, each: 42 },
  { qty: 5, total: 205, each: 41 },
  { qty: 6, total: 240, each: 40 },
  { qty: 7, total: 266, each: 38 },
  { qty: 8, total: 280, each: 35 },
  { qty: 9, total: 306, each: 34 },
  { qty: 10, total: 330, each: 33 },
  { qty: 15, total: 465, each: 31 },
  { qty: 20, total: 600, each: 30 },
  { qty: 50, total: 1400, each: 28 },
  { qty: 100, total: 2600, each: 26 },
]

const shortsTiers: ClothingTier[] = [
  { qty: 1, total: 40, each: 40 },
  { qty: 2, total: 76, each: 38 },
  { qty: 3, total: 111, each: 37 },
  { qty: 4, total: 144, each: 36 },
  { qty: 5, total: 175, each: 35 },
  { qty: 6, total: 204, each: 34 },
  { qty: 7, total: 231, each: 33 },
  { qty: 8, total: 256, each: 32 },
  { qty: 9, total: 279, each: 31 },
  { qty: 10, total: 300, each: 30 },
  { qty: 15, total: 420, each: 28 },
  { qty: 20, total: 540, each: 27 },
  { qty: 50, total: 1250, each: 25 },
  { qty: 100, total: 2300, each: 23 },
  { qty: 200, total: 3800, each: 19 },
]

const teeTiers: ClothingTier[] = [
  { qty: 1, total: 25, each: 25 },
  { qty: 2, total: 49, each: 24.5 },
  { qty: 3, total: 72, each: 24 },
  { qty: 4, total: 94, each: 23.5 },
  { qty: 5, total: 105, each: 23 },
  { qty: 6, total: 135, each: 22.5 },
  { qty: 7, total: 154, each: 22 },
  { qty: 8, total: 172, each: 21.5 },
  { qty: 9, total: 189, each: 21 },
  { qty: 10, total: 200, each: 20 },
  { qty: 15, total: 360, each: 19 },
  { qty: 20, total: 360, each: 18 },
  { qty: 50, total: 850, each: 17 },
  { qty: 100, total: 1600, each: 16 },
]

function s(size: string, quantity: number | 'sold'): SizeStock {
  return { size, quantity }
}

export const clothes: ClothingItem[] = [
  // Hoodies
  {
    id: 1,
    slug: 'stretch-limo-hoodie',
    name: 'Stretch Limo Hoodie',
    brand: 'Essentials',
    category: 'hoodies',
    sizes: [s('XS', 13), s('S', 'sold'), s('M', 'sold'), s('L', 'sold')],
    tiers: hoodiePantsTiers,
    image: '/products/stretch-limo-hoodie.png',
    description:
      'Stretch limo hoodie — soft fleece, clean vault cut. Bulk pricing available.',
  },
  {
    id: 2,
    slug: 'dark-oatmeal-hoodie',
    name: 'Dark Oatmeal Hoodie',
    brand: 'Essentials',
    category: 'hoodies',
    sizes: [s('XS', 47), s('S', 'sold'), s('M', 'sold'), s('L', 45)],
    tiers: hoodiePantsTiers,
    image: '/products/dark-oatmeal-hoodie.png',
    description:
      'Dark oatmeal hoodie with a heavyweight hand-feel. Core vault essential.',
  },
  {
    id: 3,
    slug: 'light-oatmeal-hoodie',
    name: 'Light Oatmeal Hoodie',
    brand: 'Essentials',
    category: 'hoodies',
    sizes: [
      s('XS', 45),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 39),
      s('XL', 'sold'),
    ],
    tiers: hoodiePantsTiers,
    image: '/products/light-oatmeal-hoodie.png',
    description:
      'Light oatmeal hoodie for everyday drops. Soft fleece, relaxed fit.',
  },
  // Pants
  {
    id: 4,
    slug: 'uncuffed-light-oat-pants',
    name: 'Uncuffed Light Oat Pants',
    brand: 'Essentials',
    category: 'pants',
    sizes: [
      s('XS', 16),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 48),
    ],
    tiers: hoodiePantsTiers,
    image: '/products/uncuffed-light-oat-pants.png',
    description:
      'Uncuffed light oat pants with a straight vault cut. Pair with the oat hoodies.',
  },
  {
    id: 5,
    slug: 'uncuffed-stretch-limo-pants',
    name: 'Uncuffed Stretch Limo Pants',
    brand: 'Essentials',
    category: 'pants',
    sizes: [
      s('XS', 4),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 24),
    ],
    tiers: hoodiePantsTiers,
    image: '/products/uncuffed-stretch-limo-pants.png',
    description:
      'Uncuffed stretch limo pants — sleek blackout finish for night drops.',
  },
  {
    id: 6,
    slug: 'uncuffed-dark-oat-pants',
    name: 'Uncuffed Dark Oat Pants',
    brand: 'Essentials',
    category: 'pants',
    sizes: [
      s('XS', 5),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 37),
    ],
    tiers: hoodiePantsTiers,
    image: '/products/uncuffed-dark-oat-pants.png',
    description:
      'Uncuffed dark oat pants. Soft stretch fabric with a clean uncuffed hem.',
  },
  // Essentials Shorts
  {
    id: 7,
    slug: 'essentials-jet-black-shorts',
    name: 'Essentials Jet Black Shorts',
    brand: 'Essentials',
    category: 'shorts',
    sizes: [
      s('XS', 'sold'),
      s('S', 'sold'),
      s('M', 3),
      s('L', 'sold'),
      s('XL', 'sold'),
    ],
    tiers: shortsTiers,
    image: '/products/essentials-jet-black-shorts.png',
    description:
      'Essentials jet black shorts. Low stock — M is the last size standing.',
  },
  {
    id: 8,
    slug: 'essentials-black-shorts',
    name: 'Essentials Black Shorts',
    brand: 'Essentials',
    category: 'shorts',
    sizes: [s('XS', 194), s('S', 355), s('M', 153), s('L', 111), s('XL', 91)],
    tiers: shortsTiers,
    image: '/products/essentials-black-shorts.png',
    description:
      'Essentials black shorts — deep vault stock across every size.',
  },
  {
    id: 9,
    slug: 'essentials-dark-shorts',
    name: 'Essentials Dark Shorts',
    brand: 'Essentials',
    category: 'shorts',
    sizes: [s('XS', 111), s('S', 64), s('M', 71), s('L', 74), s('XL', 35)],
    tiers: shortsTiers,
    image: '/products/essentials-dark-shorts.png',
    description: 'Essentials dark shorts. Soft hand-feel, everyday vault fit.',
  },
  {
    id: 10,
    slug: 'essentials-light-shorts',
    name: 'Essentials Light Shorts',
    brand: 'Essentials',
    category: 'shorts',
    sizes: [
      s('XS', 109),
      s('S', 12),
      s('M', 41),
      s('L', 'sold'),
      s('XL', 23),
    ],
    tiers: shortsTiers,
    image: '/products/essentials-light-shorts.png',
    description:
      'Essentials light shorts. L is cleared — grab the sizes still in vault.',
  },
  {
    id: 11,
    slug: 'essentials-smoke-shorts',
    name: 'Essentials Smoke Shorts',
    brand: 'Essentials',
    category: 'shorts',
    sizes: [
      s('XS', 'sold'),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 'sold'),
    ],
    tiers: shortsTiers,
    image: '/products/essentials-smoke-shorts.png',
    description:
      'Essentials smoke shorts. Fully cleared — join the restock list.',
  },
  // Essentials Tees
  {
    id: 12,
    slug: 'essentials-tee-sycamore',
    name: 'Essentials Tee Sycamore',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XS', 1),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 'sold'),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-sycamore.png',
    description:
      'Essentials tee in sycamore. Last XS in the vault — act fast.',
  },
  {
    id: 13,
    slug: 'essentials-tee-coral',
    name: 'Essentials Tee Coral',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XS', 'sold'),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 'sold'),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-coral.png',
    description: 'Essentials tee in coral. Sold out across all sizes.',
  },
  {
    id: 14,
    slug: 'essentials-tee-plum',
    name: 'Essentials Tee Plum',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XS', 'sold'),
      s('S', 'sold'),
      s('M', 'sold'),
      s('L', 'sold'),
      s('XL', 'sold'),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-plum.png',
    description: 'Essentials tee in plum. Cleared — notify for the next drop.',
  },
  {
    id: 15,
    slug: 'essentials-tee-stretch-limo',
    name: 'Essentials Tee Stretch Limo',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XXS', 9),
      s('XS', 3),
      s('S', 33),
      s('M', 25),
      s('L', 30),
      s('XL', 18),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-stretch-limo.png',
    description:
      'Essentials tee in stretch limo black. Full size run including XXS.',
  },
  {
    id: 16,
    slug: 'essentials-tee-dark-oat',
    name: 'Essentials Tee Dark Oat',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XXS', 9),
      s('XS', 8),
      s('S', 34),
      s('M', 18),
      s('L', 45),
      s('XL', 13),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-dark-oat.png',
    description: 'Essentials tee in dark oat. Soft cotton, full size run.',
  },
  {
    id: 17,
    slug: 'essentials-tee-light-oat',
    name: 'Essentials Tee Light Oat',
    brand: 'Essentials',
    category: 'tees',
    sizes: [
      s('XXS', 9),
      s('XS', 23),
      s('S', 14),
      s('M', 14),
      s('L', 38),
      s('XL', 43),
    ],
    tiers: teeTiers,
    image: '/products/essentials-tee-light-oat.png',
    description: 'Essentials tee in light oat. Everyday vault staple.',
  },
]

export function getClothingBySlug(slug: string): ClothingItem | undefined {
  return clothes.find((c) => c.slug === slug)
}

export function clothingImage(item: ClothingItem): string {
  return item.image ?? '/products/placeholder.png'
}

export function clothingQuantity(item: ClothingItem): number | 'sold' {
  const available = item.sizes
    .map((entry) => entry.quantity)
    .filter((qty): qty is number => typeof qty === 'number')
  if (available.length === 0) return 'sold'
  return available.reduce((sum, qty) => sum + qty, 0)
}

export function isClothingSoldOut(item: ClothingItem): boolean {
  return clothingQuantity(item) === 'sold'
}

export function isClothingLowStock(item: ClothingItem): boolean {
  const qty = clothingQuantity(item)
  return typeof qty === 'number' && qty < 5
}

export function availableSizes(item: ClothingItem): SizeStock[] {
  return item.sizes.filter((entry) => typeof entry.quantity === 'number')
}

export function firstAvailableSize(item: ClothingItem): string | null {
  return availableSizes(item)[0]?.size ?? null
}

export function sizeQuantity(
  item: ClothingItem,
  size: string,
): number | 'sold' | null {
  return item.sizes.find((entry) => entry.size === size)?.quantity ?? null
}

export function startingClothingPrice(item: ClothingItem): string {
  const each = item.tiers[0]?.each
  if (each == null) return 'DM for price'
  return `From $${each}`
}

export function unitClothingPrice(item: ClothingItem): number {
  return item.tiers[0]?.each ?? 0
}

export function isEssentialsClothing(item: ClothingItem): boolean {
  return item.category === 'shorts' || item.category === 'tees'
}

export function clothesForLine(
  line: ClothesLine,
  items: ClothingItem[] = clothes,
): ClothingItem[] {
  if (line === 'all') return items
  if (line === 'essentials') return items.filter(isEssentialsClothing)
  return items.filter((item) => item.category === line)
}

export function clothesLineForItem(item: ClothingItem): ClothesLine {
  if (isEssentialsClothing(item)) return 'essentials'
  if (item.category === 'hoodies' || item.category === 'pants') {
    return item.category
  }
  return 'all'
}

export function clothesLinePath(line: ClothesLine): string {
  return line === 'all' ? '/clothes' : `/clothes?line=${line}`
}
