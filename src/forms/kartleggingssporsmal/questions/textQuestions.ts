import type { TextQuestion } from "@/components/form-components/TextArea";

export const textQuestions = {
  tilbakeTilJobbenLiteSannsynligBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør det lite sannsynlig?",
    description:
      "Skriv kort hvorfor det er lite sannsynlig. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
  tilbakeTilJobbenUsikkerBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør deg usikker?",
    description:
      "Skriv kort hvorfor du er usikker. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
  arbeidsgiverSamarbeidDarligBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør samarbeidet og relasjonen dårlig?",
    description:
      "Skriv kort om hva som gjør samarbeidet og relasjonen dårlig og hvordan dette påvirker oppfølgingen du får fra arbeidsgiver. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
  arbeidsgiverFaarDuOppfolgningNeiBegrunnelse: {
    type: "TEXT",
    label:
      "Hva savner du i samarbeidet med arbeidsgiver for at du skal få bedre oppfølging?",
    description:
      "Skriv kort om hva du har behov for og hva som er vanskelig. Svaret ditt er kun synlig for Nav, og blir ikke delt med din arbeidsgiver.  Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
} as const satisfies Record<string, TextQuestion>;
