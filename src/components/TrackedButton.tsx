"use client";

import { Button, type ButtonProps } from "@navikt/ds-react";
import { logTaxonomyEvent } from "@/analytics/logTaxonomyEvent";
import { isExternalUrl } from "@/utils/url";

interface TrackedButtonProps extends ButtonProps {
  href?: string;
  target?: string;
  analyticsTitle: string;
  analyticsContext?: string;
}

export function TrackedButton({
  href,
  children,
  onClick,
  analyticsTitle,
  analyticsContext,
  ...props
}: TrackedButtonProps) {
  if (href) {
    return (
      <Button
        as="a"
        href={href}
        onClick={(e) => {
          logTaxonomyEvent({
            name: "link klikket",
            properties: {
              tekst: analyticsTitle,
              href: href,
              apnerINyttVindu: props.target === "_blank",
              erEkstern: isExternalUrl(href),
              kontekst: analyticsContext,
            },
          });
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      onClick={(e) => {
        logTaxonomyEvent({
          name: "knapp klikket",
          properties: {
            tekst: analyticsTitle,
            kontekst: analyticsContext,
            variant: props.variant,
            size: props.size,
          },
        });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
