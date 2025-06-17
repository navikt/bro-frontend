'use client'

import { formQuestionDefaults, FormQuestions } from '@/domain/form'
import { useAppForm } from '@/hooks/form'

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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <form.AppField name={'fullName'}>
          {(field) => <field.TextArea question={FormQuestions['fullName']} />}
        </form.AppField>
        <form.AppField name="preferredContact">
          {(field) => <field.RadioGroup question={FormQuestions['preferredContact']} />}
        </form.AppField>
        <button type="submit" onClick={() => form.handleSubmit()}>
          Submit
        </button>
      </form>
    </>
  )
}

export default FormPage
