'use client'

import { useEffect, useState } from 'react'
import { logTaxonomyEvent } from '@/analytics/logTaxonomyEvent'
import KartleggingssporsmalForm from './KartleggingssporsmalForm'
import KartleggingssporsmalFormSummaryPage from '../summary/KartleggingssporsmalFormSummaryPage'
import { KartleggingssporsmalFormResponse } from '@/services/meroppfolging/schemas/formSnapshotSchema'

interface Props {
  topContent: React.ReactNode
}

export default function KartleggingssporsmalFormPage({ topContent }: Props) {
  const [formReponse, setFormResponse] = useState<KartleggingssporsmalFormResponse | null>(null)

  useEffect(() => {
    logTaxonomyEvent({
      name: 'skjema åpnet',
      properties: {
        skjemanavn: 'Kartlegging av din situasjon',
        komponentId: 'kartlegging-av-din-situasjon',
      },
    })
  }, [])

  return formReponse ? (
    <KartleggingssporsmalFormSummaryPage formResponse={formReponse} />
  ) : (
    <>
      {topContent}

      <KartleggingssporsmalForm setSummaryItems={setFormResponse} />
    </>
  )
}
