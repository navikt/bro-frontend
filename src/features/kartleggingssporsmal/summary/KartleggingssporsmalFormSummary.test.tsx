// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { fieldSnapshotsFixture } from "@/mocks/fixture/form";
import KartleggingssporsmalFormSummary from "./KartleggingssporsmalFormSummary";

const formSnapshotFixture = {
  formIdentifier: "kartleggingssporsmal",
  formSemanticVersion: "1.0.0",
  formSnapshotVersion: "1.0.0",
  fieldSnapshots: fieldSnapshotsFixture,
};

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
    screen.getByText("Jeg opplever forholdet vårt som godt");

    screen.getByText("Hvor lenge tror du at du har behov for å være sykmeldt?");
    screen.getByText("Mindre enn 26 uker (6 måneder) totalt");
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
