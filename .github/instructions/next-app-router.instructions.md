---
applyTo: "src/app/**/*.{ts,tsx}"
---

# Next.js App Router rules

- Default to server components; add "use client" only when needed.
- Keep data fetching in server components or server actions where possible.
- Route handlers live under `src/app/api/*/route.ts`.
- Use `@navikt/next-logger` for server-side logs.
- Avoid `console.*` in app code.

## Error pages

- Use `src/app/error.tsx` and `src/app/not-found.tsx` patterns.
- Keep user-facing messages clear and non-technical.

## Boundaries

### Always
- Keep RSC/client boundaries intact.
- Use `publicEnv`/`getServerEnv` for environment variables.

### Ask first
- Changes to CSP/basePath (`next.config.ts`).
- Changes to auth flow or redirect behavior.
