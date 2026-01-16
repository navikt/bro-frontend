import { requestOboToken } from "@navikt/oasis";
import { getServerEnv } from "@/env-variables/serverEnv";

export async function exchangeIdportenTokenForMeroppfolgingBackendTokenx(
  idportenToken: string | null,
): Promise<string> {
  if (!idportenToken) {
    throw new Error("Mangler idportenToken");
  }

  const MEROPPFOLGING_BACKEND_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:meroppfolging-backend`;

  const tokenxGrant = await requestOboToken(
    idportenToken,
    MEROPPFOLGING_BACKEND_CLIENT_ID,
  );

  if (!tokenxGrant.ok) {
    throw new Error(
      `Failed to exchange idporten token for meroppfolging-backend tokenx: ${tokenxGrant.error}`,
    );
  }

  return tokenxGrant.token;
}
