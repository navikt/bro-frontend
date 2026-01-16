import { FormSummary as AkselFormSummary } from "@navikt/ds-react";
import {
  FormSummaryAnswer,
  FormSummaryAnswers,
  FormSummaryHeader,
  FormSummaryHeading,
  FormSummaryLabel,
  FormSummaryValue,
} from "@navikt/ds-react/FormSummary";

export type FormSummaryItem = {
  label: string;
  value: string;
};

type Props = {
  items: FormSummaryItem[];
};

export default function KartleggingssporsmalFormSummary({ items }: Props) {
  return (
    <AkselFormSummary>
      <FormSummaryHeader>
        <FormSummaryHeading level="2">Dette svarte du</FormSummaryHeading>
      </FormSummaryHeader>
      <FormSummaryAnswers>
        {items.map((it, idx) => (
          <FormSummaryAnswer key={idx}>
            <FormSummaryLabel>{it.label}</FormSummaryLabel>
            <FormSummaryValue>{it.value}</FormSummaryValue>
          </FormSummaryAnswer>
        ))}
      </FormSummaryAnswers>
    </AkselFormSummary>
  );
}
