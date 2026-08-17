import type { KartleggingsspormalFormFieldId } from "../questions/allQuestions";
import {
  allKartleggingssporsmalQuestions,
  type Question,
} from "../questions/allQuestions";
import { formVariantConfigs } from "./formVariants";
import type { FormValuesForVariant } from "./types/FormValues";
import type { FormVariant } from "./types/FormVariant";

type RenderedFieldData = {
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
): Array<RenderedFieldData> {
  const fieldsConfigForVariant = formVariantConfigs[formVariant].formFields;

  const filteredByConditionalFields = fieldsConfigForVariant.filter(
    (fieldConfig) =>
      fieldConfig.conditionallyIncludeIf
        ? fieldConfig.conditionallyIncludeIf(formValues)
        : true,
  );

  const mappedToFieldData: RenderedFieldData[] =
    filteredByConditionalFields.map(
      ({
        fieldId,
        isRequired,
        canTriggerAdditionOfFritekstField:
          canTriggerAdditionOfFritekstFieldInThisVariant,
      }) => {
        const question = allKartleggingssporsmalQuestions[fieldId];

        return {
          fieldId,
          isRequired,
          question: applyFritekstTriggerDescriptionsToQuestion(
            question,
            canTriggerAdditionOfFritekstFieldInThisVariant || false,
          ),
        };
      },
    );

  return mappedToFieldData;
}

/**
 * For radio group questions where selecting an option can trigger the
 * addition of a fritekst field, appends each option's
 * descriptionWhenOptionTriggersAdditionOfTextField to its description so
 * users are told upfront that elaborating is possible. Left unchanged for
 * other question types or when the trigger flag is not set for this variant.
 */
function applyFritekstTriggerDescriptionsToQuestion(
  question: Question,
  canTriggerAdditionOfFritekstFieldInThisVariant: boolean,
): Question {
  if (
    question.type !== "RADIO_GROUP" ||
    !canTriggerAdditionOfFritekstFieldInThisVariant
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
          option.descriptionWhenOptionTriggersAdditionOfTextField,
        ]
          .filter(Boolean)
          .join(" ") || undefined,
    })),
  };
}
