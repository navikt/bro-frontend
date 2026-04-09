import { formVariantConfigs } from "./formVariantConfigs/formVariantConfigs";
import type { FormVariant } from "./formVariants";

export type SchemaForVariant<T extends FormVariant> =
  (typeof formVariantConfigs)[T]["schema"];

export function getSchemaForVariant(formVariant: FormVariant) {
  return formVariantConfigs[formVariant].schema;
}
