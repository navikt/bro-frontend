import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";
import type { TextQuestion } from "@/components/form-components/TextArea";
import { radioGroupQuestions } from "./radioGroupQuestions";
import { textQuestions } from "./textQuestions";

export const allKartleggingssporsmalQuestions = {
  ...radioGroupQuestions,
  ...textQuestions,
} as const satisfies Record<string, Question>;

export type Question = RadioGroupQuestion | TextQuestion;

export type KartleggingsspormalFormFieldId =
  keyof typeof allKartleggingssporsmalQuestions;
