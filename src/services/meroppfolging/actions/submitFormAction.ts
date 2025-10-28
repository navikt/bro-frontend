'use server'

import { kartleggingssporsmalFormSchema } from '@/forms/kartleggingssporsmalForm'
import {
  FormSnapshotRequest,
  SubmitKartleggingssporsmalResponse,
  submitKartleggingssporsmalResponseSchema,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { mapAppFormToSnapshot } from '@/utils/kartleggingssporsmalForm'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { logger } from '@navikt/next-logger'
import { isLocalOrDemo } from '@/env-variables/envHelpers'
import { getServerEnv } from '@/env-variables/serverEnv'

export async function submitFormAction(formValues: unknown): Promise<SubmitKartleggingssporsmalResponse> {
  const parsed = kartleggingssporsmalFormSchema.safeParse(formValues)
  if (!parsed.success) {
    logger.error(`[Backend] Failed to parse kartleggingsspørsmål on post with error: ${parsed.error.issues}`)
    throw new Error('Invalid form values when submitting kartleggingssporsmal form')
  }

  const fieldSnapshots = mapAppFormToSnapshot({ values: parsed.data })

  if (isLocalOrDemo) {
    return {
      formSnapshot: { fieldSnapshots: fieldSnapshots },
      createdAt: new Date(),
    }
  }

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv()
  const url = new URL('/api/v1/kartleggingssporsmal', MEROPPFOLGING_BACKEND_URL)

  const payload: FormSnapshotRequest = {
    formSnapshot: {
      formIdentifier: 'kartleggingsporsmal',
      formSemanticVersion: '1.0.0',
      formSnapshotVersion: '1.0.0',
      fieldSnapshots: fieldSnapshots,
    },
  }

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const json = await res.json()

    const parsed = submitKartleggingssporsmalResponseSchema.safeParse(json)
    if (!parsed.success) {
      const formattedErrorText = `[backend] Parsing failed on url: ${url} with zod issues: ${parsed.error.issues}`
      logger.error(formattedErrorText)

      throw new Error('Invalid response when posting kartleggingssporsmal form')
    }

    return parsed.data
  } catch (error) {
    logger.error(`[Backend] Failed to fetch from ${url}: with error: ${error}`)

    throw new Error(`Error on posting kartleggingssporsmal form.`)
  }
}
