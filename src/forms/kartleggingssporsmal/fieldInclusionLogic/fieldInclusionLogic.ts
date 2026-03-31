import type { FormVariant } from "../formVariants/formVariants";
import { getFieldsForVariantInOrder } from "../formVariants/formVariants";
import type { FormValues } from "../types/FormValues";
import type { KartleggingsspormalFormFieldId } from "../types/KartleggingsspormalFormFieldId";
import {
  isConditionalField,
  shouldAddConditionalFieldBasedOnFormValues,
} from "./conditionalFields";

function filterFieldsToInclude(
  fields: KartleggingsspormalFormFieldId[],
  formValues: FormValues<FormVariant>,
): KartleggingsspormalFormFieldId[] {
  return fields.filter((fieldId) => {
    // Skip check if this is not a conditional field.
    if (!isConditionalField(fieldId)) {
      return true;
    }

    return shouldAddConditionalFieldBasedOnFormValues(fieldId, formValues);
  });
}

/**
 * Returns the list of field IDs to include in the live form and the submitted
 * FormSnapshot for a given form variant and form values, in the order they
 * should appear.
 */
export function getFieldsToIncludeForVariant<T extends FormVariant>(
  formVariant: T,
  formValues: FormValues<T>,
): KartleggingsspormalFormFieldId[] {
  const fieldsForVariant = getFieldsForVariantInOrder(formVariant);

  return filterFieldsToInclude(fieldsForVariant, formValues);
}
