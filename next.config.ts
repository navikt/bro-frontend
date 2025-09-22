import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  reactStrictMode: true,
  basePath: '/syk/kartleggingssporsmal',
  output: 'standalone',
  productionBrowserSourceMaps: true,
}

export default nextConfig
