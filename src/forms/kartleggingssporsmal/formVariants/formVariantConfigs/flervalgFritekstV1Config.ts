import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import { allKartleggingssporsmalQuestions } from "../../questionDefinitions/allQuestions";
import type { KartleggingsspormalFormFieldId } from "../../questionDefinitions/KartleggingsspormalFormFieldId";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV1Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
      questionDefinition:
        allKartleggingssporsmalQuestions.tilbakeTilJobbenHvorSannsynligFlervalg,
      isRequired: true,
    },
    {
      fieldId: "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      questionDefinition:
        allKartleggingssporsmalQuestions.tilbakeTilJobbenLiteSannsynligBegrunnelse,
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1b",
    },
    {
      fieldId: "tilbakeTilJobbenUsikkerBegrunnelse",
      questionDefinition:
        allKartleggingssporsmalQuestions.tilbakeTilJobbenUsikkerBegrunnelse,
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1c",
    },
    {
      fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
      questionDefinition:
        allKartleggingssporsmalQuestions.arbeidsgiverHvordanErSamarbeidFlervalg,
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverSamarbeidDarligBegrunnelse",
      questionDefinition:
        allKartleggingssporsmalQuestions.arbeidsgiverSamarbeidDarligBegrunnelse,
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.arbeidsgiverHvordanErSamarbeidFlervalg === "2b",
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
