---
applyTo: "src/auth/**/*.{ts,tsx}"
---

# Auth rules (OASIS / TokenX / IdPorten)

- Auth helpers live in `src/auth/*`.
- OBO exchange uses `@navikt/oasis` + TokenX.
- Redirects should use `publicEnv.NEXT_PUBLIC_BASE_PATH`.
- Do not log tokens, headers, or PII.

## Boundaries

### Always
- Keep auth logic centralized in `src/auth/*`.
- Use `getServerEnv()` for TokenX/IdPorten envs.

### Ask first
- Changes to auth flows, token exchange, or IdPorten settings.

