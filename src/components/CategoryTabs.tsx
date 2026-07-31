import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/colognes#vault', label: 'Colognes', match: '/colognes' },
  { to: '/men/clothes#vault', label: 'Men', match: '/men' },
  { to: '/women/clothes#vault', label: 'Women', match: '/women' },
  { to: '/jerseys#vault', label: 'Jerseys', match: '/jerseys' },
  { to: '/slides#vault', label: 'Slides', match: '/slides' },
  { to: '/airpods#vault', label: 'AirPods', match: '/airpods' },
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
