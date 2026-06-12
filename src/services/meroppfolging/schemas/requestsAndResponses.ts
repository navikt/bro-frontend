import { z } from "zod";
import { formVariantSchema } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
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

export const kandidatStatusResponseSchema = z.union([
  z.object({
    isKandidat: z.literal(true),
    skjemavariant: formVariantSchema,
    formResponse: kartleggingssporsmalFormResponseSchema.nullable(),
  }),
  z.object({
    isKandidat: z.literal(false),
    skjemavariant: z.null(),
    formResponse: z.null(),
  }),
]);
export type KandidatStatusResponse = z.infer<
  typeof kandidatStatusResponseSchema
>;
