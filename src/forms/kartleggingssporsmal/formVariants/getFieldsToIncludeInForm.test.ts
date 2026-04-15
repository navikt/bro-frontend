import { describe, expect, it } from "vitest";
import { getFormDefaultValuesForFormVariant } from "./formDefaultValues";
import { getFieldsToIncludeInForm } from "./getFieldsToIncludeInForm";

describe("getFieldsToIncludeInForm", () => {
  it("returns the full field list for FLERVALG_V1", () => {
    expect(
      getFieldsToIncludeInForm(
        "FLERVALG_V1",
        getFormDefaultValuesForFormVariant("FLERVALG_V1"),
      ).map((field) => field.fieldId),
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

    const fieldIdsWhenSannsynlig = getFieldsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
      },
    ).map((field) => field.fieldId);

    const fieldIdsWhenLiteSannsynlig = getFieldsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
      },
    ).map((field) => field.fieldId);

    const fieldIdsWhenUsikkerAndDarligSamarbeid = getFieldsToIncludeInForm(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1c",
        arbeidsgiverHvordanErSamarbeidFlervalg: "2b",
      },
    ).map((field) => field.fieldId);

    expect(fieldIdsWhenSannsynlig).toEqual(baseFields);

    expect(fieldIdsWhenLiteSannsynlig).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ]);

    expect(fieldIdsWhenUsikkerAndDarligSamarbeid).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "tilbakeTilJobbenUsikkerBegrunnelse",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "arbeidsgiverSamarbeidDarligBegrunnelse",
      "naarTilbakeTilJobbenFlervalg",
    ]);
  });
});
