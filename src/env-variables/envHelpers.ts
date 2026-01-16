import { z } from "zod/v4";

export function throwEnvSchemaParsingError(e: unknown): never {
  if (e instanceof z.ZodError) {
    throw new Error(
      `The following envs are missing: ${
        e.issues
          .filter(
            (it) =>
              it.code === "invalid_type" &&
              it.message.includes("received undefined"),
          )
          .map((it) => it.path.join("."))
          .join(", ") || "None are missing, but zod is not happy. Look at cause"
      }`,
      { cause: e },
    );
  } else {
    throw e;
  }
}
export const isDemo = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";

export const isLocalOrDemo =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" || isDemo;

export const environment =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod" ? "prod" : "dev";
