import type { KartleggingsspormalFormFieldId } from "../../fieldDefinitions/KartleggingsspormalFormFieldId";
import type { FormValuesForSchema } from "../FormValues";
import { formVariantConfigs } from "../formVariantConfigs/formVariantConfigs";
import type { FormVariant } from "../formVariants";
import type { SchemaForVariant } from "../SchemaForVariant";

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
