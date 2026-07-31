import { NavLink, useSearchParams } from 'react-router-dom'
import { type ClothesLine } from '../data/clothes'

export type { ClothesLine }

export const clothesLines: { id: ClothesLine; label: string; to: string }[] = [
  { id: 'all', label: 'All', to: '/men/clothes#vault' },
  { id: 'hellstar', label: 'Hellstar', to: '/men/clothes?line=hellstar#vault' },
  { id: 'ee', label: 'EE', to: '/men/clothes?line=ee#vault' },
  { id: 'bape', label: 'Bape', to: '/men/clothes?line=bape#vault' },
  { id: 'alocs', label: 'ALOCS', to: '/men/clothes?line=alocs#vault' },
  {
    id: 'chrome-hearts',
    label: 'Chrome Hearts',
    to: '/men/clothes?line=chrome-hearts#vault',
  },
  {
    id: 'denim-tears',
    label: 'Denim Tears',
    to: '/men/clothes?line=denim-tears#vault',
  },
  { id: 'gs', label: 'GS', to: '/men/clothes?line=gs#vault' },
  {
    id: 'essentials',
    label: 'Essentials',
    to: '/men/clothes?line=essentials#vault',
  },
]

const lineIds = new Set(clothesLines.map((l) => l.id))

export function parseClothesLine(value: string | null): ClothesLine {
  if (value && lineIds.has(value as ClothesLine)) {
    return value as ClothesLine
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
      aria-label="Shop by brand"
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
