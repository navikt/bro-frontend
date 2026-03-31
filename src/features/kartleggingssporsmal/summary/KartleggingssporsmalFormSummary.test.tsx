// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { formSnapshotFixture } from "@/mocks/fixture/formSnapshotsFixture";
import KartleggingssporsmalFormSummary from "./KartleggingssporsmalFormSummary";

describe("KartleggingssporsmalFormSummary", () => {
  it("renders labels and selected answers for all fields", () => {
    render(
      <KartleggingssporsmalFormSummary formSnapshot={formSnapshotFixture} />,
    );

    screen.getByText(
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
    );
    screen.getByText("Jeg tror det er veldig sannsynlig");

    screen.getByText(
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    );
    screen.getByText("Jeg opplever samarbeidet og relasjonen som god");

    screen.getByText("Hvor lenge tror du at du har behov for å være sykmeldt?");
    screen.getByText("Mindre enn seks måneder");
  });

  it("renders 'Ingen tekst' for an empty TEXT field", () => {
    render(
      <KartleggingssporsmalFormSummary
        formSnapshot={{
          ...formSnapshotFixture,
          fieldSnapshots: [
            {
              fieldId: "hvorSannsynligTilbakeTilJobbenBegrunnelse",
              label: "Utdyp svaret ditt",
              description: null,
              fieldType: "TEXT",
              value: "",
            },
          ],
        }}
      />,
    );

    screen.getByText("Utdyp svaret ditt");
    screen.getByText("Ingen tekst");
  });
});
