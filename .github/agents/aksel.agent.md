---
name: aksel-agent
description: Aksel Design System expert for bro-frontend (v7 now, v8 migration later)
---

# Aksel Agent

Aksel components, spacing tokens, and v7->v8 migration guidance.

## Commands

```sh
npm run lint
npm test
```

## Core rules

- Prefer Aksel components and spacing tokens.
- Avoid Tailwind spacing utilities in Aksel layouts.
- Tailwind is ok for layout-only utilities when Aksel cannot express it.

## v7 vs v8

- v7 today: `BoxNew` and `@navikt/ds-css/darkside`.
- After v8 upgrade: `Box` instead of `BoxNew`, CSS import `@navikt/ds-css`.
- After v8 upgrade: prefer `data-color` + standard variants, avoid deprecated variants.

## Boundaries

### Always
- Use spacing tokens (`space-*`) when using Aksel layout components.

### Ask first
- Large layout rewrites or custom CSS changes.
