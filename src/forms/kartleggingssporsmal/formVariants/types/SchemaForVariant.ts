import { formVariantConfigs } from "../formVariants";
import type { FormVariant } from "./FormVariant";

export type SchemaForVariant<T extends FormVariant> =
  (typeof formVariantConfigs)[T]["schema"];

export function getSchemaForVariant(formVariant: FormVariant) {
  return formVariantConfigs[formVariant].schema;
}
