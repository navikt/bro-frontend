'use client'

import {
  kartleggingsspormaFormQuestionDefaults,
  kartleggingsspormalFormQuestions,
  kartleggingssporsmalFormSchema,
} from '@/domain/kartleggingsspormaFormValues'
import { useAppForm } from '@/hooks/form'
import { Button } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { NullableKartleggingssporsmalFormResponse } from '@/features/kartleggingssporsmal/KartleggingssporsmalLanding'
import { submitFormAction } from '@/services/meroppfolging/meroppfolgingService'

type Props = {
  setSummaryItems: Dispatch<SetStateAction<NullableKartleggingssporsmalFormResponse>>
}

export default function KartleggingssporsmalForm({ setSummaryItems }: Props) {
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
        const formResponse = await submitFormAction(value)
        setSummaryItems(formResponse)
      } catch (e) {
        console.error('Submission failed', e)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      className="mt-8"
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
          {submitting ? 'Sender…' : 'Send svarene til Nav'}
        </Button>
      </form.AppForm>
    </form>
  )
}
