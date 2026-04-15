"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { useDemoFormVariantViaParamIfDemo } from "@/components/DemoInfoCard/useDemoFormVariant";
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

  const { activeFormVariant } = useDemoFormVariantViaParamIfDemo(
    formVariantFromBackend,
  );

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
      formVariant={activeFormVariant}
    />
  ) : (
    <>
      {topContent}

      <KartleggingssporsmalForm
        // key prop is used to remount the component when activeFormVariant
        // changes
        key={activeFormVariant}
        formVariant={activeFormVariant}
        setSummaryItems={setFormResponse}
      />
    </>
  );
}
