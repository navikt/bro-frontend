import { Box, Heading, Link, List } from '@navikt/ds-react'
import { ListItem } from '@navikt/ds-react/List'
import NextLink from 'next/link'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

export function UsefulLinks() {
  return (
    <Box>
      <Heading size="medium" level="2">
        Informasjon fra Nav som kan være nyttig for deg
      </Heading>

      <List>
        <ListItem>
          <Link
            as={NextLink}
            target="_blank"
            href="https://www.nav.no/sykmeldt#sykmeldiditt-ansvar-nar-du-er-sykmeldtngen"
          >
            Ditt ansvar når du er sykmeldt
            <ExternalLinkIcon title="åpner i ny fane" />
          </Link>
        </ListItem>
        <ListItem>
          <Link as={NextLink} target="_blank" href="https://www.nav.no/sykepenger#oppfolging">
            Arbeidsgiver sitt oppfølgingsansvar
            <ExternalLinkIcon title="åpner i ny fane" />
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}
