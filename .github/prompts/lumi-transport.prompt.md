---
name: lumi-transport
description: Add Lumi Survey widget + server forwarding route (TokenX) using bro-frontend patterns
---

Ask for:
- `surveyId` (stable string)
- Where to render the widget (page/component)
- Whether to add `context` (default: none)

## Steps (bro-frontend)

1) Client:
- Add `@navikt/lumi-survey/styles.css` in `src/app/layout.tsx`.
- Render `LumiSurveyDock` and implement `transport.submit` to POST `submission.transportPayload` to:
  - `${publicEnv.NEXT_PUBLIC_BASE_PATH}/api/lumi/feedback`

2) Server:
- Implement `src/app/api/lumi/feedback/route.ts`:
  - verify user (`verifyUserLoggedIn`)
  - TokenX OBO to `LUMI_API_CLIENT_ID`
  - forward payload to `${LUMI_API_HOST}/api/tokenx/v1/feedback`

3) Env/NAIS:
- Add server envs: `LUMI_API_HOST`, `LUMI_API_CLIENT_ID`
- Outbound accessPolicy must allow `lumi-api`

## Rules

- Never call `lumi-api` directly from the browser.
- Do not log tokens, headers, or full payload.

