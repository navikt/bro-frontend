import { BodyShort, Heading, Link, VStack } from '@navikt/ds-react'
import KartleggingssporsmalFormSummary from './KartleggingssporsmalFormSummary'
import { mapFormSnapshotToSummaryItems } from '@/utils/kartleggingssporsmalForm'
import NextLink from 'next/link'
import { CONTACT_NAV_URL } from '@/constants'
import ThankYouAlert from '@/features/kartleggingssporsmal/summary/ThankYouAlert'
import { UsefulLinks } from '@/features/kartleggingssporsmal/summary/UsefulLinks'
import { KartleggingssporsmalFormResponse } from '@/services/meroppfolging/schemas/formSnapshotSchema'
import { Flexjar } from '@/components/flexjar/flexjar'

type Props = {
  formResponse: KartleggingssporsmalFormResponse
}

export default function KartleggingssporsmalFormSummaryPage({ formResponse }: Props) {
  const summaryItems = mapFormSnapshotToSummaryItems(formResponse.formSnapshot.fieldSnapshots)

  return (
    <VStack gap="space-12">
      <Heading size={'large'} level="1">
        Kartlegging av din situasjon
      </Heading>

      <ThankYouAlert date={formResponse.createdAt} />

      <BodyShort className="" spacing>
        Svarene dine gir Nav innsikt i hvordan vi skal følge deg opp fremover. Om vi ser behovet for tettere oppfølging
        enn det arbeidsgiveren din skal gi deg, vil du bli kontaktet av en Nav-veileder.
      </BodyShort>

      <KartleggingssporsmalFormSummary items={summaryItems} />

      <UsefulLinks />

      <Heading size="medium" level="2">
        Har du andre spørsmål?
      </Heading>
      <BodyShort spacing>
        Du kan ta kontakt med oss på telefon 55 55 33 33 eller{' '}
        <Link as={NextLink} target="_blank" href={CONTACT_NAV_URL}>
          skriv til oss her på nav.no
        </Link>{' '}
        (åpner i ny fane) hvis det skulle være noe du lurer på.
      </BodyShort>

      <Flexjar />
    </VStack>
  )
}
