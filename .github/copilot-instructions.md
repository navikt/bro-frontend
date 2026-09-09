# Copilot instructions for bro-frontend

## Scope

Repository-wide facts are in this file and `AGENTS.md`; path-scoped rules are in `.github/instructions/`. Keep each fact in one place and avoid conflicting copies.

## Quick map

- App Router: `src/app/*`
- API routes: `src/app/api/*`
- Auth: `src/auth/*`
- Env validation: `src/env-variables/*`
- Services: `src/services/*`
- NAIS config: `nais/*`
- Lumi survey: `src/components/lumi/*`, `src/app/api/lumi/*`

## Stack

- Next.js App Router (version in `package.json`)
- React 19
- TypeScript strict
- Biome for lint/format
- Vitest for tests
- Aksel v8
- Tailwind v4 preset via `@navikt/ds-tailwind`
- Auth: OASIS + TokenX OBO + IdPorten sidecar
- Logging: `@navikt/next-logger`

## Commands

```sh
pnpm run dev
pnpm run lint
pnpm run test --run
pnpm run build
```

## Defaults

- Prefer Aksel components and spacing tokens.
- Tailwind is allowed only when Aksel cannot express the layout or a small one-off style.
- Keep RSC/client boundaries correct: add "use client" only when needed.
- Use Zod for input and response validation.
- Use `@navikt/next-logger` for server-side logs.

## Aksel v8

- Use `@navikt/ds-css` (not `@navikt/ds-css/darkside`).
- Use `Box` (not `BoxNew`).
- Prefer `space-*` tokens for spacing when Aksel props allow it.

## Instruction maintenance

- Agents may propose updates to `.github/*`, but must ask before changing them.
- Do not change `.github/*` automatically.

## Local specializations

Repository-specific Aksel, authentication, environment and UI rules are in
`.github/instructions/`. Read the matching path instructions instead of
selecting a duplicate local specialist role.

## Use these prompts when relevant

- `new-route-handler`
- `new-env-var`
- `lumi-transport`

## Boundaries

### Always
- Keep RSC/client boundaries intact.
- Use `publicEnv`/`getServerEnv` for environment variables.
- Keep auth/token code inside `src/auth/*` and `src/services/*`.

### Ask first
- Changes to auth flow (OASIS/TokenX/IdPorten).
- Changes to CSP or basePath handling (`next.config.ts`).
- NAIS path changes for health/ready endpoints.

### Never
- Log tokens, headers, or PII.
- Edit `.github/*` without explicit approval.

## Repository guidance

This repository owns its instructions, local specialists and issue/PR templates.
Update these files with verified repository facts when an authorized change
makes them stale. Shared agent roles and skills come from the selected
Grillmester plugin through nav-pilot; do not copy them into `.github/` or add a
file-sync workflow. Use the active client's catalog for exact callable IDs.
