"use client";

import { Button } from "@navikt/ds-react";
import { useState } from "react";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import DemoVariantPickerModal from "./DemoVariantPickerModal";
import { useDemoFormVariant } from "./useDemoFormVariant";

export default function DemoVariantButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { demoFormVariant, changeDemoFormVariantViaParam } =
    useDemoFormVariant();

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
      {/*
       * Zero-height sticky wrapper: during scroll the button appears fixed at
       * bottom-right; when the footer scrolls into view, the sticky stops at
       * the end of its containing block (the Page flex container, which ends
       * above the footer), so the button never overlaps the footer.
       */}
      <div className="sticky bottom-4 sm:bottom-6 self-end z-50 h-0 mb-4 sm:mb-6 pointer-events-none">
        <div className="absolute bottom-0 right-4 sm:right-6 pointer-events-auto">
          <Button type="button" onClick={openModal}>
            Demo
          </Button>
        </div>
      </div>

      <DemoVariantPickerModal
        open={isModalOpen}
        activeDemoVariant={demoFormVariant}
        onClose={closeModal}
        onSelectVariant={handleChangeDemoFormVariant}
      />
    </>
  );
}
