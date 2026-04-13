"use client";

import { InformationSquareIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, InfoCard, Link } from "@navikt/ds-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import DemoVariantPickerModal from "@/components/DemoVariantPickerModal";
import { formVariants } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import { formVariantSchema } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

export default function DemoInfoCard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentVariantFromUrl = searchParams.get(
    DEMO_SKJEMAVARIANT_URL_PARAM_KEY,
  );
  const parsedVariant = formVariantSchema.safeParse(currentVariantFromUrl);
  const activeVariant = parsedVariant.success
    ? parsedVariant.data
    : formVariants[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function applyDemoVariant(nextVariant: (typeof formVariants)[number]) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(DEMO_SKJEMAVARIANT_URL_PARAM_KEY, nextVariant);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsModalOpen(false);
  }

  return (
    <Box paddingBlock="space-24">
      <InfoCard data-color="info" size="small">
        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
          <BodyLong className="mb-1" size="small">
            Dette er en demo som viser hvordan løsningen for
            kartleggingsspørsmål ser ut og fungerer for sykmeldte brukere. Du
            kan teste å fylle ut skjemaet, "sende inn", og se kvitteringen. Svar
            blir ikke sendt noe sted.
          </BodyLong>

          <BodyLong size="small">
            Ulike brukere kan få ulike varianter av skjemaet.{" "}
            <Link
              href="#"
              onClick={(event) => {
                event.preventDefault();
                openModal();
              }}
            >
              Velg skjemavariant
            </Link>{" "}
            som vises.
          </BodyLong>
        </InfoCard.Message>
      </InfoCard>

      <DemoVariantPickerModal
        open={isModalOpen}
        activeVariant={activeVariant}
        onClose={closeModal}
        onSelectVariant={applyDemoVariant}
      />
    </Box>
  );
}
