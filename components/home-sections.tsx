'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products, site, timeline } from '@/data/site'
import {
  ArrowRightIcon,
  CloudIcon,
  CodeIcon,
  CogIcon,
  DesktopIcon,
  GlobeIcon,
  HeadphonesIcon,
  LayersIcon,
  LightbulbIcon,
  MobileIcon,
  PlayCircleIcon,
  ShieldIcon,
  SparkIcon,
  StoreIcon,
  UsersIcon,
} from './icons'
import { Interactive3DGlobe } from './interactive-3d-globe'

/* ==========================================================================
   1. HERO SHOWCASE (Strict Match to reference index.html & styles.css)
   ========================================================================== */
export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="hero section-dark" id="top" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow-pill">
              <span>IDEAS</span>
              <span className="eyebrow-arrow" aria-hidden="true">&rarr;</span>
              <span>TECHNOLOGY</span>
              <span className="eyebrow-arrow" aria-hidden="true">&rarr;</span>
              <span>GLOBAL IMPACT</span>
            </div>
            <h1 id="hero-title">
              We build software{' '}
              <span className="hero-break"><br /></span>that solves <span>real problems.</span>
            </h1>
            <p>
              Practical web, mobile, and cloud software engineered to help businesses streamline operations, eliminate errors, and scale sustainably.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary hero-btn-primary" href="#solutions">
                <span>Explore Solutions</span>
                <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
              </Link>
              <button
                className="btn btn-video-glass hero-btn-video"
                id="watchVideo"
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Watch video overview"
              >
                <span className="video-play-badge">
                  <svg className="play-triangle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.14v13.72a1 1 0 001.55.83l11-6.86a1 1 0 000-1.66l-11-6.86A1 1 0 008 5.14z" />
                  </svg>
                  <span className="play-pulse-ring" />
                </span>
                <span className="video-btn-copy">
                  <span className="video-btn-title">Watch Showcase</span>
                  <span className="video-btn-tag">2-Min Video</span>
                </span>
              </button>
            </div>
          </div>

          <div className="hero-art reveal delay-1" aria-label="Interactive 3D Global Technology Network">
            <div className="hero-stage" style={{ width: '100%', height: '100%', minHeight: '520px', position: 'relative' }}>
              <Interactive3DGlobe />
            </div>
          </div>
        </div>

        <div className="container hero-services reveal delay-2">
          <div className="hero-service">
            <span className="icon-square">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </span>
            <div><b>Web Applications</b><small>Fast. Scalable. Modern.</small></div>
          </div>
          <div className="hero-service">
            <span className="icon-square">
              <svg width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </span>
            <div><b>Mobile Apps</b><small>iOS &amp; Android</small></div>
          </div>
          <div className="hero-service">
            <span className="icon-square">
              <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            </span>
            <div><b>Cloud Solutions</b><small>Secure &amp; Reliable</small></div>
          </div>
          <div className="hero-service">
            <span className="icon-square">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
              </svg>
            </span>
            <div><b>IT Consulting</b><small>Plan. Build. Grow.</small></div>
          </div>
        </div>
      </section>

      {/* Video Modal matching reference */}
      {videoOpen && (
        <div className="video-modal" id="videoModal">
          <div className="modal-backdrop" onClick={() => setVideoOpen(false)} />
          <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="videoTitle">
            <button
              className="modal-close"
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="fake-video">
              <div className="fake-video-glow" />
              <div className="big-play">&#9654;</div>
              <h2 id="videoTitle">JJSOFT Global &mdash; Build. Innovate. Grow.</h2>
              <p>Explore how our production software platforms power modern retail, legal systems, and digital ecosystems.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ==========================================================================
   2. CAPABILITY FEATURE STRIP
   Integrated directly inside Hero section as per reference HTML.
   ========================================================================== */
export function CapabilityStrip() {
  return null
}

/* ==========================================================================
   3. ABOUT SECTION: HIGH-CONTRAST LIGHT THEME (Exact Reference Match)
   ========================================================================== */
export function AboutSection() {
  return (
    <section className="about section-dark" id="about" aria-labelledby="about-title">
      <div className="container split-grid">
        <div className="about-copy reveal">
          <div className="section-kicker">
            <span /> ABOUT JJSOFT GLOBAL
          </div>
          <h2 id="about-title">
            Your Vision, Our<br />Technology
          </h2>
          <p>
            JJSOFT Global is a forward-thinking software development company dedicated to delivering innovative, scalable and user-centric digital solutions. We partner with businesses of all sizes to turn ideas into powerful digital products.
          </p>
          <div className="values-row">
            <div className="value">
              <span>&#10022;</span>
              <b>Innovation<br />Driven</b>
            </div>
            <div className="value">
              <span>&#9827;</span>
              <b>Client<br />Focused</b>
            </div>
            <div className="value">
              <span>&#9678;</span>
              <b>Global<br />Mindset</b>
            </div>
            <div className="value">
              <span>&#10041;</span>
              <b>Quality<br />First</b>
            </div>
          </div>
          <Link className="btn btn-dark" href="#contact">
            Learn More <span>&rarr;</span>
          </Link>
        </div>

        <div className="about-card-wrap reveal delay-1">
          <div className="about-image-card">
            <Image
              src="/assets/images/about-office.jpg"
              alt="JJSOFT development workspace"
              width={1000}
              height={781}
              style={{ width: '100%', height: 'auto', aspectRatio: '1.28', objectFit: 'cover' }}
            />
            <aside className="stats-card">
              <div>
                <strong>10+</strong>
                <span>Years Active (Est. 2015)</span>
              </div>
              <div>
                <strong>7+</strong>
                <span>Proprietary Platforms</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Global Markets (LK &amp; UAE)</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Founder-Led &amp; Built</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   4. SOLUTIONS SECTION: DARK 2x3 GRID (Exact Reference Match)
   ========================================================================== */
export function SolutionsGridSection() {
  return (
    <section className="solutions section-dark" id="solutions" aria-labelledby="solutions-title">
      <div className="container solutions-grid">
        <div className="solutions-copy reveal">
          <div className="section-kicker light">
            <span /> OUR SOLUTIONS
          </div>
          <h2 id="solutions-title">
            Powerful Solutions for<br />Every Business Need
          </h2>
          <p>
            From custom software to mobile apps, we create digital experiences that make your business more efficient, more productive and more successful.
          </p>
          <Link className="btn btn-primary" href="/products">
            View All Services <span>&rarr;</span>
          </Link>
        </div>
        <div className="service-grid" id="services">
          <Link className="service-card reveal" href="/work">
            <span className="service-icon">&lt;/&gt;</span>
            <h3>Custom Software<br />Development</h3>
            <p>Tailored solutions for your unique business needs.</p>
            <em>&rarr;</em>
          </Link>
          <Link className="service-card reveal delay-1" href="#mobile-apps">
            <span className="service-icon">&#9647;</span>
            <h3>Mobile App<br />Development</h3>
            <p>iOS &amp; Android apps that your users love.</p>
            <em>&rarr;</em>
          </Link>
          <Link className="service-card reveal delay-2" href="/products/ishopmaster">
            <span className="service-icon">&#9729;</span>
            <h3>Cloud &amp; Infrastructure</h3>
            <p>Secure, scalable and always available.</p>
            <em>&rarr;</em>
          </Link>
          <Link className="service-card reveal" href="/products">
            <span className="service-icon">&#9649;</span>
            <h3>Web Development</h3>
            <p>Modern, responsive web applications.</p>
            <em>&rarr;</em>
          </Link>
          <Link className="service-card reveal delay-1" href="#contact">
            <span className="service-icon">&#9881;</span>
            <h3>IT Consulting</h3>
            <p>Expert advice for your digital transformation.</p>
            <em>&rarr;</em>
          </Link>
          <Link className="service-card reveal delay-2" href="#contact">
            <span className="service-icon">&#9676;</span>
            <h3>Ongoing Support</h3>
            <p>We&apos;re with you, every step of the way.</p>
            <em>&rarr;</em>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   5. DEDICATED SPOTLIGHT: CONSUMER MOBILE APPS (Find Soulmate & WhatsTrim)
   ========================================================================== */
export function MobileAppsSpotlight() {
  return (
    <section className="section surface-dark" id="mobile-apps">
      <div className="shell">
        <div className="section-heading">
          <div className="eyebrow">
            <span className="eyebrow__line" /> CONSUMER MOBILE PRODUCTS &amp; UTILITIES
          </div>
          <h2>Dedicated mobile apps built for scale and high performance.</h2>
          <p>
            In addition to enterprise systems, JJSOFT builds and maintains high-impact consumer mobile applications across matchmaking, video utilities, and real-time messaging.
          </p>
        </div>

        <div className="spotlight-grid">
          {/* Card 1: Find Soulmate */}
          <article className="spotlight-card">
            <div>
              <div className="spotlight-card__head">
                <div className="spotlight-card__icon-wrap">
                  <Image src="/assets/products/find-soulmate-icon.png" alt="Find Soulmate App Icon" width={48} height={48} style={{ borderRadius: '12px' }} />
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CONSUMER MOBILE APP</span>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Find Soulmate</h3>
                  </div>
                </div>
                <span className="status-pill status-pill--purple" style={{ fontSize: '11px' }}>Active Production</span>
              </div>

              <h4 className="spotlight-card__title">
                Muslim Matrimonial Mobile Platform
              </h4>

              <p className="spotlight-card__desc">
                A purpose-built, values-aligned matrimonial mobile application designed for secure, ethical Muslim matchmaking. Features verified profiles, wali communication protocols, end-to-end privacy guards, and zero public profile indexing.
              </p>

              <div className="spotlight-card__pills">
                <span className="spotlight-card__pill">✦ Halal Matchmaking</span>
                <span className="spotlight-card__pill">✦ Wali Verification</span>
                <span className="spotlight-card__pill">✦ Privacy Protection</span>
                <span className="spotlight-card__pill">✦ Android &amp; iOS</span>
                <span className="spotlight-card__pill">✦ Encrypted Chat</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
              <Link href="/products/find-soulmate" className="button button--primary button--compact">
                Explore Find Soulmate Platform <ArrowRightIcon />
              </Link>
              <a href="https://findsoulmate.me" target="_blank" rel="noreferrer" className="button button--ghost button--compact">
                Visit findsoulmate.me <ArrowRightIcon />
              </a>
            </div>
          </article>

          {/* Card 2: WhatsTrim */}
          <article className="spotlight-card spotlight-card--secondary">
            <div>
              <div className="spotlight-card__head">
                <div className="spotlight-card__icon-wrap">
                  <Image src="/assets/products/whatstrim-mark.png" alt="WhatsTrim App Icon" width={48} height={48} style={{ borderRadius: '12px' }} />
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ANDROID UTILITY</span>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>WhatsTrim</h3>
                  </div>
                </div>
                <span className="status-pill status-pill--success" style={{ fontSize: '11px' }}>Utility</span>
              </div>

              <h4 className="spotlight-card__title">
                Lossless Status Video Trimmer
              </h4>

              <p className="spotlight-card__desc">
                Engineered for Android to solve video status compression and duration limits. Seamlessly slices long videos into exact 30-second WhatsApp status clips with zero bitrate loss and instant batch exporting.
              </p>

              <div className="spotlight-card__pills">
                <span className="spotlight-card__pill">✦ Lossless 60fps</span>
                <span className="spotlight-card__pill">✦ 30-Sec Smart Slicing</span>
                <span className="spotlight-card__pill">✦ Low Memory Footprint</span>
                <span className="spotlight-card__pill">✦ No Quality Degradation</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
              <Link href="/products/whatstrim" className="button button--primary button--compact">
                View WhatsTrim Details <ArrowRightIcon />
              </Link>
              <a href="https://apkcombo.com/es/whatstrim-no-1-best-gb-whatssapp-downloader/com.jjsoft.jafranjemal.whatsTrim/" target="_blank" rel="noreferrer" className="button button--ghost button--compact">
                Download APK <ArrowRightIcon />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   6. UPCOMING PRODUCTS & ACTIVE ENGINEERING PIPELINE
   ========================================================================== */
export function UpcomingPipelineSection() {
  const pipeline = [
    {
      badge: 'In Active R&D',
      title: 'Next-Gen AI Retail Copilot',
      desc: 'Predictive inventory ordering, automated shrinkage detection, and customer demand forecasting natively embedded in iShopMaster.',
      phase: 'Beta Testing',
    },
    {
      badge: 'Developer Cloud',
      title: 'AavanamKit Cloud Studio',
      desc: 'Real-time collaborative visual receipt and invoice layout builder with team workspaces, shared schemas, and one-click CDN publishing.',
      phase: 'Alpha Staging',
    },
    {
      badge: 'Enterprise Security',
      title: 'JJChat Enterprise Suite',
      desc: 'On-premises self-hosted corporate messenger with end-to-end audit logging, active directory SSO, and zero third-party telemetry leakage.',
      phase: 'Architecture Review',
    },
    {
      badge: 'Trade & Logistics',
      title: 'Global Gem Provenance Ledger',
      desc: 'Tamper-proof digital certification and export workflow system for gemstone miners, cutters, and international B2B buyers.',
      phase: 'Pilot Implementation',
    },
  ]

  return (
    <section className="section" id="pipeline">
      <div className="shell">
        <div className="section-heading">
          <div className="eyebrow">
            <span className="eyebrow__line" /> INNOVATION ROADMAP
          </div>
          <h2>What JJSOFT is building next.</h2>
          <p>
            We continually invest engineering bandwidth into next-generation tools, artificial intelligence copilots, and cloud platforms solving emerging business bottlenecks.
          </p>
        </div>

        <div className="pipeline-grid">
          {pipeline.map((item) => (
            <div className="pipeline-card" key={item.title}>
              <span className="pipeline-card__badge">{item.badge}</span>
              <h3 className="pipeline-card__title">{item.title}</h3>
              <p className="pipeline-card__desc">{item.desc}</p>
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <small style={{ color: '#64748b', fontSize: '11px' }}>Status</small>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>{item.phase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   7. TRUSTED BY INNOVATIVE BRANDS (Exact Reference HTML & CSS)
   ========================================================================== */
export function TrustedBrandsStrip() {
  return (
    <section className="trust section-dark" id="clients" aria-label="Production Systems & Enterprise Deployments">
      <div className="container trust-inner">
        <div className="trust-title">
          <i />
          <span>PRODUCTION SYSTEMS &amp; ENTERPRISE DEPLOYMENTS</span>
          <i />
        </div>
        <div className="logo-row">
          <span><b>&#9670;</b> SHIMLA GEMS</span>
          <span><b>&#10019;</b> QUAZI COURT</span>
          <span><b>&#9729;</b> CINEC CAMPUS</span>
          <span><b>&#9697;</b> MANNINGHAM</span>
          <span><b>&#10022;</b> OPTIMO UK</span>
          <span><b>&#9672;</b> ISHOPMASTER</span>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   8. FLAGSHIP VIEWPORT SHOWCASE: iShopMaster ERP (Interactive 5-Tab)
   ========================================================================== */
export function FlagshipSection() {
  const [activeTab, setActiveTab] = useState<number>(0)

  const tabs = [
    {
      title: '1. Multi-Store Sync',
      kpi: '3 Synced Hubs',
      kpiLabel: 'Active Branches',
      kpi2: '0.0% Audited',
      kpi2Label: 'Inventory Drift',
      headline: 'Real-time database replication across Colombo, Kandy and Galle.',
      desc: 'Eliminates cross-branch stock discrepancies with bidirectional cloud state synchronization, role-based store access, and offline-first cache resilience.',
    },
    {
      title: '2. Real-time POS',
      kpi: '<120ms',
      kpiLabel: 'Checkout Latency',
      kpi2: '80mm ESC/POS',
      kpi2Label: 'Thermal Hardware',
      headline: 'Sub-second touchscreen checkout with thermal receipt queues.',
      desc: 'Optimized cashier workflow engineered for high-throughput mobile retail counters during peak festival rushes with instant cash drawer kick.',
    },
    {
      title: '3. IMEI Tracking',
      kpi: '4,820+ Units',
      kpiLabel: 'Indexed Serials',
      kpi2: 'Zero',
      kpi2Label: 'Warranty Leakage',
      headline: 'Strict serial number verification from supplier shipment to consumer warranty.',
      desc: 'Every phone, tablet, and accessory is indexed with dual IMEI verification, supplier source logs, and automated warranty expiration clocks.',
    },
    {
      title: '4. Repair Bench',
      kpi: '14 Active',
      kpiLabel: 'Bench Queue',
      kpi2: 'Automated SMS',
      kpi2Label: 'Customer Alerts',
      headline: 'Integrated technician job routing and automated SMS customer updates.',
      desc: 'Connects front-counter intake to bench technician repair queues with parts consumption tracking, diagnostic checklists, and job sheet printing.',
    },
    {
      title: '5. Analytics',
      kpi: 'LKR 2.8M+',
      kpiLabel: 'Monthly Flow',
      kpi2: 'Instant P&L',
      kpi2Label: 'Gross Margin Audit',
      headline: 'Live branch turnover, gross margin reports, and shrinkage audits.',
      desc: 'Owner mobile cockpit showing synchronized real-time branch revenues, cashier shift reconciliations, inventory aging, and margin analysis.',
    },
  ]

  const current = tabs[activeTab]

  return (
    <section className="section surface-dark" id="flagship">
      <div className="shell ishopmaster-split">
        <div>
          <div className="eyebrow">
            <span className="eyebrow__line" /> FLAGSHIP RETAIL OPERATING SYSTEM
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 4.8vw, 56px)', fontWeight: 850, margin: '14px 0 16px', color: '#ffffff' }}>
            iShopMaster
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.65', margin: '0 0 28px', maxWidth: '480px' }}>
            Designed and engineered an end-to-end business management ecosystem for modern mobile retailers and electronics distributors. Connects POS sales, multi-branch serialized IMEI inventory, repair workshop tracking, and real-time financial reporting into one unified cloud platform.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/products/ishopmaster" className="button button--primary">
              Explore iShopMaster Platform <ArrowRightIcon />
            </Link>
            <a href="https://ishopmaster.lk/" target="_blank" rel="noreferrer" className="button button--ghost">
              Visit ishopmaster.lk <ArrowRightIcon />
            </a>
          </div>
        </div>

        <div>
          <div className="ishopmaster-tabs-bar">
            {tabs.map((tab, idx) => (
              <button
                type="button"
                key={tab.title}
                className={`ishopmaster-tab-chip ${activeTab === idx ? 'ishopmaster-tab-chip--active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="case-study-visual-container" style={{ borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ background: '#111420', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src="/assets/logos/ishopmaster.svg" alt="iShopMaster" width={22} height={22} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>iShopMaster Retail Operating System</span>
              </div>
              <span className="status-pill status-pill--success" style={{ fontSize: '10px' }}>Active Telemetry</span>
            </div>

            <div style={{ padding: '24px', background: '#0a0c13' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                {current.headline}
              </h4>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {current.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="luminous-metric-item" style={{ padding: '12px' }}>
                  <small style={{ fontSize: '10px' }}>{current.kpiLabel}</small>
                  <strong style={{ fontSize: '17px' }}>{current.kpi}</strong>
                </div>
                <div className="luminous-metric-item" style={{ padding: '12px' }}>
                  <small style={{ fontSize: '10px' }}>{current.kpi2Label}</small>
                  <strong style={{ fontSize: '17px', color: 'var(--emerald)' }}>{current.kpi2}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   9. REAL PROJECTS, REAL IMPACT (3 Enterprise Case Studies)
   ========================================================================== */
export function ProjectsSection() {
  return (
    <section className="section surface-dark" id="portfolio">
      <div className="shell">
        <div className="section-heading">
          <div className="eyebrow">
            <span className="eyebrow__line" /> SELECTED CASE STUDIES
          </div>
          <h2>Real Projects. Real Impact.</h2>
          <p>
            Production software platforms solving complex operational challenges for enterprises, distributors, and national public services.
          </p>
        </div>

        <div className="projects-tri-grid">
          {/* 1. Alif International School Platform */}
          <article className="project-tri-card">
            <div className="project-tri-card__media">
              <Image
                src="/assets/projects/alif-school-screenshot.png"
                alt="Alif International School Digital Platform"
                fill
                sizes="(max-width: 780px) 100vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                priority
              />
            </div>
            <div className="project-tri-card__body">
              <div className="eyebrow">
                <span className="eyebrow__line" /> ED-TECH TRANSFORMATION
              </div>
              <h3>Alif School Platform</h3>
              <p>
                A complete school management and digital platform built for Alif International School. Streamlines admissions, digital notices, parent communication, and operational analytics.
              </p>
              <div>
                <Link href="/work/alif" className="button button--ghost button--compact">
                  View Case Study <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </article>

          {/* 2. Quazi Court of Sri Lanka */}
          <article className="project-tri-card">
            <div className="project-tri-card__media">
              <Image
                src="/assets/projects/quazi-court-screenshot.jpg"
                alt="Quazi Court Judicial Reservation Portal"
                fill
                sizes="(max-width: 780px) 100vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                priority
              />
            </div>
            <div className="project-tri-card__body">
              <div className="eyebrow">
                <span className="eyebrow__line" /> GOVERNMENT DIGITIZATION
              </div>
              <h3>Quazi Court of Sri Lanka</h3>
              <p>
                Official judicial appointment booking and reservation portal engineered for Quazi Court Beruwala, replacing in-person queues with verified digital docketing and zero double bookings.
              </p>
              <div>
                <Link href="/work/quazi-court" className="button button--ghost button--compact">
                  View Judicial Portal <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </article>

          {/* 2. Gem Management System */}
          <article className="project-tri-card">
            <div className="project-tri-card__media">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(250, 204, 21, 0.18), transparent 70%), #0c0e17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <SparkIcon />
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#facc15', marginTop: '8px' }}>SHIMLA GEMS &middot; CEYLON SAPPHIRE</span>
                  <small style={{ color: 'var(--text-dim)', fontSize: '11px' }}>High-Value Custody &amp; Export Ledger</small>
                </div>
              </div>
            </div>
            <div className="project-tri-card__body">
              <div className="eyebrow">
                <span className="eyebrow__line" /> ENTERPRISE RESOURCE PLANNING
              </div>
              <h3>Gem Management System</h3>
              <p>
                Full-stack inventory tracking, procurement, and gemstone order management system built for Shimla Gems Pvt Ltd with role-based access control and certified export logistics.
              </p>
              <div>
                <Link href="/work/gem-management" className="button button--ghost button--compact">
                  View Case Study <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </article>

          {/* 3. DT POS Smart Retail */}
          <article className="project-tri-card">
            <div className="project-tri-card__media">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.18), transparent 70%), #0c0e17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <Image src="/assets/logos/dt-pos.svg" alt="DT-POS" width={36} height={36} style={{ display: 'inline-block' }} />
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: 'var(--emerald)', marginTop: '8px' }}>DT POS SMART CLOUD</span>
                  <small style={{ color: 'var(--text-dim)', fontSize: '11px' }}>Sub-Second Touchscreen POS</small>
                </div>
              </div>
            </div>
            <div className="project-tri-card__body">
              <div className="eyebrow">
                <span className="eyebrow__line" /> POINT OF SALE &middot; CLOUD ENGINE
              </div>
              <h3>DT POS Smart Retail</h3>
              <p>
                A modern cloud-first point of sale solution built for retail shops, repair workflows, fast checkout, ESC/POS thermal printing, and multi-branch inventory sync.
              </p>
              <div>
                <Link href="/products/dt-pos" className="button button--ghost button--compact">
                  View POS Details <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   10. ORIGIN ARCHIVE: 2015 FAMILY HOME OPENING CLICK
   ========================================================================== */
export function ArchivalOrigin() {
  return (
    <section className="origin-archive-section" id="origin">
      <div className="shell origin-archive-grid">
        {/* Museum-Grade Archival Frame for 2015 Family Home Opening Photo */}
        <div className="archival-frame">
          <div className="archival-plaque-top">
            <span className="archival-tag">✦ HISTORIC ARCHIVE &middot; 2015</span>
          </div>

          <div className="archival-frame__inner">
            <Image
              src="/assets/projects/2015-company-opening-enhanced.jpg"
              alt="JJSOFT official opening day at the family home in 2015 with founder Jafran Jemal and first laptop"
              fill
              sizes="(max-width: 780px) 100vw, 42vw"
              className="archival-photo"
              priority
            />
          </div>

          <div className="archival-caption-plate">
            <small>DAY 1 &middot; FAMILY HOME OPENING</small>
            <strong>The Genesis of JJSOFT (2015)</strong>
            <p>Founder Jafran Jemal receiving the first family blessings at the family home opening day in 2015, with his first Compaq development laptop on the desk.</p>
          </div>

          <div className="big-dreams-badge">
            <strong>Big dreams <span>start small.</span></strong>
          </div>
        </div>

        {/* Narrative & Timeline */}
        <div className="origin-narrative">
          <div className="eyebrow">
            <span className="eyebrow__line" /> OUR ORIGIN &middot; A DECADE OF CONVICTION
          </div>
          <h2>Started from a family home in 2015. Built into a software product company.</h2>
          <p>
            JJSOFT began right here in 2015: in a modest family living room, with a single development laptop on the desk, blessings from loved ones, and an unshakable determination to build software that solves real operational problems.
          </p>
          <p>
            From that first desk, founder <strong>Jafran Jemal, B.Eng (Hons)</strong> grew JJSOFT through early Android utilities, judicial digitizations, enterprise POS systems, and developer tooling into an international technology brand operating across Sri Lanka and the UAE.
          </p>

          <div className="timeline" style={{ marginTop: '32px' }}>
            {timeline.slice(0, 4).map((item) => (
              <div className="timeline__item" key={item.year}>
                <span className="timeline__dot" />
                <span className="timeline__year">{item.year}</span>
                <div className="timeline__title">{item.title}</div>
                <p className="timeline__copy">{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link href="/about" className="text-link">
              Explore Our Full 10-Year Story &amp; History <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   11. FOUNDER SPOTLIGHT: ARCHITECTURAL LEADERSHIP
   ========================================================================== */
export function FounderSection() {
  return (
    <section className="section" id="founder">
      <div className="shell">
        <div className="founder-editorial-card">
          <div className="founder-editorial-photo">
            <Image
              src="/assets/founder/jafran-jemal-presentation.jpg"
              alt="Founder Jafran Jemal, B.Eng (Hons) keynote address"
              fill
              sizes="(max-width: 1080px) 100vw, 45vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            />
            <div className="founder-editorial-tag-bottom">
              <span>FOUNDER &middot; CHIEF ARCHITECT</span>
              <strong>Jafran Jemal, B.Eng (Hons)</strong>
            </div>
          </div>

          <div className="founder-editorial-body">
            <div className="eyebrow">
              <span className="eyebrow__line" /> LEADERSHIP &amp; ARCHITECTURE
            </div>
            <h3>Built by a developer who still builds.</h3>
            <p>
              <strong>Mr. Jafran Jemal, B.Eng (Hons)</strong> founded JJSOFT GLOBAL in 2015 with a commitment to engineering software that eliminates friction from everyday operations. As a hands-on software engineer and systems architect, he directs product architecture, codebase quality, and technical strategy.
            </p>
            <p>
              From writing the earliest lines of mobile code to architecting multi-branch distributed retail databases and government security workflows, he remains directly engaged in code and technical direction.
            </p>

            <div className="founder-credentials-strip">
              <span className="credential-pill"><strong>Degree</strong> B.Eng (Hons) Software Eng.</span>
              <span className="credential-pill"><strong>Experience</strong> 10+ Years Leadership</span>
              <span className="credential-pill"><strong>Domain</strong> Full-Stack Architecture</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={site.founder.linkedin} target="_blank" rel="noreferrer" className="button button--primary button--compact">
                Connect on LinkedIn <ArrowRightIcon />
              </a>
              <a href={site.founder.github} target="_blank" rel="noreferrer" className="button button--ghost button--compact">
                Founder GitHub <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   12. DEVELOPER TOOLING: AavanamKit
   ========================================================================== */
export function DeveloperToolingSection() {
  return (
    <section className="section surface-dark" id="tooling">
      <div className="shell">
        <div className="dev-spotlight-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow__line" /> OPEN SOURCE &middot; DEVELOPER TOOLING
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 850, margin: '14px 0 16px', color: '#ffffff' }}>
              We build for developers too. <span className="gradient-gold">Stop coding layouts blindly.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.65', margin: '0 0 24px' }}>
              A visual document layout designer and headless JSON rendering ecosystem. Design templates visually instead of coding coordinates blindly for PDF, thermal receipts, and automated business invoices.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://aavanamkit-demo.vercel.app/" target="_blank" rel="noreferrer" className="button button--primary">
                Launch Live Interactive Demo <ArrowRightIcon />
              </a>
              <Link href="/products/aavanamkit" className="button button--ghost">
                Read Documentation <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div className="dev-code-preview">
            <div className="dev-code-preview__top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
                <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>aavanamkit.template.json</span>
              </div>
              <span className="status-pill status-pill--purple">Headless Engine</span>
            </div>
            <pre>
{`{
  "version": "1.2.0",
  "template": "retail_tax_invoice",
  "canvas": { "unit": "mm", "width": 80 },
  "elements": [
    { "type": "header", "text": "iShopMaster Colombo" },
    { "type": "barcode", "source": "item.imei" },
    { "type": "table", "dataset": "invoice.items" },
    { "type": "qr_code", "payload": "lkr_qr_verify" }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   13. BUILT FOR SERIOUS PRODUCTS (RISK REDUCTION)
   ========================================================================== */
export function BuiltForConfidence() {
  const pillars = [
    {
      title: 'Product Strategy',
      desc: 'We do not blindly code requirements against vague briefs. We stress-test operational assumptions, map real workflows, and engineer for customer retention and profitability.',
      Icon: SparkIcon,
    },
    {
      title: 'UX Engineering',
      desc: 'Complex multi-branch retail workflows turned into clean, resilient interfaces that cashiers, store owners, and administrators can navigate without manuals or training overhead.',
      Icon: UsersIcon,
    },
    {
      title: 'Scalable Architecture',
      desc: 'Decoupled service layers, ACID transactional safety, and schemas designed to scale from 100 to 100,000 active operations without data inconsistency or degradation.',
      Icon: LayersIcon,
    },
    {
      title: 'Production Engineering',
      desc: 'Security, performance, and monitoring are not afterthoughts. Role-based access control (RBAC), end-to-end encrypted telemetry, and automated CI/CD come standard.',
      Icon: ShieldIcon,
    },
  ]

  return (
    <section className="confidence-section">
      <div className="shell">
        <div className="section-heading">
          <div className="eyebrow">
            <span className="eyebrow__line" /> RISK REDUCTION &middot; CONFIDENCE BY DESIGN
          </div>
          <h2>Built for serious products. Engineered for zero downtime.</h2>
          <p>
            When serious clients commission software, they are not merely purchasing lines of code &mdash; they are buying operational certainty, risk reduction, and architectural longevity.
          </p>
        </div>

        <div className="confidence-grid">
          {pillars.map((pillar) => (
            <div className="confidence-card" key={pillar.title}>
              <div className="confidence-card__icon">
                <pillar.Icon />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   14. FINAL CONVERSION CTA BANNER
   ========================================================================== */
export function ClosingCTA() {
  return (
    <section className="studio-cta" id="contact">
      <div className="concentric-rings" aria-hidden="true" />
      <div className="shell studio-cta__content">
        <div className="eyebrow">
          <span className="eyebrow__line" /> START A CONVERSATION
        </div>
        <h2>Have an idea worth building? Let&apos;s turn it into something real.</h2>
        <p>
          Tell us about your business, your users, and your operational bottlenecks. We will show you how we would engineer the solution.
        </p>
        <div className="studio-cta__actions">
          <a href={`mailto:${site.name.toLowerCase().replace(/\s+/g, '')}@gmail.com?subject=Project%20Inquiry%20from%20JJSOFT%20Global`} className="button button--primary">
            Start a Conversation <ArrowRightIcon />
          </a>
          <Link href="/products" className="button button--ghost">
            Explore All Products <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   BACKWARD COMPATIBILITY EXPORTS
   ========================================================================== */
export {
  ArchivalOrigin as Journey,
  SolutionsGridSection as ProductSection,
  FlagshipSection as FeaturedProduct,
  ProjectsSection as SolutionsSection,
  CapabilityStrip as StatsStrip,
  DeveloperToolingSection as TechnologySection,
  FounderSection as AboutFounder,
  ClosingCTA as ContactSection,
}
