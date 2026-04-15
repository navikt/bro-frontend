import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import { allKartleggingssporsmalQuestions } from "../../questionDefinitions/allQuestions";
import type { KartleggingsspormalFormFieldId } from "../../questionDefinitions/KartleggingsspormalFormFieldId";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgV1Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
      questionDefinition:
        allKartleggingssporsmalQuestions.tilbakeTilJobbenHvorSannsynligFlervalg,
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
      questionDefinition:
        allKartleggingssporsmalQuestions.arbeidsgiverHvordanErSamarbeidFlervalg,
      isRequired: true,
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
      questionDefinition:
        allKartleggingssporsmalQuestions.naarTilbakeTilJobbenFlervalg,
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
