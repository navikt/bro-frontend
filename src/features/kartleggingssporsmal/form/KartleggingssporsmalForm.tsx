"use client";

import { Alert, Button, Heading } from "@navikt/ds-react";
import { logger } from "@navikt/next-logger";
import { revalidateLogic } from "@tanstack/form-core";
import { useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { getValidationSchemaForVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import { getFieldsToIncludeInFormInOrder } from "@/forms/kartleggingssporsmal/formVariants/getFieldsToIncludeInForm";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import { useAppForm } from "@/hooks/form";
import { submitFormAction } from "@/services/meroppfolging/actions/submitFormAction";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/requestsAndResponses";
import { getFormDefaultValuesForFormVariant } from "../../../forms/kartleggingssporsmal/formVariants/formDefaultValues";

type Props = {
  setSummaryItems: (data: KartleggingssporsmalFormResponse) => void;
  formVariant: FormVariant;
};

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default function KartleggingssporsmalForm({
  setSummaryItems,
  formVariant,
}: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const form = useAppForm({
    defaultValues: getFormDefaultValuesForFormVariant(formVariant),
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: getValidationSchemaForVariant(formVariant),
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError(false);
        setSubmitting(true);
        const formResponse = await submitFormAction(value, formVariant);
        logTaxonomyEvent({
          name: "skjema fullført",
          properties: {
            skjemanavn: "Kartlegging av din situasjon",
            komponentId: "kartlegging-av-din-situasjon",
          },
        });
        setSummaryItems(formResponse);
        scrollToTop();
      } catch (e) {
        logger.error(
          `[Frontend] Feil ved innsending av kartleggingssporsmal: ${e}`,
        );
        logTaxonomyEvent({
          name: "skjema innsending feilet",
          properties: {
            skjemanavn: "Kartlegging av din situasjon",
            komponentId: "kartlegging-av-din-situasjon",
          },
        });
        setSubmitError(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="mt-8"
    >
      <form.AppForm>
        <div className="grid gap-4 mb-4">
          <form.Subscribe selector={(state) => state.values}>
            {(formValues) => {
              return getFieldsToIncludeInFormInOrder(
                formVariant,
                formValues,
              ).map(({ fieldId, question, isRequired }) => (
                <form.AppField key={fieldId} name={fieldId}>
                  {(field) =>
                    question.type === "RADIO_GROUP" ? (
                      <field.RadioGroup
                        question={question}
                        isRequired={isRequired}
                      />
                    ) : (
                      <field.TextArea
                        question={question}
                        isRequired={isRequired}
                      />
                    )
                  }
                </form.AppField>
              ));
            }}
          </form.Subscribe>
        </div>

        {submitError && (
          <Alert className="mb-8 w-2xl" variant="error" role="alert">
            <Heading size="small" level="2">
              Beklager! Det har oppstått en uventet feil
            </Heading>
            Vi klarte ikke å sende inn svarene dine. Prøv igjen om litt.
          </Alert>
        )}

        <Button
          type="submit"
          className="mt-4"
          onClick={() => form.handleSubmit()}
          loading={submitting}
        >
          Send svarene til Nav
        </Button>
      </form.AppForm>
    </form>
  );
}
