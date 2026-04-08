import { describe, expect, it } from "vitest";
import { getFormDefaultValuesForFormVariant } from "@/forms/kartleggingssporsmal/formVariants/formDefaultValues";
import { getFieldsForVariantInOrder } from "../formVariants/formVariants";
import { getFieldsToIncludeForVariant } from "./fieldInclusionLogic";

describe("fieldInclusionRules", () => {
  it("uses dedicated field list for FLERVALG_V1", () => {
    const fieldIds = getFieldsForVariantInOrder("FLERVALG_V1");

    expect(fieldIds).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ]);
  });

  it("uses dedicated field list for FLERVALG_FRITEKST_V1", () => {
    const fieldIds = getFieldsForVariantInOrder("FLERVALG_FRITEKST_V1");

    expect(fieldIds).toEqual([
      "tilbakeTilJobbenHvorSannsynligFlervalg",
      "tilbakeTilJobbenLiteSannsynligBegrunnelse",
      "tilbakeTilJobbenUsikkerBegrunnelse",
      "arbeidsgiverHvordanErSamarbeidFlervalg",
      "arbeidsgiverSamarbeidDarligBegrunnelse",
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

    const fieldsWhenSannsynlig = getFieldsToIncludeForVariant(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
      },
    );

    const fieldsWhenLiteSannsynlig = getFieldsToIncludeForVariant(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
      },
    );

    const fieldsWhenUsikkerAndDarligSamarbeid = getFieldsToIncludeForVariant(
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
