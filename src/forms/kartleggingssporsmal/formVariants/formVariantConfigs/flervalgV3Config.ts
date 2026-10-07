import z from "zod";
import { fieldSchemas } from "../../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../../questions/allQuestions";
import { defineVariantConfig } from "../types/FormVariantConfig";

export const flervalgV3Config = defineVariantConfig({
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
    {
      fieldId: "naarTilbakeHvorforMerEnnSeksManederFlervalg",
      isRequired: true,
      conditionallyAddIf: (formValues) =>
        formValues.naarTilbakeTilJobbenFlervalg === "3b",
    },
  ],
  validationSchema: z.object({
    mulighetForTilbakeTilJobbenFlervalg:
      fieldSchemas.mulighetForTilbakeTilJobbenFlervalg,
    arbeidsgiverFaarDuOppfolgingFlervalg:
      fieldSchemas.arbeidsgiverFaarDuOppfolgingFlervalg,
    naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
    naarTilbakeHvorforMerEnnSeksManederFlervalg:
      fieldSchemas.naarTilbakeHvorforMerEnnSeksManederFlervalg,
  } satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>),
});
