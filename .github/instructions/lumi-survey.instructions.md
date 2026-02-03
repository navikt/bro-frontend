---
applyTo: "src/{components/lumi,app/api/lumi}/**/*.{ts,tsx}"
---

# Lumi Survey integration rules

## Architecture (required)

- Use `@navikt/lumi-survey` in the client.
- The widget must **not** post directly to Lumi API from the browser.
- Client should send `submission.transportPayload` to this app (route handler or server action).
- Server must do TokenX OBO exchange and forward to Lumi API:
  - TokenX (end-user): `POST ${LUMI_API_HOST}/api/tokenx/v1/feedback`

## Environment variables

- `LUMI_API_HOST` (e.g. `http://lumi-api`)
- `LUMI_API_CLIENT_ID` (TokenX audience, e.g. `dev-gcp:team-esyfo:lumi-api`)

## Privacy

- Do not include identifiers in Lumi `context` (no fnr, no internal IDs).
- Prefer no tags unless you have a clear low-cardinality segmentation need.

## Boundaries

### Always
- Keep token exchange server-side.
- Do not log tokens, headers, or payloads.

### Ask first
- Changing `surveyId` naming or data fields sent to Lumi.
