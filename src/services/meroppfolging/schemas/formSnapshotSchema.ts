import { z } from "zod";

const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  wasRequired: z.boolean().nullable(),
});

const textFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("TEXT"),
  value: z.string(),
});

const formSnapshotFieldOptionSchema = z.object({
  optionId: z.string(),
  optionLabel: z.string(),
  wasSelected: z.boolean(),
});

const radioGroupFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("RADIO_GROUP"),
  options: z.array(formSnapshotFieldOptionSchema),
});
export type RadioGroupFieldSnapshot = z.infer<
  typeof radioGroupFieldSnapshotSchema
>;

export const fieldSnapshotSchema = z.union([
  textFieldSnapshotSchema,
  radioGroupFieldSnapshotSchema,
]);
export type FieldSnapshot = z.infer<typeof fieldSnapshotSchema>;

export const formSnapshotSchema = z.object({
  formIdentifier: z.string(),
  formSemanticVersion: z.string(),
  formSnapshotVersion: z.string(),
  fieldSnapshots: z.array(fieldSnapshotSchema),
});

export type FormSnapshot = z.infer<typeof formSnapshotSchema>;
