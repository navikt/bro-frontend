import type { QuestionDefinition } from "../questionDefinitions/allQuestions";
import type { KartleggingsspormalFormFieldId } from "../questionDefinitions/KartleggingsspormalFormFieldId";
import { formVariantConfigs } from "./formVariants";
import type { FormValuesForVariant } from "./types/FormValues";
import type { FormVariant } from "./types/FormVariant";

type FieldData = {
  fieldId: KartleggingsspormalFormFieldId;
  questionDefinition: QuestionDefinition;
  isRequired: boolean;
};

export function getFieldsToIncludeInForm<T extends FormVariant>(
  formVariant: T,
  formValues: FormValuesForVariant<T>,
): Array<FieldData> {
  const fieldsConfigForVariant = formVariantConfigs[formVariant].formFields;

  const filteredByIncludeIf = fieldsConfigForVariant.filter((fieldConfig) =>
    fieldConfig.conditionallyIncludeIf
      ? fieldConfig.conditionallyIncludeIf(formValues)
      : true,
  );

  const mappedToFieldData = filteredByIncludeIf.map(
    ({ fieldId, questionDefinition, isRequired }) => ({
      fieldId,
      questionDefinition,
      isRequired,
    }),
  );

  return mappedToFieldData;
}
