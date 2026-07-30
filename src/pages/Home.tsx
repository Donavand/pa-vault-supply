import { Link } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'

const categories = [
  {
    to: '/colognes',
    label: 'Colognes',
    copy: 'Premium fragrance stock from the vault.',
    image: '/products/baccarat.png',
  },
  {
    to: '/men/clothes',
    label: 'Men',
    copy: 'Men’s clothes and bags from the vault.',
    image: '/products/stretch-limo-hoodie.png',
  },
  {
    to: '/women/clothes',
    label: 'Women',
    copy: 'Women’s clothes and bags from the vault.',
    image: '/products/women-cropped-hoodie.png',
  },
  {
    to: '/slides',
    label: 'Slides',
    copy: 'Comfort slides in black, bone, and gold.',
    image: '/products/slides-black.png',
  },
  {
    to: '/airpods',
    label: 'AirPods',
    copy: 'Apple AirPods Pro, Max, and more.',
    image: '/products/airpods-pro.png',
  },
] as const

const socials = [
  { label: 'Instagram', href: '#contact' },
  { label: 'Telegram', href: '#contact' },
  { label: 'Discord', href: '#contact' },
]

export default function Home() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-visual">
          <div className="hero-logo-frame">
            <img
              className="hero-logo"
              src="/logo-mark.png"
              alt="PA Vault Supply"
              width={420}
              height={420}
            />
          </div>
        </div>
        <div className="hero-copy">
          <p className="brand-lockup">
            <em>PA</em> VAULT SUPPLY
          </p>
          <h1>Unlock the vault.</h1>
          <p className="lede">
            Colognes, clothes, bags, slides, and AirPods — shop the supply and
            checkout your way.
          </p>
          <div className="cta-row">
            <a className="cta-primary" href="#shop">
              Shop categories
            </a>
            <a className="cta-secondary" href="#contact">
              Message us
            </a>
          </div>
        </div>
      </section>

      <section className="vault" id="shop">
        <div className="section-head">
          <h2>Shop the vault</h2>
          <p>Pick a category and dig in.</p>
        </div>

        <CategoryTabs />

        <ul className="category-grid">
          {categories.map((cat, i) => (
            <li key={cat.to} style={{ animationDelay: `${0.05 * i}s` }}>
              <Link className="category-card" to={cat.to}>
                <span className="category-card-shot">
                  <img src={cat.image} alt="" loading="lazy" />
                </span>
                <span className="category-card-body">
                  <span className="category-card-label">{cat.label}</span>
                  <span className="category-card-copy">{cat.copy}</span>
                  <span className="category-card-cta">Shop {cat.label} →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact" id="contact">
        <div className="section-head">
          <h2>Get in touch</h2>
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
