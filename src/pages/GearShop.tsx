import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import {
  type GearCategory,
  gearByCategory,
  gearImage,
  gearMeta,
  isGearLowStock,
} from '../data/gear'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

type Props = {
  category: GearCategory
}

export default function GearShop({ category }: Props) {
  const meta = gearMeta[category]
  const items = gearByCategory(category)
  const inStock = items.filter((c) => c.quantity !== 'sold')
  const soldOut = items.filter((c) => c.quantity === 'sold')
  const path = `/${category}`

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>{meta.title}</h1>
          <p>{meta.lede}</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />

        <ul className="product-grid">
          {inStock.map((item, i) => {
            const low = isGearLowStock(item)
            return (
              <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${low ? ' product--low' : ''}`}
                  to={`${path}/${item.slug}`}
                >
                  <span className="product-shot">
                    <img src={gearImage(item)} alt="" loading="lazy" />
                    {low && (
                      <span className="low-badge">
                        Only {item.quantity} left
                      </span>
                    )}
                  </span>
                  <span className="product-body">
                    <span className="product-meta">
                      <span className="product-id">#{item.id}</span>
                    </span>
                    <span className="product-brand">{item.brand}</span>
                    <span className="product-name">{item.name}</span>
                    {low && (
                      <span className="product-urgency">
                        Act fast — almost gone
                      </span>
                    )}
                    <span className="product-price">${item.price}</span>
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
              <p>Cleared pieces — open a page to request the next drop.</p>
            </div>
            <ul className="product-grid">
              {soldOut.map((item, i) => (
                <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                  <Link
                    className="product product--sold"
                    to={`${path}/${item.slug}`}
                  >
                    <span className="product-shot">
                      <img src={gearImage(item)} alt="" loading="lazy" />
                      <span className="sold-badge">Sold out</span>
                    </span>
                    <span className="product-body">
                      <span className="product-meta">
                        <span className="product-id">#{item.id}</span>
                      </span>
                      <span className="product-brand">{item.brand}</span>
                      <span className="product-name">{item.name}</span>
                      <span className="product-price">${item.price}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="contact" id="contact">
        <div className="section-head">
          <h2>Claim yours</h2>
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
