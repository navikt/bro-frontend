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

  mulighetForTilbakeTilJobbenFlervalg: z.enum(
    getRadioGroupOptionIds("mulighetForTilbakeTilJobbenFlervalg"),
    requiredFieldErrorMessage,
  ),
  mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),

  arbeidsgiverHvordanErSamarbeidFlervalg: z.enum(
    getRadioGroupOptionIds("arbeidsgiverHvordanErSamarbeidFlervalg"),
    requiredFieldErrorMessage,
  ),
  arbeidsgiverSamarbeidDarligBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),
  arbeidsgiverFaarDuOppfolgingFlervalg: z.enum(
    getRadioGroupOptionIds("arbeidsgiverFaarDuOppfolgingFlervalg"),
    requiredFieldErrorMessage,
  ),
  arbeidsgiverFaarDuOppfolgingNeiBegrunnelse: z
    .string()
    .max(TEXT_AREA_MAX_LENGTH, maxLengthErrorMessage),
  naarTilbakeTilJobbenFlervalg: z.enum(
    getRadioGroupOptionIds("naarTilbakeTilJobbenFlervalg"),
    requiredFieldErrorMessage,
  ),
  naarTilbakeHvorforMerEnnSeksManederFlervalg: z.enum(
    getRadioGroupOptionIds("naarTilbakeHvorforMerEnnSeksManederFlervalg"),
    requiredFieldErrorMessage,
  ),
} satisfies Record<KartleggingsspormalFormFieldId, z.ZodType>;

export const isNaarTilbakeMerEnnSeksManeder = (formValues: {
  naarTilbakeTilJobbenFlervalg?: string;
}) => formValues.naarTilbakeTilJobbenFlervalg === "3b";

/**
 * Returns a superRefine callback that validates a conditionally added field
 * with the given schema only when `isVisible` is true. The field itself must
 * accept "" in the object schema, so it doesn't fail validation while hidden.
 */
export function validateFieldOnlyWhenVisible<
  Values extends Record<string, unknown>,
>(
  fieldId: NoInfer<keyof Values & string>,
  schema: z.ZodType,
  isVisible: (formValues: NoInfer<Values>) => boolean,
) {
  return (formValues: Values, ctx: z.RefinementCtx<Values>) => {
    if (!isVisible(formValues)) return;

    const result = schema.safeParse(formValues[fieldId]);
    if (result.success) return;

    for (const issue of result.error.issues) {
      ctx.addIssue({
        code: "custom",
        message: issue.message,
        path: [fieldId, ...issue.path],
      });
    }
  };
}
