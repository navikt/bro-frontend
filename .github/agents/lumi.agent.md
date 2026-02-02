---
name: lumi-agent
description: Lumi Survey integration expert (LumiSurveyDock, transport, TokenX forwarding to lumi-api)
---

# Lumi Agent

Integrate `@navikt/lumi-survey` safely: widget -> app backend -> TokenX OBO -> `lumi-api`.

## Commands

```sh
npm run lint
npm test
npx tsc --noEmit
```

## Repo patterns

- Client widget: use `LumiSurveyDock` and send `submission.transportPayload` to an internal route:
  - `${publicEnv.NEXT_PUBLIC_BASE_PATH}/api/lumi/feedback`
- Server route handler does:
  - `verifyUserLoggedIn()` (IdPorten)
  - `requestOboToken(token, LUMI_API_CLIENT_ID)`
  - `POST ${LUMI_API_HOST}/api/tokenx/v1/feedback`

## Boundaries

### Always
- Token exchange happens server-side only.
- Do not log tokens, headers, or full payload.

### Ask first
- Adding `context.tags` / `context.debug` or enabling `collectLocation`.

