'use server'

import {
  FormSnapshotRequest,
  KandidatStatusResponse,
  kandidatStatusResponseSchema,
  SubmitKartleggingssporsmalResponse,
  submitKartleggingssporsmalResponseSchema,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { KartleggingssporsmalForm, kartleggingssporsmalFormSchema } from '@/domain/kartleggingsspormaFormValues'
import { mapAppFormToSnapshot } from '@/utils/form'
import { logger } from '@navikt/next-logger'

export async function fetchKandidatStatus(): Promise<KandidatStatusResponse> {
  if (isLocalOrDemo) {
    return {
      isKandidat: true,
      formResponse: null, //kartleggingssporsmalFormResponseFixture,
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
    throw new Error('Invalid snapshot payload received from API', { cause: parsed.error })
  }
  return parsed.data
}

export async function submitFormAction(
  formValues: KartleggingssporsmalForm,
): Promise<SubmitKartleggingssporsmalResponse> {
  const parsed = kartleggingssporsmalFormSchema.safeParse(formValues)
  if (!parsed.success) {
    const issues = parsed.error.message
    throw new Error(issues)
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

  logger.info(`Submitting form snapshot to ${url}. Payload: ${JSON.stringify({ formSnapshot: parsed.data })}`)

  try {
    const res = await fetch(url, {
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
      throw new Error('Invalid response when submitting form', { cause: parsed.error })
    }
    logger.info(`Submitted form snapshot to ${url}. Payload: ${JSON.stringify(json)}`)
    return parsed.data
  } catch (e) {
    console.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify({ formSnapshot: parsed.data })}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
