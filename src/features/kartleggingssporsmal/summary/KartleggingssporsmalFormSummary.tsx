import { FormSummary as AkselFormSummary } from '@navikt/ds-react'
import {
  FormSummaryAnswer,
  FormSummaryLabel,
  FormSummaryValue,
  FormSummaryHeader,
  FormSummaryHeading,
  FormSummaryAnswers,
} from '@navikt/ds-react/FormSummary'

export type FormSummaryItem = {
  label: string
  value: string
}

type Props = {
  items: FormSummaryItem[]
}

export default function KartleggingssporsmalFormSummary({ items }: Props) {
  return (
    <AkselFormSummary>
      <FormSummaryHeader>
        <FormSummaryHeading level="2">Oppsummering av svar</FormSummaryHeading>
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
  )
}
