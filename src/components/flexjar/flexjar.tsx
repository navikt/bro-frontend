'use client'

import { FlexJarDock, type FlexJarTransport } from '@navikt/flexjar-widget'
import { survey } from './survey'

const transport: FlexJarTransport = {
  async submit(submission) {
    await fetch('/syk/kartleggingssporsmal/api/flexjar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission.transportPayload),
    })
  },
}

export const Flexjar = () => (
  <FlexJarDock
    feedbackId="bro-frontend"
    survey={survey}
    transport={transport}
    position="bottom-right"
    hideAfterSubmit={true}
  />
)
