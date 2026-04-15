import type { KartleggingsspormalFormFieldId } from "../questions/allQuestions";
import {
  allKartleggingssporsmalQuestions,
  type Question,
} from "../questions/allQuestions";
import { formVariantConfigs } from "./formVariants";
import type { FormValuesForVariant } from "./types/FormValues";
import type { FormVariant } from "./types/FormVariant";

type FieldData = {
  fieldId: KartleggingsspormalFormFieldId;
  question: Question;
  isRequired: boolean;
};

/**
 * Returns a list of FieldData for fields that should be included in the form
 * for a given form variant, given the current form values (to
 * evaluate conditionallyIncludeIf functions). The resulting list is in the
 * same order as the form fields are defined in the form variant config, which
 * is the order they should be rendered in the form and appear in the resulting
 * FormSnapshot.
 */
export function getFieldsToIncludeInFormInOrder<T extends FormVariant>(
  formVariant: T,
  formValues: FormValuesForVariant<T>,
): Array<FieldData> {
  const fieldsConfigForVariant = formVariantConfigs[formVariant].formFields;

  const filteredByIncludeIf = fieldsConfigForVariant.filter((fieldConfig) =>
    fieldConfig.conditionallyIncludeIf
      ? fieldConfig.conditionallyIncludeIf(formValues)
      : true,
  );

  const mappedToFieldData: FieldData[] = filteredByIncludeIf.map(
    ({ fieldId, isRequired }) => ({
      fieldId,
      question: allKartleggingssporsmalQuestions[fieldId],
      isRequired,
    }),
  );

  return mappedToFieldData;
}
