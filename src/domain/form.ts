import { QuestionsObject } from '@/services/meroppfolging/schemas/questionSchema'
import { z } from 'zod/v4'

export const formQuestions1 = {
  fullName: {
    type: 'TEXT',
    label: 'Fullt navn',
    description: 'Skriv inn ditt fulle navn',
    required: true,
  },
  email: {
    type: 'TEXT',
    label: 'E-post',
    description: 'Din e-postadresse for kommunikasjon',
    required: true,
  },
  preferredContact: {
    type: 'RADIO_GROUP',
    label: 'Foretrukket kontaktmetode',
    description: 'Hvordan ønsker du å bli kontaktet?',
    required: true,
    options: [
      { id: 'email', label: 'E-post' },
      { id: 'phone', label: 'Telefon' },
      { id: 'sms', label: 'SMS' },
    ],
  },
  contactTime: {
    type: 'RADIO_GROUP',
    label: 'Når kan vi kontakte deg?',
    description: 'Velg et tidspunkt som passer deg best',
    required: true,
    options: [
      { id: 'morning', label: 'Morgen' },
      { id: 'afternoon', label: 'Ettermiddag' },
      { id: 'evening', label: 'Kveld' },
    ],
  },
} as const satisfies QuestionsObject

// Extract the ID union type from FormQuestions keys
type FormQuestionId1 = keyof typeof formQuestions1

export const formQuestionDefaults1 = {
  fullName: '',
  email: '',
  preferredContact: '',
  contactTime: '',
} satisfies Record<FormQuestionId1, string>

export const formSchema1 = z.object({
  fullName: z.string().nonempty('Fullt navn er påkrevd'),
  email: z.string().nonempty('E-post er påkrevd'),
  preferredContact: z.string().nonempty('Foretrukket kontaktmetode er påkrevd'),
  contactTime: z.string().nonempty('Når kan vi kontakte deg er påkrevd'),
} satisfies Record<FormQuestionId1, z.ZodTypeAny>)

//VV
export const formQuestions = {
  tilbakeTilJobb: {
    type: 'RADIO_GROUP',
    label: 'Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?',
    required: true,
    options: [
      { id: '1a', label: 'Jeg tror det er veldig sannsynlig' },
      { id: '1b', label: 'Jeg tror det er lite sannsynlig' },
      { id: '1c', label: 'Jeg er usikker' },
    ],
  },
  relasjonTilArbeidsgiver: {
    type: 'RADIO_GROUP',
    label: 'Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?',
    required: true,
    options: [
      { id: '2a', label: 'Jeg opplever forholdet vårt som godt' },
      { id: '2b', label: 'Jeg opplever ikke forholdet vårt som godt' },
    ],
  },
  fravarslengde: {
    type: 'RADIO_GROUP',
    label: 'Hvor lenge tror du at du har behov for å være sykmeldt?',
    required: true,
    options: [
      { id: '3a', label: 'Mindre enn 26 uker (6 måneder) totalt' },
      { id: '3b', label: 'Mer enn 26 uker (6 måneder) totalt' },
    ],
  },
} as const satisfies QuestionsObject

// Extract the ID union type from FormQuestions keys
type FormQuestionId = keyof typeof formQuestions

export const formQuestionDefaults = {
  tilbakeTilJobb: '',
  relasjonTilArbeidsgiver: '',
  fravarslengde: '',
} satisfies Record<FormQuestionId, string>

export const formSchema = z.object({
  tilbakeTilJobb: z.string().nonempty('Feltet er påkrevd'),
  relasjonTilArbeidsgiver: z.string().nonempty('Feltet er påkrevd'),
  fravarslengde: z.string().nonempty('Feltet er påkrevd'),
} satisfies Record<FormQuestionId, z.ZodTypeAny>)
