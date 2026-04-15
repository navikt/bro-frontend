import { RadioGroup as AkselRadioGroup, Radio } from "@navikt/ds-react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useFieldContext } from "@/hooks/form";

type RadioOption = {
  id: string;
  label: string;
};

export type RadioGroupQuestion = {
  type: "RADIO_GROUP";
  label: string;
  description: string | null;
  options: RadioOption[];
};

interface Props {
  question: RadioGroupQuestion;
  isRequired: boolean;
}

export function RadioGroup({ question, isRequired }: Props) {
  const field = useFieldContext<string>();

  const modifiedLabel = `${question.label}${!isRequired ? " (Valgfritt)" : ""}`;

  const handleChange = (value: string) => {
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
  };

  return (
    <AkselRadioGroup
      legend={modifiedLabel}
      value={field.state.value}
      description={question.description}
      onChange={handleChange}
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
