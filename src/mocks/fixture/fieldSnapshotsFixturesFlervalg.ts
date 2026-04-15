import type { FieldSnapshot } from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const fieldSnapshotsFlervalgV1Fixture: FieldSnapshot[] = [
  {
    fieldId: "tilbakeTilJobbenHvorSannsynligFlervalg",
    label:
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
    description: null,
    fieldType: "RADIO_GROUP",
    wasRequired: true,
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
    fieldId: "arbeidsgiverHvordanErSamarbeidFlervalg",
    label:
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    description: null,
    fieldType: "RADIO_GROUP",
    wasRequired: true,
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
    label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
    description: null,
    fieldType: "RADIO_GROUP",
    wasRequired: true,
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
