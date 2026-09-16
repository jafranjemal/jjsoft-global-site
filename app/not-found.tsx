import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return <><main><section className="page-hero"><div className="shell page-hero__content"><div className="eyebrow"><span className="eyebrow__line" /> 404</div><h1>That page does not exist.</h1><p>The route you followed is not part of this portfolio. Head back to the homepage or explore the product catalog.</p><Link className="button button--primary" href="/">Back to JJSOFT GLOBAL <ArrowRightIcon /></Link></div></section></main><SiteFooter /></>
}
