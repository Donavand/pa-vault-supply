import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CheckoutButtons from '../components/CheckoutButtons'
import NotifyRestock from '../components/NotifyRestock'
import {
  getProductBySlug,
  priceForQty,
  productImage,
  startingPrice,
  unitPrice,
} from '../data/products'
import { useSheetProduct } from '../lib/inventory'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const base = slug ? getProductBySlug(slug) : undefined
  const { product: sheetProduct } = useSheetProduct('colognes', slug ?? '')

  const [inCart, setInCart] = useState(false)

  if (!base) {
    return <Navigate to="/colognes" replace />
  }

  const product =
    sheetProduct?.quantity != null
      ? { ...base, quantity: sheetProduct.quantity }
      : base

  const urgency = stockUrgency(product.quantity)
  const label = stockUrgencyLabel(urgency)
  const sold = urgency === 'sold'
  const estimate = priceForQty(product, 1)
  const payPrice = unitPrice(product) ?? estimate.each ?? 0

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
            {!sold && label && (
              <span
                className={`low-badge low-badge--lg${urgency === 'act-fast' ? ' low-badge--act' : ''}`}
              >
                {label}
              </span>
            )}
          </div>

          <div className="product-page-copy">
            <p className="product-page-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="product-page-meta">
              <span>{startingPrice(product)}</span>
            </p>

            {urgency === 'act-fast' && (
              <p className="urgency-banner">Act fast — almost gone.</p>
            )}
            {urgency === 'low' && (
              <p className="urgency-banner">Low stock — limited pieces left.</p>
            )}

            <p className="product-page-desc">{product.description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind="cologne"
                  slug={product.slug}
                  name={product.name}
                  brand={product.brand}
                  path={`/colognes/${product.slug}`}
                  image={productImage(product)}
                />
              ) : (
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
                    <p>
                      Pay with any method below — stock updates in your sheet.
                    </p>
                    <CheckoutButtons
                      catalog="colognes"
                      slug={product.slug}
                      name={product.name}
                      unitPrice={payPrice}
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
