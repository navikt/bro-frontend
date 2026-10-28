import z from "zod";
import type { AllowUnfilledFields } from "./types/FormValues";
import type { FormVariantConfig } from "./types/FormVariantConfig";

type FieldValues = Record<string, unknown>;

function isFieldValues(value: unknown): value is FieldValues {
  return typeof value === "object" && value !== null;
}

/**
 * Builds a validation schema from a variant config where fields with
 * `conditionallyAddIf` are only validated when they are added to the form.
 * Hidden fields are not validated at all, so e.g. a hidden required field
 * left as "" does not block submission.
 *
 * Visible conditional fields are validated with their schema from
 * `validationSchema`, with issues reported on the field's own path. The
 * refinements use `when` so they also run when other fields are invalid,
 * letting all field errors show at once.
 */
export function buildConditionalValidationSchema<
  F extends string,
  Schema extends z.ZodObject<Record<F, z.ZodType>>,
>(
  config: FormVariantConfig<F, Schema>,
): z.ZodType<
  AllowUnfilledFields<z.output<Schema>>,
  AllowUnfilledFields<z.input<Schema>>
> {
  const conditionalFields = config.formFields.filter(
    (fieldConfig) => fieldConfig.conditionallyAddIf !== undefined,
  );

  const fieldSchemas: Record<string, z.ZodType> = config.validationSchema.shape;

  const relaxedShape = Object.fromEntries(
    conditionalFields.map(({ fieldId }) => [fieldId, z.unknown()]),
  );

  let schema: z.ZodType = config.validationSchema.extend(relaxedShape);

  for (const { fieldId, conditionallyAddIf } of conditionalFields) {
    const fieldSchema = fieldSchemas[fieldId];

    const isAdded = (values: FieldValues) =>
      conditionallyAddIf?.(
        values as Parameters<NonNullable<typeof conditionallyAddIf>>[0],
      ) ?? true;

    schema = schema.refine(
      (values) =>
        !isFieldValues(values) ||
        !isAdded(values) ||
        fieldSchema.safeParse(values[fieldId]).success,
      {
        path: [fieldId],
        when: (payload) => isFieldValues(payload.value),
        error: (issue) => {
          const values = isFieldValues(issue.input) ? issue.input : {};
          return fieldSchema.safeParse(values[fieldId]).error?.issues[0]
            ?.message;
        },
      },
    );
  }

  return schema as z.ZodType<
    AllowUnfilledFields<z.output<Schema>>,
    AllowUnfilledFields<z.input<Schema>>
  >;
}
