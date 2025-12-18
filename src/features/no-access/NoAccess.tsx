import { BodyShort, Box, Heading } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { CONTACT_NAV_URL } from '@/constants'
import { TrackedLink } from '@/components/TrackedLink'
import { TrackedButton } from '@/components/TrackedButton'

function NoAccessInformation() {
  const logMessage = "User visited kartleggingsspørsmål page, but does not have access. Showing 'No access' page."
  logger.warn(logMessage)

  return (
    <Box className="md:pt-20 md:pb-16 flex flex-col gap-8 items-start">
      <div className="flex flex-col md:flex-row gap-6 max-md:items-center">
        <div>
          <Heading level="1" size="large" spacing>
            Beklager, du kan ikke svare på dette skjemaet nå.
          </Heading>
          <BodyShort spacing>
            Dette skjemaet er ikke åpnet for deg. Skjemaet skal være åpnet dersom du er sykmeldt mellom 6 og 9 uker, og
            du har fått et varsel som lenker hit.
          </BodyShort>
          <BodyShort>
            Hvis du mener det har skjedd en feil, prøv igjen senere. Hvis feilen vedvarer, ta kontakt med oss på tlf. 55
            55 33 33 eller på{' '}
            <TrackedLink
              target="_blank"
              href={CONTACT_NAV_URL}
              analyticsTitle="skriv til oss her på nav.no"
              analyticsContext="Ingen tilgang"
            >
              skriv til oss her på nav.no
            </TrackedLink>{' '}
            (åpner i ny fane).
          </BodyShort>
        </div>
      </div>
      <TrackedButton
        href="https://www.nav.no/minside"
        analyticsTitle="Gå til Min side"
        analyticsContext="Ingen tilgang"
      >
        Gå til Min side
      </TrackedButton>
    </Box>
  )
}

export default NoAccessInformation
