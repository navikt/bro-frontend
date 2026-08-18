import type { KartleggingsspormalFormFieldId } from "../questions/allQuestions";
import {
  allKartleggingssporsmalQuestions,
  type Question,
} from "../questions/allQuestions";
import { formVariantConfigs } from "./formVariants";
import type { FormValuesForVariant } from "./types/FormValues";
import type { FormVariant } from "./types/FormVariant";

type RenderedField = {
  fieldId: KartleggingsspormalFormFieldId;
  isRequired: boolean;
  question: Question;
};

/**
 * Returns a list of RenderedField data for fields that should be included in
 * the form for a given form variant, given the current form values (to
 * evaluate conditionallyAddIf functions). The resulting list is in the
 * same order as the form fields are defined in the form variant config, which
 * is the order they should be rendered in the form and appear in the resulting
 * FormSnapshot.
 */
export function renderFieldsToIncludeInFormInOrder<T extends FormVariant>(
  formVariant: T,
  formValues: FormValuesForVariant<T>,
): Array<RenderedField> {
  const fieldsConfigForVariant = formVariantConfigs[formVariant].formFields;

  const filteredFieldsConfigForVariant = fieldsConfigForVariant.filter(
    (fieldConfig) =>
      fieldConfig.conditionallyAddIf
        ? fieldConfig.conditionallyAddIf(formValues)
        : true,
  );

  const renderedFields: RenderedField[] = filteredFieldsConfigForVariant.map(
    ({ fieldId, isRequired, someOptionsTriggerAdditionOfFritekstField }) => {
      const question = allKartleggingssporsmalQuestions[fieldId];

      const renderedField: RenderedField = {
        fieldId,
        isRequired,
        question: applyFritekstTriggerDescriptionsToQuestion(
          question,
          someOptionsTriggerAdditionOfFritekstField || false,
        ),
      };

      return renderedField;
    },
  );

  return renderedFields;
}

/**
 * For radio group questions where selecting an option can trigger the
 * addition of a fritekst field, appends each option's
 * descriptionWhenOptionTriggersAdditionOfTextFieldInVariant to its description,
 * typically to tell users upfront that elaborating is possible. The question is
 * left unchanged for other question types or when the trigger flag is not set
 * for this variant.
 */
function applyFritekstTriggerDescriptionsToQuestion(
  question: Question,
  someOptionsTriggerAdditionOfFritekstFieldInVariant: boolean,
): Question {
  if (
    question.type !== "RADIO_GROUP" ||
    !someOptionsTriggerAdditionOfFritekstFieldInVariant
  ) {
    return question;
  }

  return {
    ...question,
    options: question.options.map((option) => ({
      ...option,
      // Combine both descriptions if present, otherwise use whichever one is set.
      description:
        [
          option.description,
          option.descriptionWhenOptionTriggersAdditionOfTextFieldInVariant,
        ]
          .filter(Boolean)
          .join(" ") || undefined,
    })),
  };
}
