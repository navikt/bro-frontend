import React from 'react'
import { Alert, BodyShort } from '@navikt/ds-react'

export default function DemoAlert() {
  return (
    <div className="mb-6 flex items-center justify-center w-full">
      <Alert variant="warning" className="max-w-prose">
        <BodyShort className="font-bold mb-0.5">
          Dette er en demoside og handlinger her har ingen reell effekt
        </BodyShort>
      </Alert>
    </div>
  )
}
