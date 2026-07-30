import { clothingQuantity, getClothingBySlug } from '../data/clothes'
import { getGearBySlug, type GearCategory } from '../data/gear'
import { getProductBySlug } from '../data/products'
import {
  getWomenBySlug,
  womenQuantity,
  type WomenSection,
} from '../data/women'

const STORAGE_KEY = 'pa-vault-restock-waitlist'

export type WaitlistKind =
  | 'cologne'
  | 'clothes'
  | 'women-clothes'
  | 'women-bags'
  | GearCategory

export type WaitlistEntry = {
  id: string
  kind: WaitlistKind
  slug: string
  name: string
  brand: string
  path: string
  image: string
  email: string
  subscribedAt: string
  notifiedAt?: string
}

export type RestockedItem = WaitlistEntry & {
  quantity: number
}

function readAll(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as WaitlistEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(entries: WaitlistEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function waitlistId(kind: WaitlistKind, slug: string): string {
  return `${kind}:${slug}`
}

export function isOnWaitlist(kind: WaitlistKind, slug: string): boolean {
  const id = waitlistId(kind, slug)
  return readAll().some((entry) => entry.id === id)
}

export function getWaitlistEntry(
  kind: WaitlistKind,
  slug: string,
): WaitlistEntry | undefined {
  const id = waitlistId(kind, slug)
  return readAll().find((entry) => entry.id === id)
}

export function addToWaitlist(
  entry: Omit<WaitlistEntry, 'id' | 'subscribedAt'>,
): WaitlistEntry {
  const next: WaitlistEntry = {
    ...entry,
    id: waitlistId(entry.kind, entry.slug),
    subscribedAt: new Date().toISOString(),
  }
  const others = readAll().filter((item) => item.id !== next.id)
  writeAll([...others, next])
  return next
}

export function removeFromWaitlist(kind: WaitlistKind, slug: string) {
  const id = waitlistId(kind, slug)
  writeAll(readAll().filter((entry) => entry.id !== id))
}

export function markWaitlistNotified(ids: string[]) {
  if (ids.length === 0) return
  const idSet = new Set(ids)
  const now = new Date().toISOString()
  writeAll(
    readAll().map((entry) =>
      idSet.has(entry.id) ? { ...entry, notifiedAt: now } : entry,
    ),
  )
}

function stockFor(entry: WaitlistEntry): number | 'sold' | null {
  if (entry.kind === 'cologne') {
    return getProductBySlug(entry.slug)?.quantity ?? null
  }
  if (entry.kind === 'clothes') {
    const item = getClothingBySlug(entry.slug)
    return item ? clothingQuantity(item) : null
  }
  if (entry.kind === 'women-clothes' || entry.kind === 'women-bags') {
    const section: WomenSection =
      entry.kind === 'women-clothes' ? 'clothes' : 'bags'
    const item = getWomenBySlug(section, entry.slug)
    return item ? womenQuantity(item) : null
  }
  return getGearBySlug(entry.kind, entry.slug)?.quantity ?? null
}

export function getRestockedWaitlistItems(): RestockedItem[] {
  return readAll().flatMap((entry) => {
    if (entry.notifiedAt) return []
    const quantity = stockFor(entry)
    if (typeof quantity !== 'number' || quantity <= 0) return []
    return [{ ...entry, quantity }]
  })
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
