import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import type { FormValues } from "@/forms/kartleggingssporsmal/types/FormValues";

const formDefaultValuesByFormVariant: {
  [K in FormVariant]: FormValues<K>;
} = {
  FLERVALG_V1: {
    tilbakeTilJobbenHvorSannsynligFlervalg: "",
    arbeidsgiverHvordanErSamarbeidFlervalg: "",
    naarTilbakeTilJobbenFlervalg: "",
  },
  FLERVALG_FRITEKST_V1: {
    tilbakeTilJobbenHvorSannsynligFlervalg: "",
    tilbakeTilJobbenLiteSannsynligBegrunnelse: "",
    tilbakeTilJobbenUsikkerBegrunnelse: "",
    arbeidsgiverHvordanErSamarbeidFlervalg: "",
    arbeidsgiverSamarbeidDarligBegrunnelse: "",
    naarTilbakeTilJobbenFlervalg: "",
  },
};

export function getFormDefaultValuesForFormVariant<T extends FormVariant>(
  formVariant: T,
): FormValues<T> {
  return formDefaultValuesByFormVariant[formVariant];
}
