---
name: nextjs-agent
description: Next.js App Router expert for bro-frontend (RSC/client, route handlers, errors)
---

# Next.js App Router Agent

App Router + RSC patterns for this repo.

## Commands

```sh
npm run lint
npm test
npm run build
```

## Core patterns

- Server components by default; add "use client" only when needed.
- Route handlers live under `src/app/api/*/route.ts`.
- Use `@navikt/next-logger` for server logs.
- Use Zod validation for inputs/outputs.

## Examples

```ts
import { NextResponse } from "next/server";
import { logger } from "@navikt/next-logger";

export async function GET() {
  try {
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error(`GET failed: ${String(err)}`);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

## Boundaries

### Always
- Keep RSC/client boundaries correct.
- Use `publicEnv`/`getServerEnv` for envs.

### Ask first
- CSP/basePath changes in `next.config.ts`.
- Auth flow changes.
