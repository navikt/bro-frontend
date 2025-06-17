import { z } from 'zod/v4'

const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  label: z.string(),
})

const textFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal('TEXT'),
  description: z.string().optional(),
  value: z.string(),
})

const textFieldSnapshotRequestSchema = textFieldSnapshotSchema.extend({
  description: z.string().optional(),
  wasRequired: z.boolean().optional(),
})

const textFieldSnapshotResponseSchema = textFieldSnapshotSchema.extend({
  description: z.string().nullable(),
  wasRequired: z.boolean(),
})

const formSnapshotFieldOptionSchema = z.object({
  optionId: z.string(),
  optionLabel: z.string(),
  wasSelected: z.boolean(),
})

export type FieldSnapshotFieldOption = z.infer<typeof formSnapshotFieldOptionSchema>

const radioGroupFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal('RADIO_GROUP'),
  selectedOptionId: z.string(),
  selectedOptionLabel: z.string(),
  options: z.array(formSnapshotFieldOptionSchema),
})

const radioGroupFieldSnapshotRequestSchema = radioGroupFieldSnapshotSchema.extend({
  description: z.string().optional(),
  wasRequired: z.boolean().optional(),
})

export type RadioGroupFieldSnapshotRequest = z.infer<typeof radioGroupFieldSnapshotRequestSchema>

const radioGroupFieldSnapshotResponseSchema = radioGroupFieldSnapshotSchema.extend({
  description: z.string().nullable(),
  wasRequired: z.boolean(),
})

const fieldSnapshotRequestSchema = z.union([textFieldSnapshotRequestSchema, radioGroupFieldSnapshotRequestSchema])

export type FieldSnapshot = z.infer<typeof fieldSnapshotRequestSchema>

export const formSnapshotRequestSchema = z.object({
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(fieldSnapshotRequestSchema),
})

const fieldSnapshotResponseSchema = z.union([textFieldSnapshotResponseSchema, radioGroupFieldSnapshotResponseSchema])

export type ResponseFieldSnapshot = z.infer<typeof fieldSnapshotResponseSchema>

export const formSnapshotResponseSchema = z.object({
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(fieldSnapshotResponseSchema),
})

export type FormSnapshotRequestDto = z.infer<typeof formSnapshotRequestSchema>
export type FormSnapshotResponseDto = z.infer<typeof formSnapshotResponseSchema>
