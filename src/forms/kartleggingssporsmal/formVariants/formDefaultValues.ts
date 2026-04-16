import type { FormValuesForVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormValues";
import type { FormVariant } from "./types/FormVariant";

const formDefaultValuesByFormVariant: {
  [K in FormVariant]: FormValuesForVariant<K>;
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
): FormValuesForVariant<T> {
  return formDefaultValuesByFormVariant[formVariant];
}
