import type { KartleggingsspormalFormFieldId } from "@/forms/kartleggingssporsmal/types/KartleggingsspormalFormFieldId";
import type { FieldSnapshots } from "@/services/meroppfolging/schemas/formSnapshotSchema";
import { fieldSnapshotsFlervalgV1Fixture } from "./fieldSnapshotsFixturesFlervalg";

export const liteSannsynligBegrunnelseFieldId =
  "tilbakeTilJobbenLiteSannsynligBegrunnelse";
export const usikkerBegrunnelseFieldId = "tilbakeTilJobbenUsikkerBegrunnelse";
export const arbeidsgiverSamarbeidDarligBegrunnelseFieldId =
  "arbeidsgiverSamarbeidDarligBegrunnelse";

type FirstQuestionOption = "1a" | "1b" | "1c";
type SecondQuestionOption = "2a" | "2b";
type ThirdQuestionOption = "3a" | "3b";

const createFirstQuestionField = (selected: FirstQuestionOption) => ({
  fieldId:
    "tilbakeTilJobbenHvorSannsynligFlervalg" as KartleggingsspormalFormFieldId,
  label:
    "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
  description: null,
  fieldType: "RADIO_GROUP" as const,
  options: [
    {
      optionId: "1a",
      optionLabel: "Jeg tror det er veldig sannsynlig",
      wasSelected: selected === "1a",
    },
    {
      optionId: "1b",
      optionLabel: "Jeg tror det er lite sannsynlig",
      wasSelected: selected === "1b",
    },
    {
      optionId: "1c",
      optionLabel: "Jeg er usikker",
      wasSelected: selected === "1c",
    },
  ],
});

const createSecondQuestionField = (selected: SecondQuestionOption) => ({
  fieldId:
    "arbeidsgiverHvordanErSamarbeidFlervalg" as KartleggingsspormalFormFieldId,
  label:
    "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
  description: "Svaret blir ikke delt med din arbeidsgiver.",
  fieldType: "RADIO_GROUP" as const,
  options: [
    {
      optionId: "2a",
      optionLabel: "Jeg opplever samarbeidet og relasjonen som god",
      wasSelected: selected === "2a",
    },
    {
      optionId: "2b",
      optionLabel: "Jeg opplever samarbeidet og relasjonen som dårlig",
      wasSelected: selected === "2b",
    },
  ],
});

const createThirdQuestionField = (selected: ThirdQuestionOption) => ({
  fieldId: "naarTilbakeTilJobbenFlervalg" as KartleggingsspormalFormFieldId,
  label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
  description: null,
  fieldType: "RADIO_GROUP" as const,
  options: [
    {
      optionId: "3a",
      optionLabel: "Mindre enn seks måneder",
      wasSelected: selected === "3a",
    },
    {
      optionId: "3b",
      optionLabel: "Mer enn seks måneder",
      wasSelected: selected === "3b",
    },
  ],
});

const liteSannsynligBegrunnelseField = {
  fieldId: liteSannsynligBegrunnelseFieldId,
  label: "Hva gjør det lite sannsynlig? (Valgfritt)",
  description:
    "Skriv kort hvorfor det er lite sannsynlig. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  fieldType: "TEXT" as const,
};

const usikkerBegrunnelseField = {
  fieldId: usikkerBegrunnelseFieldId,
  label: "Hva gjør deg usikker? (Valgfritt)",
  description:
    "Skriv kort hvorfor du er usikker. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  fieldType: "TEXT" as const,
};

const samarbeidDarligBegrunnelseField = {
  fieldId: arbeidsgiverSamarbeidDarligBegrunnelseFieldId,
  label: "Hva gjør samarbeidet og relasjonen dårlig? (Valgfritt)",
  description:
    "Skriv kort hvorfor relasjonen er dårlig. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  fieldType: "TEXT" as const,
};

export const fieldSnapshotsForFormValues1a2a3a: FieldSnapshots =
  fieldSnapshotsFlervalgV1Fixture;

export const fieldSnapshotsForFormValues1b: FieldSnapshots = [
  createFirstQuestionField("1b"),
  {
    ...liteSannsynligBegrunnelseField,
    value:
      "Jeg tror det er lite sannsynlig fordi de ikke kan tilrettelegge for meg.",
  },
  createSecondQuestionField("2a"),
  createThirdQuestionField("3a"),
];

export const fieldSnapshotsForFormValues1bNoText: FieldSnapshots = [
  createFirstQuestionField("1b"),
  { ...liteSannsynligBegrunnelseField, value: "" },
  createSecondQuestionField("2a"),
  createThirdQuestionField("3a"),
];

export const fieldSnapshotsForFormValues1cTextFor1bAnd1c: FieldSnapshots = [
  createFirstQuestionField("1c"),
  {
    ...usikkerBegrunnelseField,
    value: "Usikker fordi... (dette skal inkluderes i snapshot)",
  },
  createSecondQuestionField("2a"),
  createThirdQuestionField("3a"),
];

export const fieldSnapshotsForFormValues1c2b3bWithText: FieldSnapshots = [
  createFirstQuestionField("1c"),
  { ...usikkerBegrunnelseField, value: "Usikker fordi..." },
  createSecondQuestionField("2b"),
  { ...samarbeidDarligBegrunnelseField, value: "Dårlig fordi..." },
  createThirdQuestionField("3b"),
];
