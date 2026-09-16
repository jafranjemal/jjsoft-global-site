import { buildMetadata } from '@/lib/seo'
import { productCollectionSchema } from '@/lib/schema'
import { ProductsView } from '@/components/products-view'

export const metadata = buildMetadata({
  title: 'Production Software Portfolio & Systems — JJSOFT GLOBAL',
  description:
    'Explore verified production software products engineered by JJSOFT GLOBAL and Jafran Jemal: iShopMaster (Retail ERP), DT POS, Find Soulmate (Matrimonial App), AavanamKit (Document Engine), WhatsTrim, JJChat, and JJBrowser.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <>
      <ProductsView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productCollectionSchema()).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
