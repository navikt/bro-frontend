import {
  CheckboxGroup as AkselCheckboxGroup,
  BodyShort,
  Box,
  Checkbox,
} from "@navikt/ds-react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useFieldContext } from "@/hooks/form";

type CheckboxOption = {
  id: string;
  label: string;
  description?: string;
};

export type CheckboxGroupQuestion = {
  type: "CHECKBOX_GROUP";
  label: string;
  description: string | null;
  options: CheckboxOption[];
};

interface Props {
  question: CheckboxGroupQuestion;
  isRequired: boolean;
}

export function CheckboxGroup({ question, isRequired }: Props) {
  const field = useFieldContext<string[]>();

  const modifiedLabel = `${question.label}${!isRequired ? " (Valgfritt)" : ""}`;
  const selectedValues = Array.isArray(field.state.value)
    ? field.state.value
    : [];

  return (
    <AkselCheckboxGroup
      legend={modifiedLabel}
      value={selectedValues}
      description={<BodyShort size="small">{question.description}</BodyShort>}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      error={field.state.meta.errors[0]?.message}
    >
      <Box marginBlock="space-0 space-4">
        {question.options.map((option) => (
          <Checkbox
            key={option.id}
            value={option.id}
            description={option.description}
            onChange={(e) => {
              logTaxonomyEvent({
                name: "avkrysningsboks endret",
                properties: {
                  tekst: option.label,
                  checked: e.target.checked,
                },
              });
            }}
          >
            {option.label}
          </Checkbox>
        ))}
      </Box>
    </AkselCheckboxGroup>
  );
}

export default CheckboxGroup;
