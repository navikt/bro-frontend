# bro-frontend agents guide

Start with one primary agent. If a task spans multiple domains, either switch primary agent or delegate explicitly, but avoid conflicting guidance.

## Using sub-agents (delegation)

When you need help from another domain:

- Keep one primary agent responsible for the final answer/change set.
- Delegate a narrowly scoped subtask to a secondary agent (one question, one deliverable).
- Bring the result back and decide; do not merge conflicting recommendations blindly.
- If the task changes direction, switch the primary agent explicitly.

## Quick map

- App Router: `src/app/*`
- API routes: `src/app/api/*`
- Auth: `src/auth/*`
- Env validation: `src/env-variables/*`
- Services: `src/services/*`
- NAIS config: `nais/*`

## Commands

```sh
npm run dev
npm run lint
npm test
npm run build
```

## Defaults

- Prefer Aksel components and spacing tokens first.
- Use Tailwind only when Aksel cannot express a layout or a small one-off style.
- Log with `@navikt/next-logger` on the server; avoid `console.*` in app code.
- Validate inputs and responses with Zod.

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
