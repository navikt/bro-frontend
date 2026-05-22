"use client";

import { InformationSquareIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, InfoCard } from "@navikt/ds-react";

export default function DemoInfoCard() {
  return (
    <Box paddingBlock="space-24">
      <InfoCard data-color="info" size="small">
        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
          <BodyLong className="mb-1" size="small">
            Dette er en demo som viser hvordan løsningen for
            kartleggingsspørsmål ser ut for sykmeldte brukere. Svar blir ikke
            sendt noe sted.
          </BodyLong>

          <BodyLong size="small">
            Det finnes ulike varianter av skjemaet. Velg variant med
            Demo-knappen nederst til høyre.
          </BodyLong>
        </InfoCard.Message>
      </InfoCard>
    </Box>
  );
}
