import { logger } from "@navikt/next-logger";
import { requestOboToken } from "@navikt/oasis";
import { type NextRequest, NextResponse } from "next/server";
import { verifyUserLoggedIn } from "@/auth/rsc";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import { getServerEnv } from "@/env-variables/serverEnv";

async function exchangeToken(idportenToken: string): Promise<string> {
  const { LUMI_API_CLIENT_ID } = getServerEnv();
  const tokenxGrant = await requestOboToken(idportenToken, LUMI_API_CLIENT_ID);

  if (!tokenxGrant.ok) {
    logger.error(
      `Unable to exchange token for LUMI client \`${LUMI_API_CLIENT_ID}\`, reason: ${tokenxGrant.error.message}`,
    );
    throw new Error("Token exchange failed");
  }

  return tokenxGrant.token;
}

export async function POST(req: NextRequest) {
  if (isLocalOrDemo) {
    return NextResponse.json({ id: "123" }, { status: 200 });
  }

  const payload = await req.json();
  const idportenToken = await verifyUserLoggedIn();
  const exchangedToken = await exchangeToken(idportenToken);

  const { LUMI_API_HOST } = getServerEnv();
  const url = new URL("/api/tokenx/v1/feedback", LUMI_API_HOST);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    logger.error(`Lumi API error (${res.status}): ${body}`);
    return NextResponse.json(
      { message: "Failed to submit feedback", error: body },
      { status: res.status },
    );
  }

  const json = await res.json();
  return NextResponse.json(json, { status: 200 });
}
