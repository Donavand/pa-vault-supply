export type GearCategory = 'slides' | 'airpods' | 'jerseys'

export type GearSizeStock = {
  size: string
  quantity: number | 'sold'
}

export type GearTier = {
  qty: number
  total: number
  each: number
}

export type GearItem = {
  id: number
  category: GearCategory
  slug: string
  name: string
  brand: string
  price: number
  quantity: number | 'sold'
  sizes?: GearSizeStock[]
  tiers?: GearTier[]
  options?: string[]
  optionLabel?: string
  image?: string
  description: string
}

function sz(size: string, quantity: number | 'sold'): GearSizeStock {
  return { size, quantity }
}

function totalFromSizes(sizes: GearSizeStock[]): number | 'sold' {
  const nums = sizes
    .map((entry) => entry.quantity)
    .filter((q): q is number => typeof q === 'number')
  if (nums.length === 0) return 'sold'
  return nums.reduce((a, b) => a + b, 0)
}

const airpodsTiers: GearTier[] = [
  { qty: 1, total: 40, each: 40 },
  { qty: 2, total: 76, each: 38 },
  { qty: 3, total: 105, each: 35 },
  { qty: 4, total: 136, each: 34 },
  { qty: 5, total: 150, each: 30 },
  { qty: 6, total: 174, each: 29 },
  { qty: 7, total: 196, each: 28 },
  { qty: 8, total: 216, each: 27 },
  { qty: 9, total: 234, each: 26 },
  { qty: 10, total: 250, each: 25 },
  { qty: 20, total: 480, each: 24 },
  { qty: 50, total: 1100, each: 22 },
  { qty: 100, total: 1900, each: 19 },
  { qty: 200, total: 3600, each: 18 },
]

const jerseyTiers: GearTier[] = [
  { qty: 1, total: 45, each: 45 },
  { qty: 2, total: 80, each: 40 },
  { qty: 3, total: 114, each: 38 },
  { qty: 4, total: 136, each: 34 },
  { qty: 5, total: 165, each: 33 },
  { qty: 6, total: 192, each: 32 },
  { qty: 7, total: 217, each: 31 },
  { qty: 8, total: 240, each: 30 },
  { qty: 9, total: 261, each: 29 },
  { qty: 10, total: 280, each: 28 },
  { qty: 15, total: 405, each: 27 },
  { qty: 20, total: 520, each: 26 },
  { qty: 50, total: 1100, each: 22 },
  { qty: 100, total: 1800, each: 18 },
]

function allSold(): GearSizeStock[] {
  return [sz('S', 'sold'), sz('M', 'sold'), sz('L', 'sold'), sz('XL', 'sold')]
}

const airpodsPro3NoAncTiers: GearTier[] = [
  { qty: 1, total: 35, each: 35 },
  { qty: 2, total: 60, each: 30 },
  { qty: 3, total: 87, each: 29 },
  { qty: 4, total: 112, each: 28 },
  { qty: 5, total: 135, each: 27 },
  { qty: 6, total: 156, each: 26 },
  { qty: 7, total: 175, each: 25 },
  { qty: 8, total: 192, each: 24 },
  { qty: 9, total: 207, each: 23 },
  { qty: 10, total: 220, each: 22 },
  { qty: 15, total: 315, each: 21 },
  { qty: 20, total: 400, each: 20 },
  { qty: 50, total: 900, each: 18 },
  { qty: 100, total: 1700, each: 17 },
  { qty: 200, total: 3000, each: 15 },
]

