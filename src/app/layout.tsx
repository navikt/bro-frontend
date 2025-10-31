import '@/app/globals.css'
import '@navikt/flexjar-widget/styles.css'

import type { Metadata } from 'next'
import Script from 'next/script'
import '@navikt/ds-css'
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

import { Page } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import Providers from '@/app/Providers'
import DemoAlert from '@/components/DemoAlert'
import { isDemo } from '@/env-variables/envHelpers'
import { publicEnv } from '@/env-variables/publicEnv'
import { UmamiScript } from '@/analytics/umamiScript'

export const metadata: Metadata = {
  title: 'Kartlegging av din situasjon',
}

function getDecoratorEnv(): 'dev' | 'prod' {
  switch (publicEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case 'local':
    case 'test':
    case 'dev':
    case 'demo':
      return 'dev'
    default:
      return 'prod'
  }
}

const breadcrumbs = [
  { title: 'Ditt Nav', url: 'https://www.nav.no/person/dittnav' },
  {
    title: 'Kartlegging av din situasjon',
    analyticsTitle: 'Kartlegging av din situasjon',
    url: 'https://www.nav.no/syk/kartleggingssporsmal',
  },
]

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const Decorator = await fetchDecoratorReact({
    env: getDecoratorEnv(),
    params: {
      breadcrumbs: breadcrumbs,
      language: 'nb',
      context: 'privatperson',
      logoutWarning: true,
      redirectToApp: true,
    },
  })

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
        <UmamiScript />
      </head>
      <body>
        <Providers>
          <Page footer={<Decorator.Footer />}>
            <Decorator.Header />
            <PageBlock as="main" width="lg" className="max-w-3xl" gutters>
              {isDemo && <DemoAlert />}
              {children}
            </PageBlock>
            <Decorator.Scripts loader={Script} />
          </Page>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
