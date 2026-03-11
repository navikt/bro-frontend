import { shouldIncludeTilbakeTilJobbBegrunnelseField } from "@/forms/kartleggingssporsmal/conditional-fields-logic";
import { fieldIdsDisplayOrder } from "@/forms/kartleggingssporsmal/fieldIdsDisplayOrder";
import { kartleggingssporsmalFormQuestions } from "@/forms/kartleggingssporsmal/formQuestions";
import type { KartleggingssporsmalForm } from "@/forms/kartleggingssporsmal/formSchema";
import type {
  FieldSnapshots,
  FormSnapshot,
} from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const FORM_IDENTIFIER = "kartleggingssporsmal";
export const FORM_SEMANTIC_VERSION = "1.0.0";
export const FORM_SNAPSHOT_VERSION = "1.0.0";

function mapAppFormToFieldSnapshots(
  values: KartleggingssporsmalForm,
): FieldSnapshots {
  const includeJobbBegrunnelseField =
    shouldIncludeTilbakeTilJobbBegrunnelseField(
      values.hvorSannsynligTilbakeTilJobben,
    );

  const fields: FieldSnapshots = [];

  for (const fieldId of fieldIdsDisplayOrder) {
    const question = kartleggingssporsmalFormQuestions[fieldId];

    switch (question.type) {
      case "TEXT": {
        if (
          fieldId !== "hvorSannsynligTilbakeTilJobbenBegrunnelse" ||
          (fieldId === "hvorSannsynligTilbakeTilJobbenBegrunnelse" &&
            includeJobbBegrunnelseField)
        ) {
          fields.push({
            fieldId,
            label: question.label,
            description: question.description,
            fieldType: "TEXT",
            value: values[fieldId] ?? "",
          });
        }

        break;
      }

      case "RADIO_GROUP": {
        const selectedId = values[fieldId];

        fields.push({
          fieldId,
          label: question.label,
          description: question.description,
          fieldType: question.type,
          options: question.options.map((option) => ({
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
}: {
  values: KartleggingssporsmalForm;
}): FormSnapshot {
  const fieldSnapshots = mapAppFormToFieldSnapshots(values);

  return {
    formIdentifier: FORM_IDENTIFIER,
    formSemanticVersion: FORM_SEMANTIC_VERSION,
    formSnapshotVersion: FORM_SNAPSHOT_VERSION,
    fieldSnapshots,
  };
}
