import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import {
  products,
  productImage,
  startingPrice,
  tiersFor,
  type Product,
} from '../data/products'
import { useInventory } from '../lib/inventory'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

function withSheetQty(
  product: Product,
  sheetQty: number | 'sold' | null | undefined,
): Product {
  if (sheetQty === undefined || sheetQty === null) return product
  return { ...product, quantity: sheetQty }
}

export default function Colognes() {
  const { getProduct } = useInventory()
  const live = products.map((p) =>
    withSheetQty(p, getProduct('colognes', p.slug)?.quantity),
  )

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
          {live.map((product, i) => {
            const urgency = stockUrgency(product.quantity)
            const label = stockUrgencyLabel(urgency)
            const sold = urgency === 'sold'
            const low = urgency === 'low' || urgency === 'act-fast'
            return (
              <li key={product.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${sold ? ' product--sold' : ''}${low ? ' product--low' : ''}`}
                  to={`/colognes/${product.slug}`}
                >
                  <span className="product-shot">
                    <img src={productImage(product)} alt="" loading="lazy" />
                    {low && label && (
                      <span
                        className={`low-badge${urgency === 'act-fast' ? ' low-badge--act' : ''}`}
                      >
                        {label}
                      </span>
                    )}
                  </span>
                  <span className="product-body">
                    {label && (
                      <span className="product-meta">
                        <span
                          className={`product-qty${
                            sold
                              ? ' product-qty--sold'
                              : urgency === 'act-fast'
                                ? ' product-qty--act'
                                : ' product-qty--low'
                          }`}
                        >
                          {label}
                        </span>
                      </span>
                    )}
                    <span className="product-brand">{product.brand}</span>
                    <span className="product-name">{product.name}</span>
                    {urgency === 'act-fast' && (
                      <span className="product-urgency product-urgency--act">
                        Act fast
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
