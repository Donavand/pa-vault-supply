import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotifyRestock from '../components/NotifyRestock'
import { paymentMethods } from '../data/payments'
import {
  type GearCategory,
  getGearBySlug,
  gearImage,
  gearQuantity,
  gearSizeSold,
} from '../data/gear'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

type Props = {
  category: GearCategory
  basePath?: string
}

export default function GearProductPage({ category, basePath }: Props) {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getGearBySlug(category, slug) : undefined
  const [inCart, setInCart] = useState(false)
  const [option, setOption] = useState<string | null>(null)

  if (!item) {
    return <Navigate to={basePath ?? `/${category}`} replace />
  }

  const qty = gearQuantity(item)
  const urgency = stockUrgency(qty)
  const label = stockUrgencyLabel(urgency)
  const sold = urgency === 'sold'
  const sizeOptions = item.sizes?.map((entry) => entry.size) ?? item.options ?? []
  const selected =
    option ??
    item.sizes?.find((entry) => typeof entry.quantity === 'number')?.size ??
    sizeOptions[0] ??
    null
  const path = basePath ?? `/${category}`

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to={`${path}#vault`}>
          ← Back to {category}
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={gearImage(item)} alt={item.name} />
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
            <p className="product-page-brand">{item.brand}</p>
            <h1>{item.name}</h1>
            <p className="product-page-meta">
              <span>From ${item.price}</span>
            </p>

            {urgency === 'act-fast' && (
              <p className="urgency-banner">Act fast — almost gone.</p>
            )}
            {urgency === 'low' && (
              <p className="urgency-banner">Low stock — limited pieces left.</p>
            )}

            <p className="product-page-desc">{item.description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind={category}
                  slug={item.slug}
                  name={item.name}
                  brand={item.brand}
                  path={`${path}/${item.slug}`}
                  image={gearImage(item)}
                />
              ) : (
                <aside className="cart-panel cart-panel--compact">
                  <h2>Add to cart</h2>
                  <div className="cart-item">
                    <img src={gearImage(item)} alt="" />
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-brand">{item.brand}</p>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                  </div>

                  {sizeOptions.length > 0 && (
                    <div className="size-picker">
                      <p className="size-picker-label">
                        {item.optionLabel ?? 'Option'}
                      </p>
                      <div className="size-options">
                        {sizeOptions.map((size) => {
                          const sizeSold = gearSizeSold(item, size)
                          return (
                            <button
                              key={size}
                              type="button"
                              className={`size-option${selected === size ? ' is-active' : ''}${sizeSold ? ' is-sold' : ''}`}
                              disabled={sizeSold}
                              onClick={() => {
                                setOption(size)
                                setInCart(false)
                              }}
                            >
                              {size}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className={`cart-add${inCart ? ' cart-add--done' : ''}`}
                    disabled={Boolean(selected && gearSizeSold(item, selected))}
                    onClick={() => setInCart(true)}
                  >
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <div className={`cart-checkout${inCart ? ' is-open' : ''}`}>
                    <h3>Checkout</h3>
                    <p>
                      {selected
                        ? `${item.optionLabel ?? 'Option'} ${selected} · `
                        : ''}
                      pay with any method below.
                    </p>
                    <ul className="pay-methods">
                      {paymentMethods.map((method) => (
                        <li key={method.id}>
                          <a
                            className={`pay-btn pay-btn--${method.id}`}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{method.label}</span>
                            <span className="pay-btn-note">
                              {method.note} · ${item.price}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
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
