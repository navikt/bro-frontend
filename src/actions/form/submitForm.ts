'use server'

import { formSchema } from '@/domain/form'
import { z } from 'zod/v4'

export type FormSubmission = z.infer<typeof formSchema>

export async function submitFormAction(payload: FormSubmission) {
  const parsed = formSchema.safeParse(payload)
  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors
    return { ok: false, issues }
  }

  // TODO: Persist to a DB or call an API here
  // Example placeholder logic
  console.log('[server] Received form submission', parsed.data)

  return { ok: true }
}
