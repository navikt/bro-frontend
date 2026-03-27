import { z } from "zod/v4";
import { formSnapshotSchema } from "./formSnapshotSchema";

/**
 * Denne listen må oppdateres når en ny skjemavariant legges til i
 * `ismeroppfolging`. En skjemavariant kan fjernes hvis den ikke lenger finnes
 * i kandidat-tabellen i `meroppfolging-backend`, og ikke lenger kan komme inn
 * i tabellen.
 */
export const gyldigeSkjemavarianter = [
  "FLERVALG_V1",
  "FLERVALG_FRITEKST_V1",
] as const;

export const skjemavariantSchema = z.enum(gyldigeSkjemavarianter);
export type Skjemavariant = z.infer<typeof skjemavariantSchema>;

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
  // denne er nå not null fra backend sant?
  skjemavariant: skjemavariantSchema,
  formResponse: kartleggingssporsmalFormResponseSchema.nullable(),
});
export type KandidatStatusResponse = z.infer<
  typeof kandidatStatusResponseSchema
>;
