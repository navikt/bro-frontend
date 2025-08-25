'use client'

import { formQuestionDefaults, formQuestions, formSchema } from '@/domain/form'
import { useAppForm } from '@/hooks/form'
import { BodyShort, Box, Button } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { useState } from 'react'
import { submitFormAction } from '@/actions/form/submitForm'

type Props = { alreadyAnswered: boolean }

export default function FormClient({ alreadyAnswered }: Props) {
  const [displaySummary, setDisplaySummary] = useState<boolean>(alreadyAnswered)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const form = useAppForm({
    defaultValues: formQuestionDefaults,
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitting(true)
        const res = await submitFormAction(value)
        if (res.ok) {
          setDisplaySummary(true)
        } else {
          console.error('Server validation failed', res.issues)
        }
      } catch (e) {
        console.error('Submission failed', e)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <>
      <h1>Din situasjon - behovsrettet oppfølging</h1>
      <BodyShort spacing>Hjelp oss med å kartlegge din oppfølging ved å svare på noen spørsmål.</BodyShort>

      {displaySummary && (
        <Box
          background="bg-subtle"
          padding="4"
          borderRadius="large"
          borderColor="border-subtle"
          borderWidth="1"
          className="mb-4"
        >
          <BodyShort spacing>Skjemaet er sendt inn. Takk for svarene dine.</BodyShort>
        </Box>
      )}

      {!displaySummary && (
        <Box background="bg-subtle" padding="6" borderRadius="large" borderColor="border-subtle" borderWidth="1">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <form.AppForm>
              <div className={'grid gap-4 mb-4'}>
                <form.AppField name="tilbakeTilJobb">
                  {(field) => <field.RadioGroup question={formQuestions['tilbakeTilJobb']} />}
                </form.AppField>
                <form.AppField name="relasjonTilArbeidsgiver">
                  {(field) => <field.RadioGroup question={formQuestions['relasjonTilArbeidsgiver']} />}
                </form.AppField>
                <form.AppField name="fravarslengde">
                  {(field) => <field.RadioGroup question={formQuestions['fravarslengde']} />}
                </form.AppField>
              </div>
              <Button type="submit" className="mt-4" onClick={() => form.handleSubmit()} disabled={submitting}>
                {submitting ? 'Sender…' : 'Send skjema'}
              </Button>
            </form.AppForm>
          </form>
        </Box>
      )}
    </>
  )
}
