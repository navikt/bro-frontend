import { describe, expect, it } from "vitest";
import { getFormDefaultValuesForFormVariant } from "./formDefaultValues";
import { getFieldIdsToIncludeInForm } from "./getFieldsToIncludeInForm";

describe("getFieldsToIncludeInForm", () => {
  it("returns the full field list for FLERVALG_V1", () => {
    expect(
      getFieldIdsToIncludeInForm(
        "FLERVALG_V1",
        getFormDefaultValuesForFormVariant("FLERVALG_V1"),
      ),
    ).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ]);
  });

  it("includes only conditional fields that match current form values", () => {
    const baseFields = [
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ];

    const defaultValues = getFormDefaultValuesForFormVariant(
      "FLERVALG_FRITEKST_V1",
    );

    const fieldsWhenSannsynlig = getFieldIdsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
      },
    );

    const fieldsWhenLiteSannsynlig = getFieldIdsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
      },
    );

    const fieldsWhenUsikkerAndDarligSamarbeid = getFieldIdsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1c",
        arbeidsgiverHvordanErSamarbeidFlervalg: "2b",
      },
    );

    expect(fieldsWhenSannsynlig).toEqual(baseFields);

    expect(fieldsWhenLiteSannsynlig).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ]);

    expect(fieldsWhenUsikkerAndDarligSamarbeid).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "tilbakeTilJobbenUsikkerBegrunnelse",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "arbeidsgiverSamarbeidDarligBegrunnelse",
      "naarTilbakeTilJobbenFlervalg",
    ]);
  });
});
