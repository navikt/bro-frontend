import { kartleggingssporsmalFormFields } from "@/forms/kartleggingssporsmal/fieldDefinitions/allFields";
import type { FormValuesForVariant } from "@/forms/kartleggingssporsmal/formVariants/FormValues";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import { getFieldIdsToIncludeInForm } from "@/forms/kartleggingssporsmal/formVariants/getFieldsToIncludeInForm/getFieldsToIncludeInForm";
import type {
  FieldSnapshots,
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
): FieldSnapshots {
  const fields: FieldSnapshots = [];
  const fieldsForVariant = getFieldIdsToIncludeInForm(formVariant, formValues);

  for (const fieldId of fieldsForVariant) {
    if (!(fieldId in formValues)) {
      continue;
    }

    const fieldValue = formValues[fieldId as keyof FormValuesForVariant<T>];
    const field = kartleggingssporsmalFormFields[fieldId];

    switch (field.type) {
      case "TEXT": {
        fields.push({
          fieldId,
          label: field.label,
          description: field.description,
          fieldType: "TEXT",
          value: String(fieldValue ?? ""),
        });

        break;
      }

      case "RADIO_GROUP": {
        const selectedId = String(fieldValue ?? "");

        fields.push({
          fieldId,
          label: field.label,
          description: field.description,
          fieldType: field.type,
          options: field.options.map((option) => ({
            optionId: option.id,
            optionLabel: option.label,
            wasSelected: option.id === selectedId,
          })),
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
