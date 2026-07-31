import { Link, useSearchParams } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import WomenBrandTabs from '../components/WomenBrandTabs'
import WomenLineTabs from '../components/WomenLineTabs'
import {
  type WomenItem,
  type WomenSection,
  parseWomenBrand,
  womenForBrand,
  womenGroupedByBrand,
  womenImage,
  womenQuantity,
  womenSectionMeta,
} from '../data/women'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

type Props = {
  section: WomenSection
}

function ProductCard({
  item,
  base,
  index,
}: {
  item: WomenItem
  base: string
  index: number
}) {
  const urgency = stockUrgency(womenQuantity(item))
  const label = stockUrgencyLabel(urgency)
  const sold = urgency === 'sold'
  const low = urgency === 'low' || urgency === 'act-fast'

  return (
    <li style={{ animationDelay: `${0.04 * index}s` }}>
      <Link
        className={`product${sold ? ' product--sold' : ''}${low ? ' product--low' : ''}`}
        to={`${base}/${item.slug}`}
      >
        <span className="product-shot">
          <img src={womenImage(item)} alt="" loading="lazy" />
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
}

export default function WomenShop({ section }: Props) {
  const [params] = useSearchParams()
  const brand = parseWomenBrand(section, params.get('brand'))
  const meta = womenSectionMeta[section]
  const items = womenForBrand(section, brand)
  const groups = brand === 'all' ? womenGroupedByBrand(items) : null
  const base = `/women/${section}`
  const title =
    brand === 'all'
      ? meta.title
      : brand === 'alo'
        ? 'Women · Alo'
        : brand === 'lulu'
          ? 'Women · Lulu'
          : brand === 'coach'
            ? 'Women · Coach'
            : meta.title

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>{title}</h1>
          <p>{meta.lede}</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />
        <WomenLineTabs />
        <WomenBrandTabs section={section} />

        {items.length === 0 ? (
          <p className="vault-empty">Nothing in this drop yet — check back soon.</p>
        ) : groups ? (
          groups.map((group) => (
            <div key={group.brand} className="brand-group">
              <h2 className="brand-group-title">{group.brand}</h2>
              <ul className="product-grid">
                {group.items.map((item, i) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    base={base}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="product-grid">
            {items.map((item, i) => (
              <ProductCard key={item.id} item={item} base={base} index={i} />
            ))}
          </ul>
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
