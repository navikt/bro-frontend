"use client";

import { Box, Button } from "@navikt/ds-react";
import { useState } from "react";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import DemoVariantPickerModal from "./DemoVariantPickerModal";
import {
  DEFAULT_DEMO_FORM_VARIANT,
  useDemoFormVariantViaParamIfDemo,
} from "./useDemoFormVariant";

export default function DemoVariantButton() {
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
    <>
      <Box className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        <Button type="button" onClick={openModal}>
          Demo
        </Button>
      </Box>

      <DemoVariantPickerModal
        open={isModalOpen}
        activeVariant={activeFormVariant}
        onClose={closeModal}
        onSelectVariant={handleChangeDemoFormVariant}
      />
    </>
  );
}
