# PA Vault Supply

Premium supply storefront for colognes, clothes, slides, and AirPods.

## Stack

- React + TypeScript
- Vite
- React Router
- Google Sheet inventory (products, prices, stock)

## Scripts

```bash
npm install
npm run dev
npm run build
```

Open `http://localhost:5173` after starting the dev server.

For inventory API routes locally, use:

```bash
npx vercel dev
```

## Shop

- **Men** — clothes
- **Women** — clothes (Alo sets, Essentials)
- **Colognes / Slides / AirPods**

## Inventory

Products, prices, and stock sync from this Google Sheet:

https://docs.google.com/spreadsheets/d/1_7DxMpcep_AF2eU7iBtE2Lnsazq7pKk-E-XnPDk3ZtI

Setup steps (Apps Script + Vercel env): see [`inventory/README.md`](inventory/README.md).

Checkout CTAs use Cash App, Apple Pay, Google Pay, and PayPal links in `src/data/payments.ts`. Clicking pay decrements sheet stock when Apps Script is connected.
