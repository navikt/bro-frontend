import { useFormContext } from '@/hooks/form'
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary'

function ErrorSummary() {
  const form = useFormContext()
  const errors = form.getAllErrors().fields

  return <ErrorSummary></ErrorSummary>
}

export default ErrorSummary
