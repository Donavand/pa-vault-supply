import { sellViaAppsScript } from './_lib/sheets'

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  let body: {
    catalog?: string
    slug?: string
    size?: string
    variant?: string
    qty?: number
  }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' })
  }

  const catalog = body.catalog?.trim() ?? ''
  const slug = body.slug?.trim() ?? ''
  const size = (body.size || body.variant || '-').trim() || '-'
  const qty = Math.max(1, Number(body.qty) || 1)

  if (!catalog || !slug) {
    return json(400, { ok: false, error: 'Missing catalog/slug' })
  }

  const result = await sellViaAppsScript({ catalog, slug, size, qty })
  const status = result.ok ? 200 : result.error === 'Sold out' || result.error === 'Not enough stock' ? 409 : 502
  return json(status, result)
}
