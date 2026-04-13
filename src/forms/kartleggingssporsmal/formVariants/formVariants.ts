import { flervalgFritekstV1Config } from "./formVariantConfigs/flervalgFritekstV1Config";
import { flervalgV1Config } from "./formVariantConfigs/flervalgV1Config";
import type { FormVariant } from "./types/FormVariant";

/**
 * This list must be updated when a new form variant / skjemavariant is added in
 * `ismeroppfolging`. A form variant can be removed here if it can no longer be
 * returned from the `meroppfolging-backend` endpoint (as in it no longer exists
 * in the candidate table in `meroppfolging-backend`, and can no longer enter
 * that table).
 */
export const formVariants = ["FLERVALG_V1", "FLERVALG_FRITEKST_V1"] as const;

export const formVariantConfigs = {
  FLERVALG_V1: flervalgV1Config,
  FLERVALG_FRITEKST_V1: flervalgFritekstV1Config,
} satisfies Record<FormVariant, unknown>;
