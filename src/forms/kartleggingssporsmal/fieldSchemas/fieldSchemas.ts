import z from "zod";
import { TEXT_AREA_MAX_LENGTH } from "@/appConfig";
import type { KartleggingsspormalFormFieldId } from "../questions/allQuestions";
import { getRadioGroupOptionIds } from "../questions/radioGroupQuestions";

const requiredFieldErrorMessage = "Feltet er påkrevd";
const maxLengthErrorMessage = `Du kan ikke skrive mer enn ${TEXT_AREA_MAX_LENGTH} tegn`;

export const fieldSchemas = {
  tilbakeTilJobbenHvorSannsynligFlervalg: z.enum(
    getRadioGroupOptionIds("tilbakeTilJobbenHvorSannsynligFlervalg"),
    requiredFieldErrorMessage,
  ),
  tilbakeTilJobbenLiteSannsynligBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),
  tilbakeTilJobbenUsikkerBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),
  arbeidsgiverHvordanErSamarbeidFlervalg: z.enum(
    getRadioGroupOptionIds("arbeidsgiverHvordanErSamarbeidFlervalg"),
    requiredFieldErrorMessage,
  ),
  arbeidsgiverSamarbeidDarligBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),
  naarTilbakeTilJobbenFlervalg: z.enum(
    getRadioGroupOptionIds("naarTilbakeTilJobbenFlervalg"),
    requiredFieldErrorMessage,
  ),
} satisfies Record<KartleggingsspormalFormFieldId, z.ZodType>;
