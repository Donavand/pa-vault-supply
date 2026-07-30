import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/colognes', label: 'Colognes', match: '/colognes' },
  { to: '/men/clothes', label: 'Men', match: '/men' },
  { to: '/women/clothes', label: 'Women', match: '/women' },
  { to: '/slides', label: 'Slides', match: '/slides' },
  { to: '/airpods', label: 'AirPods', match: '/airpods' },
] as const

export default function CategoryTabs() {
  const { pathname } = useLocation()

  return (
    <div className="category-tabs" role="tablist" aria-label="Shop categories">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.match || pathname.startsWith(`${tab.match}/`)
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            role="tab"
            aria-selected={isActive}
            className={`category-tab${isActive ? ' is-active' : ''}`}
          >
            {tab.label}
          </NavLink>
        )
      })}
    </div>
  )
}
