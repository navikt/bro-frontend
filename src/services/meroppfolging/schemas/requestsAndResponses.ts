import { z } from "zod/v4";
import { formVariantSchema } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import { formSnapshotSchema } from "./formSnapshotSchema";

const formSnapshotRequestSchema = z.object({
  formSnapshot: formSnapshotSchema,
});
export type FormSnapshotRequest = z.infer<typeof formSnapshotRequestSchema>;

const kartleggingssporsmalFormResponseSchema = z.object({
  formSnapshot: formSnapshotSchema,
  createdAt: z.iso.datetime().transform((str) => new Date(str)),
});
export type KartleggingssporsmalFormResponse = z.infer<
  typeof kartleggingssporsmalFormResponseSchema
>;

export const submitKartleggingssporsmalResponseSchema =
  kartleggingssporsmalFormResponseSchema;
export type SubmitKartleggingssporsmalResponse = z.infer<
  typeof submitKartleggingssporsmalResponseSchema
>;

export const kandidatStatusResponseSchema = z.object({
  isKandidat: z.boolean(),
  skjemavariant: formVariantSchema,
  formResponse: kartleggingssporsmalFormResponseSchema.nullable(),
});
export type KandidatStatusResponse = z.infer<
  typeof kandidatStatusResponseSchema
>;
