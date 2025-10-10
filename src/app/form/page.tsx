import FormClient from '@/app/form/FormClient'

export default async function FormPage() {
  return <FormClient alreadyAnswered={false} initialSummaryItems={null} />
}
