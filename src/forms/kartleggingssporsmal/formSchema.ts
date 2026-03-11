import { type ZodType, z } from "zod";
import {
  type KartleggingsspormalFormQuestionId,
  radioGroupQuestions,
} from "./formQuestions";

function getRadioGroupOptionIds(
  radioFieldId: keyof typeof radioGroupQuestions,
) {
  return radioGroupQuestions[radioFieldId].options.map((option) => option.id);
}

export const kartleggingssporsmalFormSchema = z.object({
  hvorSannsynligTilbakeTilJobben: z.enum(
    getRadioGroupOptionIds("hvorSannsynligTilbakeTilJobben"),
    "Feltet er påkrevd",
  ),
  hvorSannsynligTilbakeTilJobbenBegrunnelse: z.string(),
  samarbeidOgRelasjonTilArbeidsgiver: z.enum(
    getRadioGroupOptionIds("samarbeidOgRelasjonTilArbeidsgiver"),
    "Feltet er påkrevd",
  ),
  naarTilbakeTilJobben: z.enum(
    getRadioGroupOptionIds("naarTilbakeTilJobben"),
    "Feltet er påkrevd",
  ),
} satisfies Record<KartleggingsspormalFormQuestionId, ZodType>);

export type KartleggingssporsmalForm = z.infer<
  typeof kartleggingssporsmalFormSchema
>;
