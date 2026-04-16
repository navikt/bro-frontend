import { FormSummary as AkselFormSummary } from "@navikt/ds-react";
import {
  FormSummaryAnswer,
  FormSummaryAnswers,
  FormSummaryHeader,
  FormSummaryHeading,
  FormSummaryLabel,
  FormSummaryValue,
} from "@navikt/ds-react/FormSummary";
import type { FormSnapshot } from "@/services/meroppfolging/schemas/formSnapshotSchema";

type Props = {
  formSnapshot: FormSnapshot;
};

export default function KartleggingssporsmalFormSummary({
  formSnapshot,
}: Props) {
  const items = mapFormSnapshotToSummaryItems(formSnapshot);

  return (
    <AkselFormSummary>
      <FormSummaryHeader>
        <FormSummaryHeading level="2">Dette svarte du</FormSummaryHeading>
      </FormSummaryHeader>
      <FormSummaryAnswers>
        {items.map((item) => (
          <FormSummaryAnswer key={item.id}>
            <FormSummaryLabel>{item.label}</FormSummaryLabel>
            <FormSummaryValue>
              {item.type === "TEXT" && item.value === "" ? (
                <em>Ingen tekst</em>
              ) : (
                item.value
              )}
            </FormSummaryValue>
          </FormSummaryAnswer>
        ))}
      </FormSummaryAnswers>
    </AkselFormSummary>
  );
}

type FormSummaryItem = {
  id: string;
  label: string;
  value: string;
  type: "TEXT" | "RADIO_GROUP";
};

function mapFormSnapshotToSummaryItems(
  formSnapshot: FormSnapshot,
): FormSummaryItem[] {
  return formSnapshot.fieldSnapshots
    .map((field) => {
      switch (field.fieldType) {
        case "RADIO_GROUP": {
          const selectedOption = field.options.find(
            (option) => option.wasSelected,
          );
          return {
            id: field.fieldId,
            label: field.label,
            value: selectedOption?.optionLabel || "",
            type: "RADIO_GROUP",
          };
        }
        case "TEXT": {
          return {
            id: field.fieldId,
            label: field.label,
            value: field.value,
            type: "TEXT",
          };
        }
        default:
          return undefined as never;
      }
    })
    .filter((item): item is FormSummaryItem => item !== undefined);
}
