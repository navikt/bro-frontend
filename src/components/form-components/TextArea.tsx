import { Textarea } from "@navikt/ds-react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { TEXT_AREA_MAX_LENGTH } from "@/appConfig";
import { useFieldContext } from "@/hooks/form";

export type TextQuestion = {
  label: string;
  description: string | null;
  type: "TEXT";
};

interface Props {
  question: TextQuestion;
  rows?: number;
  maxLength?: number;
  isRequired: boolean;
}

export function TextArea({
  question,
  rows = 3,
  maxLength = TEXT_AREA_MAX_LENGTH,
  isRequired,
}: Props) {
  const field = useFieldContext<string>();

  const modifiedLabel = `${question.label}${!isRequired ? " (Valgfritt)" : ""}`;

  return (
    <Textarea
      label={modifiedLabel}
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
