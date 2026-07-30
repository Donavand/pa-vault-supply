import { NavLink, useSearchParams } from 'react-router-dom'

export type ClothesLine = 'all' | 'hoodies' | 'pants' | 'essentials'

export const clothesLines = [
  { id: 'all' as const, label: 'All', to: '/men/clothes' },
  { id: 'hoodies' as const, label: 'Hoodies', to: '/men/clothes?line=hoodies' },
  { id: 'pants' as const, label: 'Pants', to: '/men/clothes?line=pants' },
  {
    id: 'essentials' as const,
    label: 'Essentials',
    to: '/men/clothes?line=essentials',
  },
]

export function parseClothesLine(value: string | null): ClothesLine {
  if (value === 'hoodies' || value === 'pants' || value === 'essentials') {
    return value
  }
  return 'all'
}

export default function ClothesLineTabs() {
  const [params] = useSearchParams()
  const active = parseClothesLine(params.get('line'))

  return (
    <div
      className="clothes-line-tabs"
      role="tablist"
      aria-label="Clothes lines"
    >
      {clothesLines.map((tab) => {
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
