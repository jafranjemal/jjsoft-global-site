'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/site'
import { ArrowRightIcon, ArrowUpRightIcon, SparkIcon } from './icons'

export function WorkPortfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true
    return p.category === activeCategory
  })

  return (
    <div className="work-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="work-hero" id="casework-hero">
        <div className="work-hero__shell">
          <div className="work-hero__badge">
            <span className="work-hero__badge-dot" />
            <span>Proven Client Systems &middot; Shipped Production Software</span>
          </div>

          <h1 className="work-hero__title">
            Engineered for real operations.<br />
            <span className="work-hero__highlight">Selected Work &amp; Case Studies</span>
          </h1>

          <p className="work-hero__desc">
            Explore our portfolio of bespoke enterprise software, government judicial docketing, educational ERPs, and cloud retail platforms designed, engineered, and continuously supported by JJSOFT GLOBAL.
          </p>

          <div className="work-hero__telemetry">
            <div className="telemetry-chip">
              <span className="telemetry-chip__indicator telemetry-chip__indicator--green" />
              <span>5 Shipped Production Deployments</span>
            </div>
            <div className="telemetry-chip">
              <span className="telemetry-chip__indicator telemetry-chip__indicator--blue" />
              <span>Active in Sri Lanka &amp; Overseas</span>
            </div>
            <div className="telemetry-chip">
              <span className="telemetry-chip__indicator telemetry-chip__indicator--purple" />
              <span>10+ Years Architectural Track Record</span>
            </div>
            <div className="telemetry-chip">
              <span className="telemetry-chip__indicator telemetry-chip__indicator--gold" />
              <span>Zero-Downtime Migration Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS PROOF STRIP */}
      <section className="work-metrics-strip">
        <div className="work-hero__shell">
          <div className="work-metrics-grid">
            <div className="work-metric-item">
              <span className="work-metric-item__num">10+ Years</span>
              <span className="work-metric-item__label">Production Experience</span>
              <span className="work-metric-item__sub">Architecting systems since 2015</span>
            </div>
            <div className="work-metric-item">
              <span className="work-metric-item__num">0 Failed</span>
              <span className="work-metric-item__label">Judicial Bookings</span>
              <span className="work-metric-item__sub">Quazi Court Sri Lanka docket engine</span>
            </div>
            <div className="work-metric-item">
              <span className="work-metric-item__num">2,500+</span>
              <span className="work-metric-item__label">Connected Stakeholders</span>
              <span className="work-metric-item__sub">Alif International School community</span>
            </div>
            <div className="work-metric-item">
              <span className="work-metric-item__num">100k+</span>
              <span className="work-metric-item__label">Serialized Assets Tracked</span>
              <span className="work-metric-item__sub">Gems, IMEIs, &amp; Inventory ledgers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY CATEGORY FILTER TABS */}
      <section className="work-filters-bar">
        <div className="work-hero__shell">
          <div className="work-filters-inner">
            <span className="work-filters-label">Filter By Sector:</span>
            <button
              type="button"
              className={`work-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Projects <span className="work-filter-count">5</span>
            </button>
            <button
              type="button"
              className={`work-filter-btn ${activeCategory === 'edtech' ? 'active' : ''}`}
              onClick={() => setActiveCategory('edtech')}
            >
              Education &amp; School ERP <span className="work-filter-count">1</span>
            </button>
            <button
              type="button"
              className={`work-filter-btn ${activeCategory === 'government' ? 'active' : ''}`}
              onClick={() => setActiveCategory('government')}
            >
              Government &amp; Judicial <span className="work-filter-count">1</span>
            </button>
            <button
              type="button"
              className={`work-filter-btn ${activeCategory === 'enterprise' ? 'active' : ''}`}
              onClick={() => setActiveCategory('enterprise')}
            >
              Enterprise &amp; Gems ERP <span className="work-filter-count">1</span>
            </button>
            <button
              type="button"
              className={`work-filter-btn ${activeCategory === 'retail' ? 'active' : ''}`}
              onClick={() => setActiveCategory('retail')}
            >
              Retail &amp; POS Systems <span className="work-filter-count">2</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CLIENT CASE STUDY SPOTLIGHT: ALIF INTERNATIONAL SCHOOL */}
      {(activeCategory === 'all' || activeCategory === 'edtech') && (
        <section className="work-spotlight-section">
          <div className="work-hero__shell">
            <div className="work-spotlight-card">
              <div className="work-spotlight-grid">
                <div>
                  <span className="spotlight-badge">✦ FLAGSHIP CLIENT CASE STUDY &middot; EDTECH TRANSFORMATION</span>
                  <h2 className="work-spotlight-title">Alif International School Platform</h2>
                  <span className="work-spotlight-client">Client: Alif International School (Demathagoda &amp; Malwana)</span>
                  <p className="work-spotlight-desc">
                    Replaced fragmented paperwork and manual admission queues with a bespoke multi-campus educational platform. Featuring digital parent portals, automated student registration pipelines, real-time SMS broadcasting, and digital examination grade sheets.
                  </p>

                  <div className="work-spotlight-metrics">
                    <div className="spotlight-stat">
                      <strong>100% Online</strong>
                      <span>Admissions Process</span>
                    </div>
                    <div className="spotlight-stat">
                      <strong>35+ hrs/wk</strong>
                      <span>Admin Hours Saved</span>
                    </div>
                    <div className="spotlight-stat">
                      <strong>2,500+</strong>
                      <span>Active Campus Users</span>
                    </div>
                  </div>

                  <div className="work-spotlight-tags">
                    <span className="spotlight-tag">Next.js &amp; TypeScript</span>
                    <span className="spotlight-tag">Admissions CRM</span>
                    <span className="spotlight-tag">Student Lifecycle ERP</span>
                    <span className="spotlight-tag">Multi-Campus Sync</span>
                    <span className="spotlight-tag">SMS &amp; Notice Gateway</span>
                  </div>

                  <div className="work-spotlight-actions">
                    <Link href="/work/alif" className="btn-case-study">
                      Read Full Case Study <ArrowRightIcon />
                    </Link>
                    <a
                      href="https://alifinternational.lk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-external-ref"
                    >
                      Visit School Portal <ArrowUpRightIcon />
                    </a>
                  </div>
                </div>

                {/* Right Interactive Mockup Visual */}
                <div className="spotlight-visual">
                  <div className="spotlight-visual__header">
                    <div className="spotlight-visual__dots">
                      <span className="spotlight-visual__dot spotlight-visual__dot--red" />
                      <span className="spotlight-visual__dot spotlight-visual__dot--yellow" />
                      <span className="spotlight-visual__dot spotlight-visual__dot--green" />
                    </div>
                    <span className="spotlight-visual__title">alif-international.com &middot; PRODUCTION PLATFORM</span>
                  </div>

                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Image
                      src="/assets/projects/alif-school-screenshot.png"
                      alt="Alif International School Homepage"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      priority
                    />
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(5, 6, 10, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '4px 10px', fontSize: '10px', fontWeight: 800, color: '#34d399', letterSpacing: '0.08em' }}>
                      VERIFIED PRODUCTION DEPLOYMENT
                    </div>
                  </div>

                  <div className="school-telemetry-row" style={{ marginTop: '16px' }}>
                    <div className="school-telemetry-card">
                      <small>Campus Location</small>
                      <b>Dharga Town, Sri Lanka</b>
                    </div>
                    <div className="school-telemetry-card">
                      <small>Online Admissions</small>
                      <b>Active &middot; Open Now</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. ALL SHIPPED CASE STUDIES GRID */}
      <section className="work-grid-section">
        <div className="work-hero__shell">
          <div className="work-cards-grid">
            {filteredProjects.map((project) => (
              <article className="work-card-pro" key={project.slug}>
                {/* Media Preview Header */}
                <div className="work-card-pro__media">
                  <span className="work-card-pro__badge">{project.type}</span>
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          project.slug === 'alif'
                            ? 'radial-gradient(circle at 50% 40%, rgba(82, 34, 123, 0.4), transparent 70%), #0c0e18'
                            : project.slug === 'gem-management'
                            ? 'radial-gradient(circle at 50% 40%, rgba(250, 204, 21, 0.25), transparent 70%), #0c0e18'
                            : project.slug === 'dt-pos'
                            ? 'radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.25), transparent 70%), #0c0e18'
                            : 'radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.25), transparent 70%), #0c0e18',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        {project.slug === 'gem-management' && (
                          <div style={{ color: '#facc15', marginBottom: '8px' }}>
                            <SparkIcon />
                          </div>
                        )}
                        <span style={{ display: 'block', fontSize: '15px', fontWeight: 850, color: '#ffffff' }}>
                          {project.title}
                        </span>
                        <small style={{ color: '#94a3b8', fontSize: '12px' }}>{project.client}</small>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="work-card-pro__body">
                  <span className="work-card-pro__client">{project.client}</span>
                  <h3 className="work-card-pro__title">{project.title}</h3>
                  <p className="work-card-pro__desc">{project.description}</p>

                  {/* Impact Stats */}
                  {project.stats && (
                    <div className="work-card-pro__stats">
                      {project.stats.map((stat, idx) => (
                        <div className="card-stat-item" key={idx}>
                          <strong>{stat.value}</strong>
                          <span>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="work-card-pro__tags">
                    {project.tags.map((tag) => (
                      <span className="work-card-pro__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="work-card-pro__footer">
                    <Link href={project.caseStudyHref || `/work/${project.slug}`} className="btn-case-study">
                      Explore Case Study <ArrowRightIcon />
                    </Link>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-external-ref"
                      >
                        Live Reference <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ENGINEERING METHODOLOGY */}
      <section className="work-methodology-section">
        <div className="work-hero__shell">
          <div className="methodology-heading">
            <div className="eyebrow" style={{ color: '#ff3344', justifyContent: 'center' }}>
              <span className="eyebrow__line" /> OUR ARCHITECTURAL PLAYBOOK
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 850, color: '#ffffff', margin: '14px 0 16px' }}>
              How We Engineer Custom Software
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.65 }}>
              We don&apos;t build generic screens. Every system is tailored to eliminate administrative friction, protect data integrity, and guarantee long-term operational uptime.
            </p>
          </div>

          <div className="methodology-grid">
            <div className="methodology-card">
              <span className="methodology-step">STAGE 01</span>
              <h3>Workflow &amp; Choke-point Discovery</h3>
              <p>
                We spend time with registrars, clerks, and managers to understand physical bottlenecks, paper trails, and edge cases before writing a line of code.
              </p>
            </div>

            <div className="methodology-card">
              <span className="methodology-step">STAGE 02</span>
              <h3>Resilient Data Modeling</h3>
              <p>
                Relational schema design, strict role-based authorization (RBAC), offline data caches, and immutable audit logs that prevent data corruption.
              </p>
            </div>

            <div className="methodology-card">
              <span className="methodology-step">STAGE 03</span>
              <h3>High-Fidelity Interface UX</h3>
              <p>
                Sub-second page speeds, keyboard-friendly entry workflows, responsive mobile controls, and dark-mode ergonomics for continuous shift operations.
              </p>
            </div>

            <div className="methodology-card">
              <span className="methodology-step">STAGE 04</span>
              <h3>Hardened Deployment &amp; SLAs</h3>
              <p>
                Zero-downtime cloud deployments, automated hourly backups, disaster recovery protocols, and direct developer-led engineering maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL STAKEHOLDER VOICES */}
      <section className="work-testimonials-section">
        <div className="work-hero__shell">
          <div className="methodology-heading">
            <div className="eyebrow" style={{ color: '#38bdf8', justifyContent: 'center' }}>
              <span className="eyebrow__line" /> VERIFIED DEPLOYMENTS
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 850, color: '#ffffff', margin: '14px 0 16px' }}>
              Trusted by Institutions &amp; Enterprises
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.65 }}>
              Feedback from the teams and institutions running JJSOFT production platforms every day.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                &ldquo;JJSOFT transformed our entire school operations. Admissions used to mean endless paperwork and parent queues. Now it is completely digital, organized, and accessible from anywhere.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: '#52227B' }}>A</div>
                <div>
                  <strong>School Administration</strong>
                  <small>Alif International School</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                &ldquo;The online reservation system eliminated crowding in judicial corridors and gave citizens dignity and precision when scheduling court appointments. Zero double-bookings.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: '#0284c7' }}>Q</div>
                <div>
                  <strong>Judicial Registrar Team</strong>
                  <small>Quazi Court of Sri Lanka (Beruwala)</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                &ldquo;Tracking individual gemstones and certification papers across export markets required exact precision. JJSOFT built us a reliable ledger that our team relies on daily.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: '#ca8a04' }}>S</div>
                <div>
                  <strong>Operations &amp; Exports Director</strong>
                  <small>Shimla Gems Pvt Ltd</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTERPRISE CONSULTATION CTA */}
      <section className="work-cta-section">
        <div className="work-hero__shell">
          <div className="work-cta-card">
            <h2>Have a Complex Operational Challenge?</h2>
            <p>
              Whether you are digitizing a school campus, modernizing judicial workflows, or scaling multi-branch retail operations, JJSOFT GLOBAL delivers production software built to last.
            </p>
            <div className="work-cta-actions">
              <Link href="/contact" className="btn-case-study" style={{ padding: '14px 32px', fontSize: '15px' }}>
                Start an Engineering Conversation <ArrowRightIcon />
              </Link>
              <a
                href="https://wa.me/940770792979"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external-ref"
                style={{ padding: '14px 24px', fontSize: '15px' }}
              >
                Direct WhatsApp Chat <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
