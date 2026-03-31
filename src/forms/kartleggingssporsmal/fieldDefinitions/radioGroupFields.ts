import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";

export const radioGroupFields = {
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

type RadioGroupFieldId = keyof typeof radioGroupFields;
type RadioGroupOptionId<T extends RadioGroupFieldId> =
  (typeof radioGroupFields)[T]["options"][number]["id"];

export function getRadioGroupOptionIds<T extends RadioGroupFieldId>(
  radioFieldId: T,
): RadioGroupOptionId<T>[] {
  return radioGroupFields[radioFieldId].options.map(
    (option) => option.id,
  ) as RadioGroupOptionId<T>[];
}
