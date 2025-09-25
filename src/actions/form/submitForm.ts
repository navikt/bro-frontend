'use server'

import { formSchema } from '@/domain/formValues'
import { z } from 'zod/v4'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { verifyUserLoggedIn } from '@/auth/rsc'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { mapAppFormToSnapshot } from '@/utils/form'

export type FormSubmission = z.infer<typeof formSchema>

export async function submitFormAction(payload: FormSubmission) {
  //await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network latency
  const parsed = formSchema.safeParse(payload)
  if (!parsed.success) {
    const issues = parsed.error.message
    throw new Error(issues)
  }

  if (isLocalOrDemo) {
    return Promise.resolve()
  }
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/kartleggingssporsmal`

  const idportenToken = await verifyUserLoggedIn()
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)
  console.log('[server] Received form submission', parsed.data)

  try {
    const payload = mapAppFormToSnapshot({ values: parsed.data })
    console.log('payload: ', payload)
    await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (e) {
    console.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify({ formSnapshot: parsed.data })}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
