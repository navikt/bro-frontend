import z from "zod";
import { fieldSchemas } from "../fieldSchemas/fieldSchemas";
import type { KartleggingsspormalFormFieldId } from "../types/KartleggingsspormalFormFieldId";

export const flervalgFritekstV1Schema = z.object({
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
} satisfies Partial<Record<KartleggingsspormalFormFieldId, z.ZodType>>);
