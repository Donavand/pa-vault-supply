type Body = {
  email?: string
  kind?: string
  slug?: string
  name?: string
  brand?: string
  path?: string
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' })
  }

  const email = body.email?.trim().toLowerCase() ?? ''
  const kind = body.kind?.trim() ?? ''
  const slug = body.slug?.trim() ?? ''
  const name = body.name?.trim() ?? ''
  const brand = body.brand?.trim() ?? ''
  const path = body.path?.trim() ?? ''

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: 'Invalid email' })
  }
  if (!kind || !slug || !name) {
    return json(400, { ok: false, error: 'Missing product fields' })
  }

  const payload = {
    email,
    kind,
    slug,
    name,
    brand,
    path,
    receivedAt: new Date().toISOString(),
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Restock alert: ${name} (${brand}) — ${email}`,
          ...payload,
        }),
      })
    } catch {
      // Still accept the signup if the webhook fails.
    }
  }

  console.log('[restock-notify]', payload)
  return json(200, { ok: true })
}
