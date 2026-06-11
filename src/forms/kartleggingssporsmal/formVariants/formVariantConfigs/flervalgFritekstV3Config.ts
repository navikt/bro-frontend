import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV3Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "mulighetForTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
    {
      fieldId: "mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse",
      isRequired: false,
      conditionallyIncludeIf: (formValues) =>
        formValues.mulighetForTilbakeTilJobbenFlervalg === "utfordrende",
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgingFlervalg",
      isRequired: true,
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgingNeiBegrunnelse",
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
    mulighetForTilbakeTilJobbenFlervalg:
      fieldSchemas.mulighetForTilbakeTilJobbenFlervalg,
    mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse:
      fieldSchemas.mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse,
    arbeidsgiverFaarDuOppfolgingFlervalg:
      fieldSchemas.arbeidsgiverFaarDuOppfolgingFlervalg,
    arbeidsgiverFaarDuOppfolgingNeiBegrunnelse:
      fieldSchemas.arbeidsgiverFaarDuOppfolgingNeiBegrunnelse,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
