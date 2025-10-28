import { createFormHook } from '@tanstack/react-form'
import { createFormHookContexts } from '@tanstack/react-form'
import RadioGroup from '@/components/form-components/RadioGroup'
import TextArea from '@/components/form-components/TextArea'

export const { fieldContext, useFieldContext, formContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: { RadioGroup, TextArea },
  formComponents: {},
  fieldContext,
  formContext,
})
