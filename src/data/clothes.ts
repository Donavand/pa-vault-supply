export type ClothingItem = {
  id: number
  slug: string
  name: string
  brand: string
  price: number
  quantity: number | 'sold'
  sizes: string[]
  image?: string
  description: string
}

export const clothes: ClothingItem[] = [
  {
    id: 1,
    slug: 'vault-essentials-tee',
    name: 'Vault Essentials Tee',
    brand: 'PA Vault Supply',
    price: 35,
    quantity: 24,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/clothes-tee.png',
    description:
      'Heavyweight cotton tee with a clean vault mark. Soft hand-feel, boxy street fit.',
  },
  {
    id: 2,
    slug: 'locked-in-hoodie',
    name: 'Locked In Hoodie',
    brand: 'PA Vault Supply',
    price: 75,
    quantity: 12,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/products/clothes-hoodie.png',
    description:
      'Fleece hoodie with gold-on-black vault energy. Warm, oversized, and built for nightly drops.',
  },
  {
    id: 3,
    slug: 'supply-cargo-pants',
    name: 'Supply Cargo Pants',
    brand: 'PA Vault Supply',
    price: 85,
    quantity: 8,
    sizes: ['28', '30', '32', '34', '36'],
    image: '/products/clothes-cargos.png',
    description:
      'Utility cargos with deep pockets and a tapered street cut. Blackout finish.',
  },
  {
    id: 4,
    slug: 'vault-cap',
    name: 'Vault Cap',
    brand: 'PA Vault Supply',
    price: 30,
    quantity: 18,
    sizes: ['OS'],
    image: '/products/clothes-cap.png',
    description:
      'Structured cap with embroidered PA mark. One-size adjustable strap.',
  },
  {
    id: 5,
    slug: 'night-drop-jacket',
    name: 'Night Drop Jacket',
    brand: 'PA Vault Supply',
    price: 120,
    quantity: 'sold',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/clothes-jacket.png',
    description:
      'Lightweight shell jacket for late runs and restock nights. Sold out — request the next drop.',
  },
  {
    id: 6,
    slug: 'gold-lock-shorts',
    name: 'Gold Lock Shorts',
    brand: 'PA Vault Supply',
    price: 45,
    quantity: 3,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/clothes-shorts.png',
    description:
      'Summer shorts with subtle gold hardware detail. Low stock — act fast.',
  },
]

export function getClothingBySlug(slug: string): ClothingItem | undefined {
  return clothes.find((c) => c.slug === slug)
}

export function clothingImage(item: ClothingItem): string {
  return item.image ?? '/products/placeholder.png'
}

export function isClothingLowStock(item: ClothingItem): boolean {
  return typeof item.quantity === 'number' && item.quantity < 5
}
