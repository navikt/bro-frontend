import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import { dateToLongFormat } from "@/utils/date";

export default function ThankYouAlert({ date }: { date: Date | null }) {
  return (
    <Alert variant="success">
      <Heading size="small" level="2">
        Takk, svarene dine er sendt til Nav.
      </Heading>

      {date && <BodyShort>Sendt: {dateToLongFormat(date)}</BodyShort>}
    </Alert>
  );
}
