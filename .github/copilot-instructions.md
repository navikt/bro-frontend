# bro-frontend

```sh
pnpm dev
pnpm test --run
pnpm lint
pnpm build
```

`mise run verify` runs fixing commands and can change files.

- URLs and redirects must include `publicEnv.NEXT_PUBLIC_BASE_PATH`
  (`/syk/kartleggingssporsmal` in deployed environments).
- Candidate status comes from the backend: non-candidates see no-access;
  existing `formResponse` shows the summary; only unanswered candidates get
  the form. Keep the backend's `skjemavariant` when choosing the form.
- New environment variables need both the schema and raw value in the
  existing `publicEnv`/`getServerEnv` helpers.
- Lumi submits `transportPayload` to this app's `/api/lumi/feedback`; its
  server route validates login and exchanges TokenX for Lumi's separate
  audience outside local/demo. Local/demo returns mock success; keep that
  bypass gated. Do not call Lumi directly from the browser.
- Lumi context is limited to form variant and text-field visibility. Keep
  identifiers and free-text answers out of context tags.
