import { z } from 'zod/v4'
import { QuestionsObject } from '@/domain/questionSchema'
import { ZodString } from 'zod'

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
} satisfies Record<FormQuestionId, ZodString>)
