import type z from "zod";
import type { KartleggingsspormalFormFieldId } from "../../fieldDefinitions/KartleggingsspormalFormFieldId";
import type { FormValuesForSchema } from "./FormValues";

// Generic types ensures that the schema at least "covers" the fields that are
// listed in fieldsInOrder.
type FormVariantConfig<
  F extends KartleggingsspormalFormFieldId,
  Schema extends z.ZodObject<Record<F, z.ZodType>>,
> = {
  fieldsInOrder: {
    fieldId: F;
    conditionallyIncludeIf?: (
      formValues: FormValuesForSchema<Schema>,
    ) => boolean;
  }[];
  schema: Schema;
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
