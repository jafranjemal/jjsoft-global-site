import Link from 'next/link'
import { ArrowRightIcon, CodeIcon, LayersIcon, ShieldIcon, SparkIcon, StoreIcon } from '@/components/icons'
import { buildMetadata } from '@/lib/seo'
import { SiteFooter } from '@/components/site-footer'

export const metadata = buildMetadata({ title: 'Technology & Engineering', description: 'Explore the engineering toolkit and architecture principles used across JJSOFT GLOBAL products and software systems.', path: '/technology' })

const stacks = [
  { title: 'Web engineering', icon: CodeIcon, items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Angular'] },
  { title: 'Backend & APIs', icon: LayersIcon, items: ['Node.js', 'Express', 'ASP.NET', 'REST APIs', 'Authentication'] },
  { title: 'Data systems', icon: StoreIcon, items: ['MongoDB', 'MySQL', 'MSSQL', 'Firebase', 'Firestore'] },
  { title: 'Product experience', icon: SparkIcon, items: ['Figma', 'Responsive UX', 'GSAP', 'Motion design', 'Design systems'] },
  { title: 'Security & access', icon: ShieldIcon, items: ['JWT', 'RBAC', 'OAuth', 'Role-aware UI', 'Secure defaults'] },
]

export default function TechnologyPage() { return <><main>
  <section className="page-hero"><div className="shell page-hero__content"><div className="eyebrow"><span className="eyebrow__line" /> Technology</div><h1>Use the right abstraction. Keep the system readable.</h1><p>JJSOFT GLOBAL has worked across web, mobile, backend, databases, cloud hosting and product design. The useful commonality is a bias toward maintainable structure and practical delivery.</p></div></section>
  <section className="section"><div className="shell"><div className="stack-grid">{stacks.map(({ title, icon: Icon, items }) => <article className="stack-card" key={title}><span className="stack-card__icon"><Icon /></span><h2>{title}</h2><p>{items.join(' · ')}</p><div className="tag-list">{items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article>)}</div></div></section>
  <section className="section surface-dark"><div className="shell content-grid"><article className="content-copy"><div className="section-heading section-heading--light"><div className="eyebrow"><span className="eyebrow__line" /> Architecture</div><h2>Architecture should reduce surprises.</h2><p>Good structure is not about collecting patterns. It is about making responsibilities visible so teams can change one part of a system without breaking unrelated behavior.</p></div><h3>What that means in practice</h3><ul><li>Separate product concerns so domain logic is not trapped inside UI code.</li><li>Keep APIs explicit and predictable, with authorization close to the boundary.</li><li>Prefer reusable components and design tokens over one-off screens.</li><li>Build responsive behavior from the smallest useful viewport upward.</li><li>Treat deployment, performance, accessibility and SEO as part of engineering — not a final polish pass.</li></ul></article><aside className="content-aside"><span className="content-aside__label">Developer portfolio</span><h3>Full-stack by default.</h3><p>The supplied project material spans React, React Native, Flutter, Node.js, Express, ASP.NET, MongoDB, MySQL, MSSQL, Firebase, AWS, Azure, CI/CD and related tooling.</p><Link href="/work" className="button button--primary">See selected work <ArrowRightIcon /></Link></aside></div></section>
</main><SiteFooter /></> }
