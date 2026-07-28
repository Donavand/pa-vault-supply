import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { paymentMethods } from '../data/payments'
import {
  getClothingBySlug,
  clothingImage,
  isClothingLowStock,
} from '../data/clothes'

export default function ClothingPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getClothingBySlug(slug) : undefined
  const [inCart, setInCart] = useState(false)
  const [size, setSize] = useState<string | null>(null)

  if (!item) {
    return <Navigate to="/clothes" replace />
  }

  const sold = item.quantity === 'sold'
  const low = isClothingLowStock(item)
  const selectedSize = size ?? item.sizes[0]

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to="/clothes#vault">
          ← Back to clothes
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={clothingImage(item)} alt={item.name} />
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
                Act fast — fewer than 5 left in the vault.
              </p>
            )}

            <p className="product-page-desc">{item.description}</p>

            <div className="buy-row">
              <aside className="cart-panel cart-panel--compact">
                <h2>Add to cart</h2>
                <div className="cart-item">
                  <img src={clothingImage(item)} alt="" />
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-brand">{item.brand}</p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                </div>

                <div className="size-picker">
                  <p className="size-picker-label">Size</p>
                  <div className="size-options">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`size-option${selectedSize === s ? ' is-active' : ''}`}
                        onClick={() => {
                          setSize(s)
                          setInCart(false)
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

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
                    Size {selectedSize} · pay with any method below.
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
