import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import CheckboxGroup from "@/components/form-components/CheckboxGroup";
import RadioGroup from "@/components/form-components/RadioGroup";
import TextArea from "@/components/form-components/TextArea";

export const { fieldContext, useFieldContext, formContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: { RadioGroup, TextArea, CheckboxGroup },
  formComponents: {},
  fieldContext,
  formContext,
});
