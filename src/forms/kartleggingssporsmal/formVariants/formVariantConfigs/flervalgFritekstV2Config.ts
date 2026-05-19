import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV2Config = defineVariantConfig({
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
      fieldId: "arbeidsgiverFaarDuOppfolgingFlervalg",
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgningNeiBegrunnelse",
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.arbeidsgiverFaarDuOppfolgingFlervalg === "nei",
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
    arbeidsgiverFaarDuOppfolgingFlervalg:
      fieldSchemas.arbeidsgiverFaarDuOppfolgingFlervalg,
    arbeidsgiverFaarDuOppfolgningNeiBegrunnelse:
      fieldSchemas.arbeidsgiverFaarDuOppfolgningNeiBegrunnelse,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
