---
name: new-route-handler
description: Scaffold a Next.js App Router route handler with validation and logging
---

Ask for:
- Route path (e.g. `/api/example`)
- Method(s): GET/POST/PUT/DELETE
- Input schema (Zod)
- Auth required or public
- Response shape

## Template

```ts
import { NextResponse } from "next/server";
import { logger } from "@navikt/next-logger";
import { z } from "zod";

const inputSchema = z.object({
  // define input
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = inputSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    // TODO: handle request
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Route failed: ${message}`);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

## Rules

- Validate inputs with Zod.
- Log with `@navikt/next-logger`.
- Do not log tokens, headers, or PII.
