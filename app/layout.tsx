import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { GalaxyStarfield } from '@/components/galaxy-starfield'
import { site } from '@/data/site'
import { unifiedEntityGraphSchema } from '@/lib/schema'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'JJSOFT GLOBAL — Software Systems, Retail POS/ERP & Mobile Apps',
    template: '%s | JJSOFT GLOBAL',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Mohamed Jemal Mohamed Jafran',
    'Jafran Jemal',
    'Mohamed Jafran',
    'Jafran Jemal BEng',
    'London Metropolitan University Jafran Jemal',
    'Innovation Week Morocco Jafran',
    'Panama Canal ship lift inventor',
    'JJSOFT GLOBAL',
    'iShopMaster',
    'iShopMaster POS',
    'DT POS',
    'Find Soulmate Nikah',
    'AavanamKit',
    'WhatsTrim',
    'JJChat',
    'JJBrowser',
    'Retail POS Sri Lanka',
    'Mobile phone shop management software',
    'IMEI tracking ERP',
    'Software company Sri Lanka',
    'Full-stack software architect',
  ],
  authors: [
    { name: site.founder.formalName, url: site.founder.wikidata },
    { name: site.founder.name, url: site.founder.linkedin },
  ],
  creator: site.founder.name,
  publisher: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: 'JJSOFT GLOBAL — Software That Solves Real Problems',
    description: site.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JJSOFT GLOBAL Official Brand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JJSOFT GLOBAL',
    description: site.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GalaxyStarfield />
        <div className="page-noise" aria-hidden="true" />
        <Header />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedEntityGraphSchema()).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  )
}
