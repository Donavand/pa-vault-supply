import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CheckoutButtons from '../components/CheckoutButtons'
import NotifyRestock from '../components/NotifyRestock'
import {
  type WomenSection,
  getWomenBySlug,
  womenImage,
  womenQuantity,
} from '../data/women'
import { useSheetProduct, type SheetQty } from '../lib/inventory'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

type Props = {
  section: WomenSection
}

function mergeQty(
  local: number | 'sold' | null | undefined,
  sheet: SheetQty | undefined,
): number | 'sold' | null {
  if (sheet !== undefined) return sheet
  return local ?? null
}

export default function WomenProductPage({ section }: Props) {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getWomenBySlug(section, slug) : undefined
  const catalog =
    section === 'accessories' ? 'women-accessories' : 'women-clothes'
  const { product: sheetProduct } = useSheetProduct(catalog, slug ?? '')
  const [inCart, setInCart] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)

  const mergedSizes = useMemo(() => {
    if (!item?.sizes?.length && !sheetProduct?.sizes.length) return null
    if (sheetProduct?.sizes.length) {
      return sheetProduct.sizes.map((entry) => ({
        size: entry.size,
        quantity: entry.quantity,
      }))
    }
    return item?.sizes ?? null
  }, [item, sheetProduct])

  if (!item && !sheetProduct) {
    return <Navigate to={`/women/${section}`} replace />
  }

  const name = sheetProduct?.name || item?.name || slug || ''
  const brand = sheetProduct?.brand || item?.brand || ''
  const price = sheetProduct?.price || item?.price || 0
  const description =
    sheetProduct?.description || item?.description || ''
  const image =
    sheetProduct?.image ||
    (item ? womenImage(item) : '/products/placeholder.png')

  const hasSizes = Boolean(mergedSizes?.length)
  const options = item?.options ?? []
  const selected = hasSizes
    ? (choice ??
      mergedSizes?.find((s) => typeof s.quantity === 'number')?.size ??
      null)
    : (choice ?? options[0] ?? null)

  const selectedQty = hasSizes && selected
    ? mergedSizes?.find((s) => s.size === selected)?.quantity ?? null
    : mergeQty(
        item ? womenQuantity(item) : null,
        sheetProduct?.quantity ?? undefined,
      )

  const sold = hasSizes
    ? Boolean(mergedSizes?.every((s) => s.quantity === 'sold'))
    : selectedQty === 'sold' || selectedQty === 0

  const urgency = stockUrgency(sold ? 'sold' : selectedQty)
  const label = stockUrgencyLabel(urgency)

  const backPath = `/women/${section}#vault`
  const waitlistKind =
    section === 'accessories'
      ? ('women-accessories' as const)
      : ('women-clothes' as const)

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to={backPath}>
          ← Back to women {section}
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
              <span className="product-page-category">{section}</span>
              <span>${price}</span>
            </p>

            {urgency === 'act-fast' && (
              <p className="urgency-banner">
                Act fast
                {hasSizes && selected
                  ? ` — size ${selected} almost gone.`
                  : ' — almost gone.'}
              </p>
            )}
            {urgency === 'low' && (
              <p className="urgency-banner">
                Low stock
                {hasSizes && selected
                  ? ` — size ${selected} is limited.`
                  : ' — limited pieces left.'}
              </p>
            )}

            <p className="product-page-desc">{description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind={waitlistKind}
                  slug={slug ?? ''}
                  name={name}
                  brand={brand}
                  path={`/women/${section}/${slug}`}
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
                      <p className="cart-item-price">${price}</p>
                    </div>
                  </div>

                  {hasSizes && mergedSizes && (
                    <div className="size-picker">
                      <p className="size-picker-label">Size</p>
                      <div className="size-options">
                        {mergedSizes.map((entry) => {
                          const sizeSold = entry.quantity === 'sold'
                          const active = selected === entry.size
                          return (
                            <button
                              key={entry.size}
                              type="button"
                              className={`size-option${active ? ' is-active' : ''}${sizeSold ? ' is-sold' : ''}`}
                              disabled={sizeSold}
                              onClick={() => {
                                setChoice(entry.size)
                                setInCart(false)
                              }}
                            >
                              {entry.size}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {!hasSizes && options.length > 0 && (
                    <div className="size-picker">
                      <p className="size-picker-label">
                        {item?.optionLabel ?? 'Option'}
                      </p>
                      <div className="size-options">
                        {options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`size-option${selected === opt ? ' is-active' : ''}`}
                            onClick={() => {
                              setChoice(opt)
                              setInCart(false)
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className={`cart-add${inCart ? ' cart-add--done' : ''}`}
                    disabled={hasSizes && !selected}
                    onClick={() => setInCart(true)}
                  >
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <div className={`cart-checkout${inCart ? ' is-open' : ''}`}>
                    <h3>Checkout</h3>
                    <p>
                      {selected
                        ? `${hasSizes ? 'Size' : (item?.optionLabel ?? 'Option')} ${selected} · `
                        : ''}
                      pay with any method below — stock updates in your sheet.
                    </p>
                    <CheckoutButtons
                      catalog={catalog}
                      slug={slug ?? ''}
                      name={name}
                      size={hasSizes ? selected : '-'}
                      unitPrice={price}
                      disabled={hasSizes && !selected}
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
