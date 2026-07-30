import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'clothes' as const, label: 'Clothes', to: '/men/clothes' },
  { id: 'bags' as const, label: 'Bags', to: '/men/bags' },
]

export default function MenLineTabs() {
  const { pathname } = useLocation()
  const active = pathname.includes('/men/bags') ? 'bags' : 'clothes'

  return (
    <div
      className="clothes-line-tabs"
      role="tablist"
      aria-label="Men categories"
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
