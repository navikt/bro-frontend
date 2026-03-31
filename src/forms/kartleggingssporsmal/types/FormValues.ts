import type z from "zod";
import type {
  FormVariant,
  SchemaForVariant,
} from "../formVariants/formVariants";

// Infers the type for validated (fully filled) form values based on Zod schema
// for a given variant.
type FormValuesFilled<T extends FormVariant> = z.infer<SchemaForVariant<T>>;

// Same as FormValuesFilled but with "" allowed on every field.
// Not used directly — when T is a union this collapses to shared keys only.
// Use FormValues instead to get proper union distribution.
type FormValuesForSingleVariant<T extends FormVariant> = {
  [K in keyof FormValuesFilled<T>]: FormValuesFilled<T>[K] | "";
};

/**
 * Represents form value state during filling out form for a given variant,
 * with empty strings allowed on every field to allow for unselected multiple
 * choice fields.
 */
export type FormValues<T extends FormVariant> = T extends FormVariant
  ? FormValuesForSingleVariant<T>
  : never;

// The `T extends FormVariant` conditional above makes the FormValuesInProgress type
// distributive: when T is a union, TypeScript applies the condition separately to each
// union member and unions the results.
