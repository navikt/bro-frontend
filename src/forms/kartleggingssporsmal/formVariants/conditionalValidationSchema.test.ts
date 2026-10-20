import { describe, expect, it } from "vitest";
import { TEXT_AREA_MAX_LENGTH } from "@/appConfig";
import { getFormDefaultValuesForFormVariant } from "./formDefaultValues";
import { getValidationSchemaForVariant } from "./formVariants";

function issuePaths(result: {
  error?: { issues: Array<{ path: PropertyKey[] }> };
}) {
  return result.error?.issues.map((issue) => issue.path.join(".")) ?? [];
}

describe("getValidationSchemaForVariant", () => {
  describe.each([
    "FLERVALG_V3",
    "FLERVALG_FRITEKST_V4",
  ] as const)("%s", (formVariant) => {
    const schema = getValidationSchemaForVariant(formVariant);
    const filledValues = {
      ...getFormDefaultValuesForFormVariant(formVariant),
      mulighetForTilbakeTilJobbenFlervalg: "kommer_tilbake",
      arbeidsgiverFaarDuOppfolgingFlervalg: "ja",
    };

    it("does not require a hidden required field", () => {
      const result = schema.safeParse({
        ...filledValues,
        naarTilbakeTilJobbenFlervalg: "3a",
        naarTilbakeHvorforMerEnnSeksManederFlervalg: "",
      });

      expect(result.success).toBe(true);
    });

    it("requires a visible required conditional field", () => {
      const result = schema.safeParse({
        ...filledValues,
        naarTilbakeTilJobbenFlervalg: "3b",
        naarTilbakeHvorforMerEnnSeksManederFlervalg: "",
      });

      expect(result.success).toBe(false);
      expect(issuePaths(result)).toEqual([
        "naarTilbakeHvorforMerEnnSeksManederFlervalg",
      ]);
      expect(result.error?.issues[0]?.message).toBe("Feltet er påkrevd");
    });

    it("reports visible conditional field errors together with other field errors", () => {
      const result = schema.safeParse({
        ...filledValues,
        mulighetForTilbakeTilJobbenFlervalg: "",
        naarTilbakeTilJobbenFlervalg: "3b",
        naarTilbakeHvorforMerEnnSeksManederFlervalg: "",
      });

      expect(issuePaths(result)).toEqual(
        expect.arrayContaining([
          "mulighetForTilbakeTilJobbenFlervalg",
          "naarTilbakeHvorforMerEnnSeksManederFlervalg",
        ]),
      );
    });
  });

  describe("hidden text fields", () => {
    const schema = getValidationSchemaForVariant("FLERVALG_FRITEKST_V4");
    const tooLongText = "a".repeat(TEXT_AREA_MAX_LENGTH + 1);
    const baseValues = {
      ...getFormDefaultValuesForFormVariant("FLERVALG_FRITEKST_V4"),
      arbeidsgiverFaarDuOppfolgingFlervalg: "ja",
      naarTilbakeTilJobbenFlervalg: "3a",
      mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse: tooLongText,
    };

    it("skips validation of hidden text fields", () => {
      const result = schema.safeParse({
        ...baseValues,
        mulighetForTilbakeTilJobbenFlervalg: "kommer_tilbake",
      });

      expect(result.success).toBe(true);
    });

    it("validates visible text fields", () => {
      const result = schema.safeParse({
        ...baseValues,
        mulighetForTilbakeTilJobbenFlervalg: "utfordrende",
      });

      expect(issuePaths(result)).toEqual([
        "mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse",
      ]);
    });
  });
});
