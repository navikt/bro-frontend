"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import {
  IS_DEMO_VARIANT_URL_PARAM_ENABLED,
  useDemoFormVariantUrlParam,
  useEnsureVariantUrlParamIfDemoEffect,
} from "@/components/demo-form-variant/useDemoFormVariant";
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

  const { demoFormVariant } = useDemoFormVariantUrlParam();
  useEnsureVariantUrlParamIfDemoEffect();

  const formVariantToUse = IS_DEMO_VARIANT_URL_PARAM_ENABLED
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
        key={formVariantToUse} // Reset form state when variant changes
        formVariant={formVariantToUse}
        setSummaryItems={setFormResponse}
      />
    </>
  );
}
