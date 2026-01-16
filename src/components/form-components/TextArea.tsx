import { Textarea } from "@navikt/ds-react";
import React from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useFieldContext } from "@/hooks/form";

export type TextQuestion = {
  label: string;
  description?: string;
  type: "TEXT";
};

type TextAreaProps = {
  question: TextQuestion;
  rows?: number;
  maxLength?: number;
};

export function TextArea({
  question,
  rows = 3,
  maxLength = 500,
}: TextAreaProps) {
  const field = useFieldContext<string>();

  return (
    <Textarea
      label={question.label}
      description={question.description}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={(e) => {
        logTaxonomyEvent({
          name: "textarea utfylt",
          properties: {
            komponentId: question.label,
            tegnlengde: e.target.value.length,
            harVerdi: e.target.value.length > 0,
            feltNavn: question.label,
          },
        });
        field.handleBlur();
      }}
      rows={rows}
      maxLength={maxLength}
      error={field.state.meta.errors[0]?.message}
    />
  );
}

export default TextArea;
