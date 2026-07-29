import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotifyRestock from '../components/NotifyRestock'
import { paymentMethods } from '../data/payments'
import {
  type GearCategory,
  getGearBySlug,
  gearImage,
  isGearLowStock,
} from '../data/gear'

type Props = {
  category: GearCategory
}

export default function GearProductPage({ category }: Props) {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getGearBySlug(category, slug) : undefined
  const [inCart, setInCart] = useState(false)
  const [option, setOption] = useState<string | null>(null)

  if (!item) {
    return <Navigate to={`/${category}`} replace />
  }

  const sold = item.quantity === 'sold'
  const low = isGearLowStock(item)
  const options = item.options ?? []
  const selected = option ?? options[0] ?? null
  const path = `/${category}`

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
            {low && (
              <span className="low-badge low-badge--lg">
                Only {item.quantity} left
              </span>
            )}
          </div>

          <div className="product-page-copy">
            <p className="product-page-brand">{item.brand}</p>
            <h1>{item.name}</h1>
            <p className="product-page-meta">
              <span>#{item.id}</span>
              <span className={low ? 'meta-low' : undefined}>
                {sold
                  ? 'Sold out'
                  : low
                    ? `Only ${item.quantity} left`
                    : `${item.quantity} in vault`}
              </span>
              <span>${item.price}</span>
            </p>

            {low && (
              <p className="urgency-banner">
                Act fast — only {item.quantity} left in the vault.
              </p>
            )}

            <p className="product-page-desc">{item.description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind={category}
                  slug={item.slug}
                  name={item.name}
                  brand={item.brand}
                  path={`/${category}/${item.slug}`}
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

                  {options.length > 0 && (
                    <div className="size-picker">
                      <p className="size-picker-label">
                        {item.optionLabel ?? 'Option'}
                      </p>
                      <div className="size-options">
                        {options.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`size-option${selected === s ? ' is-active' : ''}`}
                            onClick={() => {
                              setOption(s)
                              setInCart(false)
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className={`cart-add${inCart ? ' cart-add--done' : ''}`}
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
