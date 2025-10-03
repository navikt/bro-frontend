import {
  KandidatStatusResponse,
  kandidatStatusResponseSchema,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'

export async function fetchKandidatStatus(): Promise<KandidatStatusResponse> {
  if (isLocalOrDemo) {
    return {
      isKandidat: true,
      formResponse: null,
    }
  }

  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/kartleggingssporsmal/kandidat-status`

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)

  const res = await fetch(path, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()
  const parsed = kandidatStatusResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid snapshot payload received from API')
  }
  return parsed.data
}
