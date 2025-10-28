'use server'

import {
  KandidatStatusResponse,
  kandidatStatusResponseSchema,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { logger } from '@navikt/next-logger'
import { isLocalOrDemo } from '@/env-variables/envHelpers'
import { getServerEnv } from '@/env-variables/serverEnv'

export async function fetchKandidatStatus(): Promise<KandidatStatusResponse> {
  if (isLocalOrDemo) {
    return {
      isKandidat: true,
      formResponse: null, //kartleggingssporsmalFormResponseFixture,
    }
  }

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv()
  const url = new URL('/api/v1/kartleggingssporsmal/kandidat-status', MEROPPFOLGING_BACKEND_URL)

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)

  try {
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()

    const parsed = kandidatStatusResponseSchema.safeParse(json)
    if (!parsed.success) {
      const formattedErrorText = `[backend] Parsing failed on url: ${url} with zod issues: ${parsed.error.issues}`
      logger.error(formattedErrorText)

      throw new Error('Invalid response when fetching kandidat status')
    }

    return parsed.data
  } catch (error) {
    logger.error(`[Backend] Failed to fetch from ${url}: with error: ${error}`)

    throw new Error(`Error on fetching kandidat status.`)
  }
}
