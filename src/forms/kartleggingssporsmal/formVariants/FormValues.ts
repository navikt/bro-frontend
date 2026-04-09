import type z from "zod";
import type { FormVariant } from "./formVariants";
import type { SchemaForVariant } from "./SchemaForVariant";

// Almost same as z.infer<Schema>, but also allows "" on every field.
export type FormValuesForSchema<Schema extends z.ZodObject> = {
  [K in keyof z.infer<Schema>]: z.infer<Schema>[K] | "";
};

// Not used directly — when T is a union this collapses to shared keys only.
// Use FormValues instead to get proper union distribution.
type FormValuesForSingleVariant<T extends FormVariant> = FormValuesForSchema<
  SchemaForVariant<T>
>;

/**
 * Represents form value state during filling out form for a given variant,
 * with empty strings allowed on every field to allow for unselected multiple
 * choice fields.
 */
export type FormValuesForVariant<T extends FormVariant> = T extends FormVariant
  ? FormValuesForSingleVariant<T>
  : never;

// The `T extends FormVariant` conditional above makes the FormValuesInProgress
// type distributive: when T is a union, TypeScript applies the condition
// separately to each union member and unions the results.
