'use client'

import { mapFormSnapshotToSummaryItems } from '@/utils/form'
import NoAccessInformation from '@/features/no-access/NoAccess'
import { FieldSnapshotsResponse, KandidatStatusResponse } from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { useState } from 'react'
import KartleggingssporsmalFormSummary from '@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummary'
import KartleggingssporsmalFormPage from '@/features/kartleggingssporsmal/form/KartleggingssporsmalFormPage'

export default function KartleggingssporsmalLanding({ kandidatStatus }: { kandidatStatus: KandidatStatusResponse }) {
  const fieldSnapshots = kandidatStatus.formResponse?.formSnapshot.fieldSnapshots || null
  const [formValues, setFormValues] = useState<FieldSnapshotsResponse | null>(fieldSnapshots)
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false)

  if (kandidatStatus.isKandidat === false) {
    return <NoAccessInformation />
  }

  if (formValues && formValues?.length > 0) {
    const summaryItems = mapFormSnapshotToSummaryItems(formValues)
    return <KartleggingssporsmalFormSummary items={summaryItems} />
  }

  return <KartleggingssporsmalFormPage setSummaryItems={setFormValues} setJustSubmitted={setJustSubmitted} />
}
