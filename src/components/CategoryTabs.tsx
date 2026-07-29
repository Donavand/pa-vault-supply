import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/colognes', label: 'Colognes' },
  { to: '/clothes', label: 'Clothes' },
  { to: '/bags', label: 'Bags' },
  { to: '/slides', label: 'Slides' },
  { to: '/airpods', label: 'AirPods' },
] as const

export default function CategoryTabs() {
  return (
    <div className="category-tabs" role="tablist" aria-label="Shop categories">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          role="tab"
          end={tab.to !== '/clothes'}
          className={({ isActive }) =>
            `category-tab${isActive ? ' is-active' : ''}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
