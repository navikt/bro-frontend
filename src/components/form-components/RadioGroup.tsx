import { RadioGroup as AkselRadioGroup, Radio } from "@navikt/ds-react";
import React from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useFieldContext } from "@/hooks/form";

type RadioOption = {
  id: string;
  label: string;
};
export type RadioGroupQuestion = {
  type: "RADIO_GROUP";
  label: string;
  description?: string;
  options: RadioOption[];
};

export function RadioGroup({ question }: { question: RadioGroupQuestion }) {
  const field = useFieldContext<string>();

  return (
    <AkselRadioGroup
      legend={question.label}
      value={field.state.value}
      description={question.description}
      onChange={(value) => {
        const selectedOption = question.options.find((o) => o.id === value);
        logTaxonomyEvent({
          name: "radio valg endret",
          properties: {
            komponentId: question.label,
            valgtAlternativ: selectedOption?.label ?? value,
            antallAlternativer: question.options.length,
          },
        });
        field.handleChange(value);
      }}
      onBlur={field.handleBlur}
      error={field.state.meta.errors[0]?.message}
    >
      {question.options.map((option) => (
        <Radio key={option.id} value={option.id}>
          {option.label}
        </Radio>
      ))}
    </AkselRadioGroup>
  );
}

export default RadioGroup;
