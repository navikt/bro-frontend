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
  phoneNumber: {
    type: 'TEXT',
    label: 'Telefonnummer',
    description: 'Ditt telefonnummer',
    required: false,
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
} as const satisfies QuestionsObject

// Extract the ID union type from FormQuestions keys
type FormQuestionId = keyof typeof FormQuestions

export const formQuestionDefaults = {
  fullName: '',
  email: '',
  phoneNumber: '',
  preferredContact: '',
} as const satisfies Record<FormQuestionId, string | null>

export const sampleContactForm: Form = {
  id: 'TEST-contact-form',
  title: 'TEST - Kontaktinformasjon',
  description: 'Vennligst fyll ut din kontaktinformasjon',
  questions: FormQuestions,
}
