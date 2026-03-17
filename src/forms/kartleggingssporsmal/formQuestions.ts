import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";
import type { TextQuestion } from "@/components/form-components/TextArea";

export const radioGroupQuestions = {
  hvorSannsynligTilbakeTilJobben: {
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
  samarbeidOgRelasjonTilArbeidsgiver: {
    type: "RADIO_GROUP",
    label:
      "Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?",
    description: "Svaret blir ikke delt med din arbeidsgiver.",
    options: [
      { id: "2a", label: "Jeg opplever samarbeidet og relasjonen som god" },
      { id: "2b", label: "Jeg opplever samarbeidet og relasjonen som dårlig" },
    ],
  },
  naarTilbakeTilJobben: {
    type: "RADIO_GROUP",
    label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
    description: null,
    options: [
      { id: "3a", label: "Mindre enn seks måneder" },
      { id: "3b", label: "Mer enn seks måneder" },
    ],
  },
} as const satisfies Record<string, RadioGroupQuestion>;

const textQuestions = {
  hvorSannsynligTilbakeTilJobbenBegrunnelse: {
    type: "TEXT",
    label:
      "Hvis du ønsker det kan du her utdype svaret ditt på forrige spørsmål. Det er valgfritt.",
    description: "Svaret blir ikke delt med arbeidsgiveren din.",
  },
} as const satisfies Record<string, TextQuestion>;

export const kartleggingssporsmalFormQuestions = {
  ...radioGroupQuestions,
  ...textQuestions,
} as const;

export type KartleggingsspormalFormQuestionId =
  keyof typeof kartleggingssporsmalFormQuestions;
