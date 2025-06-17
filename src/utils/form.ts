import { RadioOption } from '@/services/meroppfolging/schemas/questionSchema'
import { RadioGroupFieldSnapshotRequest } from '@/services/meroppfolging/schemas/formSnapshotSchema'

export function getSelectedRadioOption(
  options: RadioOption[],
  selectedKey: string,
): Pick<RadioGroupFieldSnapshotRequest, 'selectedOptionId' | 'selectedOptionLabel' | 'options'> | null {
  const selectedOption = options.find(({ id }) => id === selectedKey)

  if (!selectedOption) return null

  const fieldOptions = options.map((option) => ({
    optionId: option.id,
    optionLabel: option.label,
    wasSelected: option.id === selectedKey,
  }))

  return {
    selectedOptionId: selectedOption.id,
    selectedOptionLabel: selectedOption.label,
    options: fieldOptions,
  }
}
