import { Form, QuestionsObject } from '@/services/meroppfolging/schemas/questionSchema'

export const FormQuestions = {
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
type FormQuestionId = keyof typeof FormQuestions

export const formQuestionDefaults = {
  fullName: '',
  email: '',
  preferredContact: '',
  contactTime: '',
} as const satisfies Record<FormQuestionId, string>
