import { fetchKandidatStatus, fetchLatestFormSnapshot } from '@/services/meroppfolging/client'
import FormClient from './FormClient'
import type { FormSummaryItem } from '@/components/FormSummary'
import { formSnapshotResponseToSummaryItems } from '@/utils/form'

export default async function FormPage() {
  let lastestResponse = null
  let initialSummaryItems: FormSummaryItem[] | null = null

  try {
    const status = await fetchKandidatStatus()
    lastestResponse = status.formResponse?.formSnapshot
    if (lastestResponse) {
      initialSummaryItems = formSnapshotResponseToSummaryItems(lastestResponse)
    }
  } catch {}

  return <FormClient alreadyAnswered={!!lastestResponse} initialSummaryItems={initialSummaryItems} />
}
