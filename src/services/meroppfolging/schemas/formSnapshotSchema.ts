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
export type FieldSnapshotRequest = z.infer<typeof fieldSnapshotsRequestSchema>
export const fieldSnapshotsRequestSchema = z.array(fieldSnapshotRequestSchema)
export type FieldSnapshotsRequest = z.infer<typeof fieldSnapshotsRequestSchema>

export const formSnapshotRequestSchema = z.object({
  formSnapshot: z.object({
    formIdentifier: z.string(),
    formSemanticVersion: z.string(),
    formSnapshotVersion: z.string(),
    fieldSnapshots: fieldSnapshotsRequestSchema,
  }),
})

const fieldSnapshotResponseSchema = z.union([textFieldSnapshotResponseSchema, radioGroupFieldSnapshotResponseSchema])
const fieldSnapshotsResponseSchema = z.array(fieldSnapshotResponseSchema)
export type FieldSnapshotsResponse = z.infer<typeof fieldSnapshotsResponseSchema>

export const formSnapshotResponseSchema = z.object({
  formSemanticVersion: z.string(),
  fieldSnapshots: fieldSnapshotsResponseSchema,
})

export type FormSnapshotRequest = z.infer<typeof formSnapshotRequestSchema>
export type FormSnapshotResponse = z.infer<typeof formSnapshotResponseSchema>

const kartleggingssporsmalSchema = z.object({
  formSnapshot: formSnapshotResponseSchema,
})

export const kandidatStatusResponseSchema = z.object({
  isKandidat: z.boolean(),
  formResponse: kartleggingssporsmalSchema.nullable(),
})

export type KandidatStatusResponse = z.infer<typeof kandidatStatusResponseSchema>
