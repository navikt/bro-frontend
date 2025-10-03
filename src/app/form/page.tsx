import { fetchKandidatStatus } from '@/services/meroppfolging/meroppfolging-service'
import FormClient from './FormClient'
import type { FormSummaryItem } from '@/components/FormSummary'
import { mapFormSnapshotResponseToSummaryItems } from '@/utils/form'

export default async function FormPage() {
  let lastestResponse = null
  let initialSummaryItems: FormSummaryItem[] | null = null

  try {
    const status = await fetchKandidatStatus()
    lastestResponse = status.formResponse?.formSnapshot
    if (lastestResponse) {
      initialSummaryItems = mapFormSnapshotResponseToSummaryItems(lastestResponse)
    }
  } catch {}

  return <FormClient alreadyAnswered={!!lastestResponse} initialSummaryItems={initialSummaryItems} />
}
