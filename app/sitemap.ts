import type { MetadataRoute } from 'next'
import { products, projects, site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-09-16')

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL('/', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: new URL('/about', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: new URL('/products', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: new URL('/work', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: new URL('/technology', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/contact', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/insights', site.url).toString(),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: new URL(`/products/${product.slug}`, site.url).toString(),
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: product.featured ? 0.9 : 0.85,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: new URL(`/work/${project.slug}`, site.url).toString(),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: project.featured ? 0.85 : 0.75,
  }))

  const insightRoutes: MetadataRoute.Sitemap = [
    '/insights/software-starts-with-workflow',
    '/insights/from-app-to-business-system',
    '/insights/design-for-maintenance',
  ].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...coreRoutes, ...productRoutes, ...projectRoutes, ...insightRoutes]
}
