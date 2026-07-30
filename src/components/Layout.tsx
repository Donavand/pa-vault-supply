import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import RestockAlerts from './RestockAlerts'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const closeMenu = () => setMenuOpen(false)
  const menActive = pathname.startsWith('/men')
  const womenActive = pathname.startsWith('/women')

  return (
    <div className="site is-ready">
      <div className="atmosphere" aria-hidden="true" />
      <RestockAlerts />

      <header className="nav">
        <Link className="nav-brand" to="/" onClick={closeMenu}>
          <img src="/logo-mark.png" alt="" width={36} height={36} />
          <span>
            <em>PA</em>VAULTSUPPLY
          </span>
        </Link>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`nav-links${menuOpen ? ' is-open' : ''}`}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/colognes"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            Colognes
          </NavLink>
          <NavLink
            to="/men/clothes"
            onClick={closeMenu}
            className={menActive ? 'is-active' : undefined}
          >
            Men
          </NavLink>
          <NavLink
            to="/women/clothes"
            onClick={closeMenu}
            className={womenActive ? 'is-active' : undefined}
          >
            Women
          </NavLink>
          <NavLink
            to="/slides"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            Slides
          </NavLink>
          <NavLink
            to="/airpods"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            AirPods
          </NavLink>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <img src="/logo-mark.png" alt="" width={48} height={48} />
        <p>
          <em>PA</em>VAULTSUPPLY
        </p>
        <p className="footer-note">Colognes, clothes & vault gear.</p>
      </footer>
    </div>
  )
}
