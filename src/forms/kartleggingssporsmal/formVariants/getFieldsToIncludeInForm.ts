import type { KartleggingsspormalFormFieldId } from "../fieldDefinitions/KartleggingsspormalFormFieldId";
import { formVariantConfigs } from "./formVariants";
import type { FormValuesForSchema } from "./types/FormValues";
import type { FormVariant } from "./types/FormVariant";
import type { SchemaForVariant } from "./types/SchemaForVariant";

export function getFieldIdsToIncludeInForm<T extends FormVariant>(
  formVariant: T,
  formValues: FormValuesForSchema<SchemaForVariant<T>>,
): KartleggingsspormalFormFieldId[] {
  const fieldsInOrderForVariant = formVariantConfigs[formVariant].fieldsInOrder;

  return fieldsInOrderForVariant
    .filter((fieldConfig) =>
      fieldConfig.conditionallyIncludeIf
        ? fieldConfig.conditionallyIncludeIf(formValues)
        : true,
    )
    .map((fieldConfig) => fieldConfig.fieldId);
}
