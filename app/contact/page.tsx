import { ArrowRightIcon } from '@/components/icons'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { site } from '@/data/site'
import { SiteFooter } from '@/components/site-footer'

export const metadata = buildMetadata({ title: 'Contact', description: 'Contact JJSOFT GLOBAL through its public brand and founder channels.', path: '/contact' })

export default function ContactPage() { return <><main>
  <section className="page-hero"><div className="shell page-hero__content"><div className="eyebrow"><span className="eyebrow__line" /> Contact</div><h1>Start with the problem, then define the software.</h1><p>The public material supplied for this site does not specify a dedicated company email or contact form endpoint. Rather than inventing one, this page points to verified public channels and product destinations.</p></div></section>
  <section className="section"><div className="shell contact-grid"><article className="contact-card"><span className="contact-card__label">Brand</span><h2>JJSOFT GLOBAL</h2><p>Follow the company page or explore the product portfolio.</p><a className="button button--primary" href={site.socials.facebook} target="_blank" rel="noreferrer">Facebook page <ArrowRightIcon /></a></article><article className="contact-card"><span className="contact-card__label">Founder</span><h2>{site.founder.name}</h2><p>Professional and code profiles for a direct view of the founder's public work.</p><div className="contact-card__actions"><a className="button button--primary" href={site.founder.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowRightIcon /></a><a className="button button--ghost button--ghost-light" href={site.founder.github} target="_blank" rel="noreferrer">GitHub <ArrowRightIcon /></a></div></article><article className="contact-card contact-card--wide"><span className="contact-card__label">Product first</span><h2>Explore before you enquire.</h2><p>For a product-led route, start with iShopMaster, DT POS, AavanamKit, Find Soulmate or the selected work portfolio. This gives a prospective partner enough context to have a better first conversation.</p><Link className="button button--primary" href="/products">Browse products <ArrowRightIcon /></Link></article></div></section>
</main><SiteFooter /></> }
