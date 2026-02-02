# Copilot instructions for bro-frontend

## Scope

This repo stores all Copilot guidance under `./.github/` only. Do not duplicate instructions elsewhere.
Prefer one primary agent per task. If needed, switch primary agent or delegate explicitly, but avoid conflicting guidance.

## Delegation (sub-agents)

- Keep one primary agent responsible for the final output.
- Delegate narrowly scoped subtasks (one question, one deliverable) to secondary agents.
- Merge results explicitly; if guidance conflicts, ask for clarification or choose one approach and document why.

## Stack

- Next.js App Router (Next 15)
- React 19
- TypeScript strict
- Biome for lint/format
- Vitest for tests
- Aksel v7 today, v8 upgrade planned
- Tailwind v4 preset via `@navikt/ds-tailwind`
- Auth: OASIS + TokenX OBO + IdPorten sidecar
- Logging: `@navikt/next-logger`

## Commands

```sh
npm run dev
npm run lint
npm test
npm run build
```

## Defaults

- Prefer Aksel components and spacing tokens.
- Tailwind is allowed only when Aksel cannot express the layout or a small one-off style.
- Keep RSC/client boundaries correct: add "use client" only when needed.
- Use Zod for input and response validation.
- Use `@navikt/next-logger` for server-side logs.

## Aksel v7 vs v8

- Today: v7 patterns are in use (`BoxNew`, `@navikt/ds-css/darkside`).
- After the v8 upgrade: update Aksel rules in `./.github/instructions/aksel.instructions.md` and the v8 review prompt.
- Do not introduce v8-only patterns before the upgrade is completed.

## Instruction maintenance

- Agents may propose updates to `.github/*`, but must ask before changing them.
- Do not change `.github/*` automatically.

## Use these agents when relevant

- `nextjs-agent`: App Router, RSC/client boundaries, route handlers.
- `aksel-agent`: Aksel components, spacing, v7->v8 migration.
- `auth-agent`: OASIS, TokenX, IdPorten, auth boundaries.

## Use these prompts when relevant

- `aksel-v8-migration-review`
- `new-route-handler`
- `new-env-var`
