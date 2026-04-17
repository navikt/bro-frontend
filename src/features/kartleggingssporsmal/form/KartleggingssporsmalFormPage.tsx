"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/requestsAndResponses";
import KartleggingssporsmalFormSummaryPage from "../summary/KartleggingssporsmalFormSummaryPage";
import KartleggingssporsmalForm from "./KartleggingssporsmalForm";

interface Props {
  formVariant: FormVariant;
  topContent: React.ReactNode;
}

export default function KartleggingssporsmalFormPage({
  formVariant,
  topContent,
}: Props) {
  const [formResponse, setFormResponse] =
    useState<KartleggingssporsmalFormResponse | null>(null);

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
      formVariant={formVariant}
    />
  ) : (
    <>
      {topContent}

      <KartleggingssporsmalForm
        setSummaryItems={setFormResponse}
        formVariant={formVariant}
      />
    </>
  );
}
