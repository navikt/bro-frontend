"use client";

import { InformationSquareIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, InfoCard, Link } from "@navikt/ds-react";
import { useState } from "react";
import DemoVariantPickerModal from "@/components/DemoInfoCard/DemoVariantPickerModal";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import {
  DEFAULT_DEMO_FORM_VARIANT,
  useDemoFormVariantViaParamIfDemo,
} from "./useDemoFormVariant";

export default function DemoInfoCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { activeFormVariant, changeDemoFormVariantViaParam } =
    useDemoFormVariantViaParamIfDemo(DEFAULT_DEMO_FORM_VARIANT);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChangeDemoFormVariant(variant: FormVariant) {
    changeDemoFormVariantViaParam(variant);
    closeModal();
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
        activeVariant={activeFormVariant}
        onClose={closeModal}
        onSelectVariant={handleChangeDemoFormVariant}
      />
    </Box>
  );
}
