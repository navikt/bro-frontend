import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV1Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
      isRequired: true,
    },
    {
      fieldId: "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1b",
    },
    {
      fieldId: "tilbakeTilJobbenUsikkerBegrunnelse",
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1c",
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverSamarbeidDarligBegrunnelse",
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.arbeidsgiverHvordanErSamarbeidFlervalg === "2b",
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
  ],
  validationSchema: z.object({
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
