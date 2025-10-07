'use client'

import * as React from 'react'
import KartleggingssporsmalForm from './KartleggingssporsmalForm'
import KartleggingssporsmalFormSummary, { type FormSummaryItem } from '../summary/KartleggingssporsmalFormSummary'
import { type Dispatch, type SetStateAction } from 'react'
import { FieldSnapshotsResponse } from '@/services/meroppfolging/schemas/formSnapshotSchema'

type KartleggingssporsmalFormPageProps = {
  setSummaryItems: Dispatch<SetStateAction<FieldSnapshotsResponse | null>>
  setJustSubmitted: Dispatch<SetStateAction<boolean>>
}

export default function KartleggingssporsmalFormPage({
  setSummaryItems,
  setJustSubmitted,
}: KartleggingssporsmalFormPageProps) {
  return null
}
