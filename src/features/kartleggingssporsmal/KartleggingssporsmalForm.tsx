'use client'

import { formQuestionDefaults, formQuestions, formSchema } from '@/domain/formValues'
import { useAppForm } from '@/hooks/form'
import { Box, Button } from '@navikt/ds-react'
import { revalidateLogic } from '@tanstack/form-core'
import { useState } from 'react'
import { submitFormAction } from '@/actions/form/submitForm'
import { type FormSummaryItem } from '@/components/FormSummary'
import { mapAppFormToSnapshot, mapFormSnapshotResponseToSummaryItems } from '@/utils/form'

type Props = {
  alreadyAnswered: boolean
  setSummaryItems: Dispatch<SetStateAction<FormSummaryItem[]>>
  setJustSubmitted: Dispatch<SetStateAction<boolean>>
}

export default function FormClient({ alreadyAnswered, initialSummaryItems }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false)

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
        const fieldSnapshots = mapAppFormToSnapshot({ values: value })
        await submitFormAction(fieldSnapshots)
        const summaryItems = mapFormSnapshotResponseToSummaryItems(fieldSnapshots)
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
  )
}
