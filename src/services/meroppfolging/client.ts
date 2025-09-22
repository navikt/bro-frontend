import { FormSnapshotResponseDto } from '@/services/meroppfolging/schemas/formSnapshotSchema'

/**
 * Fetch the latest form snapshot from the external service.
 * Returns null if not found (404) or if API base is not configured.
 * Optionally accepts a Cookie header for SSR.
 */
export async function fetchLatestFormSnapshot(): Promise<FormSnapshotResponseDto | null> {
  return null //createFormSnapshotResponseDto()

  // const res = await fetch('TODO', {
  //   method: 'GET',
  //   credentials: 'include',
  //   cache: 'no-store',
  // })
  //
  // const json = await res.json()
  // const parsed = formSnapshotResponseSchema.safeParse(json)
  // if (!parsed.success) {
  //   throw new Error('Invalid snapshot payload received from API')
  // }
  // return parsed.data
}
