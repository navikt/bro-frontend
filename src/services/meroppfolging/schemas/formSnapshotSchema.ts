import { z } from "zod/v4";

const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  label: z.string(),
  description: z.string().nullish(),
  wasRequired: z.boolean().nullish(),
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

export const fieldSnapshotsSchema = z.array(
  z.union([textFieldSnapshotSchema, radioGroupFieldSnapshotSchema]),
);
export type FieldSnapshots = z.infer<typeof fieldSnapshotsSchema>;

export const formSnapshotSchema = z.object({
  formIdentifier: z.string(),
  formSemanticVersion: z.string(),
  formSnapshotVersion: z.string(),
  fieldSnapshots: fieldSnapshotsSchema,
});

export type FormSnapshot = z.infer<typeof formSnapshotSchema>;
