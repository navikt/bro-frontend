import { z } from "zod";

export function throwEnvSchemaParsingError(e: unknown): never {
  if (e instanceof z.ZodError) {
    const invalidPaths = Array.from(
      new Set(e.issues.map((it) => it.path.join(".")).filter(Boolean)),
    );
    const missingPaths = e.issues
      .filter(
        (it) =>
          it.code === "invalid_type" &&
          it.message.includes("received undefined"),
      )
      .map((it) => it.path.join("."))
      .filter(Boolean);

    throw new Error(
      missingPaths.length > 0
        ? `The following envs are missing: ${missingPaths.join(", ")}`
        : `Invalid env value(s): ${invalidPaths.join(", ") || "Unknown"}`,
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
