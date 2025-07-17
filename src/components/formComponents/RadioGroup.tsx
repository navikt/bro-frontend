import React from 'react'
import { RadioGroup as AkselRadioGroup, Radio } from '@navikt/ds-react'
import { RadioGroupQuestion } from '@/services/meroppfolging/schemas/questionSchema'
import { useFieldContext } from '@/hooks/form'

export function RadioGroup({ question }: { question: RadioGroupQuestion }) {
  const field = useFieldContext<string>()

  return (
    <AkselRadioGroup
      legend={question.label}
      value={field.state.value}
      description={question.description}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      error={field.state.meta.errors[0]?.message}
    >
      {question.options.map((option) => (
        <Radio key={option.id} value={option.id}>
          {option.label}
        </Radio>
      ))}
    </AkselRadioGroup>
  )
}

export default RadioGroup
