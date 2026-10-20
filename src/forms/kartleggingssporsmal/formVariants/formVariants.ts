import { buildConditionalValidationSchema } from "./conditionalValidationSchema";
import { flervalgFritekstV1Config } from "./formVariantConfigs/flervalgFritekstV1Config";
import { flervalgFritekstV2Config } from "./formVariantConfigs/flervalgFritekstV2Config";
import { flervalgFritekstV3Config } from "./formVariantConfigs/flervalgFritekstV3Config";
import { flervalgFritekstV4Config } from "./formVariantConfigs/flervalgFritekstV4Config";
import { flervalgV1Config } from "./formVariantConfigs/flervalgV1Config";
import { flervalgV2Config } from "./formVariantConfigs/flervalgV2Config";
import { flervalgV3Config } from "./formVariantConfigs/flervalgV3Config";
import type { FormVariant } from "./types/FormVariant";

/**
 * This list must be updated when a new form variant / skjemavariant is added in
 * `ismeroppfolging`. A form variant can be removed here if it can no longer be
 * returned from the `meroppfolging-backend` endpoint (as in it no longer exists
 * in the candidate table in `meroppfolging-backend`, and can no longer enter
 * that table).
 */
export const formVariants = [
  "FLERVALG_V1",
  "FLERVALG_V2",
  "FLERVALG_V3",
  "FLERVALG_FRITEKST_V1",
  "FLERVALG_FRITEKST_V2",
  "FLERVALG_FRITEKST_V3",
  "FLERVALG_FRITEKST_V4",
] as const;

export const formVariantConfigs = {
  FLERVALG_V1: flervalgV1Config,
  FLERVALG_V2: flervalgV2Config,
  FLERVALG_V3: flervalgV3Config,
  FLERVALG_FRITEKST_V1: flervalgFritekstV1Config,
  FLERVALG_FRITEKST_V2: flervalgFritekstV2Config,
  FLERVALG_FRITEKST_V3: flervalgFritekstV3Config,
  FLERVALG_FRITEKST_V4: flervalgFritekstV4Config,
} satisfies Record<FormVariant, unknown>;

const conditionalValidationSchemas = {
  FLERVALG_V1: buildConditionalValidationSchema(flervalgV1Config),
  FLERVALG_V2: buildConditionalValidationSchema(flervalgV2Config),
  FLERVALG_V3: buildConditionalValidationSchema(flervalgV3Config),
  FLERVALG_FRITEKST_V1: buildConditionalValidationSchema(
    flervalgFritekstV1Config,
  ),
  FLERVALG_FRITEKST_V2: buildConditionalValidationSchema(
    flervalgFritekstV2Config,
  ),
  FLERVALG_FRITEKST_V3: buildConditionalValidationSchema(
    flervalgFritekstV3Config,
  ),
  FLERVALG_FRITEKST_V4: buildConditionalValidationSchema(
    flervalgFritekstV4Config,
  ),
} satisfies Record<FormVariant, unknown>;

/**
 * Returns the schema for validating form values for a variant. Fields with
 * `conditionallyAddIf` are only validated when they are added to the form.
 */
export function getValidationSchemaForVariant<T extends FormVariant>(
  formVariant: T,
): (typeof conditionalValidationSchemas)[T] {
  return conditionalValidationSchemas[formVariant];
}
