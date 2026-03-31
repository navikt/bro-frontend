import type { TextQuestion } from "@/components/form-components/TextArea";

export const textFields = {
  tilbakeTilJobbenLiteSannsynligBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør det lite sannsynlig? (Valgfritt)",
    description:
      "Skriv kort hvorfor det er lite sannsynlig. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
  tilbakeTilJobbenUsikkerBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør deg usikker? (Valgfritt)",
    description:
      "Skriv kort hvorfor du er usikker. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
  arbeidsgiverSamarbeidDarligBegrunnelse: {
    type: "TEXT",
    label: "Hva gjør samarbeidet og relasjonen dårlig? (Valgfritt)",
    description:
      "Skriv kort om hva som gjør samarbeidet og relasjonen dårlig og hvordan dette påvirker oppfølgingen du får fra arbeidsgiver. Ikke skriv detaljerte opplysninger om helse, personlige opplysninger eller opplysninger om andre enn deg selv.",
  },
} as const satisfies Record<string, TextQuestion>;
