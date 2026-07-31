import { NavLink, useSearchParams } from 'react-router-dom'
import {
  type WomenBrand,
  type WomenSection,
  parseWomenBrand,
  womenBrandTabs,
} from '../data/women'

type Props = {
  section: WomenSection
}

export default function WomenBrandTabs({ section }: Props) {
  const [params] = useSearchParams()
  const active = parseWomenBrand(section, params.get('brand'))
  const tabs = womenBrandTabs[section]

  if (tabs.length <= 1) return null

  return (
    <div
      className="clothes-line-tabs"
      role="tablist"
      aria-label="Shop by brand"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id
        const to =
          tab.id === 'all'
            ? `/women/${section}#vault`
            : `/women/${section}?brand=${tab.id}#vault`
        return (
          <NavLink
            key={tab.id}
            to={to}
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

export { parseWomenBrand }
export type { WomenBrand }
