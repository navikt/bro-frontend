---
applyTo: "src/{components/lumi,app/api/lumi}/**/*.{ts,tsx}"
---

# Lumi Survey integration rules

## Repository sources

- `src/components/lumi/lumi.tsx` owns `LumiSurveyDock`, the survey ID and the
  client transport to `${publicEnv.NEXT_PUBLIC_BASE_PATH}/api/lumi/feedback`.
- `src/components/lumi/survey.ts` owns the survey content.
- `src/app/api/lumi/feedback/route.ts` owns login verification, TokenX exchange
  and forwarding. Local/demo handling stays in the existing route.
- Verify the installed package contract before changing these patterns; this
  repo currently uses an older Lumi API than some sibling applications.

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
- Existing tags describe form variant and text-field visibility. Keep them
  low-cardinality; new context fields, debug data or location collection require
  a reviewed data-minimization decision.

## Boundaries

### Always
- Keep token exchange server-side.
- Do not log tokens, headers, or payloads.

### Ask first
- Changing `surveyId` naming or data fields sent to Lumi.
