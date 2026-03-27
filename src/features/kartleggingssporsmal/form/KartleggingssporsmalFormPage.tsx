"use client";

import { useEffect, useState } from "react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import type {
  KartleggingssporsmalFormResponse,
  Skjemavariant,
} from "@/services/meroppfolging/schemas/requestsAndResponses";
import KartleggingssporsmalFormSummaryPage from "../summary/KartleggingssporsmalFormSummaryPage";
import KartleggingssporsmalForm from "./KartleggingssporsmalForm";

interface Props {
  topContent: React.ReactNode;
  skjemavariant: Skjemavariant;
}

export default function KartleggingssporsmalFormPage({
  topContent,
  skjemavariant,
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
        skjemavariant={skjemavariant}
      />
    </>
  );
}
