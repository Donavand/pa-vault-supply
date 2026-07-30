import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import WomenLineTabs from '../components/WomenLineTabs'
import {
  type WomenSection,
  isWomenLowStock,
  isWomenSoldOut,
  womenBySection,
  womenImage,
  womenQuantity,
  womenSectionMeta,
} from '../data/women'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

type Props = {
  section: WomenSection
}

export default function WomenShop({ section }: Props) {
  const meta = womenSectionMeta[section]
  const items = womenBySection(section)
  const inStock = items.filter((item) => !isWomenSoldOut(item))
  const soldOut = items.filter((item) => isWomenSoldOut(item))
  const base = `/women/${section}`

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
        <WomenLineTabs />

        <ul className="product-grid">
          {inStock.map((item, i) => {
            const low = isWomenLowStock(item)
            const qty = womenQuantity(item)
            return (
              <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${low ? ' product--low' : ''}`}
                  to={`${base}/${item.slug}`}
                >
                  <span className="product-shot">
                    <img src={womenImage(item)} alt="" loading="lazy" />
                    {low && typeof qty === 'number' && (
                      <span className="low-badge">Only {qty} left</span>
                    )}
                  </span>
                  <span className="product-body">
                    <span className="product-meta">
                      <span className="product-id">#{item.id}</span>
                    </span>
                    <span className="product-brand">{item.brand}</span>
                    <span className="product-name">{item.name}</span>
                    {low && typeof qty === 'number' && (
                      <span className="product-urgency">
                        Act fast — only {qty} left
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
              <p>Cleared pieces — open a page to get notified when it’s back.</p>
            </div>
            <ul className="product-grid">
              {soldOut.map((item, i) => (
                <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                  <Link
                    className="product product--sold"
                    to={`${base}/${item.slug}`}
                  >
                    <span className="product-shot">
                      <img src={womenImage(item)} alt="" loading="lazy" />
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
          <h2>Claim a piece</h2>
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
