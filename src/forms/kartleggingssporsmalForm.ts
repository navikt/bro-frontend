import { type ZodType, z } from "zod/v4";
import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";

export const kartleggingsspormalFormQuestions = {
  hvorSannsynligTilbakeTilJobben: {
    type: "RADIO_GROUP",
    label:
      "Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?",
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
    options: [
      { id: "2a", label: "Jeg opplever samarbeidet og relasjonen som god" },
      { id: "2b", label: "Jeg opplever samarbeidet og relasjonen som dårlig" },
    ],
  },
  naarTilbakeTilJobben: {
    type: "RADIO_GROUP",
    label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
    options: [
      { id: "3a", label: "Mindre enn seks måneder" },
      { id: "3b", label: "Mer enn seks måneder" },
    ],
  },
} as const satisfies Record<string, RadioGroupQuestion>;

type KartleggingsspormalFormQuestionId =
  keyof typeof kartleggingsspormalFormQuestions;

function getOptionIds<T extends KartleggingsspormalFormQuestionId>(
  fieldId: T,
): (typeof kartleggingsspormalFormQuestions)[T]["options"][number]["id"][] {
  const question = kartleggingsspormalFormQuestions[fieldId];
  return question.options.map((option) => option.id);
}

export const kartleggingssporsmalFormSchema = z.object({
  hvorSannsynligTilbakeTilJobben: z.enum(
    getOptionIds("hvorSannsynligTilbakeTilJobben"),
    "Feltet er påkrevd",
  ),
  samarbeidOgRelasjonTilArbeidsgiver: z.enum(
    getOptionIds("samarbeidOgRelasjonTilArbeidsgiver"),
    "Feltet er påkrevd",
  ),
  naarTilbakeTilJobben: z.enum(
    getOptionIds("naarTilbakeTilJobben"),
    "Feltet er påkrevd",
  ),
} satisfies Record<KartleggingsspormalFormQuestionId, ZodType>);
export type KartleggingssporsmalForm = z.infer<
  typeof kartleggingssporsmalFormSchema
>;

export const kartleggingssporsmalFormDefaults = {
  hvorSannsynligTilbakeTilJobben: "",
  samarbeidOgRelasjonTilArbeidsgiver: "",
  naarTilbakeTilJobben: "",
};
