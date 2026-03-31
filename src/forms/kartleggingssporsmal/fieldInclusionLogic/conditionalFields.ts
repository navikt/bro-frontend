import type { FormVariant } from "../formVariants/formVariants";
import type { FormValues } from "../types/FormValues";
import type { KartleggingsspormalFormFieldId } from "../types/KartleggingsspormalFormFieldId";

/**
 * Fields that are conditionally added to the live form and the submitted
 * FormSnapshot based on form values. These fields can belong to any form
 * variant.
 */
const conditionalFields: KartleggingsspormalFormFieldId[] = [
  "tilbakeTilJobbenLiteSannsynligBegrunnelse",
  "tilbakeTilJobbenUsikkerBegrunnelse",
  "arbeidsgiverSamarbeidDarligBegrunnelse",
] as const;

export function isConditionalField(
  fieldId: KartleggingsspormalFormFieldId,
): boolean {
  return conditionalFields.includes(fieldId);
}

export function shouldAddConditionalFieldBasedOnFormValues(
  conditionalFieldId: KartleggingsspormalFormFieldId,
  formValues: FormValues<FormVariant>,
): boolean {
  switch (conditionalFieldId) {
    case "tilbakeTilJobbenLiteSannsynligBegrunnelse":
      return formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1b";
    case "tilbakeTilJobbenUsikkerBegrunnelse":
      return formValues.tilbakeTilJobbenHvorSannsynligFlervalg === "1c";
    case "arbeidsgiverSamarbeidDarligBegrunnelse":
      return formValues.arbeidsgiverHvordanErSamarbeidFlervalg === "2b";
    default:
      return false;
  }
}
