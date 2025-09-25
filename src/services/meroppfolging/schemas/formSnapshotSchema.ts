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
export type TextFieldSnapshotRequest = z.infer<typeof textFieldSnapshotRequestSchema>

const textFieldSnapshotResponseSchema = textFieldSnapshotSchema.extend({
  description: z.string().nullable(),
  wasRequired: z.boolean(),
})
export type TextFieldSnapshotResponse = z.infer<typeof textFieldSnapshotResponseSchema>

const formSnapshotFieldOptionSchema = z.object({
  optionId: z.string(),
  optionLabel: z.string(),
  wasSelected: z.boolean(),
})

export type FieldSnapshotFieldOption = z.infer<typeof formSnapshotFieldOptionSchema>

const radioGroupFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal('RADIO_GROUP'),
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

export type FieldSnapshotRequest = z.infer<typeof fieldSnapshotRequestSchema>

export const formSnapshotRequestSchema = z.object({
  formSnapshot: z.object({
    formIdentifier: z.string(),
    formSemanticVersion: z.string(),
    formSnapshotVersion: z.string(),
    fieldSnapshots: z.array(fieldSnapshotRequestSchema),
  }),
})

const fieldSnapshotResponseSchema = z.union([textFieldSnapshotResponseSchema, radioGroupFieldSnapshotResponseSchema])

export type ResponseFieldSnapshot = z.infer<typeof fieldSnapshotResponseSchema>

export const formSnapshotResponseSchema = z.object({
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(fieldSnapshotResponseSchema),
})

export type FormSnapshotRequestDto = z.infer<typeof formSnapshotRequestSchema>
export type FormSnapshotResponseDto = z.infer<typeof formSnapshotResponseSchema>

const kartleggingssporsmalSchema = z.object({
  formSnapshot: formSnapshotResponseSchema,
})

export const kandidatStatusResponseSchema = z.object({
  isKandidat: z.boolean(),
  formResponse: kartleggingssporsmalSchema.nullable(),
})

export type KandidatStatusResponse = z.infer<typeof kandidatStatusResponseSchema>
