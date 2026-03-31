"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import type { KartleggingssporsmalFormResponse } from "@/services/meroppfolging/schemas/requestsAndResponses";
import KartleggingssporsmalFormSummaryPage from "../summary/KartleggingssporsmalFormSummaryPage";
import KartleggingssporsmalForm from "./KartleggingssporsmalForm";

interface Props {
  topContent: React.ReactNode;
  formVariant: FormVariant;
}

export default function KartleggingssporsmalFormPage({
  topContent,
  formVariant,
}: Props) {
  const [formReponse, setFormResponse] =
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

  return formReponse ? (
    <KartleggingssporsmalFormSummaryPage formResponse={formReponse} />
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
