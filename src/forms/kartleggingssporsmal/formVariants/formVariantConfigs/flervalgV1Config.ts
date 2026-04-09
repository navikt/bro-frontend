import z from "zod";
import type { KartleggingsspormalFormFieldId } from "../../fieldDefinitions/KartleggingsspormalFormFieldId";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import { defineVariantConfig } from "./formVariantConfigs";

export const flervalgV1Config = defineVariantConfig({
  fieldsInOrder: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
    },
  ],
  schema: z.object({
    tilbakeTilJobbenHvorSannsynligFlervalg:
      fieldSchemas.tilbakeTilJobbenHvorSannsynligFlervalg,
    arbeidsgiverHvordanErSamarbeidFlervalg:
      fieldSchemas.arbeidsgiverHvordanErSamarbeidFlervalg,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
