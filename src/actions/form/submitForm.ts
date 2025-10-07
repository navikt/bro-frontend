'use server'

import { KartleggingssporsmalForm, kartleggingssporsmalFormSchema } from '@/domain/kartleggingsspormaFormValues'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'

export async function submitFormAction(formValues: KartleggingssporsmalForm) {
  //await new Promise((resolve) => setTimeout(resolve, 2000))
  const parsed = kartleggingssporsmalFormSchema.safeParse(formValues)
  if (!parsed.success) {
    const issues = parsed.error.message
    throw new Error(issues)
  }

  if (isLocalOrDemo) {
    return Promise.resolve()
  }

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv()
  const url = new URL('/api/v1/kartleggingssporsmal', MEROPPFOLGING_BACKEND_URL)
  try {
    console.log('fieldsnapshot: ', formData)
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
          fieldSnapshots: formData,
        },
      }),
    })
  } catch (e) {
    console.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify({ formSnapshot: parsed.data })}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
