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
- Aksel v8
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

## Aksel v8

- Use `@navikt/ds-css` (not `@navikt/ds-css/darkside`).
- Use `Box` (not `BoxNew`).
- Prefer `space-*` tokens for spacing when Aksel props allow it.

## Instruction maintenance

- Agents may propose updates to `.github/*`, but must ask before changing them.
- Do not change `.github/*` automatically.

## Use these agents when relevant

- `nextjs-agent`: App Router, RSC/client boundaries, route handlers.
- `aksel-agent`: Aksel components and spacing tokens (v8).
- `auth-agent`: OASIS, TokenX, IdPorten, auth boundaries.

## Use these prompts when relevant

- `aksel-v8-migration-review`
- `new-route-handler`
- `new-env-var`
