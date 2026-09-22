import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgFritekstV4Config = defineVariantConfig({
  formFields: [
    {
      fieldId: "mulighetForTilbakeTilJobbenFlervalg",
      isRequired: true,
      someOptionsTriggerAdditionOfFritekstField: true,
    },
    {
      fieldId: "mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse",
      isRequired: false,
      conditionallyAddIf: (formValues) =>
        formValues.mulighetForTilbakeTilJobbenFlervalg === "utfordrende",
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgingFlervalg",
      isRequired: true,
      someOptionsTriggerAdditionOfFritekstField: true,
    },
    {
      fieldId: "arbeidsgiverFaarDuOppfolgingNeiBegrunnelse",
      isRequired: false,
      conditionallyAddIf: (formValues) =>
        formValues.arbeidsgiverFaarDuOppfolgingFlervalg === "nei",
    },
    {
      fieldId: "naarTilbakeTilJobbenFlervalg",
      isRequired: true,
    },
    {
      fieldId: "naarTilbakeTilJobbenMerEnnSeksManederGrunnFlervalg",
      isRequired: true,
      conditionallyAddIf: (formValues) =>
        formValues.naarTilbakeTilJobbenFlervalg === "3b",
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
    naarTilbakeTilJobbenMerEnnSeksManederGrunnFlervalg:
      fieldSchemas.naarTilbakeTilJobbenMerEnnSeksManederGrunnFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
