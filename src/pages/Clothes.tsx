import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import {
  clothes,
  clothingImage,
  isClothingLowStock,
} from '../data/clothes'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

export default function Clothes() {
  const inStock = clothes.filter((c) => c.quantity !== 'sold')
  const soldOut = clothes.filter((c) => c.quantity === 'sold')

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>Clothes</h1>
          <p>Tees, hoodies, cargos, and vault essentials.</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />

        <ul className="product-grid">
          {inStock.map((item, i) => {
            const low = isClothingLowStock(item)
            return (
              <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${low ? ' product--low' : ''}`}
                  to={`/clothes/${item.slug}`}
                >
                  <span className="product-shot">
                    <img src={clothingImage(item)} alt="" loading="lazy" />
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
                    to={`/clothes/${item.slug}`}
                  >
                    <span className="product-shot">
                      <img src={clothingImage(item)} alt="" loading="lazy" />
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
