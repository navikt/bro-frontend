---
applyTo: "src/env-variables/**/*.{ts,tsx}"
---

# Environment variable rules

- Public envs: `src/env-variables/publicEnv.ts`.
- Server envs: `src/env-variables/serverEnv.ts`.
- Always validate envs with Zod schemas.
- Prefer `publicEnv`/`getServerEnv()`; do not read `process.env` directly outside env helpers.

## Boundaries

### Always
- Add new envs to the schema and raw env object.
- Use `throwEnvSchemaParsingError` on parse failures.

### Ask first
- Changing env variable semantics or names.

