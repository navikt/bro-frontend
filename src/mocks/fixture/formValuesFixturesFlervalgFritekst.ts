import type { FormValuesForVariant } from "@/forms/kartleggingssporsmal/formVariants/FormValues";

export const formValues1a2a3a: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> = {
  tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
  tilbakeTilJobbenLiteSannsynligBegrunnelse: "",
  tilbakeTilJobbenUsikkerBegrunnelse: "",
  arbeidsgiverHvordanErSamarbeidFlervalg: "2a",
  arbeidsgiverSamarbeidDarligBegrunnelse: "",
  naarTilbakeTilJobbenFlervalg: "3a",
};

export const formValues1b: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> = {
  tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
  tilbakeTilJobbenLiteSannsynligBegrunnelse:
    "Jeg tror det er lite sannsynlig fordi de ikke kan tilrettelegge for meg.",
  tilbakeTilJobbenUsikkerBegrunnelse: "",
  arbeidsgiverHvordanErSamarbeidFlervalg: "2a",
  arbeidsgiverSamarbeidDarligBegrunnelse: "",
  naarTilbakeTilJobbenFlervalg: "3a",
};

export const formValues1bNoText: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> =
  {
    tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
    tilbakeTilJobbenLiteSannsynligBegrunnelse: "",
    tilbakeTilJobbenUsikkerBegrunnelse: "",
    arbeidsgiverHvordanErSamarbeidFlervalg: "2a",
    arbeidsgiverSamarbeidDarligBegrunnelse: "",
    naarTilbakeTilJobbenFlervalg: "3a",
  };

// This kind of form value can happen if user selects "1b" or "1c" for first question,
// and then fills out the begrunnelse field, but then goes back and changes first
// answer to "1a". In this case, the begrunnelse field will disappear and should
// not be included in the snapshot.
export const formValues1a2a3aButTextFor1b: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> =
  {
    tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
    tilbakeTilJobbenLiteSannsynligBegrunnelse:
      "Dette skal ikke inkluderes i snapshot siden første svar er 1a.",
    tilbakeTilJobbenUsikkerBegrunnelse: "",
    arbeidsgiverHvordanErSamarbeidFlervalg: "2a",
    arbeidsgiverSamarbeidDarligBegrunnelse: "",
    naarTilbakeTilJobbenFlervalg: "3a",
  };

export const formValues1cTextFor1bAnd1c: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> =
  {
    tilbakeTilJobbenHvorSannsynligFlervalg: "1c",
    tilbakeTilJobbenLiteSannsynligBegrunnelse:
      "Dette skal ikke inkluderes i snapshot siden første svar er 1c.",
    tilbakeTilJobbenUsikkerBegrunnelse:
      "Usikker fordi... (dette skal inkluderes i snapshot)",
    arbeidsgiverHvordanErSamarbeidFlervalg: "2a",
    arbeidsgiverSamarbeidDarligBegrunnelse: "",
    naarTilbakeTilJobbenFlervalg: "3a",
  };

export const formValues1c2b3bWithText: FormValuesForVariant<"FLERVALG_FRITEKST_V1"> =
  {
    tilbakeTilJobbenHvorSannsynligFlervalg: "1c",
    tilbakeTilJobbenLiteSannsynligBegrunnelse: "",
    tilbakeTilJobbenUsikkerBegrunnelse: "Usikker fordi...",
    arbeidsgiverHvordanErSamarbeidFlervalg: "2b",
    arbeidsgiverSamarbeidDarligBegrunnelse: "Dårlig fordi...",
    naarTilbakeTilJobbenFlervalg: "3b",
  };
