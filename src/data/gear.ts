export type GearCategory = 'bags' | 'slides' | 'airpods'

export type GearItem = {
  id: number
  category: GearCategory
  slug: string
  name: string
  brand: string
  price: number
  quantity: number | 'sold'
  options?: string[]
  optionLabel?: string
  image?: string
  description: string
}

export const gear: GearItem[] = [
  // Bags
  {
    id: 1,
    category: 'bags',
    slug: 'vault-duffel',
    name: 'Vault Duffel',
    brand: 'PA Vault Supply',
    price: 95,
    quantity: 10,
    options: ['Black', 'Olive'],
    optionLabel: 'Color',
    image: '/products/bag-duffel.png',
    description:
      'Weekender duffel with reinforced straps and a lockable zip. Built for overnight drops and gym runs.',
  },
  {
    id: 2,
    category: 'bags',
    slug: 'crossbody-sling',
    name: 'Crossbody Sling',
    brand: 'PA Vault Supply',
    price: 55,
    quantity: 16,
    options: ['Black', 'Tan'],
    optionLabel: 'Color',
    image: '/products/bag-sling.png',
    description:
      'Compact sling for phone, wallet, and keys. Anti-theft zip and adjustable strap.',
  },
  {
    id: 3,
    category: 'bags',
    slug: 'mini-shoulder-bag',
    name: 'Mini Shoulder Bag',
    brand: 'PA Vault Supply',
    price: 65,
    quantity: 4,
    options: ['Black', 'Champagne'],
    optionLabel: 'Color',
    image: '/products/bag-shoulder.png',
    description:
      'Structured mini shoulder bag with gold-tone hardware. Low stock — act fast.',
  },
  {
    id: 4,
    category: 'bags',
    slug: 'backpack-supply',
    name: 'Supply Backpack',
    brand: 'PA Vault Supply',
    price: 110,
    quantity: 'sold',
    options: ['Black'],
    optionLabel: 'Color',
    image: '/products/bag-backpack.png',
    description:
      'Laptop-ready backpack with padded sleeve and hidden pocket. Sold out — request restock.',
  },

  // Slides
  {
    id: 5,
    category: 'slides',
    slug: 'vault-slides-black',
    name: 'Vault Slides — Black',
    brand: 'PA Vault Supply',
    price: 40,
    quantity: 22,
    options: ['7', '8', '9', '10', '11', '12'],
    optionLabel: 'Size',
    image: '/products/slides-black.png',
    description:
      'Cloud-foam slides with embossed vault mark. Indoor-outdoor grip sole.',
  },
  {
    id: 6,
    category: 'slides',
    slug: 'vault-slides-bone',
    name: 'Vault Slides — Bone',
    brand: 'PA Vault Supply',
    price: 40,
    quantity: 14,
    options: ['7', '8', '9', '10', '11', '12'],
    optionLabel: 'Size',
    image: '/products/slides-bone.png',
    description:
      'Bone colorway slides with soft footbed. Same vault comfort, lighter look.',
  },
  {
    id: 7,
    category: 'slides',
    slug: 'vault-slides-gold',
    name: 'Vault Slides — Gold',
    brand: 'PA Vault Supply',
    price: 45,
    quantity: 3,
    options: ['8', '9', '10', '11'],
    optionLabel: 'Size',
    image: '/products/slides-gold.png',
    description:
      'Champagne-gold accent slides. Limited pair count — act fast.',
  },
  {
    id: 8,
    category: 'slides',
    slug: 'fur-liner-slides',
    name: 'Fur Liner Slides',
    brand: 'PA Vault Supply',
    price: 50,
    quantity: 'sold',
    options: ['8', '9', '10', '11'],
    optionLabel: 'Size',
    image: '/products/slides-fur.png',
    description:
      'Shearling-lined slides for colder nights. Sold out — join the next drop.',
  },

  // AirPods
  {
    id: 9,
    category: 'airpods',
    slug: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    price: 189,
    quantity: 8,
    options: ['USB-C'],
    optionLabel: 'Model',
    image: '/products/airpods-pro.png',
    description:
      'Active noise cancellation, adaptive audio, MagSafe case. Sealed retail ready.',
  },
  {
    id: 10,
    category: 'airpods',
    slug: 'airpods-4',
    name: 'AirPods 4',
    brand: 'Apple',
    price: 129,
    quantity: 12,
    options: ['Standard'],
    optionLabel: 'Model',
    image: '/products/airpods-4.png',
    description:
      'Open-ear fit with spatial audio. Fresh stock, sealed packaging.',
  },
  {
    id: 11,
    category: 'airpods',
    slug: 'airpods-max',
    name: 'AirPods Max',
    brand: 'Apple',
    price: 449,
    quantity: 2,
    options: ['Space Gray', 'Silver'],
    optionLabel: 'Color',
    image: '/products/airpods-max.png',
    description:
      'Over-ear ANC headphones. Low vault count — claim before they’re gone.',
  },
  {
    id: 12,
    category: 'airpods',
    slug: 'airpods-3',
    name: 'AirPods (3rd Gen)',
    brand: 'Apple',
    price: 99,
    quantity: 'sold',
    options: ['Lightning'],
    optionLabel: 'Model',
    image: '/products/airpods-3.png',
    description:
      'Spatial audio with force sensor stem. Sold out — DM for restock timing.',
  },
]

export const gearMeta: Record<
  GearCategory,
  { title: string; headline: string; lede: string; shopLabel: string }
> = {
  bags: {
    title: 'Bags',
    headline: 'Carry the vault.',
    lede: 'Duffels, slings, and packs — locked, loaded, and ready to move.',
    shopLabel: 'Shop bags',
  },
  slides: {
    title: 'Slides',
    headline: 'Step light.',
    lede: 'Vault slides for house, gym, and late-night runs. Pick your size and checkout.',
    shopLabel: 'Shop slides',
  },
  airpods: {
    title: 'AirPods',
    headline: 'Sound sealed.',
    lede: 'Apple AirPods in the vault — Pro, Max, and more. Pay and claim.',
    shopLabel: 'Shop AirPods',
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
  return item.image ?? '/products/placeholder.png'
}

export function isGearLowStock(item: GearItem): boolean {
  return typeof item.quantity === 'number' && item.quantity < 5
}
