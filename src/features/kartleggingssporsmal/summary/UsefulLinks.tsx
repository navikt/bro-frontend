import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Box, Heading, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { TrackedLink } from "@/components/TrackedLink";

export function UsefulLinks() {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Informasjon fra Nav som kan være nyttig for deg
      </Heading>

      <List>
        <ListItem>
          <TrackedLink
            target="_blank"
            href="https://www.nav.no/sykmeldt#sykmeldiditt-ansvar-nar-du-er-sykmeldtngen"
            analyticsTitle="Ditt ansvar når du er sykmeldt"
            analyticsContext="Oppsummeringsside for kartleggingsspørsmål"
          >
            Ditt ansvar når du er sykmeldt
            <ExternalLinkIcon title="åpner i ny fane" />
          </TrackedLink>
        </ListItem>
        <ListItem>
          <TrackedLink
            target="_blank"
            href="https://www.nav.no/sykepenger#oppfolging"
            analyticsTitle="Arbeidsgiver sitt oppfølgingsansvar"
            analyticsContext="Oppsummeringsside for kartleggingsspørsmål"
          >
            Arbeidsgiver sitt oppfølgingsansvar
            <ExternalLinkIcon title="åpner i ny fane" />
          </TrackedLink>
        </ListItem>
      </List>
    </Box>
  );
}
