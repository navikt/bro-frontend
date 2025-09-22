import { z } from 'zod/v4'

// Base question schema without ID field (ID will be inferred from key)
const baseQuestionSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional().default(false),
})

// Text question
export const textQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('TEXT'),
})

export type TextQuestion = z.infer<typeof textQuestionSchema>

// Radio option schema
export const radioOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
})

export type RadioOption = z.infer<typeof radioOptionSchema>

// Radio group question
export const radioGroupQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('RADIO_GROUP'),
  options: z.array(radioOptionSchema),
})

export type RadioGroupQuestion = z.infer<typeof radioGroupQuestionSchema>

// Base question schema (without ID) for use in the keyed questions object
export const questionSchema = z.discriminatedUnion('type', [textQuestionSchema, radioGroupQuestionSchema])

export type BaseQuestion = z.infer<typeof questionSchema>

// Schema for keyed questions object
export const questionsObjectSchema = z.record(z.string(), questionSchema)

export type QuestionsObject = z.infer<typeof questionsObjectSchema>

// Form schema using only object format for questions
export const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  questions: questionsObjectSchema,
})

export type ValidatedForm = z.infer<typeof formSchema>
