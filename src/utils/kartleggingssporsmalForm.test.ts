import { describe, expect, it } from "vitest";
import {
  fieldSnapshotsFixture,
  kartleggingssporsmalFormFixture,
} from "@/mocks/fixture/form";
import {
  mapAppFormToSnapshot,
  mapFormSnapshotToSummaryItems,
} from "@/utils/kartleggingssporsmalForm";

describe("kartleggingssporsmalForm utils", () => {
  describe("mapAppFormToSnapshot", () => {
    it("should map form values to fieldSnapshots", () => {
      const snapshots = mapAppFormToSnapshot({
        values: kartleggingssporsmalFormFixture,
      });

      expect(snapshots).toEqual([
        {
          fieldId: "hvorSannsynligTilbakeTilJobben",
          label:
            "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
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
  });

  describe("mapFormSnapshotToSummaryItems", () => {
    it("should produce summary items object from fieldSnapshots", () => {
      const summary = mapFormSnapshotToSummaryItems(fieldSnapshotsFixture);
      expect(summary).toEqual([
        {
          label:
            "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
          value: "Jeg tror det er veldig sannsynlig",
        },
        {
          label:
            "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
          value: "Jeg opplever forholdet vårt som godt",
        },
        {
          label: "Hvor lenge tror du at du har behov for å være sykmeldt?",
          value: "Mindre enn 26 uker (6 måneder) totalt",
        },
      ]);
    });
  });
});
