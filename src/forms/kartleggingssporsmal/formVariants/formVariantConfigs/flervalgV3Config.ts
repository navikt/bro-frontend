import z from "zod";
import {
  fieldSchemas,
  isNaarTilbakeMerEnnSeksManeder,
  validateFieldOnlyWhenVisible,
} from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgV3Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "mulighetForTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgingFlervalg",
      isRequired: true,
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
    {
      fieldId: "naarTilbakeHvorforMerEnnSeksManederFlervalg",
      isRequired: true,
      conditionallyAddIf: isNaarTilbakeMerEnnSeksManeder,
    },
  ],
  validationSchema: z
    .object({
      mulighetForTilbakeTilJobbenFlervalg:
        fieldSchemas.mulighetForTilbakeTilJobbenFlervalg,
      arbeidsgiverFaarDuOppfolgingFlervalg:
        fieldSchemas.arbeidsgiverFaarDuOppfolgingFlervalg,
      naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
      naarTilbakeHvorforMerEnnSeksManederFlervalg:
        fieldSchemas.naarTilbakeHvorforMerEnnSeksManederFlervalg.or(
          z.literal(""),
        ),
    } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>)
    .superRefine(
      validateFieldOnlyWhenVisible(
        "naarTilbakeHvorforMerEnnSeksManederFlervalg",
        fieldSchemas.naarTilbakeHvorforMerEnnSeksManederFlervalg,
        isNaarTilbakeMerEnnSeksManeder,
      ),
    ),
});
