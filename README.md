# bro-frontend

[![Build Status](https://github.com/navikt/bro-frontend/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/navikt/bro-frontend/actions/workflows/build-and-deploy.yaml)

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

## Miljøer

[🚀 Produksjon](https://www.nav.no/syk/kartleggingssporsmal)

[🛠️ Utvikling](https://www.ekstern.dev.nav.no/syk/kartleggingssporsmal)

[🎬 Demo](https://demo.ekstern.dev.nav.no/syk/kartleggingssporsmal)

## Formålet med appen

Appen brukes til kartlegging av situasjonen til personer som har vært sykmeldt en stund, mellom 6 og 9 uker.
Brukeren svarer på tre spørsmål, og svarene brukes av Nav i videre oppfølging.

- Henter kandidatstatus for å avgjøre om brukeren kan svare på skjemaet. Hvis den sykmeldte ikke er kandidat for behovsrettet oppfølging, vises siden "Ingen tilgang".
- Viser skjema når det ikke finnes tidligere svar
- Viser oppsummering når skjema allerede er besvart

## Backend-API

### Meroppfølging backend

Backend for hente kandidat status og sende karleggingsspørsmål.

[Meroppfølging backend repo](https://github.com/navikt/meroppfolging-backend)

Brukte endepunkter:
- **GET** `/api/v1/kartleggingssporsmal/kandidat-status`
- **POST** `/api/v1/kartleggingssporsmal`

### Lumi

[Lumi repo](https://github.com/navikt/lumi)

Personvernlig survey etter kandidat har sendt inn svarene.

Brukte endepunkter:
- **POST** `/api/lumi/feedback` (intern route i frontend)
- **POST** `/api/tokenx/v1/feedback` (Lumi API, videresending fra frontend)

## Utvikling (kjøre lokalt)

For å komme i gang med bygging og kjøring av appen, les vår [wiki for Next.js-applikasjoner](https://github.com/navikt/esyfo-dev-tools/wiki/nextjs-build-run).

Når appen er startet, åpne http://localhost:3000/syk/kartleggingssporsmal
