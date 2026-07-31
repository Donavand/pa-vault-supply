# Use your existing Google Sheet (no rebuild)

Sheet: https://docs.google.com/spreadsheets/d/1_7DxMpcep_AF2eU7iBtE2Lnsazq7pKk-E-XnPDk3ZtI

Keep your cologne tab and other product/price tabs as they are. The site reads that data; Apps Script lowers quantities on checkout.

## Already working

- Cologne tab quantities → site stock (via shared sheet / API)
- `.env.local` has your `INVENTORY_APPS_SCRIPT_URL`

## Required once (sell tracking + all tabs)

After any code change in Apps Script you must create a **new deployment** (old URL stays empty until you do).

1. Open sheet → **Extensions → Apps Script**
2. Replace all of `Code.gs` with `inventory/AppsScript.gs` from this repo → **Save**
3. Run **`setupSheet`** once (creates Sales log; does not wipe cologne data)
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. If the URL changed, update `.env.local` / Vercel:
   ```bash
   INVENTORY_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```
6. Restart `vercel dev`

### Check tabs (after redeploy)

Open in a browser:

`YOUR_WEB_APP_URL?action=tabs`

You should see every tab name and sample rows. Share that (or tab names) so clothes/bags/etc. can be wired the same way.

### Check catalog

`YOUR_WEB_APP_URL?action=catalog`

Should list cologne products (not `products: []`).

## Day to day

Edit quantities/prices in your normal tabs → refresh the site.
