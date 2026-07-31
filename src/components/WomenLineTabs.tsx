import { NavLink, useLocation } from 'react-router-dom'
import type { WomenSection } from '../data/women'

const tabs: { id: WomenSection; label: string; to: string }[] = [
  { id: 'clothes', label: 'Clothes', to: '/women/clothes#vault' },
  {
    id: 'accessories',
    label: 'Accessories',
    to: '/women/accessories#vault',
  },
]

export default function WomenLineTabs() {
  const { pathname } = useLocation()
  const active: WomenSection = pathname.includes('/women/accessories')
    ? 'accessories'
    : 'clothes'

  return (
    <div
      className="clothes-line-tabs"
      role="tablist"
      aria-label="Women categories"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <NavLink
            key={tab.id}
            to={tab.to}
            role="tab"
            aria-selected={isActive}
            className={`clothes-line-tab${isActive ? ' is-active' : ''}`}
          >
            {tab.label}
          </NavLink>
        )
      })}
    </div>
  )
}
