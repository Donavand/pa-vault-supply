import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getRestockedWaitlistItems,
  markWaitlistNotified,
  type RestockedItem,
} from '../lib/waitlist'

export default function RestockAlerts() {
  const [items, setItems] = useState<RestockedItem[]>([])

  useEffect(() => {
    const restocked = getRestockedWaitlistItems()
    if (restocked.length === 0) return

    setItems(restocked)
    markWaitlistNotified(restocked.map((item) => item.id))

    if ('Notification' in window && Notification.permission === 'granted') {
      for (const item of restocked.slice(0, 3)) {
        try {
          new Notification(`${item.name} is back`, {
            body: `${item.brand} · back in the vault`,
            icon: item.image || '/logo-mark.png',
          })
        } catch {
          // Ignore notification failures (unsupported environments).
        }
      }
    }
  }, [])

  if (items.length === 0) return null

  return (
    <div className="restock-toast" role="status" aria-live="polite">
      <div className="restock-toast-inner">
        <p className="restock-toast-eyebrow">Back in stock</p>
        <ul>
          {items.slice(0, 3).map((item) => (
            <li key={item.id}>
              <Link to={item.path} onClick={() => setItems([])}>
                <img src={item.image} alt="" />
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.brand} · available again</em>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {items.length > 3 && (
          <p className="restock-toast-more">
            +{items.length - 3} more from your alerts
          </p>
        )}
        <button
          type="button"
          className="restock-toast-dismiss"
          onClick={() => setItems([])}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
