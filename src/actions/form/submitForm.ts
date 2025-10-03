'use server'

import { formSchema } from '@/domain/formValues'
import { z } from 'zod/v4'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { FieldSnapshotRequest, fieldSnapshotsRequestSchema } from '@/services/meroppfolging/schemas/formSnapshotSchema'

export type FormSubmission = z.infer<typeof formSchema>

export async function submitFormAction(fieldSnapshots: FieldSnapshotRequest) {
  //await new Promise((resolve) => setTimeout(resolve, 2000))
  const parsed = fieldSnapshotsRequestSchema.safeParse(fieldSnapshots)
  if (!parsed.success) {
    const issues = parsed.error.message
    throw new Error(issues)
  }

  if (isLocalOrDemo) {
    return Promise.resolve()
  }

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv()
  const url = new URL('/api/v1/kartleggingssporsmal', MEROPPFOLGING_BACKEND_URL)

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)
  console.log('[server] Received form submission', parsed.data)

  try {
    console.log('fieldsnapshot: ', fieldSnapshots)
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formSnapshot: {
          formIdentifier: 'kartleggingsporsmal',
          formSemanticVersion: '1.0.0',
          formSnapshotVersion: '1.0.0',
          fieldSnapshots: fieldSnapshots,
        },
      }),
    })
  } catch (e) {
    console.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify({ formSnapshot: parsed.data })}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
