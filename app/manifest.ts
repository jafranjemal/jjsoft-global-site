import type { MetadataRoute } from 'next'
import { site } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'JJSOFT',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#081017',
    theme_color: '#081017',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