export const gear: GearItem[] = [
  // Slides — from sheet
  {
    id: 1,
    category: 'slides',
    slug: 'onyx-yeezy-slides',
    name: 'Onyx Yeezy Slides',
    brand: 'Yeezy',
    price: 65,
    sizes: [
      sz('7', 'sold'),
      sz('8', 'sold'),
      sz('9', 'sold'),
      sz('10', 'sold'),
    ],
    quantity: 'sold',
    optionLabel: 'Size',
    image: '/products/yeezy-slides-onyx.png',
    description:
      'Foam Yeezy slides in deep Onyx. Soft footbed, easy everyday slip-on — sizes 7–10 currently cleared.',
  },
  {
    id: 2,
    category: 'slides',
    slug: 'bone-yeezy-slides',
    name: 'Bone Yeezy Slides',
    brand: 'Yeezy',
    price: 65,
    sizes: [
      sz('7', 'sold'),
      sz('8', 'sold'),
      sz('9', 'sold'),
      sz('10', 'sold'),
    ],
    quantity: 'sold',
    optionLabel: 'Size',
    image: '/products/yeezy-slides-bone.png',
    description:
      'Foam Yeezy slides in Bone. Light neutral tone with the same vault-ready cushion — join the restock list.',
  },
  {
    id: 3,
    category: 'slides',
    slug: 'balenciaga-slides',
    name: 'Balenciaga Slides',
    brand: 'Balenciaga',
    price: 72,
    sizes: [
      sz('40 / 7 US', 'sold'),
      sz('41 / 8 US', 'sold'),
      sz('42 / 9 US', 'sold'),
      sz('43 / 10 US', 'sold'),
      sz('44 / 11 US', 3),
      sz('45 / 12 US', 1),
    ],
    quantity: 4,
    optionLabel: 'Size',
    image: '/products/slides-fur.png',
    description:
      'Balenciaga fur-lined slides with a thick sole and plush footbed. From $72 — 44/11 and 45/12 still in stock.',
  },

  // AirPods — from sheet
  {
    id: 9,
    category: 'airpods',
    slug: 'airpod-pro-2',
    name: 'Airpod Pro 2',
    brand: 'Apple',
    price: 40,
    quantity: 113,
    tiers: airpodsTiers,
    image: '/products/airpods-pro.png',
    description:
      'AirPods Pro 2 with active noise cancellation and MagSafe case. From $40 — free shipping, bulk tiers available.',
  },
  {
    id: 10,
    category: 'airpods',
    slug: 'airpod-pro-3-anc',
    name: 'Airpod Pro 3 (ANC)',
    brand: 'Apple',
    price: 40,
    quantity: 'sold',
    tiers: airpodsTiers,
    image: '/products/airpods-pro-3-anc.png',
    description:
      'Next-gen AirPods Pro 3 with ANC. From $40 — currently sold out. Free shipping on restock.',
  },
  {
    id: 11,
    category: 'airpods',
    slug: 'airpod-gen-4',
    name: 'Airpod Gen 4',
    brand: 'Apple',
    price: 40,
    quantity: 'sold',
    tiers: airpodsTiers,
    image: '/products/airpods-4.png',
    description:
      'Open-ear AirPods Gen 4 with spatial audio. From $40 — currently sold out.',
  },
  {
    id: 12,
    category: 'airpods',
    slug: 'airpod-pro-3-no-anc',
    name: 'Airpod Pro 3 (NO ANC)',
    brand: 'Apple',
    price: 35,
    quantity: 32,
    tiers: airpodsPro3NoAncTiers,
    image: '/products/airpods-pro-3.png',
    description:
      'AirPods Pro 3 without ANC — same fit, lighter price. From $35 — free shipping, bulk tiers available.',
  },
  // Jerseys
  {
    id: 29,
    category: 'jerseys',
    slug: 'argentina-messi-jersey',
    name: 'Argentina Messi Jersey',
    brand: 'Argentina',
    price: 45,
    quantity: 9,
    sizes: [sz('S', 7), sz('M', 1), sz('L', 1), sz('XL', 'sold')],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-argentina-messi.png',
    description:
      'Argentina home jersey — light blue and white stripes. From $45, vault stock.',
  },
  {
    id: 30,
    category: 'jerseys',
    slug: 'red-spain-yamal-jersey',
    name: 'Red Spain Yamal Jersey',
    brand: 'Spain',
    price: 45,
    quantity: 39,
    sizes: [sz('S', 12), sz('M', 11), sz('L', 14), sz('XL', 2)],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-spain-yamal-red.png',
    description:
      'Spain home jersey in classic red. From $45 — game-day vault piece.',
  },
  {
    id: 31,
    category: 'jerseys',
    slug: 'white-spain-yamal-jersey',
    name: 'White Spain Yamal Jersey',
    brand: 'Spain',
    price: 45,
    quantity: 29,
    sizes: [sz('S', 13), sz('M', 3), sz('L', 10), sz('XL', 3)],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-spain-yamal-white.png',
    description:
      'Spain away jersey in white with red accents. From $45.',
  },
  {
    id: 32,
    category: 'jerseys',
    slug: 'france-mbappe-jersey',
    name: 'France Mbappe Jersey',
    brand: 'France',
    price: 45,
    quantity: 36,
    sizes: [sz('S', 14), sz('M', 6), sz('L', 12), sz('XL', 4)],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-france-mbappe.png',
    description:
      'France home jersey in deep navy. From $45 — clean vault kit.',
  },
  {
    id: 33,
    category: 'jerseys',
    slug: 'portugal-ronaldo-jersey',
    name: 'Portugal Ronaldo Jersey',
    brand: 'Portugal',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-portugal-ronaldo.png',
    description:
      'Portugal home jersey in deep red. From $45 — currently sold out.',
  },
  {
    id: 34,
    category: 'jerseys',
    slug: 'brazil-vini-jr-jersey',
    name: 'Brazil Vini Jr Jersey',
    brand: 'Brazil',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-brazil-vini.png',
    description:
      'Brazil home jersey in canary yellow. From $45 — currently sold out.',
  },
  {
    id: 35,
    category: 'jerseys',
    slug: 'black-mexico-gimenez-jersey',
    name: 'Black Mexico Gimenez Jersey',
    brand: 'Mexico',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-mexico-gimenez-black.png',
    description:
      'Mexico black alternate jersey. From $45 — currently sold out.',
  },
  {
    id: 36,
    category: 'jerseys',
    slug: 'green-mexico-gimenez-jersey',
    name: 'Green Mexico Gimenez Jersey',
    brand: 'Mexico',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-mexico-gimenez-green.png',
    description:
      'Mexico green home jersey. From $45 — currently sold out.',
  },
  {
    id: 37,
    category: 'jerseys',
    slug: 'green-mexico-raul-jersey',
    name: 'Green Mexico Raul Jersey',
    brand: 'Mexico',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-mexico-raul-green.png',
    description:
      'Mexico green jersey from the vault. From $45 — currently sold out.',
  },
  {
    id: 38,
    category: 'jerseys',
    slug: 'm-caicedo-jersey',
    name: 'M. Caicedo Jersey',
    brand: 'Ecuador',
    price: 45,
    quantity: 11,
    sizes: [sz('S', 4), sz('M', 'sold'), sz('L', 7), sz('XL', 'sold')],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-caicedo.png',
    description:
      'Ecuador yellow jersey — Caicedo vault drop. From $45.',
  },
  {
    id: 39,
    category: 'jerseys',
    slug: 'hincapie-jersey',
    name: 'Hincapié Jersey',
    brand: 'Ecuador',
    price: 45,
    quantity: 19,
    sizes: [sz('S', 5), sz('M', 6), sz('L', 8), sz('XL', 'sold')],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-hincapie.png',
    description:
      'Ecuador yellow jersey — Hincapié vault drop. From $45.',
  },
  {
    id: 40,
    category: 'jerseys',
    slug: 'paez-jersey',
    name: 'Páez Jersey',
    brand: 'Ecuador',
    price: 45,
    quantity: 29,
    sizes: [sz('S', 9), sz('M', 9), sz('L', 9), sz('XL', 2)],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-paez.png',
    description:
      'Ecuador yellow jersey — Páez vault drop. From $45.',
  },
  {
    id: 41,
    category: 'jerseys',
    slug: 'e-valencia-jersey',
    name: 'E. Valencia Jersey',
    brand: 'Ecuador',
    price: 45,
    quantity: 27,
    sizes: [sz('S', 10), sz('M', 10), sz('L', 7), sz('XL', 'sold')],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-valencia.png',
    description:
      'Ecuador yellow jersey — E. Valencia vault drop. From $45.',
  },
  {
    id: 42,
    category: 'jerseys',
    slug: 'raul-jersey',
    name: 'Raúl Jersey',
    brand: 'Mexico',
    price: 45,
    quantity: 'sold',
    sizes: allSold(),
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-raul.png',
    description:
      'Mexico green jersey — Raúl vault drop. From $45 — sold out.',
  },
  {
    id: 43,
    category: 'jerseys',
    slug: 'dembele-jersey',
    name: 'Dembele Jersey',
    brand: 'France',
    price: 45,
    quantity: 9,
    sizes: [sz('S', 4), sz('M', 3), sz('L', 2), sz('XL', 'sold')],
    tiers: jerseyTiers,
    optionLabel: 'Size',
    image: '/products/jersey-dembele.png',
    description:
      'France navy jersey — Dembele vault drop. From $45.',
  },
]

