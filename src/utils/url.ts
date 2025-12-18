export function isExternalUrl(href: string): boolean {
  return !href.includes('nav.no')
}
