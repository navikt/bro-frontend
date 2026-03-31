import z from "zod";
import type { KartleggingsspormalFormFieldId } from "../types/KartleggingsspormalFormFieldId";
import { flervalgFritekstV1Schema } from "./flervalgFritekstV1Schema";
import { flervalgV1Schema } from "./flervalgV1Schema";

/**
 * This list must be updated when a new form variant / skjemavariant is added in
 * `ismeroppfolging`. A form variant can be removed here if it can no longer be
 * returned from the `meroppfolging-backend` endpoint (as in it no longer exists
 * in the candidate table in `meroppfolging-backend`, and can no longer enter
 * that table).
 */
const formVariants = ["FLERVALG_V1", "FLERVALG_FRITEKST_V1"] as const;

export const formVariantSchema = z.enum(formVariants);
export type FormVariant = z.infer<typeof formVariantSchema>;

const formSchemaForVariant = {
  FLERVALG_V1: flervalgV1Schema,
  FLERVALG_FRITEKST_V1: flervalgFritekstV1Schema,
} satisfies Record<FormVariant, z.ZodObject>;

export type SchemaForVariant<T extends FormVariant> =
  (typeof formSchemaForVariant)[T];

export function getSchemaForVariant(formVariant: FormVariant) {
  return formSchemaForVariant[formVariant];
}

/**
 * The returned array includes any conditional fields as well, which must be
 * filtered separately based on form values.
 */
export function getFieldsForVariantInOrder(
  formVariant: FormVariant,
): KartleggingsspormalFormFieldId[] {
  return formSchemaForVariant[formVariant].keyof().options;
}
