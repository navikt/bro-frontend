'use client'

import {
  kartleggingsspormaFormQuestionDefaults,
  kartleggingsspormalFormQuestions,
  kartleggingssporsmalFormSchema,
} from '@/domain/kartleggingsspormaFormValues'
import { useAppForm } from '@/hooks/form'
import { BodyShort, Box, Button, Alert, Heading, Link } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { useState } from 'react'
import { submitFormAction } from '@/actions/form/submitForm'
import NextLink from 'next/link'
import { CONTACT_NAV_URL } from '@/constants'
import KartleggingssporsmalFormSummary, {
  type FormSummaryItem,
} from '@/features/kartleggingssporsmal/KartleggingssporsmalFormSummary'

type Props = { alreadyAnswered: boolean; initialSummaryItems?: FormSummaryItem[] | null }

export default function FormClient({ alreadyAnswered, initialSummaryItems }: Props) {
  const [displaySummary, setDisplaySummary] = useState<boolean>(alreadyAnswered)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [summaryItems, setSummaryItems] = useState<FormSummaryItem[] | null>(initialSummaryItems ?? null)
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false)

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
        const items: FormSummaryItem[] = [
          {
            label: kartleggingsspormalFormQuestions.hvorSannsynligTilbakeTilJobben.label,
            value:
              kartleggingsspormalFormQuestions.hvorSannsynligTilbakeTilJobben.options.find(
                (option) => option.id === value.hvorSannsynligTilbakeTilJobben,
              )?.label || value.hvorSannsynligTilbakeTilJobben,
          },
          {
            label: kartleggingsspormalFormQuestions.samarbeidOgRelasjonTilArbeidsgiver.label,
            value:
              kartleggingsspormalFormQuestions.samarbeidOgRelasjonTilArbeidsgiver.options.find(
                (option) => option.id === value.samarbeidOgRelasjonTilArbeidsgiver,
              )?.label || value.samarbeidOgRelasjonTilArbeidsgiver,
          },
          {
            label: kartleggingsspormalFormQuestions.naarTilbakeTilJobben.label,
            value:
              kartleggingsspormalFormQuestions.naarTilbakeTilJobben.options.find(
                (option) => option.id === value.naarTilbakeTilJobben,
              )?.label || value.naarTilbakeTilJobben,
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
      <h1>Kartlegging av din situasjon</h1>
      {displaySummary && (
        <>
          {justSubmitted && (
            <Alert variant="success" className="mb-4 max-w-3xl">
              Takk, svarene dine er sendt til Nav.
            </Alert>
          )}
          <Heading size="medium" level="2" spacing>
            Hva skjer videre
          </Heading>
          <BodyShort className="" spacing>
            Svarene dine gir Nav innsikt i hvordan vi skal følge deg opp fremover. Om vi ser behovet for tettere
            oppfølging enn det arbeidsgiveren din skal gi deg, vil du bli kontaktet av en Nav-veileder.
          </BodyShort>
          <BodyShort spacing>
            Du kan ta kontakt med oss på telefon 55 55 33 33 eller{' '}
            <Link as={NextLink} target="_blank" href={CONTACT_NAV_URL}>
              skriv til oss her på nav.no
            </Link>{' '}
            (åpner i ny fane) hvis det skulle være noe.{' '}
          </BodyShort>
          <KartleggingssporsmalFormSummary items={summaryItems} />
        </>
      )}

      {!displaySummary && (
        <>
          <BodyShort spacing>
            Siden du har vært sykmeldt en stund, ønsker vi å få bedre kjennskap til din situasjon ved at du svarer på
            disse tre spørsmålene.
          </BodyShort>
          <BodyShort spacing>Svarene dine gir Nav innsikt i hvordan vi kan følge deg opp fremover.</BodyShort>
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
                      <field.RadioGroup
                        question={kartleggingsspormalFormQuestions['samarbeidOgRelasjonTilArbeidsgiver']}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="naarTilbakeTilJobben">
                    {(field) => (
                      <field.RadioGroup question={kartleggingsspormalFormQuestions['naarTilbakeTilJobben']} />
                    )}
                  </form.AppField>
                </div>
                <Button type="submit" className="mt-4" onClick={() => form.handleSubmit()} disabled={submitting}>
                  {submitting ? 'Sender…' : 'Send skjema'}
                </Button>
              </form.AppForm>
            </form>
          </Box>
        </>
      )}
    </>
  )
}
