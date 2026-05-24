"use client";

import { Button, Modal, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { formVariants } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

interface Props {
  open: boolean;
  currentDemoVariant: FormVariant;
  onClose: () => void;
  onChangeCurrentDemoVariant: (value: FormVariant) => void;
}

const formVariantModalDescriptions: Record<FormVariant, string> = {
  FLERVALG_V1: "I bruk for de fleste pilotkontorer",
  FLERVALG_FRITEKST_V1: "Fases ut",
  FLERVALG_FRITEKST_V2: "I bruk for Sandefjord, Asker og Søndre Nordstrand",
};

export default function DemoVariantPickerModal({
  open,
  currentDemoVariant,
  onClose,
  onChangeCurrentDemoVariant,
}: Props) {
  const [selectedRadioVariant, setSelectedRadioVariant] =
    useState(currentDemoVariant);

  useEffect(() => {
    if (open) {
      setSelectedRadioVariant(currentDemoVariant);
    }
  }, [open, currentDemoVariant]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={{
        heading: "Velg skjemavariant i demovisningen",
        size: "small",
        closeButton: false,
      }}
      closeOnBackdropClick
    >
      <Modal.Body>
        <VStack gap="space-16">
          <RadioGroup
            legend="Velg skjemavariant"
            name={DEMO_SKJEMAVARIANT_URL_PARAM_KEY}
            value={selectedRadioVariant}
            onChange={(value) => setSelectedRadioVariant(value as FormVariant)}
          >
            {formVariants.map((variant) => (
              <Radio
                key={variant}
                value={variant}
                description={formVariantModalDescriptions[variant]}
              >
                {variant}
              </Radio>
            ))}
          </RadioGroup>
        </VStack>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => onChangeCurrentDemoVariant(selectedRadioVariant)}
        >
          Ok
        </Button>

        <Button variant="tertiary" onClick={onClose}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
