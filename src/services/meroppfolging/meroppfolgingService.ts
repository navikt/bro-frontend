import { logger } from "@navikt/next-logger";
import z from "zod";
import { verifyUserLoggedIn } from "@/auth/rsc";
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from "@/auth/tokenUtils";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import { getServerEnv } from "@/env-variables/serverEnv";
import {
  type KandidatStatusResponse,
  kandidatStatusResponseSchema,
} from "@/services/meroppfolging/schemas/formSnapshotSchema";

export async function fetchKandidatStatus(): Promise<KandidatStatusResponse> {
  if (isLocalOrDemo) {
    return {
      isKandidat: true,
      formResponse: null, //kartleggingssporsmalFormResponseFixture,
    };
  }

  const idportenToken = await verifyUserLoggedIn();
  const exchangedToken =
    await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken);

  const { MEROPPFOLGING_BACKEND_URL } = getServerEnv();
  const url = new URL(
    "/api/v1/kartleggingssporsmal/kandidat-status",
    MEROPPFOLGING_BACKEND_URL,
  );

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${exchangedToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    logger.info(
      `[Backend] Fetched kandidat status with response: ${JSON.stringify(json)}`,
    );
    const parsed = kandidatStatusResponseSchema.safeParse(json);
    if (!parsed.success) {
      logger.error(
        {
          url: url.toString(),
          validationIssues: z.prettifyError(parsed.error),
        },
        "[Backend] Parsing failed on kandidat-status response",
      );
      throw new Error("Invalid response when fetching kandidat status");
    }

    return parsed.data;
  } catch (error) {
    logger.error(
      { err: error, url: url.toString() },
      "[Backend] Failed to fetch kandidat status",
    );

    throw new Error(`Error on fetching kandidat status.`);
  }
}
