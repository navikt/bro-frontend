import { createFormHook } from '@tanstack/react-form'
import { createFormHookContexts } from '@tanstack/react-form'
import RadioGroup from '@/components/formComponents/RadioGroup'
import TextArea from '@/components/formComponents/TextArea'
import ErrorSummary from '@/components/ErrorSummary'

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: { RadioGroup, TextArea },
  formComponents: { ErrorSummary },
  fieldContext,
  formContext,
})
