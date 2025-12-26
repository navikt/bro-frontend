import { createRatingSurvey } from '@navikt/flexjar-widget'

// export const survey: FlexJarSurveyConfig = {
//   rating: {
//     type: 'rating',
//     prompt: 'Hvordan opplevde du å svare på spørsmålene?',
//     description: 'Svarene du sender inn er anonyme, og blir brukt til videreutvikling av tjenesten.',
//   },
//   mainQuestion: {
//     type: 'text',
//     maxLength: 500,
//     minRows: 4,
//     prompt: 'Legg gjerne til en begrunnelse (valgfritt)',
//     description: 'Alle tilbakemeldinger er til stor nytte for oss',
//     required: false,
//   },
// }

export const survey = createRatingSurvey({
  ratingPrompt: "Hvordan opplevde du å svare på spørsmålene?'",
  ratingDescription: 'Svarene du sender inn er anonyme, og blir brukt til videreutvikling av tjenesten.',
  textPrompt: "Legg gjerne til en begrunnelse (valgfritt)'?",
})
