import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { paymentMethods } from '../data/payments'
import {
  getProductBySlug,
  isLowStock,
  priceForQty,
  productImage,
  startingPrice,
  tiersFor,
} from '../data/products'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  const [inCart, setInCart] = useState(false)

  if (!product) {
    return <Navigate to="/colognes" replace />
  }

  const sold = product.quantity === 'sold'
  const low = isLowStock(product)
  const estimate = priceForQty(product, 1)

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to="/colognes#vault">
          ← Back to colognes
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={productImage(product)} alt={product.name} />
            {sold && <span className="sold-badge sold-badge--lg">Sold out</span>}
            {low && (
              <span className="low-badge low-badge--lg">
                Only {product.quantity} left
              </span>
            )}
          </div>

          <div className="product-page-copy">
            <p className="product-page-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="product-page-meta">
              <span>#{product.id}</span>
              <span className={low ? 'meta-low' : undefined}>
                {sold
                  ? 'Sold out'
                  : low
                    ? `Only ${product.quantity} left`
                    : `${product.quantity} in vault`}
              </span>
              <span>{startingPrice(product)}</span>
            </p>

            {low && (
              <p className="urgency-banner">
                Act fast — fewer than 5 left in the vault.
              </p>
            )}

            <p className="product-page-desc">{product.description}</p>

            <div className="buy-row">
              <aside className="cart-panel cart-panel--compact">
                <h2>Add to cart</h2>
                <div className="cart-item">
                  <img src={productImage(product)} alt="" />
                  <div>
                    <p className="cart-item-name">{product.name}</p>
                    <p className="cart-item-brand">{product.brand}</p>
                    <p className="cart-item-price">
                      {estimate.total != null
                        ? `$${estimate.total.toLocaleString()}`
                        : 'DM for price'}
                    </p>
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
                  <p>Pay with any method below.</p>
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
                            {estimate.total != null
                              ? `${method.note} · $${estimate.total.toLocaleString()}`
                              : method.note}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="product-page-tiers">
                <h2>Pricing</h2>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Each</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiersFor(product)
                        .slice(0, 6)
                        .map((tier) => (
                          <tr key={String(tier.qty)}>
                            <td>{tier.qty}</td>
                            <td>
                              {tier.note
                                ? tier.note
                                : tier.total != null
                                  ? `$${tier.total.toLocaleString()}`
                                  : '—'}
                            </td>
                            <td>{tier.each != null ? `$${tier.each}` : '—'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
