import { BodyShort } from '@navikt/ds-react'
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
  title?: string
  items?: FormSummaryItem[] | null
}

export default function KartleggingssporsmalFormSummary({ items }: Props) {
  const hasItems = !!items && items.length > 0

  return (
    <AkselFormSummary className="max-w-3xl">
      <FormSummaryHeader>
        <FormSummaryHeading level="2">Oppsummering av svar</FormSummaryHeading>
      </FormSummaryHeader>

      {!hasItems && <BodyShort>Skjemaet er sendt inn. Takk for svarene dine.</BodyShort>}

      {hasItems && (
        <FormSummaryAnswers>
          {items!.map((it, idx) => (
            <FormSummaryAnswer key={idx}>
              <FormSummaryLabel>{it.label}</FormSummaryLabel>
              <FormSummaryValue>{it.value}</FormSummaryValue>
            </FormSummaryAnswer>
          ))}
        </FormSummaryAnswers>
      )}
    </AkselFormSummary>
  )
}
