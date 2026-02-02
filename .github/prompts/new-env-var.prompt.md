---
name: new-env-var
description: Add a new environment variable with Zod validation
---

Ask for:
- Env name
- Public or server-only
- Required or optional
- Usage location

## Steps

1) If public, add to:
- `src/env-variables/publicEnv.ts` (schema + raw env)

2) If server-only, add to:
- `src/env-variables/serverEnv.ts` (schema + raw env)

3) If needed in both, add to both schemas and use `getServerEnv()`.

4) Update any usage sites and tests if needed.

## Rules

- Always validate with Zod schemas.
- Use `throwEnvSchemaParsingError` on parse failures.
- Do not read `process.env` directly outside env helpers.
