import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import { buildMetadata } from '@/lib/seo'
import { SiteFooter } from '@/components/site-footer'

export const metadata = buildMetadata({ title: 'Insights', description: 'Editorial notes on product thinking, software architecture, operations and maintainable digital systems.', path: '/insights' })

const insights = [
  { slug: 'software-starts-with-workflow', category: 'Product thinking', title: 'Software starts with the workflow, not the screen', excerpt: 'A useful system begins by mapping what people actually do: inputs, decisions, handoffs, exceptions and the outcome the business needs.' },
  { slug: 'from-app-to-business-system', category: 'Architecture', title: 'The move from app to business system', excerpt: 'As software matures, the hard part shifts from individual features to permissions, states, data integrity, auditability and operational clarity.' },
  { slug: 'design-for-maintenance', category: 'Engineering', title: 'Designing for the next developer', excerpt: 'Maintainability is an interface too. Naming, boundaries, defaults and predictable component behavior determine whether a product can evolve safely.' },
]

export default function InsightsPage() { return <><main>
  <section className="page-hero"><div className="shell page-hero__content"><div className="eyebrow"><span className="eyebrow__line" /> Insights</div><h1>Ideas for building useful software without building unnecessary complexity.</h1><p>These editorial notes extend the product and engineering themes visible across the portfolio: workflow-first thinking, system design and maintainability.</p></div></section>
  <section className="section"><div className="shell"><div className="insight-grid">{insights.map((item) => <article className="insight-card" key={item.slug}><div className="eyebrow"><span className="eyebrow__line" /> {item.category}</div><h2>{item.title}</h2><p>{item.excerpt}</p><Link className="text-link" href={`/insights/${item.slug}`}>Read article <ArrowRightIcon /></Link></article>)}</div></div></section>
</main><SiteFooter /></> }
