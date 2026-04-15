import type z from "zod";
import type { QuestionDefinition } from "../../questionDefinitions/allQuestions";
import type { KartleggingsspormalFormFieldId } from "../../questionDefinitions/KartleggingsspormalFormFieldId";
import type { AllowUnfilledFields } from "./FormValues";

type FormVariantConfig<
  // Generic types ensures that the schema at least "covers" the fields that are
  // listed in fieldsInOrder.
  F extends string,
  ZodSchema extends z.ZodObject<Record<F, z.ZodType>>,
> = {
  /**
   * List of fields in the order they should appear in the form and resulting
   * FormSnapshot.
   */
  formFields: {
    /**
     * Defines the fieldId for the field, which is reflected in resulting
     * FormSnapshot object.
     */
    fieldId: F;
    /**
     * Contains the "question definition", which includes field type, and text
     * data like label, description, and options for radio groups. Question
     * definitions can be shared among form variants.
     */
    questionDefinition: QuestionDefinition;
    /**
     * Indicates whether the question should be marked as required or optional
     * in the form and in the resulting FormSnapshot (via wasRequired flag).
     */
    isRequired: boolean;
    /**
     * Optional function to determine if the field should be added to or removed
     * from the live visible form based on form values of other fields, and
     * whether it should be included in the resulting FormSnapshot.
     */
    conditionallyIncludeIf?: (
      // Cannot use FormValuesForVariant<T> here — that type depends on
      // formVariantConfigs, which depends on FormVariantConfig, which would
      // give a circular reference.
      formValues: Partial<AllowUnfilledFields<z.infer<ZodSchema>>>,
    ) => boolean;
  }[];
  /**
   * Zod schema for validating the form values. Must include a key for each
   * field ID in the formFields list. This is enforced by the generic types.
   * Also used to infer the type of form values object for a variant.
   */
  validationSchema: ZodSchema;
};

// This is a helper function to ensure that the config objects for each form
// variant conform to the FormVariantConfig type, without having to explicitly
// annotate the type of each config object.
export function defineVariantConfig<
  F extends KartleggingsspormalFormFieldId,
  Schema extends z.ZodObject<Record<F, z.ZodType>>,
>(config: FormVariantConfig<F, Schema>): FormVariantConfig<F, Schema> {
  return config;
}
