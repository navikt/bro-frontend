import { describe, expect, it } from "vitest";
import type { KartleggingsspormalFormFieldId } from "../questions/allQuestions";
import { getFormDefaultValuesForFormVariant } from "./formDefaultValues";
import { getFieldsToIncludeInFormInOrder } from "./getFieldsToIncludeInForm";
import type { FormVariant } from "./types/FormVariant";

describe("getFieldsToIncludeInForm", () => {
  it("returns the full field list for FLERVALG_V1", () => {
    expect(
      getFieldsToIncludeInFormInOrder(
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

    const fieldIdsWhenSannsynlig = getFieldsToIncludeInFormInOrder(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1a",
      },
    ).map((field) => field.fieldId);

    const fieldIdsWhenLiteSannsynlig = getFieldsToIncludeInFormInOrder(
      "FLERVALG_FRITEKST_V1",
      {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1b",
      },
    ).map((field) => field.fieldId);

    const fieldIdsWhenUsikkerAndDarligSamarbeid =
      getFieldsToIncludeInFormInOrder("FLERVALG_FRITEKST_V1", {
        ...defaultValues,
        tilbakeTilJobbenHvorSannsynligFlervalg: "1c",
        arbeidsgiverHvordanErSamarbeidFlervalg: "2b",
      }).map((field) => field.fieldId);

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

  it("returns only the three radio fields for FLERVALG_V2, regardless of form values", () => {
    const expectedFieldIds = [
      "mulighetForTilbakeTilJobbenFlervalg",
      "arbeidsgiverFaarDuOppfolgingFlervalg",
      "naarTilbakeTilJobbenFlervalg",
    ];

    const defaultValues = getFormDefaultValuesForFormVariant("FLERVALG_V2");

    const fieldIdsWithDefaultValues = getFieldsToIncludeInFormInOrder(
      "FLERVALG_V2",
      defaultValues,
    ).map((field) => field.fieldId);

    const fieldIdsWithFilledValues = getFieldsToIncludeInFormInOrder(
      "FLERVALG_V2",
      {
        mulighetForTilbakeTilJobbenFlervalg: "utfordrende",
        arbeidsgiverFaarDuOppfolgingFlervalg: "nei",
        naarTilbakeTilJobbenFlervalg: "3b",
      },
    ).map((field) => field.fieldId);

    expect(fieldIdsWithDefaultValues).toEqual(expectedFieldIds);
    expect(fieldIdsWithFilledValues).toEqual(expectedFieldIds);
  });

  it("shows option descriptions only for variants configured with follow-up text fields", () => {
    const utdypeDescription = "Du får mulighet til å utdype mer";

    function getOptionDescriptions<T extends FormVariant>(
      formVariant: T,
      fieldId: KartleggingsspormalFormFieldId,
    ): Record<string, string | undefined> {
      const question = getFieldsToIncludeInFormInOrder(
        formVariant,
        getFormDefaultValuesForFormVariant(formVariant),
      ).find((field) => field.fieldId === fieldId)?.question;

      if (question?.type !== "RADIO_GROUP") {
        throw new Error(
          `Expected ${fieldId} to be a RADIO_GROUP question in ${formVariant}`,
        );
      }

      return Object.fromEntries(
        question.options.map((option) => [option.id, option.description]),
      );
    }

    expect(
      getOptionDescriptions(
        "FLERVALG_V2",
        "mulighetForTilbakeTilJobbenFlervalg",
      ),
    ).toEqual({
      kommer_tilbake: undefined,
      utfordrende: undefined,
    });

    expect(
      getOptionDescriptions(
        "FLERVALG_V2",
        "arbeidsgiverFaarDuOppfolgingFlervalg",
      ),
    ).toEqual({
      ja: undefined,
      nei: undefined,
    });

    expect(
      getOptionDescriptions(
        "FLERVALG_FRITEKST_V3",
        "mulighetForTilbakeTilJobbenFlervalg",
      ),
    ).toEqual({
      kommer_tilbake: undefined,
      utfordrende: utdypeDescription,
    });

    expect(
      getOptionDescriptions(
        "FLERVALG_FRITEKST_V3",
        "arbeidsgiverFaarDuOppfolgingFlervalg",
      ),
    ).toEqual({
      ja: undefined,
      nei: utdypeDescription,
    });

    expect(
      getOptionDescriptions(
        "FLERVALG_FRITEKST_V2",
        "arbeidsgiverFaarDuOppfolgingFlervalg",
      ),
    ).toEqual({
      ja: undefined,
      nei: utdypeDescription,
    });
  });
});
