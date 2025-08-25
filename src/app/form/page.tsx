import { headers } from 'next/headers'
import { fetchLatestFormSnapshot } from '@/services/meroppfolging/client'
import FormClient from './FormClient'

export const dynamic = 'force-dynamic'

export default async function FormPage() {
  const hdrs = await headers()
  const cookie = hdrs.get('cookie') ?? undefined

  let alreadyAnswered = false
  try {
    const snapshot = await fetchLatestFormSnapshot({ cookie })
    alreadyAnswered = Boolean(snapshot && snapshot.fieldSnapshots.length > 0)
  } catch {}

  return <FormClient alreadyAnswered={alreadyAnswered} />
}