export const gearMeta: Record<
  GearCategory,
  { title: string; headline: string; lede: string; shopLabel: string }
> = {
  slides: {
    title: 'Slides',
    headline: 'Step light.',
    lede: 'Yeezy and Balenciaga slides from the vault — pick your size and checkout.',
    shopLabel: 'Shop slides',
  },
  airpods: {
    title: 'AirPods',
    headline: 'Sound sealed.',
    lede: 'AirPods Pro and Gen 4 from the vault — from $35, free shipping.',
    shopLabel: 'Shop AirPods',
  },
  jerseys: {
    title: 'Jerseys',
    headline: 'Game day.',
    lede: 'National and player jerseys from the vault — pick your size and checkout.',
    shopLabel: 'Shop jerseys',
  },
}

export function gearByCategory(category: GearCategory): GearItem[] {
  return gear.filter((g) => g.category === category)
}

export function getGearBySlug(
  category: GearCategory,
  slug: string,
): GearItem | undefined {
  return gear.find((g) => g.category === category && g.slug === slug)
}

export function gearImage(item: GearItem): string {
  return item.image ?? '/products/yeezy-slides-onyx.png'
}

export function gearQuantity(item: GearItem): number | 'sold' {
  if (item.sizes?.length) return totalFromSizes(item.sizes)
  return item.quantity
}

export function isGearLowStock(item: GearItem): boolean {
  const qty = gearQuantity(item)
  return typeof qty === 'number' && qty < 5
}

export function gearSizeSold(item: GearItem, size: string): boolean {
  const entry = item.sizes?.find((s) => s.size === size)
  if (!entry) return false
  return entry.quantity === 'sold' || entry.quantity === 0
}
