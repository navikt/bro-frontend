"use client";

import { Alert, Button, Heading } from "@navikt/ds-react";
import { logger } from "@navikt/next-logger";
import { revalidateLogic } from "@tanstack/form-core";
import { useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import {
  kartleggingssporsmalFormDefaults,
  kartleggingssporsmalFormQuestions,
  kartleggingssporsmalFormSchema,
} from "@/forms/kartleggingssporsmalForm";
import { useAppForm } from "@/hooks/form";
import { submitFormAction } from "@/services/meroppfolging/actions/submitFormAction";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/formSnapshotSchema";

type Props = {
  setSummaryItems: (data: KartleggingssporsmalFormResponse) => void;
};

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default function KartleggingssporsmalForm({ setSummaryItems }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const form = useAppForm({
    defaultValues: kartleggingssporsmalFormDefaults,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: kartleggingssporsmalFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError(false);
        setSubmitting(true);
        const formResponse = await submitFormAction(value);
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
          <form.AppField name="hvorSannsynligTilbakeTilJobben">
            {(field) => (
              <field.RadioGroup
                question={
                  kartleggingssporsmalFormQuestions.hvorSannsynligTilbakeTilJobben
                }
              />
            )}
          </form.AppField>
          <form.AppField name="samarbeidOgRelasjonTilArbeidsgiver">
            {(field) => (
              <field.RadioGroup
                question={
                  kartleggingssporsmalFormQuestions.samarbeidOgRelasjonTilArbeidsgiver
                }
              />
            )}
          </form.AppField>
          <form.AppField name="naarTilbakeTilJobben">
            {(field) => (
              <field.RadioGroup
                question={
                  kartleggingssporsmalFormQuestions.naarTilbakeTilJobben
                }
              />
            )}
          </form.AppField>
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
