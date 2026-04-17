"use client";

import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { publicEnv } from "@/env-variables/publicEnv";
import { intro, survey } from "./survey";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

const transport: LumiSurveyTransport = {
  async submit(submission) {
    await fetch(`${publicEnv.NEXT_PUBLIC_BASE_PATH}/api/lumi/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission.transportPayload),
    });
  },
};

interface Props {
  formVariant: FormVariant;
  isTextFieldVisible: boolean;
}

export const Lumi = ({ formVariant, isTextFieldVisible }: Props) => (
  <LumiSurveyDock
    intro={intro}
    surveyId="bro-kartleggingssporsmal"
    survey={survey}
    transport={transport}
    context={{
      tags: { skjemavariant: formVariant, textFieldVisible: isTextFieldVisible },
    }}
  />
);
