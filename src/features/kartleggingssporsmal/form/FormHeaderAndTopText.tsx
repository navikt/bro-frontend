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
        en bedre forståelse av om vi skal gi deg oppfølging i tillegg til den du
        skal få fra arbeidsgiveren din.
      </BodyShort>

      <BodyShort spacing>
        Svarene blir kun synlige for Nav, og deles ikke med din arbeidsgiver.
      </BodyShort>
    </>
  );
}
