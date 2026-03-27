import type { Skjemavariant } from "@/services/meroppfolging/schemas/requestsAndResponses";
import { shouldIncludeTilbakeTilJobbBegrunnelseField } from "./conditional-fields-logic";
import type { KartleggingsspormalFormFieldId } from "./formQuestions";
import type { KartleggingssporsmalFormAlsoUnfilled } from "./formSchema";

const flervalgFields: KartleggingsspormalFormFieldId[] = [
  "hvorSannsynligTilbakeTilJobben",
  "samarbeidOgRelasjonTilArbeidsgiver",
  "naarTilbakeTilJobben",
];

const flervalgWithFritekstFields: KartleggingsspormalFormFieldId[] = [
  "hvorSannsynligTilbakeTilJobben",
  "hvorSannsynligTilbakeTilJobbenBegrunnelse",
  "samarbeidOgRelasjonTilArbeidsgiver",
  "naarTilbakeTilJobben",
];

const conditionalFields: KartleggingsspormalFormFieldId[] = [
  "hvorSannsynligTilbakeTilJobbenBegrunnelse",
];

const fieldsInOrderForSkjemavariant: Record<
  Skjemavariant,
  KartleggingsspormalFormFieldId[]
> = {
  FLERVALG_V1: flervalgFields,
  FLERVALG_FRITEKST_V1: flervalgWithFritekstFields,
};

export function getFieldsInOrderForSkjemavariant(
  skjemavariant: Skjemavariant,
): KartleggingsspormalFormFieldId[] {
  return fieldsInOrderForSkjemavariant[skjemavariant];
}

export function isConditionalField(
  fieldId: KartleggingsspormalFormFieldId,
): boolean {
  return conditionalFields.includes(fieldId);
}

export function shouldAddConditionalField({
  fieldId,
  formValues,
}: {
  fieldId: KartleggingsspormalFormFieldId;
  formValues: KartleggingssporsmalFormAlsoUnfilled;
}): boolean {
  // Skip check if this is not a conditional field.
  if (!isConditionalField(fieldId)) {
    return true;
  }

  if (fieldId === "hvorSannsynligTilbakeTilJobbenBegrunnelse") {
    return shouldIncludeTilbakeTilJobbBegrunnelseField(
      formValues.hvorSannsynligTilbakeTilJobben,
    );
  }

  return true;
}
