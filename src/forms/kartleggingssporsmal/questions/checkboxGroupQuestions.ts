import type { CheckboxGroupQuestion } from "@/components/form-components/CheckboxGroup";

export const checkboxGroupQuestions = {
  naarTilbakeTilJobbenMerEnnSeksManederGrunnFlervalg: {
    type: "CHECKBOX_GROUP",
    label:
      "Hvorfor tror du at du kommer til å være sykmeldt lenger enn 6 måneder?",
    description: null,
    options: [
      {
        id: "behandling_rehabilitering",
        label: "Deltar i omfattende behandling eller rehabilitering",
      },
      { id: "forhold_arbeidsplassen", label: "Forhold på arbeidsplassen" },
      {
        id: "usikker_fortsette_jobb",
        label: "Usikker på om jeg kan fortsette i jobben jeg har i dag",
      },
      {
        id: "manglende_tilrettelegging",
        label: "Manglende eller uklare muligheter for tilrettelegging",
      },
      { id: "andre_forhold", label: "Andre forhold" },
    ],
  },
} as const satisfies Record<string, CheckboxGroupQuestion>;

type CheckboxGroupFieldId = keyof typeof checkboxGroupQuestions;
type CheckboxGroupOptionId<T extends CheckboxGroupFieldId> =
  (typeof checkboxGroupQuestions)[T]["options"][number]["id"];

export function getCheckboxGroupOptionIds<T extends CheckboxGroupFieldId>(
  checkboxFieldId: T,
): CheckboxGroupOptionId<T>[] {
  return checkboxGroupQuestions[checkboxFieldId].options.map(
    (option) => option.id,
  ) as CheckboxGroupOptionId<T>[];
}
