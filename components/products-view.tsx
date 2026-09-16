'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/site'
import {
  ArrowRightIcon,
  GlobeIcon,
  ShieldIcon,
} from '@/components/icons'
import { SiteFooter } from '@/components/site-footer'

export function ProductsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'enterprise' | 'mobile' | 'developer'>('all')

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'enterprise') return p.slug === 'ishopmaster' || p.slug === 'dt-pos'
    if (activeCategory === 'mobile') return p.slug === 'find-soulmate' || p.slug === 'whatstrim' || p.slug === 'jjchat' || p.slug === 'jjbrowser'
    if (activeCategory === 'developer') return p.slug === 'aavanamkit'
    return true
  })

  return (
    <>
      <main>
        {/* 1. HIGH-FIDELITY COSMIC PRODUCTS HERO */}
        <section className="cosmic-hero" style={{ padding: '140px 0 70px' }}>
          <div className="shell">
            <div style={{ maxWidth: '820px' }}>
              <div className="cosmic-hero__pill">
                <span>VERIFIED PRODUCTION PORTFOLIO</span>
                <span className="cosmic-hero__pill-arrow">&rarr;</span>
                <span>EST. 2015</span>
              </div>

              <h1 className="cosmic-hero__title" style={{ fontSize: 'clamp(40px, 4.8vw, 64px)' }}>
                Software Products Built for<br />
                <span className="cosmic-hero__red">Real Operating Workflows</span>
              </h1>

              <p className="cosmic-hero__desc" style={{ maxWidth: '680px', fontSize: '17px' }}>
                Every JJSOFT product has an authentic problem space, verified users, and high-availability architecture &mdash; from multi-branch retail operating systems to Muslim matrimonial mobile apps and open-source layout engines.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 16px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>7 Shipped Production Products</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 16px' }}>
                  <GlobeIcon style={{ width: 16, height: 16, color: '#38bdf8' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Active in Sri Lanka &amp; UAE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 16px' }}>
                  <ShieldIcon style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Zero Vendor Lock-in</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CATEGORY SELECTOR TABS */}
        <section style={{ background: '#07080f', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
          <div className="shell" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '8px' }}>
              Filter By Domain:
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid',
                borderColor: activeCategory === 'all' ? '#ff2442' : 'rgba(255,255,255,0.1)',
                background: activeCategory === 'all' ? 'rgba(255, 36, 66, 0.15)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === 'all' ? '#ff3d56' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Products (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('enterprise')}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid',
                borderColor: activeCategory === 'enterprise' ? '#ff2442' : 'rgba(255,255,255,0.1)',
                background: activeCategory === 'enterprise' ? 'rgba(255, 36, 66, 0.15)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === 'enterprise' ? '#ff3d56' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Enterprise Retail &amp; POS (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('mobile')}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid',
                borderColor: activeCategory === 'mobile' ? '#ff2442' : 'rgba(255,255,255,0.1)',
                background: activeCategory === 'mobile' ? 'rgba(255, 36, 66, 0.15)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === 'mobile' ? '#ff3d56' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Consumer Mobile &amp; Utilities (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('developer')}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid',
                borderColor: activeCategory === 'developer' ? '#ff2442' : 'rgba(255,255,255,0.1)',
                background: activeCategory === 'developer' ? 'rgba(255, 36, 66, 0.15)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === 'developer' ? '#ff3d56' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Developer Tooling (1)
            </button>
          </div>
        </section>

        {/* 3. DEDICATED SPOTLIGHT 1: FIND SOULMATE MATRIMONIAL PLATFORM */}
        <section className="section surface-dark" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div>
                <div className="eyebrow" style={{ color: '#ec4899' }}>
                  <span className="eyebrow__line" /> FEATURED MOBILE PLATFORM
                </div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 850, margin: '14px 0 16px', color: '#ffffff' }}>
                  Find Soulmate
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.7, margin: '0 0 24px' }}>
                  A values-based Muslim matrimonial application designed for privacy-first, ethical matchmaking. Includes strict wali verification, end-to-end encrypted messaging, interactive search filters, and zero public search engine indexing.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '32px' }}>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ display: 'block', color: '#ec4899', fontSize: '15px' }}>Wali Verification</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Guardian verification protocol ensures respectful communication.</small>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ display: 'block', color: '#38bdf8', fontSize: '15px' }}>Halal Privacy Guards</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Encrypted photos and controlled blur reveal settings.</small>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ display: 'block', color: '#10b981', fontSize: '15px' }}>Values-Based Matching</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Compatibility algorithms tailored to cultural and Islamic principles.</small>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ display: 'block', color: '#f59e0b', fontSize: '15px' }}>Cross-Platform</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Native mobile architecture deployed for Android and iOS devices.</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/products/find-soulmate" className="button button--primary">
                    Explore Find Soulmate Architecture <ArrowRightIcon />
                  </Link>
                  <a href="https://findsoulmate.me" target="_blank" rel="noreferrer" className="button button--ghost">
                    Visit Official Site (findsoulmate.me) <ArrowRightIcon />
                  </a>
                </div>
              </div>

              {/* Find Soulmate App Screenshot Visual */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '280px', height: '560px', borderRadius: '36px', border: '4px solid #334155', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.3)', background: '#090a10' }}>
                  <Image
                    src="/assets/products/find-soulmate-screen-0.webp"
                    alt="Find Soulmate App interface"
                    fill
                    sizes="280px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DEDICATED SPOTLIGHT 2: WHATSTRIM VIDEO UTILITY */}
        <section className="section" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 5, 8, 0.8) 100%)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center' }}>
                <Image src="/assets/products/whatstrim-mark.png" alt="WhatsTrim Logo" width={96} height={96} style={{ borderRadius: '20px', marginBottom: '20px', boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3)' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 850, color: '#ffffff', margin: '0 0 6px' }}>WhatsTrim Utility</h3>
                <span className="status-pill status-pill--success" style={{ fontSize: '11px', marginBottom: '16px' }}>Published on APKCombo</span>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', maxWidth: '300px', lineHeight: 1.6 }}>
                  Native Android utility for precision 30-second WhatsApp status video slicing with maximum bitrate preservation.
                </p>
              </div>

              <div>
                <div className="eyebrow" style={{ color: '#10b981' }}>
                  <span className="eyebrow__line" /> ANDROID MEDIA UTILITY
                </div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 850, margin: '14px 0 16px', color: '#ffffff' }}>
                  WhatsTrim &middot; Lossless Status Slicer
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.7, margin: '0 0 24px' }}>
                  WhatsApp status videos are notoriously subject to harsh recompression and annoying 30-second cutoffs. WhatsTrim was engineered by JJSOFT to automate split sequencing, enabling users to slice full-length video clips into perfectly continuous 30-second segments without dropping FPS or degrading resolution.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ color: '#10b981', display: 'block', fontSize: '14px' }}>Lossless 60fps</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Zero artifact distortion on Android media rendering.</small>
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{ color: '#38bdf8', display: 'block', fontSize: '14px' }}>One-Tap Split</strong>
                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>Automatic chronological numbering for seamless story playback.</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/products/whatstrim" className="button button--primary">
                    View Product Details <ArrowRightIcon />
                  </Link>
                  <a href="https://apkcombo.com/es/whatstrim-no-1-best-gb-whatssapp-downloader/com.jjsoft.jafranjemal.whatsTrim/" target="_blank" rel="noreferrer" className="button button--ghost">
                    Download on APKCombo <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPLETE PRODUCTS GRID (Filtered) */}
        <section className="section surface-dark" id="all-products">
          <div className="shell">
            <div className="section-heading">
              <div className="eyebrow">
                <span className="eyebrow__line" /> PRODUCTION SOFTWARE CATALOGUE
              </div>
              <h2>All Verified Products ({filteredProducts.length})</h2>
              <p>
                A deliberate collection of platforms designed for specific business operations, developer workflows, and consumers.
              </p>
            </div>

            <div className="products-showcase-grid">
              {filteredProducts.map((product) => (
                <article className="product-item-card" key={product.slug}>
                  <div className="product-item-card__header">
                    <div className="product-item-card__logo">
                      <Image src={product.logo} alt={`${product.name} logo`} width={32} height={32} style={{ objectFit: 'contain' }} />
                    </div>
                    <span className="status-pill status-pill--blue">{product.eyebrow}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.tagline || product.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '16px 0 20px' }}>
                    {product.capabilities.slice(0, 4).map((cap) => (
                      <span key={cap} style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                  <div className="product-item-card__footer">
                    <Link href={`/products/${product.slug}`} className="text-link">
                      Explore Product Details <ArrowRightIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. UPCOMING PRODUCTS & ROADMAP */}
        <section className="section" style={{ background: '#080910', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="shell">
            <div className="section-heading">
              <div className="eyebrow">
                <span className="eyebrow__line" /> ENGINEERING ROADMAP
              </div>
              <h2>Upcoming Products in Active Pipeline</h2>
              <p>
                What JJSOFT engineers are currently prototyping, architecting, and preparing for deployment.
              </p>
            </div>

            <div className="pipeline-grid">
              <div className="pipeline-card">
                <span className="pipeline-card__badge">In Active R&amp;D</span>
                <h3 className="pipeline-card__title">Next-Gen AI Retail Copilot</h3>
                <p className="pipeline-card__desc">Automated stock replenishment, supplier margin tracking, and predictive sales forecasts directly embedded in iShopMaster.</p>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <small style={{ color: '#64748b' }}>Phase</small>
                  <strong style={{ color: '#f59e0b', fontSize: '11px' }}>Beta Staging</strong>
                </div>
              </div>

              <div className="pipeline-card">
                <span className="pipeline-card__badge">Developer Platform</span>
                <h3 className="pipeline-card__title">AavanamKit Cloud Studio</h3>
                <p className="pipeline-card__desc">Real-time collaborative document &amp; invoice designer with team workspaces, version control, and instant JSON compilation.</p>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <small style={{ color: '#64748b' }}>Phase</small>
                  <strong style={{ color: '#f59e0b', fontSize: '11px' }}>Alpha Review</strong>
                </div>
              </div>

              <div className="pipeline-card">
                <span className="pipeline-card__badge">Enterprise Secure</span>
                <h3 className="pipeline-card__title">JJChat Enterprise Suite</h3>
                <p className="pipeline-card__desc">Self-hosted, air-gapped corporate team communication platform with custom message retention and enterprise SSO.</p>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <small style={{ color: '#64748b' }}>Phase</small>
                  <strong style={{ color: '#f59e0b', fontSize: '11px' }}>Architecture Spec</strong>
                </div>
              </div>

              <div className="pipeline-card">
                <span className="pipeline-card__badge">B2B Trade</span>
                <h3 className="pipeline-card__title">Global Gem Provenance Ledger</h3>
                <p className="pipeline-card__desc">Digital gemstone custody verification and export logistics platform engineered for certified Ceylon Sapphire exporters.</p>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <small style={{ color: '#64748b' }}>Phase</small>
                  <strong style={{ color: '#f59e0b', fontSize: '11px' }}>Pilot Ready</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CLOSING CTA BANNER */}
        <section className="studio-cta">
          <div className="shell studio-cta__content">
            <div className="eyebrow">
              <span className="eyebrow__line" /> CUSTOM PRODUCT ENGINEERING
            </div>
            <h2>Need a tailored software product engineered for your enterprise?</h2>
            <p>
              Partner with JJSOFT to design, build, and deploy high-performance software with zero technical debt and guaranteed SLA uptime.
            </p>
            <div className="studio-cta__actions">
              <Link href="/#contact" className="button button--primary">
                Start a Conversation <ArrowRightIcon />
              </Link>
              <Link href="/work" className="button button--ghost">
                View Case Studies <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
