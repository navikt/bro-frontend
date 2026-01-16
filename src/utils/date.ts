export function dateToLongFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("nb-NO", options);
  return formatter.format(date);
}
