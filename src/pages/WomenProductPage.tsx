import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotifyRestock from '../components/NotifyRestock'
import { paymentMethods } from '../data/payments'
import {
  type WomenSection,
  firstAvailableWomenSize,
  getWomenBySlug,
  isWomenLowStock,
  isWomenSoldOut,
  womenImage,
  womenQuantity,
  womenSizeQuantity,
} from '../data/women'

type Props = {
  section: WomenSection
}

export default function WomenProductPage({ section }: Props) {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getWomenBySlug(section, slug) : undefined
  const [inCart, setInCart] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)

  if (!item) {
    return <Navigate to={`/women/${section}`} replace />
  }

  const sold = isWomenSoldOut(item)
  const hasSizes = Boolean(item.sizes?.length)
  const options = item.options ?? []
  const selected = hasSizes
    ? (choice ?? firstAvailableWomenSize(item))
    : (choice ?? options[0] ?? null)
  const selectedQty = hasSizes && selected
    ? womenSizeQuantity(item, selected)
    : null
  const sizeLow =
    typeof selectedQty === 'number' && selectedQty > 0 && selectedQty < 5
  const totalQty = womenQuantity(item)
  const low = isWomenLowStock(item)
  const backPath = `/women/${section}#vault`
  const waitlistKind = section === 'clothes' ? 'women-clothes' : 'women-bags'

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to={backPath}>
          ← Back to women {section}
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={womenImage(item)} alt={item.name} />
            {sold && <span className="sold-badge sold-badge--lg">Sold out</span>}
            {!sold && low && typeof totalQty === 'number' && (
              <span className="low-badge low-badge--lg">
                Only {totalQty} left
              </span>
            )}
          </div>

          <div className="product-page-copy">
            <p className="product-page-brand">{item.brand}</p>
            <h1>{item.name}</h1>
            <p className="product-page-meta">
              <span>#{item.id}</span>
              <span className="product-page-category">{section}</span>
              <span>${item.price}</span>
            </p>

            {sizeLow && selected && (
              <p className="urgency-banner">
                Act fast — only {selectedQty} left in size {selected}.
              </p>
            )}

            <p className="product-page-desc">{item.description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind={waitlistKind}
                  slug={item.slug}
                  name={item.name}
                  brand={item.brand}
                  path={`/women/${section}/${item.slug}`}
                  image={womenImage(item)}
                />
              ) : (
                <aside className="cart-panel cart-panel--compact">
                  <h2>Add to cart</h2>
                  <div className="cart-item">
                    <img src={womenImage(item)} alt="" />
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-brand">{item.brand}</p>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                  </div>

                  {hasSizes && item.sizes && (
                    <div className="size-picker">
                      <p className="size-picker-label">Size</p>
                      <div className="size-options">
                        {item.sizes.map((entry) => {
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
                        {item.optionLabel ?? 'Option'}
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
                        ? `${hasSizes ? 'Size' : (item.optionLabel ?? 'Option')} ${selected} · `
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
