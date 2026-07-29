import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotifyRestock from '../components/NotifyRestock'
import { paymentMethods } from '../data/payments'
import {
  clothingImage,
  clothingQuantity,
  clothesLineForItem,
  clothesLinePath,
  firstAvailableSize,
  getClothingBySlug,
  isClothingLowStock,
  isClothingSoldOut,
  sizeQuantity,
  unitClothingPrice,
} from '../data/clothes'

export default function ClothingPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getClothingBySlug(slug) : undefined
  const [inCart, setInCart] = useState(false)
  const [size, setSize] = useState<string | null>(null)

  if (!item) {
    return <Navigate to="/clothes" replace />
  }

  const sold = isClothingSoldOut(item)
  const selectedSize = size ?? firstAvailableSize(item)
  const selectedQty = selectedSize ? sizeQuantity(item, selectedSize) : null
  const sizeLow =
    typeof selectedQty === 'number' && selectedQty > 0 && selectedQty < 5
  const totalQty = clothingQuantity(item)
  const low = isClothingLowStock(item)
  const unitPrice = unitClothingPrice(item)
  const line = clothesLineForItem(item)
  const backPath = `${clothesLinePath(line)}#vault`

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <Link className="back-link" to={backPath}>
          ← Back to {line === 'all' ? 'clothes' : line}
        </Link>

        <div className="product-page-grid">
          <div className="product-page-shot">
            <img src={clothingImage(item)} alt={item.name} />
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
              <span className="product-page-category">{item.category}</span>
              <span>${unitPrice}</span>
            </p>

            {sizeLow && selectedSize && (
              <p className="urgency-banner">
                Act fast — only {selectedQty} left in size {selectedSize}.
              </p>
            )}

            <p className="product-page-desc">{item.description}</p>

            <div className="buy-row">
              {sold ? (
                <NotifyRestock
                  kind="clothes"
                  slug={item.slug}
                  name={item.name}
                  brand={item.brand}
                  path={`/clothes/${item.slug}`}
                  image={clothingImage(item)}
                />
              ) : (
                <aside className="cart-panel cart-panel--compact">
                  <h2>Add to cart</h2>
                  <div className="cart-item">
                    <img src={clothingImage(item)} alt="" />
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-brand">{item.brand}</p>
                      <p className="cart-item-price">${unitPrice}</p>
                    </div>
                  </div>

                  <div className="size-picker">
                    <p className="size-picker-label">Size</p>
                    <div className="size-options">
                      {item.sizes.map((entry) => {
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
                              {method.note} · ${unitPrice}
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
