import type { KartleggingssporsmalForm } from "@/forms/kartleggingssporsmal/formSchema";
import type { FieldSnapshots } from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const fieldSnapshotsFixture: FieldSnapshots = [
  {
    fieldType: "RADIO_GROUP",
    label:
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
    wasRequired: true,
    description: null,
    fieldId: "hvorSannsynligTilbakeTilJobben",
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
    fieldType: "RADIO_GROUP",
    label:
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    wasRequired: true,
    description: null,
    fieldId: "samarbeidOgRelasjonTilArbeidsgiver",
    options: [
      {
        optionId: "2a",
        optionLabel: "Jeg opplever forholdet vårt som godt",
        wasSelected: true,
      },
      {
        optionId: "2b",
        optionLabel: "Jeg opplever ikke forholdet vårt som godt",
        wasSelected: false,
      },
    ],
  },
  {
    fieldType: "RADIO_GROUP",
    label: "Hvor lenge tror du at du har behov for å være sykmeldt?",
    wasRequired: true,
    description: null,
    fieldId: "naarTilbakeTilJobben",
    options: [
      {
        optionId: "3a",
        optionLabel: "Mindre enn 26 uker (6 måneder) totalt",
        wasSelected: true,
      },
      {
        optionId: "3b",
        optionLabel: "Mer enn 26 uker (6 måneder) totalt",
        wasSelected: false,
      },
    ],
  },
];

export const kartleggingssporsmalFormResponseFixture = {
  formSnapshot: { fieldSnapshots: fieldSnapshotsFixture },
  createdAt: new Date(),
};

export const kartleggingssporsmalFormFixture: KartleggingssporsmalForm = {
  hvorSannsynligTilbakeTilJobben: "1a",
  hvorSannsynligTilbakeTilJobbenBegrunnelse: "",
  samarbeidOgRelasjonTilArbeidsgiver: "2a",
  naarTilbakeTilJobben: "3a",
};

export const kartleggingssporsmalFormFixture2: KartleggingssporsmalForm = {
  hvorSannsynligTilbakeTilJobben: "1b",
  hvorSannsynligTilbakeTilJobbenBegrunnelse:
    "Jeg tror det er lite sannsynlig fordi de ikke kan tilrettelegge for meg.",
  samarbeidOgRelasjonTilArbeidsgiver: "2a",
  naarTilbakeTilJobben: "3a",
};

// This kind of form value can happen if user selects "1b" or "1c" for first question, and then fills out the begrunnelse field, but then goes back and changes first answer to "1a". In this case, the begrunnelse field will disappear and should not be included in the snapshot.
export const kartleggingssporsmalFormFixture3: KartleggingssporsmalForm = {
  hvorSannsynligTilbakeTilJobben: "1a",
  hvorSannsynligTilbakeTilJobbenBegrunnelse:
    "Dette skal ikke inkluderes i snapshot siden første svar er 1a.",
  samarbeidOgRelasjonTilArbeidsgiver: "2a",
  naarTilbakeTilJobben: "3a",
};
