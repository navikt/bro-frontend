import z from "zod";
import type { KartleggingsspormalFormFieldId } from "../../fieldDefinitions/KartleggingsspormalFormFieldId";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV1Config = defineVariantConfig({
  fieldsInOrder: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
    },
    {
      fieldId: "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1b",
    },
    {
      fieldId: "tilbakeTilJobbenUsikkerBegrunnelse",
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1c",
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
    },
    {
      fieldId: "arbeidsgiverSamarbeidDarligBegrunnelse",
      conditionallyIncludeIf: (formValues) =>
        formValues.arbeidsgiverHvordanErSamarbeidFlervalg === "2b",
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
    },
  ],
  schema: z.object({
    tilbakeTilJobbenHvorSannsynligFlervalg:
      fieldSchemas.tilbakeTilJobbenHvorSannsynligFlervalg,
    tilbakeTilJobbenLiteSannsynligBegrunnelse:
      fieldSchemas.tilbakeTilJobbenLiteSannsynligBegrunnelse,
    tilbakeTilJobbenUsikkerBegrunnelse:
      fieldSchemas.tilbakeTilJobbenUsikkerBegrunnelse,
    arbeidsgiverHvordanErSamarbeidFlervalg:
      fieldSchemas.arbeidsgiverHvordanErSamarbeidFlervalg,
    arbeidsgiverSamarbeidDarligBegrunnelse:
      fieldSchemas.arbeidsgiverSamarbeidDarligBegrunnelse,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
