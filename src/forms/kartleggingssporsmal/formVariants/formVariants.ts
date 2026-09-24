import { flervalgFritekstV1Config } from "./formVariantConfigs/flervalgFritekstV1Config";
import { flervalgFritekstV2Config } from "./formVariantConfigs/flervalgFritekstV2Config";
import { flervalgFritekstV3Config } from "./formVariantConfigs/flervalgFritekstV3Config";
import { flervalgSpm3CheckboxConfig } from "./formVariantConfigs/flervalgSpm3CheckboxConfig";
import { flervalgSpm3RadioConfig } from "./formVariantConfigs/flervalgSpm3RadioConfig";
import { flervalgV1Config } from "./formVariantConfigs/flervalgV1Config";
import { flervalgV2Config } from "./formVariantConfigs/flervalgV2Config";
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
  "FLERVALG_FRITEKST_V1",
  "FLERVALG_FRITEKST_V2",
  "FLERVALG_FRITEKST_V3",
  "FLERVALG_SPM3_CHECKBOX",
  "FLERVALG_SPM3_RADIO",
] as const;

export const formVariantConfigs = {
  FLERVALG_V1: flervalgV1Config,
  FLERVALG_V2: flervalgV2Config,
  FLERVALG_FRITEKST_V1: flervalgFritekstV1Config,
  FLERVALG_FRITEKST_V2: flervalgFritekstV2Config,
  FLERVALG_FRITEKST_V3: flervalgFritekstV3Config,
  FLERVALG_SPM3_CHECKBOX: flervalgSpm3CheckboxConfig,
  FLERVALG_SPM3_RADIO: flervalgSpm3RadioConfig,
} satisfies Record<FormVariant, unknown>;

export function getValidationSchemaForVariant(formVariant: FormVariant) {
  return formVariantConfigs[formVariant].validationSchema;
}
