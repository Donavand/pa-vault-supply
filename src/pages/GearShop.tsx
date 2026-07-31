import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import {
  type GearCategory,
  gearByCategory,
  gearImage,
  gearMeta,
  gearQuantity,
} from '../data/gear'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

type Props = {
  category: GearCategory
  basePath?: string
  title?: string
}

export default function GearShop({
  category,
  basePath,
  title,
}: Props) {
  const meta = gearMeta[category]
  const items = gearByCategory(category)
  const path = basePath ?? `/${category}`

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>{title ?? meta.title}</h1>
          <p>{meta.lede}</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />

        <ul className="product-grid">
          {items.map((item, i) => {
            const urgency = stockUrgency(gearQuantity(item))
            const label = stockUrgencyLabel(urgency)
            const sold = urgency === 'sold'
            const low = urgency === 'low' || urgency === 'act-fast'
            return (
              <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                <Link
                  className={`product${sold ? ' product--sold' : ''}${low ? ' product--low' : ''}`}
                  to={`${path}/${item.slug}`}
                >
                  <span className="product-shot">
                    <img src={gearImage(item)} alt="" loading="lazy" />
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
                    <span className="product-brand">{item.brand}</span>
                    <span className="product-name">{item.name}</span>
                    {urgency === 'act-fast' && (
                      <span className="product-urgency product-urgency--act">
                        Act fast
                      </span>
                    )}
                    <span className="product-price">${item.price}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
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
