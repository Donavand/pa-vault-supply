import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to the product grid (or page top) whenever the category/route changes. */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const scroll = () => {
      const targetId = hash.replace(/^#/, '') || 'vault'
      const el = document.getElementById(targetId)
      if (el && (hash || pathname !== '/')) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    // Wait a frame so the new category's product grid is in the DOM.
    const id = window.requestAnimationFrame(scroll)
    return () => window.cancelAnimationFrame(id)
  }, [pathname, search, hash])

  return null
}
