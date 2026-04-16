import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import { Lumi } from "@/components/lumi/lumi";
import { TrackedLink } from "@/components/TrackedLink";
import { CONTACT_NAV_URL } from "@/constants";
import ThankYouAlert from "@/features/kartleggingssporsmal/summary/ThankYouAlert";
import { UsefulLinks } from "@/features/kartleggingssporsmal/summary/UsefulLinks";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/requestsAndResponses";
import KartleggingssporsmalFormSummary from "./KartleggingssporsmalFormSummary";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

type Props = {
  formResponse: KartleggingssporsmalFormResponse;
  formVariant: FormVariant;
};

export default function KartleggingssporsmalFormSummaryPage({
  formVariant,
  formResponse: { formSnapshot, createdAt },
}: Props) {
  const isTextFieldVisible =
    formSnapshot.fieldSnapshots.find((field) => field.fieldType === "TEXT") !==
    undefined;
  return (
    <VStack gap="space-24">
      <Heading size={"large"} level="1">
        Kartlegging av din situasjon
      </Heading>

      <ThankYouAlert date={createdAt} />

      <BodyShort className="" spacing>
        Svarene dine gir Nav innsikt i hvordan vi skal følge deg opp fremover.
        Om vi ser behovet for tettere oppfølging enn det arbeidsgiveren din skal
        gi deg, vil du bli kontaktet av en Nav-veileder.
      </BodyShort>

      <KartleggingssporsmalFormSummary formSnapshot={formSnapshot} />

      <UsefulLinks />

      <Heading size="medium" level="2">
        Har du andre spørsmål?
      </Heading>

      <BodyShort spacing>
        Du kan ta kontakt med oss på telefon 55 55 33 33 eller{" "}
        <TrackedLink
          target="_blank"
          href={CONTACT_NAV_URL}
          analyticsTitle="skriv til oss her på nav.no"
          analyticsContext="Oppsummeringsside for kartleggingsspørsmål"
        >
          skriv til oss her på nav.no
        </TrackedLink>{" "}
        (åpner i ny fane) hvis det skulle være noe du lurer på.
      </BodyShort>

      <Lumi formVariant={formVariant} isTextFieldVisible={isTextFieldVisible} />
    </VStack>
  );
}
