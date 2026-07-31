import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

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

type InventoryState = {
  products: SheetProduct[]
  loading: boolean
  error: string | null
  source: string | null
  updatedAt: string | null
  refresh: () => Promise<void>
  getProduct: (catalog: string, slug: string) => SheetProduct | undefined
  recordSale: (input: {
    catalog: string
    slug: string
    size?: string
    qty?: number
  }) => Promise<{ ok: boolean; remaining?: SheetQty; error?: string }>
}

const InventoryContext = createContext<InventoryState | null>(null)

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<SheetProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/inventory', { cache: 'no-store' })
      const data = (await res.json()) as {
        ok: boolean
        products?: SheetProduct[]
        error?: string
        source?: string
        updatedAt?: string
      }
      if (!data.ok) {
        setProducts([])
        setError(data.error ?? 'Inventory unavailable')
        setSource(data.source ?? null)
      } else {
        setProducts(data.products ?? [])
        setError(null)
        setSource(data.source ?? null)
        setUpdatedAt(data.updatedAt ?? null)
      }
    } catch {
      setProducts([])
      setError('Could not reach inventory API')
      setSource(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const getProduct = useCallback(
    (catalog: string, slug: string) =>
      products.find((p) => p.catalog === catalog && p.slug === slug),
    [products],
  )

  const recordSale = useCallback(
    async (input: {
      catalog: string
      slug: string
      size?: string
      qty?: number
    }) => {
      try {
        const res = await fetch('/api/sell', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })
        const data = (await res.json()) as {
          ok: boolean
          remaining?: SheetQty
          error?: string
        }
        if (data.ok) await refresh()
        return data
      } catch {
        return { ok: false, error: 'Sale tracking failed' }
      }
    },
    [refresh],
  )

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      source,
      updatedAt,
      refresh,
      getProduct,
      recordSale,
    }),
    [
      products,
      loading,
      error,
      source,
      updatedAt,
      refresh,
      getProduct,
      recordSale,
    ],
  )

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) {
    throw new Error('useInventory must be used within InventoryProvider')
  }
  return ctx
}

export function useSheetProduct(catalog: string, slug: string) {
  const { getProduct, loading, error, source } = useInventory()
  return { product: getProduct(catalog, slug), loading, error, source }
}

export function productsForCatalog(
  products: SheetProduct[],
  catalog: string,
): SheetProduct[] {
  return products.filter((p) => p.catalog === catalog)
}

export function isSheetSoldOut(product: SheetProduct): boolean {
  if (product.sizes.length > 0) {
    return product.sizes.every((s) => s.quantity === 'sold')
  }
  return product.quantity === 'sold' || product.quantity === 0
}

export function sheetTotalQty(product: SheetProduct): number | 'sold' {
  if (product.sizes.length > 0) {
    const nums = product.sizes
      .map((s) => s.quantity)
      .filter((q): q is number => typeof q === 'number')
    if (nums.length === 0) return 'sold'
    return nums.reduce((a, b) => a + b, 0)
  }
  return product.quantity ?? 'sold'
}
