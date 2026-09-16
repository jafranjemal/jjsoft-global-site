import type { Metadata } from 'next'
import { site } from '@/data/site'

export function buildMetadata(input: {
  title: string
  description: string
  path?: string
}): Metadata {
  const canonical = new URL(input.path ?? '/', site.url).toString()
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: site.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
    },
  }
}
