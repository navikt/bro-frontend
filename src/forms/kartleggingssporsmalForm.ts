import { z, ZodType } from 'zod/v4'
import { RadioGroupQuestion } from '@/components/formComponents/RadioGroup'

export const kartleggingsspormalFormQuestions = {
  hvorSannsynligTilbakeTilJobben: {
    type: 'RADIO_GROUP',
    label: 'Hvor sannsynlig er det at du kommer tilbake i jobben du ble sykmeldt fra?',
    options: [
      { id: '1a', label: 'Jeg tror det er veldig sannsynlig' },
      { id: '1b', label: 'Jeg tror det er lite sannsynlig' },
      { id: '1c', label: 'Jeg er usikker' },
    ],
  },
  samarbeidOgRelasjonTilArbeidsgiver: {
    type: 'RADIO_GROUP',
    label: 'Hvordan vil du beskrive samarbeidet og relasjonen mellom deg og arbeidsgiveren din?',
    options: [
      { id: '2a', label: 'Jeg opplever samarbeidet og relasjonen som god' },
      { id: '2b', label: 'Jeg opplever samarbeidet og relasjonen som dårlig' },
    ],
  },
  naarTilbakeTilJobben: {
    type: 'RADIO_GROUP',
    label: 'Hvor lenge tror du at du kommer til å være sykmeldt?',
    options: [
      { id: '3a', label: 'Mindre enn seks måneder' },
      { id: '3b', label: 'Mer enn seks måneder' },
    ],
  },
} as const satisfies Record<string, RadioGroupQuestion>

type KartleggingsspormalFormQuestionId = keyof typeof kartleggingsspormalFormQuestions

export const kartleggingssporsmalFormSchema = z.object({
  hvorSannsynligTilbakeTilJobben: z.string().nonempty('Feltet er påkrevd'),
  samarbeidOgRelasjonTilArbeidsgiver: z.string().nonempty('Feltet er påkrevd'),
  naarTilbakeTilJobben: z.string().nonempty('Feltet er påkrevd'),
} satisfies Record<KartleggingsspormalFormQuestionId, ZodType>)
export type KartleggingssporsmalForm = z.infer<typeof kartleggingssporsmalFormSchema>

export const kartleggingssporsmalFormDefaults = {
  hvorSannsynligTilbakeTilJobben: '',
  samarbeidOgRelasjonTilArbeidsgiver: '',
  naarTilbakeTilJobben: '',
} satisfies KartleggingssporsmalForm
