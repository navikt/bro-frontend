import { describe, expect, it } from "vitest";
import { fieldSnapshotsFlervalgV1Fixture } from "@/mocks/fixture/fieldSnapshotsFixturesFlervalg";
import {
  fieldSnapshotsForFormValues1a2a3a,
  fieldSnapshotsForFormValues1b,
  fieldSnapshotsForFormValues1bNoText,
  fieldSnapshotsForFormValues1c2b3bWithText,
  fieldSnapshotsForFormValues1cTextFor1bAnd1c,
  liteSannsynligBegrunnelseFieldId,
  usikkerBegrunnelseFieldId,
} from "@/mocks/fixture/fieldSnapshotsFixturesFlervalgFritekst";
import { formValuesFlervalgV1Fixture } from "@/mocks/fixture/formValuesFixturesFlervalg";
import {
  formValues1a2a3a,
  formValues1a2a3aButTextFor1b,
  formValues1b,
  formValues1bNoText,
  formValues1c2b3bWithText,
  formValues1cTextFor1bAnd1c,
} from "@/mocks/fixture/formValuesFixturesFlervalgFritekst";
import { mapFormValuesToSnapshot } from "@/utils/kartleggingssporsmalFormSnapshot";

describe("kartleggingssporsmalFormSnapshot utils", () => {
  describe("mapAppFormToSnapshot", () => {
    it("should map form values to FormSnapshot for FLERVALG_V1 variant", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValuesFlervalgV1Fixture,
        formVariant: "FLERVALG_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsFlervalgV1Fixture,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1a2a3a", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1a2a3a,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1a2a3a,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1b", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1b,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1b,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1b without text", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1bNoText,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1bNoText,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1a with stale 1b text", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1a2a3aButTextFor1b,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1a2a3a,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1c with stale 1b text", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1cTextFor1bAnd1c,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1cTextFor1bAnd1c,
      );
    });

    it("should map form values to FormSnapshot for FLERVALG_FRITEKST_V1 variant for 1c2b3b with text", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1c2b3bWithText,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual(
        fieldSnapshotsForFormValues1c2b3bWithText,
      );
    });

    it("should not include any begrunnelse field for question 1 when answered 1a and text for 1b is present", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1a2a3aButTextFor1b,
        formVariant: "FLERVALG_FRITEKST_V1",
      });

      expect(
        formSnapshot.fieldSnapshots.some(
          (field) =>
            field.fieldId === liteSannsynligBegrunnelseFieldId ||
            field.fieldId === usikkerBegrunnelseFieldId,
        ),
      ).toBe(false);
    });

    it("should not include begrunnelse field for question 1 for FLERVALG_V1 variant", () => {
      const formSnapshot = mapFormValuesToSnapshot({
        values: formValues1b,
        formVariant: "FLERVALG_V1",
      });

      expect(
        formSnapshot.fieldSnapshots.some(
          (field) => field.fieldId === liteSannsynligBegrunnelseFieldId,
        ),
      ).toBe(false);
    });
  });
});
