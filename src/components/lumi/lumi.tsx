"use client";

import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { publicEnv } from "@/env-variables/publicEnv";
import { survey } from "./survey";

const transport: LumiSurveyTransport = {
  async submit(submission) {
    await fetch(`${publicEnv.NEXT_PUBLIC_BASE_PATH}/api/lumi/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission.transportPayload),
    });
  },
};

export const Lumi = () => (
  <LumiSurveyDock
    surveyId="bro-kartleggingssporsmal"
    survey={survey}
    transport={transport}
  />
);
