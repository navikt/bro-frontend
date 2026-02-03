import type { LumiSurveyConfig } from "@navikt/lumi-survey";

export const survey: LumiSurveyConfig = {
  type: "rating",
  questions: [
    {
      id: "opplevelse",
      type: "rating",
      variant: "emoji",
      prompt: "Hvordan opplevde du å svare på spørsmålene?",
      description:
        "Svarene du sender inn er anonyme, og blir brukt til videreutvikling av tjenesten.",
      required: true,
    },
    {
      id: "begrunnelse",
      type: "text",
      prompt: "Legg gjerne til en begrunnelse (valgfritt)",
      description: "Alle tilbakemeldinger er til stor nytte for oss",
      required: false,
      minRows: 4,
      maxLength: 500,
      visibleIf: {
        field: "ANSWER",
        questionId: "opplevelse",
        operator: "EXISTS",
      },
    },
  ],
};
