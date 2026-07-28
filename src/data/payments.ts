/**
 * Update these links with your real payment handles / checkout URLs.
 */
export const paymentMethods = [
  {
    id: 'cashapp',
    label: 'Cash App',
    href: 'https://cash.app/',
    note: 'Pay with Cash App',
  },
  {
    id: 'applepay',
    label: 'Apple Pay',
    href: 'https://www.apple.com/apple-pay/',
    note: 'Pay with Apple Pay',
  },
  {
    id: 'googlepay',
    label: 'Google Pay',
    href: 'https://pay.google.com/',
    note: 'Pay with Google Pay (Android)',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    href: 'https://www.paypal.com/',
    note: 'Pay with PayPal',
  },
] as const
