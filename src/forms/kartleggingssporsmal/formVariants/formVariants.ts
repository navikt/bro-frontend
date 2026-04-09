import z from "zod";

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
