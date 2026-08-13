import type { FieldSnapshot } from "@/services/meroppfolging/schemas/formSnapshotSchema";

export const fieldSnapshotsFlervalgV2Fixture: FieldSnapshot[] = [
  {
    fieldId: "mulighetForTilbakeTilJobbenFlervalg",
    label:
      "Hvordan ser du for deg muligheten for å komme tilbake til din nåværende jobb og stilling?",
    description:
      "Tenk over om du tror du kan komme helt eller delvis tilbake til din nåværende jobb og stilling, eller om du ser det som utfordrende.",
    fieldType: "RADIO_GROUP",
    wasRequired: true,
    options: [
      {
        optionId: "kommer_tilbake",
        optionLabel:
          "Jeg har tro på at jeg kommer tilbake til samme jobb og stilling",
        wasSelected: true,
      },
      {
        optionId: "utfordrende",
        optionLabel:
          "Jeg ser på det som utfordrende å komme tilbake til samme jobb og stilling",
        wasSelected: false,
      },
    ],
  },
  {
    fieldId: "arbeidsgiverFaarDuOppfolgingFlervalg",
    label: "Får du oppfølging av arbeidsgiveren din nå når du er sykmeldt?",
    description:
      "Arbeidsgiveren din har hovedansvaret for å gjøre tilpasninger og følge deg opp på arbeidsplassen. Arbeidsgiver har for eksempel plikt til å lage en oppfølgingsplan med deg innen du har vært sykmeldt i fire uker. Derfor er det viktig at dere har tett kontakt når du er sykmeldt.",
    fieldType: "RADIO_GROUP",
    wasRequired: true,
    options: [
      {
        optionId: "ja",
        optionLabel:
          "Ja, jeg får oppfølging, og har snakket med arbeidsgiver om dette.",
        wasSelected: true,
      },
      {
        optionId: "nei",
        optionLabel:
          "Nei, jeg opplever manglende oppfølging og at tilpasninger er vanskelig.",
        wasSelected: false,
      },
    ],
  },
  {
    fieldId: "naarTilbakeTilJobbenFlervalg",
    label: "Hvor lenge tror du at du kommer til å være sykmeldt?",
    description: null,
    fieldType: "RADIO_GROUP",
    wasRequired: true,
    options: [
      {
        optionId: "3a",
        optionLabel: "Mindre enn seks måneder",
        wasSelected: true,
      },
      {
        optionId: "3b",
        optionLabel: "Mer enn seks måneder",
        wasSelected: false,
      },
    ],
  },
];
