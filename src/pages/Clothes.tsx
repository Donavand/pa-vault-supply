import { Link, useSearchParams } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import ClothesLineTabs, {
  parseClothesLine,
} from '../components/ClothesLineTabs'
import MenLineTabs from '../components/MenLineTabs'
import {
  clothingImage,
  clothingQuantity,
  clothesForLine,
  isClothingLowStock,
  isClothingSoldOut,
  startingClothingPrice,
} from '../data/clothes'

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

const lineCopy: Record<string, { title: string; blurb: string }> = {
  all: {
    title: 'Men · Clothes',
    blurb: 'Hoodies, pants, essentials shorts, and tees.',
  },
  hoodies: {
    title: 'Men · Hoodies',
    blurb: 'Stretch limo and oatmeal hoodies from the vault.',
  },
  pants: {
    title: 'Men · Pants',
    blurb: 'Uncuffed oat and stretch limo pants.',
  },
  essentials: {
    title: 'Men · Essentials',
    blurb: 'Essentials shorts and tees — core vault staples.',
  },
}

export default function Clothes() {
  const [params] = useSearchParams()
  const line = parseClothesLine(params.get('line'))
  const filtered = clothesForLine(line)
  const inStock = filtered.filter((c) => !isClothingSoldOut(c))
  const soldOut = filtered.filter((c) => isClothingSoldOut(c))
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
        <MenLineTabs />
        <ClothesLineTabs />

        {inStock.length === 0 && soldOut.length === 0 ? (
          <p className="empty-line">No pieces in this line yet.</p>
        ) : (
          <ul className="product-grid">
            {inStock.map((item, i) => {
              const low = isClothingLowStock(item)
              const qty = clothingQuantity(item)
              return (
                <li key={item.id} style={{ animationDelay: `${0.04 * i}s` }}>
                  <Link
                    className={`product${low ? ' product--low' : ''}`}
                    to={`/men/clothes/${item.slug}`}
                  >
                    <span className="product-shot">
                      <img src={clothingImage(item)} alt="" loading="lazy" />
                      {low && typeof qty === 'number' && (
                        <span className="low-badge">Only {qty} left</span>
                      )}
                    </span>
                    <span className="product-body">
                      <span className="product-meta">
                        <span className="product-id">#{item.id}</span>
                        <span className="product-category-tag">
                          {item.category}
                        </span>
                      </span>
                      <span className="product-brand">{item.brand}</span>
                      <span className="product-name">{item.name}</span>
                      {low && typeof qty === 'number' && (
                        <span className="product-urgency">
                          Act fast — only {qty} left
                        </span>
                      )}
                      <span className="product-price">
                        {startingClothingPrice(item)}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

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
                    to={`/men/clothes/${item.slug}`}
                  >
                    <span className="product-shot">
                      <img src={clothingImage(item)} alt="" loading="lazy" />
                      <span className="sold-badge">Sold out</span>
                    </span>
                    <span className="product-body">
                      <span className="product-meta">
                        <span className="product-id">#{item.id}</span>
                        <span className="product-category-tag">
                          {item.category}
                        </span>
                      </span>
                      <span className="product-brand">{item.brand}</span>
                      <span className="product-name">{item.name}</span>
                      <span className="product-price">
                        {startingClothingPrice(item)}
                      </span>
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
