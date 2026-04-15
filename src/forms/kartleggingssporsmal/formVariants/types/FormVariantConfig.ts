import type z from "zod";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import type { AllowUnfilledFields } from "./FormValues";

export type FormVariantConfig<
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
     * fieldId defines which question to connect to the field, and defines the
     * fieldId for the field in the resulting FormSnapshot object.
     * Different form variants can reuse the same question.
     */
    fieldId: F;
    /**
     * Indicates whether the question should be marked as required or optional
     * in the form and in the resulting FormSnapshot (via wasRequired flag).
     * Validation schema for field in `validationSchema` should have matching
     * validation behaviour.
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
