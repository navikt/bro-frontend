"use client";

import { isLocalOrDemo } from "@/env-variables/envHelpers";
import useUxSignalsScript from "@/hooks/uxSignals";

export default function UxSignalsPanel() {
  useUxSignalsScript(true);

  return (
    <div
      data-uxsignals-embed="panel-emwigf91dw"
      data-uxsignals-mode={isLocalOrDemo ? "demo" : ""}
    />
  );
}
