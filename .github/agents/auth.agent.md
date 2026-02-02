---
name: auth-agent
description: Auth expert for bro-frontend (OASIS, TokenX OBO, IdPorten)
---

# Auth Agent

Focus on auth boundaries and token exchange patterns.

## Commands

```sh
npm run lint
npm test
```

## Core patterns

- Auth helpers in `src/auth/*`.
- Token exchange in `src/auth/tokenUtils.ts` using `@navikt/oasis`.
- Do not log tokens, headers, or PII.
- Redirects should use `publicEnv.NEXT_PUBLIC_BASE_PATH`.

## Boundaries

### Always
- Keep auth logic centralized in `src/auth/*`.
- Use `getServerEnv()` for TokenX envs.

### Ask first
- Changes to auth flows, token exchange, or IdPorten settings.
