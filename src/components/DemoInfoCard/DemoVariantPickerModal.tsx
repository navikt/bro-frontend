"use client";

import { Button, Modal, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { formVariants } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

interface Props {
  open: boolean;
  activeVariant: FormVariant;
  onClose: () => void;
  onSelectVariant: (value: FormVariant) => void;
}

export default function DemoVariantPickerModal({
  open,
  activeVariant,
  onClose,
  onSelectVariant,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState(activeVariant);

  useEffect(() => {
    if (open) {
      setSelectedVariant(activeVariant);
    }
  }, [open, activeVariant]);

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
            value={selectedVariant}
            onChange={(value) => setSelectedVariant(value as FormVariant)}
          >
            {formVariants.map((variant) => (
              <Radio key={variant} value={variant}>
                {variant}
              </Radio>
            ))}
          </RadioGroup>
        </VStack>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => onSelectVariant(selectedVariant)}>Ok</Button>
        <Button variant="tertiary" onClick={onClose}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
