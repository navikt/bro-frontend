import { describe, expect, it } from "vitest";
import { getValidationSchemaForVariant } from "./formVariants";

const baseValues = {
  mulighetForTilbakeTilJobbenFlervalg: "kommer_tilbake",
  mulighetForTilbakeTilJobbenUtfordrendeBegrunnelse: "",
  arbeidsgiverFaarDuOppfolgingFlervalg: "ja",
  arbeidsgiverFaarDuOppfolgingNeiBegrunnelse: "",
};

describe.each([
  "FLERVALG_V3",
  "FLERVALG_FRITEKST_V4",
] as const)("validation of naarTilbakeHvorforMerEnnSeksManederFlervalg in %s", (formVariant) => {
  const schema = getValidationSchemaForVariant(formVariant);

  it("does not require the field when it is hidden", () => {
    const result = schema.safeParse({
      ...baseValues,
      naarTilbakeTilJobbenFlervalg: "3a",
      naarTilbakeHvorforMerEnnSeksManederFlervalg: "",
    });
    expect(result.error?.issues).toBeUndefined();
  });

  it("requires the field when it is visible", () => {
    const result = schema.safeParse({
      ...baseValues,
      naarTilbakeTilJobbenFlervalg: "3b",
      naarTilbakeHvorforMerEnnSeksManederFlervalg: "",
    });
    expect(result.error?.issues.map((issue) => issue.path)).toEqual([
      ["naarTilbakeHvorforMerEnnSeksManederFlervalg"],
    ]);
  });

  it("accepts a valid option when the field is visible", () => {
    const result = schema.safeParse({
      ...baseValues,
      naarTilbakeTilJobbenFlervalg: "3b",
      naarTilbakeHvorforMerEnnSeksManederFlervalg: "behandling",
    });
    expect(result.error?.issues).toBeUndefined();
  });
});
