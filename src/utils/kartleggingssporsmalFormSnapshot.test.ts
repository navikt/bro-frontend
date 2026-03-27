import { describe, expect, it } from "vitest";
import {
  kartleggingssporsmalFormFixture,
  kartleggingssporsmalFormFixture2,
  kartleggingssporsmalFormFixture3,
} from "@/mocks/fixture/form";
import { mapAppFormToSnapshot } from "@/utils/kartleggingssporsmalFormSnapshot";

describe("kartleggingssporsmalFormSnapshot utils", () => {
  describe("mapAppFormToSnapshot", () => {
    it("should map form values to fieldSnapshots", () => {
      const formSnapshot = mapAppFormToSnapshot({
        values: kartleggingssporsmalFormFixture,
        skjemavariant: "FLERVALG_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual([
        {
          fieldId: "hvorSannsynligTilbakeTilJobben",
          label:
            "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
          description: null,
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "1a",
              optionLabel: "Jeg tror det er veldig sannsynlig",
              wasSelected: true,
            },
            {
              optionId: "1b",
              optionLabel: "Jeg tror det er lite sannsynlig",
              wasSelected: false,
            },
            {
              optionId: "1c",
              optionLabel: "Jeg er usikker",
              wasSelected: false,
            },
          ],
        },
        {
          fieldId: "samarbeidOgRelasjonTilArbeidsgiver",
          label:
            "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
          description: null,
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "2a",
              optionLabel: "Jeg opplever samarbeidet og relasjonen som god",
              wasSelected: true,
            },
            {
              optionId: "2b",
              optionLabel: "Jeg opplever samarbeidet og relasjonen som dårlig",
              wasSelected: false,
            },
          ],
        },
        {
          fieldId: "naarTilbakeTilJobben",
          label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
          description: null,
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "3a",
              optionLabel: "Mindre enn seks måneder",
              wasSelected: true,
            },
            {
              optionId: "3b",
              optionLabel: "Mer enn seks måneder",
              wasSelected: false,
            },
          ],
        },
      ]);
    });

    it("should map form values to fieldSnapshots", () => {
      const formSnapshot = mapAppFormToSnapshot({
        values: kartleggingssporsmalFormFixture2,
        skjemavariant: "FLERVALG_FRITEKST_V1",
      });

      expect(formSnapshot.fieldSnapshots).toEqual([
        {
          fieldId: "hvorSannsynligTilbakeTilJobben",
          label:
            "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
          description: null,
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "1a",
              optionLabel: "Jeg tror det er veldig sannsynlig",
              wasSelected: false,
            },
            {
              optionId: "1b",
              optionLabel: "Jeg tror det er lite sannsynlig",
              wasSelected: true,
            },
            {
              optionId: "1c",
              optionLabel: "Jeg er usikker",
              wasSelected: false,
            },
          ],
        },
        {
          fieldId: "hvorSannsynligTilbakeTilJobbenBegrunnelse",
          label:
            "Hvis du ønsker det kan du her utdype svaret ditt på forrige spørsmål. Det er valgfritt.",
          description: "Svaret blir ikke delt med arbeidsgiveren din.",
          fieldType: "TEXT",
          value:
            "Jeg tror det er lite sannsynlig fordi de ikke kan tilrettelegge for meg.",
        },
        {
          fieldId: "samarbeidOgRelasjonTilArbeidsgiver",
          label:
            "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
          description: "Svaret blir ikke delt med din arbeidsgiver.",
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "2a",
              optionLabel: "Jeg opplever samarbeidet og relasjonen som god",
              wasSelected: true,
            },
            {
              optionId: "2b",
              optionLabel: "Jeg opplever samarbeidet og relasjonen som dårlig",
              wasSelected: false,
            },
          ],
        },
        {
          fieldId: "naarTilbakeTilJobben",
          label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
          description: null,
          fieldType: "RADIO_GROUP",
          options: [
            {
              optionId: "3a",
              optionLabel: "Mindre enn seks måneder",
              wasSelected: true,
            },
            {
              optionId: "3b",
              optionLabel: "Mer enn seks måneder",
              wasSelected: false,
            },
          ],
        },
      ]);
    });

    it("should not include begrunnelse field when first answer is 1a", () => {
      const formSnapshot = mapAppFormToSnapshot({
        values: kartleggingssporsmalFormFixture3,
        skjemavariant: "FLERVALG_FRITEKST_V1",
      });

      expect(
        formSnapshot.fieldSnapshots.some(
          (field) =>
            field.fieldId === "hvorSannsynligTilbakeTilJobbenBegrunnelse",
        ),
      ).toBe(false);
    });

    it("should not include begrunnelse field for FLERVALG_V1", () => {
      const formSnapshot = mapAppFormToSnapshot({
        values: kartleggingssporsmalFormFixture2,
        skjemavariant: "FLERVALG_V1",
      });

      expect(
        formSnapshot.fieldSnapshots.some(
          (field) =>
            field.fieldId === "hvorSannsynligTilbakeTilJobbenBegrunnelse",
        ),
      ).toBe(false);
    });
  });
});
