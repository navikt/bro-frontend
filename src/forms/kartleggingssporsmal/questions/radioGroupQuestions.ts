import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";

export const radioGroupQuestions = {
  tilbakeTilJobbenHvorSannsynligFlervalg: {
    type: "RADIO_GROUP",
    label:
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
    description: null,
    options: [
      { id: "1a", label: "Jeg tror det er veldig sannsynlig" },
      { id: "1b", label: "Jeg tror det er lite sannsynlig" },
      { id: "1c", label: "Jeg er usikker" },
    ],
  },
  mulighetForTilbakeTilJobbenFlervalg: {
    type: "RADIO_GROUP",
    label:
      "Hvordan ser du for deg muligheten for å komme tilbake til din nåværende jobb og stilling?",
    description:
      "Tenk over om du tror du kan komme helt eller delvis tilbake til din nåværende jobb og stilling, eller om du ser det som utfordrende.",
    options: [
      {
        id: "kommer_tilbake",
        label:
          "Jeg har tro på at jeg kommer tilbake til samme jobb og stilling",
      },
      {
        id: "utfordrende",
        label:
          "Jeg ser på det som utfordrende å komme tilbake til samme jobb og stilling",
        descriptionWhenOptionTriggersAdditionOfTextField:
          "Du får mulighet til å utdype mer",
      },
    ],
  },
  arbeidsgiverHvordanErSamarbeidFlervalg: {
    type: "RADIO_GROUP",
    label:
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    description: null,
    options: [
      { id: "2a", label: "Jeg opplever samarbeidet og relasjonen som god" },
      { id: "2b", label: "Jeg opplever samarbeidet og relasjonen som dårlig" },
    ],
  },
  arbeidsgiverFaarDuOppfolgingFlervalg: {
    type: "RADIO_GROUP",
    label: "Får du oppfølging av arbeidsgiveren din nå når du er sykmeldt?",
    description:
      "Arbeidsgiveren din har hovedansvaret for å gjøre tilpasninger og følge deg opp på arbeidsplassen. Arbeidsgiver har for eksempel plikt til å lage en oppfølgingsplan med deg innen du har vært sykmeldt i fire uker. Derfor er det viktig at dere har tett kontakt når du er sykmeldt.",
    options: [
      {
        id: "ja",
        label:
          "Ja, jeg får oppfølging, og har snakket med arbeidsgiver om dette.",
      },
      {
        id: "nei",
        label:
          "Nei, jeg opplever manglende oppfølging og at tilpasninger er vanskelig.",
        descriptionWhenOptionTriggersAdditionOfTextField:
          "Du får mulighet til å utdype mer",
      },
    ],
  },
  naarTilbakeTilJobbenFlervalg: {
    type: "RADIO_GROUP",
    label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
    description: null,
    options: [
      { id: "3a", label: "Mindre enn seks måneder" },
      { id: "3b", label: "Mer enn seks måneder" },
    ],
  },
} as const satisfies Record<string, RadioGroupQuestion>;

type RadioGroupFieldId = keyof typeof radioGroupQuestions;
type RadioGroupOptionId<T extends RadioGroupFieldId> =
  (typeof radioGroupQuestions)[T]["options"][number]["id"];

export function getRadioGroupOptionIds<T extends RadioGroupFieldId>(
  radioFieldId: T,
): RadioGroupOptionId<T>[] {
  return radioGroupQuestions[radioFieldId].options.map(
    (option) => option.id,
  ) as RadioGroupOptionId<T>[];
}
