import z from "zod";
import { fieldSchemas } from "../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../types/KartleggingsspormalFormFieldId";

export const flervalgV1Schema = z.object({
  tilbakeTilJobbenHvorSannsynligFlervalg:
    fieldSchemas.tilbakeTilJobbenHvorSannsynligFlervalg,
  arbeidsgiverHvordanErSamarbeidFlervalg:
    fieldSchemas.arbeidsgiverHvordanErSamarbeidFlervalg,
  naarTilbakeTilJobbenFlervalg: fieldSchemas.naarTilbakeTilJobbenFlervalg,
} satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>);
