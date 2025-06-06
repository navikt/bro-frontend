import type { Metadata } from 'next'
import Script from 'next/script'
import '@navikt/ds-css'
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

import './globals.css'
import { Page } from '@navikt/ds-react'

export const metadata: Metadata = {
  title: 'Behovsrettet oppfølging',
  description: 'Skjema for behovsrettet oppfølging',
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const Decorator = await fetchDecoratorReact({
    env: 'dev',
  })

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Page footer={<Decorator.Footer />}>
          <Decorator.Header />
          {children}
          <Decorator.Scripts loader={Script} />
        </Page>
      </body>
    </html>
  )
}

export default RootLayout
