'use client'

import NoAccessInformation from '@/features/no-access/NoAccess'
import {
  KandidatStatusResponse,
  KartleggingssporsmalFormResponse,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { useState } from 'react'
import KartleggingssporsmalFormPage from '@/features/kartleggingssporsmal/form/KartleggingssporsmalFormPage'
import KartleggingssporsmalFormSummaryPage from '@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummaryPage'

export type NullableKartleggingssporsmalFormResponse = KartleggingssporsmalFormResponse | null

export default function KartleggingssporsmalLanding({ kandidatStatus }: { kandidatStatus: KandidatStatusResponse }) {
  const [formValues, setFormValues] = useState<NullableKartleggingssporsmalFormResponse>(null)

  if (kandidatStatus.isKandidat === false) {
    return <NoAccessInformation />
  }

  const formResponse = kandidatStatus.formResponse || formValues

  if (formResponse) {
    return <KartleggingssporsmalFormSummaryPage formResponse={formResponse} />
  }

  return <KartleggingssporsmalFormPage setSummaryItems={setFormValues} />
}
