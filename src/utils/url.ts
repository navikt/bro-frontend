export function isExternalUrl(href: string): boolean {
  if (href.startsWith('/')) return false
  return !href.includes('nav.no')
}
