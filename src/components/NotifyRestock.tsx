import { useState, type FormEvent } from 'react'
import {
  addToWaitlist,
  getWaitlistEntry,
  isOnWaitlist,
  isValidEmail,
  removeFromWaitlist,
  type WaitlistKind,
} from '../lib/waitlist'

type Props = {
  kind: WaitlistKind
  slug: string
  name: string
  brand: string
  path: string
  image: string
}

export default function NotifyRestock({
  kind,
  slug,
  name,
  brand,
  path,
  image,
}: Props) {
  const existing = getWaitlistEntry(kind, slug)
  const [email, setEmail] = useState(existing?.email ?? '')
  const [subscribed, setSubscribed] = useState(() => isOnWaitlist(kind, slug))
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [browserReady, setBrowserReady] = useState(
    () =>
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted' &&
      isOnWaitlist(kind, slug),
  )

  async function requestBrowserPermission() {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    if (Notification.permission === 'denied') return false
    const result = await Notification.requestPermission()
    return result === 'granted'
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const trimmed = email.trim().toLowerCase()
    if (!isValidEmail(trimmed)) {
      setError('Enter a valid email address.')
      return
    }

    setBusy(true)
    try {
      addToWaitlist({
        kind,
        slug,
        name,
        brand,
        path,
        image,
        email: trimmed,
      })

      void fetch('/api/restock-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          kind,
          slug,
          name,
          brand,
          path,
        }),
      }).catch(() => {
        // Local waitlist still works if the API is unavailable.
      })

      const granted = await requestBrowserPermission()
      setBrowserReady(granted)
      setSubscribed(true)
    } finally {
      setBusy(false)
    }
  }

  function handleUnsubscribe() {
    removeFromWaitlist(kind, slug)
    setSubscribed(false)
    setBrowserReady(false)
    setError(null)
  }

  if (subscribed) {
    return (
      <aside className="cart-panel cart-panel--compact notify-panel">
        <h2>You’re on the list</h2>
        <div className="cart-item">
          <img src={image} alt="" />
          <div>
            <p className="cart-item-name">{name}</p>
            <p className="cart-item-brand">{brand}</p>
            <p className="cart-item-price">Sold out</p>
          </div>
        </div>
        <p className="notify-copy">
          We’ll alert you when <strong>{name}</strong> is back in the vault
          {email ? (
            <>
              {' '}
              at <span className="notify-email">{email.trim().toLowerCase()}</span>
            </>
          ) : null}
          .
        </p>
        {browserReady && (
          <p className="notify-hint">Browser alerts enabled for this device.</p>
        )}
        <button
          type="button"
          className="cart-add cart-add--done"
          onClick={handleUnsubscribe}
        >
          Remove alert
        </button>
      </aside>
    )
  }

  return (
    <aside className="cart-panel cart-panel--compact notify-panel">
      <h2>Notify me</h2>
      <div className="cart-item">
        <img src={image} alt="" />
        <div>
          <p className="cart-item-name">{name}</p>
          <p className="cart-item-brand">{brand}</p>
          <p className="cart-item-price">Sold out</p>
        </div>
      </div>
      <p className="notify-copy">
        This drop is cleared. Leave your email and we’ll ping you when it’s back
        in stock.
      </p>
      <form className="notify-form" onSubmit={handleSubmit} noValidate>
        <label className="notify-label" htmlFor={`notify-email-${kind}-${slug}`}>
          Email
        </label>
        <input
          id={`notify-email-${kind}-${slug}`}
          className="notify-input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {error && <p className="notify-error">{error}</p>}
        <button type="submit" className="cart-add" disabled={busy}>
          {busy ? 'Saving…' : 'Notify me when available'}
        </button>
      </form>
    </aside>
  )
}
