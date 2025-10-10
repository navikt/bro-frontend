import { RadioGroupFieldSnapshot, FieldSnapshots } from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { kartleggingsspormalFormQuestions, KartleggingssporsmalForm } from '@/domain/kartleggingsspormaFormValues'
import { type FormSummaryItem } from '@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummary'

function withRadioFieldValues(values: KartleggingssporsmalForm) {
  return <K extends keyof typeof kartleggingsspormalFormQuestions>(fieldId: K): RadioGroupFieldSnapshot => {
    const question = kartleggingsspormalFormQuestions[fieldId]
    const selectedId = values[fieldId]
    return {
      fieldId,
      label: question.label,
      fieldType: 'RADIO_GROUP',
      options: question.options.map((option) => ({
        optionId: option.id,
        optionLabel: option.label,
        wasSelected: option.id === selectedId,
      })),
    }
  }
}

export function mapAppFormToSnapshot({ values }: { values: KartleggingssporsmalForm }): FieldSnapshots {
  const mapRadio = withRadioFieldValues(values)
  const fieldSnapshots = [
    mapRadio('hvorSannsynligTilbakeTilJobben'),
    mapRadio('samarbeidOgRelasjonTilArbeidsgiver'),
    mapRadio('naarTilbakeTilJobben'),
  ]

  return fieldSnapshots
}

export function mapFormSnapshotToSummaryItems(snapshots: FieldSnapshots): FormSummaryItem[] {
  return snapshots.map((field) => {
    switch (field.fieldType) {
      case 'RADIO_GROUP':
        const selectedOption = field.options.find((option) => option.wasSelected)
        return {
          label: field.label,
          value: selectedOption?.optionLabel || '',
        }
      case 'TEXT':
        return {
          label: field.label,
          value: field.value,
        }
    }
  })
}
