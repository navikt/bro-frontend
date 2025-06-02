import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Behovsrettet oppfølging',
  description: 'Skjema for behovsrettet oppfølging',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
