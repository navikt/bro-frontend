import {
  getFieldsInOrderForSkjemavariant,
  shouldAddConditionalField,
} from "@/forms/kartleggingssporsmal/fieldVisibilityRules";
import { kartleggingssporsmalFormFields } from "@/forms/kartleggingssporsmal/formQuestions";
import type { KartleggingssporsmalForm } from "@/forms/kartleggingssporsmal/formSchema";
import type {
  FieldSnapshots,
  FormSnapshot,
} from "@/services/meroppfolging/schemas/formSnapshotSchema";
import type { Skjemavariant } from "@/services/meroppfolging/schemas/requestsAndResponses";

export const FORM_IDENTIFIER = "kartleggingssporsmal";
export const FORM_SEMANTIC_VERSION = "1.0.0";
export const FORM_SNAPSHOT_VERSION = "1.0.0";

function mapAppFormToFieldSnapshots(
  values: KartleggingssporsmalForm,
  skjemavariant: Skjemavariant,
): FieldSnapshots {
  const fields: FieldSnapshots = [];
  const fieldsForVariant = getFieldsInOrderForSkjemavariant(skjemavariant);

  for (const fieldId of fieldsForVariant) {
    if (!shouldAddConditionalField({ fieldId, formValues: values })) {
      continue;
    }

    const field = kartleggingssporsmalFormFields[fieldId];

    switch (field.type) {
      case "TEXT": {
        fields.push({
          fieldId,
          label: field.label,
          description: field.description,
          fieldType: "TEXT",
          value: values[fieldId] ?? "",
        });

        break;
      }

      case "RADIO_GROUP": {
        const selectedId = values[fieldId];

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

export function mapAppFormToSnapshot({
  values,
  skjemavariant,
}: {
  values: KartleggingssporsmalForm;
  skjemavariant: Skjemavariant;
}): FormSnapshot {
  const fieldSnapshots = mapAppFormToFieldSnapshots(values, skjemavariant);

  return {
    formIdentifier: FORM_IDENTIFIER,
    formSemanticVersion: FORM_SEMANTIC_VERSION,
    formSnapshotVersion: FORM_SNAPSHOT_VERSION,
    fieldSnapshots,
  };
}
