import './work.css'
import { buildMetadata } from '@/lib/seo'
import { WorkPortfolio } from '@/components/work-portfolio'
import { SiteFooter } from '@/components/site-footer'

export const metadata = buildMetadata({
  title: 'Selected Work & Case Studies',
  description:
    'Explore production software case studies by JJSOFT GLOBAL across educational campus platforms, judicial docketing, enterprise gemstone ERPs, and cloud retail.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <main>
        <WorkPortfolio />
      </main>
      <SiteFooter />
    </>
  )
}
