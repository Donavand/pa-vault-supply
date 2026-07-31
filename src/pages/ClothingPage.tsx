import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CheckoutButtons from '../components/CheckoutButtons'
import NotifyRestock from '../components/NotifyRestock'
import {
  clothingImage,
  clothesLineForItem,
  clothesLinePath,
  firstAvailableSize,
  getClothingBySlug,
  unitClothingPrice,
} from '../data/clothes'
import { useSheetProduct } from '../lib/inventory'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

export default function ClothingPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getClothingBySlug(slug) : undefined
  const { product: sheetProduct } = useSheetProduct('men-clothes', slug ?? '')
  const [inCart, setInCart] = useState(false)
  const [size, setSize] = useState<string | null>(null)

  const mergedSizes = useMemo(() => {
    if (!item) return []
    if (sheetProduct?.sizes.length) {
      return sheetProduct.sizes.map((entry) => ({
        size: entry.size,
        quantity: entry.quantity,
      }))
    }
    return item.sizes
  }, [item, sheetProduct])

  if (!item) {
    return <Navigate to="/men/clothes" replace />
  }

  const selectedSize =
    size ??
    mergedSizes.find((entry) => typeof entry.quantity === 'number')?.size ??
    firstAvailableSize(item)
  const selectedQty = selectedSize
    ? (mergedSizes.find((entry) => entry.size === selectedSize)?.quantity ??
      null)
    : null
  const totalNums = mergedSizes
    .map((s) => s.quantity)
    .filter((q): q is number => typeof q === 'number')
  const totalQty = totalNums.length
    ? totalNums.reduce((a, b) => a + b, 0)
    : ('sold' as const)
  const sold = mergedSizes.every((entry) => entry.quantity === 'sold')
  const urgency = stockUrgency(
    typeof selectedQty === 'number' || selectedQty === 'sold'
      ? selectedQty
      : totalQty,
  )
  const label = stockUrgencyLabel(urgency)
  const unitPrice = sheetProduct?.price || unitClothingPrice(item)
  const line = clothesLineForItem(item)
  const backPath = `${clothesLinePath(line)}#vault`
  const name = sheetProduct?.name || item.name
  const brand = sheetProduct?.brand || item.brand
  const image = sheetProduct?.image || clothingImage(item)
  const description = sheetProduct?.description || item.description

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to={backPath}>
          ← Back to {line === 'all' ? 'clothes' : line}
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={image} alt={name} />
            {sold && <span className="sold-badge sold-badge--lg">Sold out</span>}
            {!sold && label && (
              <span
                className={`low-badge low-badge--lg${urgency === 'act-fast' ? ' low-badge--act' : ''}`}
              >
                {label}
              </span>
            )}
          </div>

          <div className="product-page-copy">
            <p className="product-page-brand">{brand}</p>
            <h1>{name}</h1>
            <p className="product-page-meta">
              <span className="product-page-category">{item.category}</span>
              <span>${unitPrice}</span>
            </p>

            {urgency === 'act-fast' && (
              <p className="urgency-banner">
                Act fast
                {selectedSize ? ` — size ${selectedSize} almost gone.` : ' — almost gone.'}
              </p>
            )}
            {urgency === 'low' && (
              <p className="urgency-banner">
                Low stock
                {selectedSize ? ` — size ${selectedSize} is limited.` : ' — limited pieces left.'}
              </p>
            )}

            <p className="product-page-desc">{description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind="clothes"
                  slug={item.slug}
                  name={name}
                  brand={brand}
                  path={`/men/clothes/${item.slug}`}
                  image={image}
                />
              ) : (
                <aside className="cart-panel cart-panel--compact">
                  <h2>Add to cart</h2>
                  <div className="cart-item">
                    <img src={image} alt="" />
                    <div>
                      <p className="cart-item-name">{name}</p>
                      <p className="cart-item-brand">{brand}</p>
                      <p className="cart-item-price">${unitPrice}</p>
                    </div>
                  </div>

                  <div className="size-picker">
                    <p className="size-picker-label">Size</p>
                    <div className="size-options">
                      {mergedSizes.map((entry) => {
                        const sizeSold = entry.quantity === 'sold'
                        const active = selectedSize === entry.size
                        return (
                          <button
                            key={entry.size}
                            type="button"
                            className={`size-option${active ? ' is-active' : ''}${sizeSold ? ' is-sold' : ''}`}
                            disabled={sizeSold}
                            onClick={() => {
                              setSize(entry.size)
                              setInCart(false)
                            }}
                          >
                            {entry.size}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`cart-add${inCart ? ' cart-add--done' : ''}`}
                    disabled={!selectedSize}
                    onClick={() => setInCart(true)}
                  >
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <div className={`cart-checkout${inCart ? ' is-open' : ''}`}>
                    <h3>Checkout</h3>
                    <p>
                      Size {selectedSize} · pay with any method below — stock
                      updates in your sheet.
                    </p>
                    <CheckoutButtons
                      catalog="men-clothes"
                      slug={item.slug}
                      name={name}
                      size={selectedSize}
                      unitPrice={unitPrice}
                      disabled={!selectedSize}
                    />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
