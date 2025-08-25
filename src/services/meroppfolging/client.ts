import {
  formSnapshotResponseSchema,
  type FormSnapshotResponseDto,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'

const API_BASE = process.env.NEXT_PUBLIC_MEROPPFOLGING_API_BASE_URL

/**
 * Fetch the latest form snapshot from the external service.
 * Returns null if not found (404) or if API base is not configured.
 * Optionally accepts a Cookie header for SSR.
 */
export async function fetchLatestFormSnapshot(init?: { cookie?: string }): Promise<FormSnapshotResponseDto | null> {
  if (!API_BASE) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[meroppfolging] NEXT_PUBLIC_MEROPPFOLGING_API_BASE_URL is not set')
    }
    return null
  }

  const url = `${API_BASE.replace(/\/$/, '')}/form-snapshots/latest`

  const headers: HeadersInit = { Accept: 'application/json' }
  if (init?.cookie) {
    ;(headers as Record<string, string>)['Cookie'] = init.cookie
  }

  const res = await fetch(url, {
    method: 'GET',
    headers,
    credentials: 'include',
    cache: 'no-store',
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch form snapshot (${res.status})`)

  const json = await res.json()
  const parsed = formSnapshotResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid snapshot payload received from API')
  }
  return parsed.data
}
