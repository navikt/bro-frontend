import type {
  FormSnapshotRequestDto,
  RadioGroupFieldSnapshotRequest,
  FormSnapshotResponseDto,
  ResponseFieldSnapshot,
} from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { formQuestions, formSchema } from '@/domain/formValues'
import type { z } from 'zod/v4'
import type { FormSummaryItem } from '@/components/FormSummary'

export type AppFormValues = z.infer<typeof formSchema>

function withRadioFieldValues(values: AppFormValues) {
  return <K extends keyof typeof formQuestions>(fieldId: K): RadioGroupFieldSnapshotRequest => {
    const question = formQuestions[fieldId]
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

export function mapAppFormToSnapshot({ values }: { values: AppFormValues }): FormSnapshotRequestDto {
  const mapRadio = withRadioFieldValues(values)
  const fieldSnapshots = [
    mapRadio('hvorSannsynligTilbakeTilJobben'),
    mapRadio('samarbeidOgRelasjonTilArbeidsgiver'),
    mapRadio('naarTilbakeTilJobben'),
  ]

  return {
    formSnapshot: {
      formIdentifier: 'bro',
      formSemanticVersion: '1',
      formSnapshotVersion: '1',
      fieldSnapshots: fieldSnapshots,
    },
  }
}

export function formSnapshotResponseToSummaryItems(snapshot: FormSnapshotResponseDto): FormSummaryItem[] {
  return snapshot.fieldSnapshots.map((field: ResponseFieldSnapshot) => {
    if (field.fieldType === 'RADIO_GROUP') {
      const selected = field.options.find((option) => option.wasSelected)
      return {
        label: field.label,
        value: selected?.optionLabel || '',
      }
    }
    if (field.fieldType === 'TEXT') {
      return {
        label: field.label,
        value: field.value,
      }
    }
    // fallback for unknown field types
    return {
      label: '',
      value: '',
    }
  })
}
