"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useDemoFormVariant } from "@/components/demo-form-variant/useDemoFormVariant";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/requestsAndResponses";
import KartleggingssporsmalFormSummaryPage from "../summary/KartleggingssporsmalFormSummaryPage";
import KartleggingssporsmalForm from "./KartleggingssporsmalForm";

interface Props {
  formVariantFromBackend: FormVariant;
  topContent: React.ReactNode;
}

export default function KartleggingssporsmalFormPage({
  formVariantFromBackend,
  topContent,
}: Props) {
  const [formResponse, setFormResponse] =
    useState<KartleggingssporsmalFormResponse | null>(null);

  const { demoFormVariant } = useDemoFormVariant();

  const formVariantToUse = isLocalOrDemo
    ? demoFormVariant
    : formVariantFromBackend;

  useEffect(() => {
    logTaxonomyEvent({
      name: "skjema åpnet",
      properties: {
        skjemanavn: "Kartlegging av din situasjon",
        komponentId: "kartlegging-av-din-situasjon",
      },
    });
  }, []);

  return formResponse ? (
    <KartleggingssporsmalFormSummaryPage
      formResponse={formResponse}
      formVariant={formVariantToUse}
    />
  ) : (
    <>
      {topContent}

      <KartleggingssporsmalForm
        // key prop is used to remount the component when activeFormVariant
        // changes
        key={formVariantToUse}
        formVariant={formVariantToUse}
        setSummaryItems={setFormResponse}
      />
    </>
  );
}
