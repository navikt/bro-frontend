'use client'

import { formQuestionDefaults, FormQuestions } from '@/domain/form'
import { useAppForm } from '@/hooks/form'
import { BodyShort, Box, Button } from '@navikt/ds-react'

function FormPage() {
  const form = useAppForm({
    defaultValues: formQuestionDefaults,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <>
      <h1>Din situasjon - behovsrettet oppfølging</h1>
      <BodyShort spacing>Hjelp oss med å kartlegge din oppfølging ved å svare på noen spørsmål.</BodyShort>

      <Box background="bg-subtle" padding="6" borderRadius="large" borderColor="border-subtle" borderWidth="1">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className={'grid gap-4 mb-4'}>
            <form.AppField name="fullName">
              {(field) => <field.TextArea question={FormQuestions['fullName']} />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.TextArea question={FormQuestions['email']} />}
            </form.AppField>
            <form.AppField name="preferredContact">
              {(field) => <field.RadioGroup question={FormQuestions['preferredContact']} />}
            </form.AppField>
            <form.AppField name="contactTime">
              {(field) => <field.RadioGroup question={FormQuestions['contactTime']} />}
            </form.AppField>
          </div>
          <Button type="submit" className="mt-4" onClick={() => form.handleSubmit()}>
            Send skjema
          </Button>
        </form>
      </Box>
    </>
  )
}

export default FormPage
