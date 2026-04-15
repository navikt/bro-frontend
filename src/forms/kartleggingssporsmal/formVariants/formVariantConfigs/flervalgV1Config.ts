import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgV1Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
      isRequired: true,
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
  ],
  validationSchema: z.object({
    tilbakeTilJobbenHvorSannsynligFlervalg:
      fieldSchemas.tilbakeTilJobbenHvorSannsynligFlervalg,
    arbeidsgiverHvordanErSamarbeidFlervalg:
      fieldSchemas.arbeidsgiverHvordanErSamarbeidFlervalg,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
