import { useState } from 'react'
import { paymentMethods } from '../data/payments'
import { useInventory } from '../lib/inventory'

type Props = {
  catalog: string
  slug: string
  name: string
  size?: string | null
  unitPrice: number
  disabled?: boolean
}

export default function CheckoutButtons({
  catalog,
  slug,
  name,
  size,
  unitPrice,
  disabled,
}: Props) {
  const { recordSale } = useInventory()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handlePay(href: string) {
    if (disabled || busy) return
    setBusy(true)
    setMessage(null)
    const result = await recordSale({
      catalog,
      slug,
      size: size || '-',
      qty: 1,
    })
    setBusy(false)

    if (!result.ok) {
      setMessage(result.error ?? 'Could not reserve stock')
      return
    }

    if (result.remaining === 'sold' || result.remaining === 0) {
      setMessage(`${name} is now sold out in the sheet.`)
    } else if (result.ok) {
      setMessage('Stock updated.')
    }

    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="sheet-checkout">
      {message && <p className="notify-hint">{message}</p>}
      <ul className="pay-methods">
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <button
              type="button"
              className={`pay-btn pay-btn--${method.id}`}
              disabled={disabled || busy}
              onClick={() => void handlePay(method.href)}
            >
              <span>{busy ? 'Updating stock…' : method.label}</span>
              <span className="pay-btn-note">
                {method.note} · ${unitPrice}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
