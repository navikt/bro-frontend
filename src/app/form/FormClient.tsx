'use client'

import { formQuestionDefaults, formQuestions, formSchema } from '@/domain/formValues'
import { useAppForm } from '@/hooks/form'
import { BodyShort, Box, Button, Alert } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { useState } from 'react'
import { submitFormAction } from '@/actions/form/submitForm'
import FormSummary, { type FormSummaryItem } from '@/components/FormSummary'

type Props = { alreadyAnswered: boolean; initialSummaryItems?: FormSummaryItem[] | null }

export default function FormClient({ alreadyAnswered, initialSummaryItems }: Props) {
  const [displaySummary, setDisplaySummary] = useState<boolean>(alreadyAnswered)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [summaryItems, setSummaryItems] = useState<FormSummaryItem[] | null>(initialSummaryItems ?? null)
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false)

  const form = useAppForm({
    defaultValues: formQuestionDefaults,
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitting(true)
        const res = await submitFormAction(value)
        if (res.ok) {
          const items: FormSummaryItem[] = [
            {
              label: formQuestions.tilbakeTilJobb.label,
              value:
                formQuestions.tilbakeTilJobb.options.find((option) => option.id === value.tilbakeTilJobb)?.label ||
                value.tilbakeTilJobb,
            },
            {
              label: formQuestions.relasjonTilArbeidsgiver.label,
              value:
                formQuestions.relasjonTilArbeidsgiver.options.find(
                  (option) => option.id === value.relasjonTilArbeidsgiver,
                )?.label || value.relasjonTilArbeidsgiver,
            },
            {
              label: formQuestions.fravarslengde.label,
              value:
                formQuestions.fravarslengde.options.find((option) => option.id === value.fravarslengde)?.label ||
                value.fravarslengde,
            },
          ]
          setSummaryItems(items)
          setDisplaySummary(true)
          setJustSubmitted(true)
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
      <BodyShort spacing>
        Du har vært sykmeldt en stund, og vi ønsker å følge deg opp på best mulig måte. Derfor ber vi deg svare på tre
        korte spørsmål om din situasjon. Spørsmålene hjelper oss med å gi deg riktig støtte videre, og svarene dine blir
        sett av veilederen din ved ditt Nav-kontor.
      </BodyShort>

      {displaySummary && (
        <>
          {justSubmitted && (
            <Alert variant="success" className="mb-4 max-w-3xl">
              Skjemaet er sendt inn. Takk for svarene dine.
            </Alert>
          )}
          <FormSummary items={summaryItems} />
        </>
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
