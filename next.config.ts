import type { NextConfig } from "next";
import { environment } from "@/env-variables/envHelpers";

const CSP_SOURCES = {
  self: "'self'",
  uxSignals: "https://uxsignals-frontend.uxsignals.app.iterate.no",
} as const;

const appDirectives = {
  "default-src": [CSP_SOURCES.self],
  "script-src": [CSP_SOURCES.self, "'unsafe-eval'", CSP_SOURCES.uxSignals],
  "script-src-elem": [CSP_SOURCES.self, CSP_SOURCES.uxSignals],
  "style-src": [CSP_SOURCES.self],
  "style-src-elem": [CSP_SOURCES.self, CSP_SOURCES.uxSignals],
  "img-src": [CSP_SOURCES.self, "data:"],
  "font-src": [CSP_SOURCES.self, "https://cdn.nav.no"],
  "worker-src": [CSP_SOURCES.self],
  "connect-src": [
    CSP_SOURCES.self,
    "https://*.nav.no",
    "https://*.uxsignals.com",
  ],
};

const nextConfig: NextConfig = {
  async headers() {
    const { buildCspHeader } = await import(
      "@navikt/nav-dekoratoren-moduler/ssr"
    );
    const cspValue = await buildCspHeader(appDirectives, { env: environment });
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspValue,
          },
        ],
      },
    ];
  },
  /* config options here */
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "standalone",
  productionBrowserSourceMaps: true,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
};

export default nextConfig;
