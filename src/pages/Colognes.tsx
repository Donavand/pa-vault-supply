import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import {
  products,
  productImage,
  startingPrice,
  tiersFor,
  isLowStock,
} from '../data/products'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

export default function Colognes() {
  const inStock = products.filter((p) => p.quantity !== 'sold')
  const soldOut = products.filter((p) => p.quantity === 'sold')

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>Colognes</h1>
          <p>Premium fragrance stock from the vault.</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />

        <ul className="product-grid">
          {inStock.map((product, i) => {
            const low = isLowStock(product)
            return (
              <li key={product.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${low ? ' product--low' : ''}`}
                  to={`/colognes/${product.slug}`}
                >
                  <span className="product-shot">
                    <img src={productImage(product)} alt="" loading="lazy" />
                    {low && (
                      <span className="low-badge">
                        Only {product.quantity} left
                      </span>
                    )}
                  </span>
                  <span className="product-body">
                    <span className="product-meta">
                      <span className="product-id">#{product.id}</span>
                    </span>
                    <span className="product-brand">{product.brand}</span>
                    <span className="product-name">{product.name}</span>
                    {low && (
                      <span className="product-urgency">
                        Act fast — only {product.quantity} left
                      </span>
                    )}
                    <span className="product-price">
                      {startingPrice(product)}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        {soldOut.length > 0 && (
          <div className="sold-block">
            <div className="section-head sold-head">
              <h2>Sold out</h2>
              <p>
                Same lineup — currently cleared. Open a page to get notified
                when it’s back.
              </p>
            </div>
            <ul className="product-grid">
              {soldOut.map((product, i) => (
                <li
                  key={product.id}
                  style={{ animationDelay: `${0.04 * i}s` }}
                >
                  <Link
                    className="product product--sold"
                    to={`/colognes/${product.slug}`}
                  >
                    <span className="product-shot">
                      <img src={productImage(product)} alt="" loading="lazy" />
                      <span className="sold-badge">Sold out</span>
                    </span>
                    <span className="product-body">
                      <span className="product-meta">
                        <span className="product-id">#{product.id}</span>
                      </span>
                      <span className="product-brand">{product.brand}</span>
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">
                        {startingPrice(product)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="pricing" id="pricing">
        <div className="section-head">
          <h2>Bulk pricing</h2>
          <p>Volume drops the unit price. Ask for 1k+ on Baccarat.</p>
        </div>
        <div className="price-panels">
          <div className="price-panel">
            <h3>Colognes</h3>
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
                  {tiersFor(products[0]).map((tier) => (
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
          <div className="price-panel">
            <h3>Louis Vuitton</h3>
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
                  {tiersFor(products[1]).map((tier) => (
                    <tr key={String(tier.qty)}>
                      <td>{tier.qty}</td>
                      <td>
                        {tier.total != null
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
      </section>

      <section className="contact" id="contact">
        <div className="section-head">
          <h2>Claim a bottle</h2>
          <p>Reach the vault on Instagram, Telegram, or Discord.</p>
        </div>
        <ul className="contact-links">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
