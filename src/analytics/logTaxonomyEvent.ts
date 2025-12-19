'use client'

import { type TaxonomyEvent } from '@navikt/analytics-types'
import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler'
import { isLocalOrDemo } from '@/env-variables/envHelpers'

const logger = getAnalyticsInstance('bro-frontend')

export function logTaxonomyEvent(event: TaxonomyEvent) {
  if (isLocalOrDemo) {
    console.log('Taxonomy event logged:', event)
    return
  }

  logger(event.name, event.properties)
}
