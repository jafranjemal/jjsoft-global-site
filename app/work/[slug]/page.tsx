import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/site'
import { buildMetadata } from '@/lib/seo'
import { ArrowRightIcon } from '@/components/icons'
import { ProjectVisual } from '@/components/ui'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return projects.filter((project) => project.slug !== 'alif').map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) {
    return buildMetadata({
      title: 'Project not found',
      description: 'The requested project could not be found.',
      path: `/work/${slug}`,
    })
  }
  return buildMetadata({
    title: `${project.title} — ${project.type}`,
    description: project.description,
    path: `/work/${project.slug}`,
  })
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  return (
    <>
      <main>
        <section className="page-hero">
          <div className="shell page-hero__content">
            <div className="eyebrow">
              <span className="eyebrow__line" /> {project.type}
            </div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div style={{ marginTop: '16px' }}>
              <a className="button button--primary" href={project.href} target="_blank" rel="noreferrer">
                Open Original Reference <ArrowRightIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell content-grid">
            <div>
              <ProjectVisual variant={project.visual as 'gem' | 'court' | 'shop'} />

              {project.screenshot && (
                <div
                  style={{
                    marginTop: '28px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid var(--line)',
                    background: '#0a1017',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <div style={{ padding: '14px 18px', background: '#121a22', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Historical Portal Archive
                    </span>
                    <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '16px' }}>Production System Verification</h3>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', background: '#070d12' }}>
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} live screenshot`}
                      width={380}
                      height={760}
                      style={{ height: 'auto', maxHeight: '520px', width: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '12px 18px', background: '#0e1720', color: '#94a3b8', fontSize: '12px' }}>
                    Verified archive record showing: <em>Copyright © 2020-2021 JJSOFT GLOBAL. All rights reserved.</em>
                  </div>
                </div>
              )}

              <div className="content-copy work-detail-copy" style={{ marginTop: '32px' }}>
                <h2>Project context &amp; execution</h2>
                <p>
                  {project.description} This case study documents real client and public-service implementations engineered to solve specific operational challenges, maintaining authentic system boundaries and data compliance.
                </p>
                <h3>Technical focus areas</h3>
                <ul>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="content-aside">
              <span className="content-aside__label">Reference</span>
              <h3>{project.title}</h3>
              <p>Canonical destination and project background:</p>
              <a className="button button--primary button--compact" href={project.href} target="_blank" rel="noreferrer" style={{ marginTop: '10px', display: 'inline-flex' }}>
                Visit Project Reference <ArrowRightIcon />
              </a>
              <div className="tag-list" style={{ marginTop: '20px' }}>
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section surface-dark">
          <div className="shell">
            <div className="section-heading section-heading--light">
              <div className="eyebrow">
                <span className="eyebrow__line" /> Portfolio
              </div>
              <h2>More selected casework.</h2>
              <p>Explore how product thinking was applied across retail, government, gems and mobile platforms.</p>
            </div>
            <Link className="button button--primary" href="/work">
              View All Work <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
