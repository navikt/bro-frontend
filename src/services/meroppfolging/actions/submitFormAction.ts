"use server";

import { logger } from "@navikt/next-logger";
import z from "zod";
import { verifyUserLoggedIn } from "@/auth/rsc";
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from "@/auth/tokenUtils";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import { getServerEnv } from "@/env-variables/serverEnv";
import { flervalgFritekstV1Schema } from "@/forms/kartleggingssporsmal/formVariants/flervalgFritekstV1Schema";
import type { FormVariant } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import {
  type FormSnapshotRequest,
  type SubmitKartleggingssporsmalResponse,
  submitKartleggingssporsmalResponseSchema,
} from "@/services/meroppfolging/schemas/requestsAndResponses";
import { mapFormValuesToSnapshot } from "@/utils/kartleggingssporsmalFormSnapshot";

export async function submitFormAction(
  formValues: unknown,
  formVariant: FormVariant,
): Promise<SubmitKartleggingssporsmalResponse> {
  const parsed = flervalgFritekstV1Schema.safeParse(formValues);
  if (!parsed.success) {
    logger.error(
      { validationIssues: z.prettifyError(parsed.error) },
      "[Backend] Failed to parse kartleggingsspørsmål on post",
    );
    throw new Error(
      "Invalid form values when submitting kartleggingssporsmal form",
    );
  }

  const formSnapshot = mapFormValuesToSnapshot({
    values: parsed.data,
    formVariant,
  });

  if (isLocalOrDemo) {
    return {
      formSnapshot,
      createdAt: new Date(),
    };
  }

  const idportenToken = await verifyUserLoggedIn();
  const exchangedToken =
    await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken);

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv();
  const url = new URL(
    "/api/v1/kartleggingssporsmal",
    MEROPPFOLGING_BACKEND_URL,
  );

  const payload: FormSnapshotRequest = {
    formSnapshot,
  };

  try {
    const res = await fetch(url, {
      cache: "no-store",
      method: "POST",
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    const parsed = submitKartleggingssporsmalResponseSchema.safeParse(json);
    if (!parsed.success) {
      logger.error(
        {
          url: url.toString(),
          validationIssues: z.prettifyError(parsed.error),
        },
        "[Backend] Parsing failed on post response",
      );

      throw new Error(
        "Invalid response when posting kartleggingssporsmal form",
      );
    }

    return parsed.data;
  } catch (error) {
    logger.error(
      { err: error, url: url.toString() },
      "[Backend] Failed to fetch while posting kartleggingssporsmal form",
    );

    throw new Error(`Error on posting kartleggingssporsmal form.`);
  }
}
