export type StockUrgency = 'sold' | 'act-fast' | 'low' | null

/** Under 2 → Act fast; under 5 → Low stock. No exact counts shown. */
export function stockUrgency(
  quantity: number | 'sold' | null | undefined,
): StockUrgency {
  if (quantity === 'sold' || quantity === 0) return 'sold'
  if (typeof quantity !== 'number') return null
  if (quantity < 2) return 'act-fast'
  if (quantity < 5) return 'low'
  return null
}

export function stockUrgencyLabel(urgency: StockUrgency): string | null {
  if (urgency === 'act-fast') return 'Act fast'
  if (urgency === 'low') return 'Low stock'
  if (urgency === 'sold') return 'Sold out'
  return null
}
