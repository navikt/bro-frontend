import { describe, expect, it } from "vitest";
import { formDefaultValues } from "@/features/kartleggingssporsmal/form/formDefaultValues";
import {
  getFieldsInOrderForSkjemavariant,
  isConditionalField,
  shouldAddConditionalField,
} from "./fieldVisibilityRules";

describe("fieldVisibilityRules", () => {
  it("uses dedicated field list for FLERVALG_V1", () => {
    const fieldIds = getFieldsInOrderForSkjemavariant("FLERVALG_V1");

    expect(fieldIds).toEqual([
      "hvorSannsynligTilbakeTilJobben",
      "samarbeidOgRelasjonTilArbeidsgiver",
      "naarTilbakeTilJobben",
    ]);
  });

  it("uses dedicated field list for FLERVALG_FRITEKST_V1", () => {
    const fieldIds = getFieldsInOrderForSkjemavariant("FLERVALG_FRITEKST_V1");

    expect(fieldIds).toEqual([
      "hvorSannsynligTilbakeTilJobben",
      "hvorSannsynligTilbakeTilJobbenBegrunnelse",
      "samarbeidOgRelasjonTilArbeidsgiver",
      "naarTilbakeTilJobben",
    ]);
  });

  it("classifies conditional fields and applies render rules correctly", () => {
    const conditionalFieldId = "hvorSannsynligTilbakeTilJobbenBegrunnelse";
    const nonConditionalFieldId = "hvorSannsynligTilbakeTilJobben";

    expect(isConditionalField(conditionalFieldId)).toBe(true);
    expect(isConditionalField(nonConditionalFieldId)).toBe(false);

    const shouldRenderConditionalFieldWhen1a = shouldAddConditionalField({
      fieldId: conditionalFieldId,
      formValues: {
        ...formDefaultValues,
        hvorSannsynligTilbakeTilJobben: "1a",
      },
    });

    const shouldRenderConditionalFieldWhen1b = shouldAddConditionalField({
      fieldId: conditionalFieldId,
      formValues: {
        ...formDefaultValues,
        hvorSannsynligTilbakeTilJobben: "1b",
      },
    });

    const shouldRenderNonConditionalField = shouldAddConditionalField({
      fieldId: nonConditionalFieldId,
      formValues: formDefaultValues,
    });

    expect(shouldRenderConditionalFieldWhen1a).toBe(false);
    expect(shouldRenderConditionalFieldWhen1b).toBe(true);
    expect(shouldRenderNonConditionalField).toBe(true);
  });
});
