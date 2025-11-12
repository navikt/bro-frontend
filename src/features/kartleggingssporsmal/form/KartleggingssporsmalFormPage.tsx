'use client'

import { useState } from 'react'
import KartleggingssporsmalForm from './KartleggingssporsmalForm'
import KartleggingssporsmalFormSummaryPage from '../summary/KartleggingssporsmalFormSummaryPage'
import { KartleggingssporsmalFormResponse } from '@/services/meroppfolging/schemas/formSnapshotSchema'

interface Props {
  topContent: React.ReactNode
}

export default function KartleggingssporsmalFormPage({ topContent }: Props) {
  const [formReponse, setFormResponse] = useState<KartleggingssporsmalFormResponse | null>(null)

  return formReponse ? (
    <KartleggingssporsmalFormSummaryPage formResponse={formReponse} />
  ) : (
    <>
      {topContent}

      <KartleggingssporsmalForm setSummaryItems={setFormResponse} />
    </>
  )
}
