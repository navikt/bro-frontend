import type { FieldSnapshot } from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const fieldSnapshotsFixture: FieldSnapshot[] = [
  {
    fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
    fieldType: "RADIO_GROUP",
    label:
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
    wasRequired: true,
    description: null,
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
      { optionId: "1c", optionLabel: "Jeg er usikker", wasSelected: false },
    ],
  },
  {
    fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
    fieldType: "RADIO_GROUP",
    label:
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    wasRequired: true,
    description: null,
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
    fieldId: "naarTilbakeTilJobbenFlervalg",
    fieldType: "RADIO_GROUP",
    label: "Hvor lenge tror du at du har behov for å være sykmeldt?",
    wasRequired: true,
    description: null,
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
];

export const formSnapshotFixture = {
  formIdentifier: "kartleggingssporsmal",
  formSemanticVersion: "1.0.0",
  formSnapshotVersion: "1.0.0",
  fieldSnapshots: fieldSnapshotsFixture,
};

export const kartleggingssporsmalFormResponseFixture = {
  formSnapshot: formSnapshotFixture,
  createdAt: new Date(),
};
