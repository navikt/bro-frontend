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
        await submitFormAction(value)
        const items: FormSummaryItem[] = [
          {
            label: formQuestions.hvorSannsynligTilbakeTilJobben.label,
            value:
              formQuestions.hvorSannsynligTilbakeTilJobben.options.find(
                (option) => option.id === value.hvorSannsynligTilbakeTilJobben,
              )?.label || value.hvorSannsynligTilbakeTilJobben,
          },
          {
            label: formQuestions.samarbeidOgRelasjonTilArbeidsgiver.label,
            value:
              formQuestions.samarbeidOgRelasjonTilArbeidsgiver.options.find(
                (option) => option.id === value.samarbeidOgRelasjonTilArbeidsgiver,
              )?.label || value.samarbeidOgRelasjonTilArbeidsgiver,
          },
          {
            label: formQuestions.naarTilbakeTilJobben.label,
            value:
              formQuestions.naarTilbakeTilJobben.options.find((option) => option.id === value.naarTilbakeTilJobben)
                ?.label || value.naarTilbakeTilJobben,
          },
        ]
        setSummaryItems(items)
        setDisplaySummary(true)
        setJustSubmitted(true)
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
                <form.AppField name="hvorSannsynligTilbakeTilJobben">
                  {(field) => <field.RadioGroup question={formQuestions['hvorSannsynligTilbakeTilJobben']} />}
                </form.AppField>
                <form.AppField name="samarbeidOgRelasjonTilArbeidsgiver">
                  {(field) => <field.RadioGroup question={formQuestions['samarbeidOgRelasjonTilArbeidsgiver']} />}
                </form.AppField>
                <form.AppField name="naarTilbakeTilJobben">
                  {(field) => <field.RadioGroup question={formQuestions['naarTilbakeTilJobben']} />}
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
