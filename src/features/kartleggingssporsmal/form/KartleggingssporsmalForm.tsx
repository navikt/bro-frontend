'use client'

import {
  kartleggingsspormaFormQuestionDefaults,
  kartleggingsspormalFormQuestions,
  kartleggingssporsmalFormSchema,
} from '@/domain/kartleggingsspormaFormValues'
import { useAppForm } from '@/hooks/form'
import { Box, Button } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { submitFormAction } from '@/actions/form/submitForm'
import { mapAppFormToSnapshot, mapFormSnapshotToSummaryItems } from '@/utils/form'
import { type FormSummaryItem } from '@/features/kartleggingssporsmal/KartleggingssporsmalFormSummary'

type Props = {
  setSummaryItems: Dispatch<SetStateAction<FormSummaryItem[]>>
  setJustSubmitted: Dispatch<SetStateAction<boolean>>
}

export default function KartleggingssporsmalForm({ setSummaryItems, setJustSubmitted }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false)

  const form = useAppForm({
    defaultValues: kartleggingsspormaFormQuestionDefaults,
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onSubmit: kartleggingssporsmalFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitting(true)
        await submitFormAction(value)
        const fieldSnapshots = mapAppFormToSnapshot({ values: value })
        const summaryItems = mapFormSnapshotToSummaryItems(fieldSnapshots)
        setSummaryItems(summaryItems)
        setJustSubmitted(true)
      } catch (e) {
        console.error('Submission failed', e)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Box background="bg-subtle" padding="6" borderRadius="large" borderColor="border-subtle" borderWidth="1">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <form.AppForm>
          <div className={'grid gap-4 mb-4'}>
            <form.AppField name="hvorSannsynligTilbakeTilJobben">
              {(field) => (
                <field.RadioGroup question={kartleggingsspormalFormQuestions['hvorSannsynligTilbakeTilJobben']} />
              )}
            </form.AppField>
            <form.AppField name="samarbeidOgRelasjonTilArbeidsgiver">
              {(field) => (
                <field.RadioGroup question={kartleggingsspormalFormQuestions['samarbeidOgRelasjonTilArbeidsgiver']} />
              )}
            </form.AppField>
            <form.AppField name="naarTilbakeTilJobben">
              {(field) => <field.RadioGroup question={kartleggingsspormalFormQuestions['naarTilbakeTilJobben']} />}
            </form.AppField>
          </div>
          <Button type="submit" className="mt-4" onClick={() => form.handleSubmit()} disabled={submitting}>
            {submitting ? 'Sender…' : 'Send skjema'}
          </Button>
        </form.AppForm>
      </form>
    </Box>
  )
}
