import z from "zod";
import { formVariants } from "../formVariants";

export const formVariantSchema = z.enum(formVariants);
export type FormVariant = z.infer<typeof formVariantSchema>;
