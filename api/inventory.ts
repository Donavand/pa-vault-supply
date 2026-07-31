import { loadCatalog } from './_lib/sheets'

export async function GET() {
  const data = await loadCatalog()
  return new Response(JSON.stringify(data), {
    status: data.ok ? 200 : 503,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
