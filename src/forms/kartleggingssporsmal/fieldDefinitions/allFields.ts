import { radioGroupFields } from "./radioGroupFields";
import { textFields } from "./textFields";

export const kartleggingssporsmalFormFields = {
  ...radioGroupFields,
  ...textFields,
} as const;
