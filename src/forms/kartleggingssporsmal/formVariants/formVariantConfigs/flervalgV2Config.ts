import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgV2Config = defineVariantConfig({
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
  ],
  validationSchema: z.object({
    mulighetForTilbakeTilJobbenFlervalg:
      fieldSchemas.mulighetForTilbakeTilJobbenFlervalg,
    arbeidsgiverFaarDuOppfolgingFlervalg:
      fieldSchemas.arbeidsgiverFaarDuOppfolgingFlervalg,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
