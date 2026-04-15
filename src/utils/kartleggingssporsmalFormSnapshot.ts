import { getFieldsToIncludeInForm } from "@/forms/kartleggingssporsmal/formVariants/getFieldsToIncludeInForm";
import type { FormValuesForVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormValues";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import type {
  FieldSnapshot,
  FormSnapshot,
} from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const FORM_IDENTIFIER_PREFIX = "kartleggingssporsmal";
export const FORM_SEMANTIC_VERSION = "2.0.0";
export const FORM_SNAPSHOT_VERSION = "1.0.0";

function getFormIdentifier(formVariant: FormVariant): string {
  return `${FORM_IDENTIFIER_PREFIX}_${formVariant}`;
}

function mapFormValuesToFieldSnapshots<T extends FormVariant>(
  formVariant: T,
  formValues: FormValuesForVariant<T>,
): FieldSnapshot[] {
  const fields: FieldSnapshot[] = [];
  const fieldsToInclude = getFieldsToIncludeInForm(formVariant, formValues);

  for (const { fieldId, questionDefinition, isRequired } of fieldsToInclude) {
    if (!(fieldId in formValues)) {
      continue;
    }

    // The type assertion on fieldId is safe because formValues type is inferred
    // from schema for variant, and the schema must include the fields IDs in
    // fieldsToInclude, ensured by FormVariantConfig generic constraint.
    const fieldValue = formValues[fieldId as keyof typeof formValues];

    switch (questionDefinition.type) {
      case "TEXT": {
        fields.push({
          fieldId,
          label: questionDefinition.label,
          description: questionDefinition.description,
          fieldType: "TEXT",
          value: String(fieldValue ?? ""),
          wasRequired: isRequired,
        });

        break;
      }

      case "RADIO_GROUP": {
        const selectedId = String(fieldValue ?? "");

        fields.push({
          fieldId,
          label: questionDefinition.label,
          description: questionDefinition.description,
          fieldType: questionDefinition.type,
          options: questionDefinition.options.map((option) => ({
            optionId: option.id,
            optionLabel: option.label,
            wasSelected: option.id === selectedId,
          })),
          wasRequired: isRequired,
        });

        break;
      }
    }
  }

  return fields;
}

export function mapFormValuesToSnapshot<T extends FormVariant>({
  formVariant,
  values,
}: {
  formVariant: T;
  values: FormValuesForVariant<T>;
}): FormSnapshot {
  const fieldSnapshots = mapFormValuesToFieldSnapshots(formVariant, values);

  return {
    formIdentifier: getFormIdentifier(formVariant),
    formSemanticVersion: FORM_SEMANTIC_VERSION,
    formSnapshotVersion: FORM_SNAPSHOT_VERSION,
    fieldSnapshots,
  };
}
