import { BodyShort, Heading } from "@navikt/ds-react";

export function FormHeaderAndTopText() {
  return (
    <>
      <Heading size="large" level="1" spacing>
        Kartlegging av din situasjon
      </Heading>

      <BodyShort spacing>
        Siden du har vært sykmeldt en stund, ønsker vi å få bedre kjennskap til
        din situasjon ved at du svarer på disse tre spørsmålene. Dette gir Nav
        innsikt i hvordan vi kan følge deg opp fremover.
      </BodyShort>

      <BodyShort spacing>Svarene dine blir kun delt med Nav.</BodyShort>
    </>
  );
}
