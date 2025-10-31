'use client'

import {
  kartleggingssporsmalFormDefaults,
  kartleggingsspormalFormQuestions,
  kartleggingssporsmalFormSchema,
} from '@/forms/kartleggingssporsmalForm'
import { useAppForm } from '@/hooks/form'
import { Alert, Button, Heading } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { useState } from 'react'
import { NullableKartleggingssporsmalFormResponse } from '@/features/kartleggingssporsmal/KartleggingssporsmalLanding'
import { logger } from '@navikt/next-logger'
import { submitFormAction } from '@/services/meroppfolging/actions/submitFormAction'

type Props = {
  setSummaryItems: (data: NullableKartleggingssporsmalFormResponse) => void
}

export default function KartleggingssporsmalForm({ setSummaryItems }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<boolean>(false)

  const form = useAppForm({
    defaultValues: kartleggingssporsmalFormDefaults,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: kartleggingssporsmalFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError(false)
        setSubmitting(true)
        const formResponse = await submitFormAction(value)
        setSummaryItems(formResponse)
      } catch (e) {
        logger.error(`[Frontend] Feil ved innsending av kartleggingssporsmal: ${e}`)
        setSubmitError(true)
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
        <div className="grid gap-4 mb-4">
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

        {submitError && (
          <Alert className="mb-8 w-2xl" variant="error" role="alert">
            <Heading size="small" level="2">
              Beklager! Det har oppstått en uventet feil
            </Heading>
            Vi klarte ikke å sende inn svarene dine. Prøv igjen om litt.
          </Alert>
        )}

        <Button type="submit" className="mt-4" onClick={() => form.handleSubmit()} loading={submitting}>
          Send svarene til Nav
        </Button>
      </form.AppForm>
    </form>
  )
}
