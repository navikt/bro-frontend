'use client'

import { Link, LinkProps } from '@navikt/ds-react'
import { logTaxonomyEvent } from '@/analytics/logTaxonomyEvent'
import NextLink from 'next/link'
import { isExternalUrl } from '@/utils/url'

interface TrackedLinkProps extends LinkProps {
  href: string
  analyticsTitle: string
  analyticsContext?: string
}

export function TrackedLink({ href, children, onClick, analyticsTitle, analyticsContext, ...props }: TrackedLinkProps) {
  return (
    <Link
      as={NextLink}
      href={href}
      onClick={(e) => {
        logTaxonomyEvent({
          name: 'link klikket',
          properties: {
            tekst: analyticsTitle,
            href: href,
            apnerINyttVindu: props.target === '_blank',
            erEkstern: isExternalUrl(href),
            kontekst: analyticsContext,
          },
        })
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}
