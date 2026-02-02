---
name: aksel-v8-migration-review
description: Review checklist for Aksel v8 upgrade in bro-frontend
---

Use this prompt after upgrading Aksel packages to v8.

## Commands

```sh
npm run lint
npm test
npm run build
```

## Fast grep checks

Look for common v7 leftovers:

- `@navikt/ds-css/darkside`
- `BoxNew`
- Deprecated variants: `"danger"`, `"tertiary-neutral"`, `"secondary-neutral"`
- Tailwind spacing utilities in Aksel layouts (`p-`, `m-`, `gap-`, `space-`)

## Checklist

- CSS import uses `@navikt/ds-css`.
- Replace `BoxNew` with `Box`.
- Spacing uses `space-*` tokens.
- Use `data-color` + standard variants for destructive/neutral actions.
- No runtime errors about missing Aksel styles.

## Report

Summarize:
- Files changed for v8
- Any remaining v7 patterns
- Any UI regressions to verify manually
