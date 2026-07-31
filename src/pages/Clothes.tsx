import { Link, useSearchParams } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import ClothesLineTabs, {
  parseClothesLine,
} from '../components/ClothesLineTabs'
import {
  type ClothesLine,
  type ClothingItem,
  clothingImage,
  clothingQuantity,
  clothesForLine,
  clothesGroupedByBrand,
  startingClothingPrice,
} from '../data/clothes'
import { stockUrgency, stockUrgencyLabel } from '../lib/stock'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

const lineCopy: Record<ClothesLine, { title: string; blurb: string }> = {
  all: {
    title: 'Men · Clothes',
    blurb: 'Shop by brand — Hellstar, EE, Bape, ALOCS, and more.',
  },
  hellstar: {
    title: 'Men · Hellstar',
    blurb: 'HS shorts and Hellstar tees from the vault.',
  },
  ee: {
    title: 'Men · EE',
    blurb: 'EE shorts — bone, camo, skyline, and more.',
  },
  bape: {
    title: 'Men · Bape',
    blurb: 'Bape tees — logos, chrome, Miami, and sakura.',
  },
  alocs: {
    title: 'Men · ALOCS',
    blurb: 'ALOCS tees from the vault.',
  },
  'chrome-hearts': {
    title: 'Men · Chrome Hearts',
    blurb: 'Chrome Hearts tees from the vault.',
  },
  'denim-tears': {
    title: 'Men · Denim Tears',
    blurb: 'DT shorts from the vault.',
  },
  gs: {
    title: 'Men · GS',
    blurb: 'GS shorts from the vault.',
  },
  essentials: {
    title: 'Men · Essentials',
    blurb: 'Essentials hoodies and pants.',
  },
}

function ProductCard({ item, index }: { item: ClothingItem; index: number }) {
  const urgency = stockUrgency(clothingQuantity(item))
  const label = stockUrgencyLabel(urgency)
  const sold = urgency === 'sold'
  const low = urgency === 'low' || urgency === 'act-fast'

  return (
    <li style={{ animationDelay: `${0.04 * index}s` }}>
      <Link
        className={`product${sold ? ' product--sold' : ''}${low ? ' product--low' : ''}`}
        to={`/men/clothes/${item.slug}`}
      >
        <span className="product-shot">
          <img src={clothingImage(item)} alt="" loading="lazy" />
          {low && label && (
            <span
              className={`low-badge${urgency === 'act-fast' ? ' low-badge--act' : ''}`}
            >
              {label}
            </span>
          )}
        </span>
        <span className="product-body">
          <span className="product-meta">
            {label ? (
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
            ) : (
              <span className="product-category-tag">{item.category}</span>
            )}
          </span>
          <span className="product-brand">{item.brand}</span>
          <span className="product-name">{item.name}</span>
          {urgency === 'act-fast' && (
            <span className="product-urgency product-urgency--act">
              Act fast
            </span>
          )}
          <span className="product-price">{startingClothingPrice(item)}</span>
        </span>
      </Link>
    </li>
  )
}

export default function Clothes() {
  const [params] = useSearchParams()
  const line = parseClothesLine(params.get('line'))
  const filtered = clothesForLine(line)
  const groups = line === 'all' ? clothesGroupedByBrand(filtered) : null
  const copy = lineCopy[line]

  return (
    <main id="top">
      <section className="category-banner">
        <div className="category-banner-inner">
          <Link className="back-link" to="/#shop">
            ← Home
          </Link>
          <h1>{copy.title}</h1>
          <p>{copy.blurb}</p>
        </div>
      </section>

      <section className="vault vault--category" id="vault">
        <CategoryTabs />
        <ClothesLineTabs />

        {filtered.length === 0 ? (
          <p className="empty-line">No pieces in this line yet.</p>
        ) : groups ? (
          groups.map((group) => (
            <div key={group.brand} className="brand-group">
              <h2 className="brand-group-title">{group.brand}</h2>
              <ul className="product-grid">
                {group.items.map((item, i) => (
                  <ProductCard key={item.id} item={item} index={i} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="product-grid">
            {filtered.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
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
