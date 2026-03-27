import { type ZodType, z } from "zod";
import {
  type KartleggingsspormalFormFieldId,
  radioGroupFields,
} from "./formQuestions";

function getRadioGroupOptionIds(radioFieldId: keyof typeof radioGroupFields) {
  return radioGroupFields[radioFieldId].options.map((option) => option.id);
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
} satisfies Record<KartleggingsspormalFormFieldId, ZodType>);

export type KartleggingssporsmalForm = z.infer<
  typeof kartleggingssporsmalFormSchema
>;

export type KartleggingssporsmalFormAlsoUnfilled = {
  [K in keyof KartleggingssporsmalForm]: KartleggingssporsmalForm[K] | "";
};
