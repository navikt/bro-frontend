---
applyTo: "src/auth/**/*.{ts,tsx}"
---

# Auth rules (OASIS / TokenX / IdPorten)

- Auth helpers live in `src/auth/*`. `src/auth/rsc.ts` verifies the logged-in user.
- `src/auth/tokenUtils.ts` implements `exchangeIdportenTokenForMeroppfolgingBackendTokenx`
  using `@navikt/oasis` and the environment-derived backend audience.
- OBO exchange uses `@navikt/oasis` + TokenX.
- Redirects should use `publicEnv.NEXT_PUBLIC_BASE_PATH`.
- Do not log tokens, headers, or PII.

## Boundaries

### Always
- Keep auth logic centralized in `src/auth/*`.
- Use `getServerEnv()` for TokenX/IdPorten envs.

### Ask first
- Changes to auth flows, token exchange, or IdPorten settings.

