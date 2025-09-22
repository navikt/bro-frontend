import { fetchLatestFormSnapshot } from '@/services/meroppfolging/client'
import FormClient from './FormClient'
import type { FormSummaryItem } from '@/components/FormSummary'
import { formSnapshotResponseToSummaryItems } from '@/utils/form'

export default async function FormPage() {
  let alreadyAnswered = false
  let initialSummaryItems: FormSummaryItem[] | null = null

  try {
    const snapshot = await fetchLatestFormSnapshot()
    alreadyAnswered = Boolean(snapshot && snapshot.fieldSnapshots.length > 0)
    if (snapshot) {
      initialSummaryItems = formSnapshotResponseToSummaryItems(snapshot)
    }
  } catch {}

  return <FormClient alreadyAnswered={alreadyAnswered} initialSummaryItems={initialSummaryItems} />
}
