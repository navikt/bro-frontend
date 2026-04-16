import type z from "zod";
import type { formVariantConfigs } from "../formVariants";
import type { FormVariant } from "./FormVariant";

/**
 * Helper type for representing form value state during filling out form. Empty
 * strings are allowed for each field, representing unfilled fields.
 */
export type AllowUnfilledFields<ValidFormValues extends object> = {
  [K in keyof ValidFormValues]: ValidFormValues[K] | "";
};

type ValidFormValuesForVariant<T extends FormVariant> = z.infer<
  (typeof formVariantConfigs)[T]["validationSchema"]
>;

/**
 * Represents form value state during filling out form for a given variant,
 * with empty strings allowed for each field, representing unfilled fields.
 */
export type FormValuesForVariant<T extends FormVariant> = AllowUnfilledFields<
  ValidFormValuesForVariant<T>
>;
