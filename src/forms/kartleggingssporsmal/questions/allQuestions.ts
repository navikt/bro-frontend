import type { CheckboxGroupQuestion } from "@/components/form-components/CheckboxGroup";
import type { RadioGroupQuestion } from "@/components/form-components/RadioGroup";
import type { TextQuestion } from "@/components/form-components/TextArea";
import { checkboxGroupQuestions } from "./checkboxGroupQuestions";
import { radioGroupQuestions } from "./radioGroupQuestions";
import { textQuestions } from "./textQuestions";

export const allKartleggingssporsmalQuestions = {
  ...radioGroupQuestions,
  ...textQuestions,
  ...checkboxGroupQuestions,
} as const satisfies Record<string, Question>;

export type Question =
  | RadioGroupQuestion
  | TextQuestion
  | CheckboxGroupQuestion;

export type KartleggingsspormalFormFieldId =
  keyof typeof allKartleggingssporsmalQuestions;
