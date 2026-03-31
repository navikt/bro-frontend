import { kartleggingssporsmalFormFields } from "@/forms/kartleggingssporsmal/fieldDefinitions/allFields";
import { getFieldsToIncludeForVariant } from "@/forms/kartleggingssporsmal/fieldInclusionLogic/fieldInclusionLogic";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import type { FormValues } from "@/forms/kartleggingssporsmal/types/FormValues";
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
  formValues: FormValues<T>,
  formVariant: T,
): FieldSnapshots {
  const fields: FieldSnapshots = [];
  const fieldsForVariant = getFieldsToIncludeForVariant(
    formVariant,
    formValues,
  );

  for (const fieldId of fieldsForVariant) {
    if (!(fieldId in formValues)) {
      continue;
    }

    const fieldValue = formValues[fieldId as keyof FormValues<T>];
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
  values,
  formVariant,
}: {
  values: FormValues<T>;
  formVariant: T;
}): FormSnapshot {
  const fieldSnapshots = mapFormValuesToFieldSnapshots(values, formVariant);

  return {
    formIdentifier: getFormIdentifier(formVariant),
    formSemanticVersion: FORM_SEMANTIC_VERSION,
    formSnapshotVersion: FORM_SNAPSHOT_VERSION,
    fieldSnapshots,
  };
}
