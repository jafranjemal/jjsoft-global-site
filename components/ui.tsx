import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRightIcon, ArrowUpRightIcon } from './icons'

export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <div className="eyebrow"><span className="eyebrow__line" />{eyebrow}</div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}

export function LinkArrow({ children, href = '#', external = false }: { children: ReactNode; href?: string; external?: boolean }) {
  return (
    <Link href={href} className="text-link" target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      {children} <ArrowRightIcon />
    </Link>
  )
}

export function ProductLogo({ src, alt, size = 42 }: { src: string; alt: string; size?: number }) {
  return <Image src={src} alt={alt} width={size} height={size} className="product-logo" style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }} />
}

export function ProjectVisual({ variant, screenshot }: { variant: 'gem' | 'court' | 'shop' | 'school' | string; screenshot?: string }) {
  if (screenshot) {
    return (
      <div className={`project-visual project-visual--${variant} project-visual--screenshot`}>
        <Image src={screenshot} alt="Project Interface Screenshot" fill sizes="(max-width: 780px) 100vw, 33vw" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        <div className="project-visual__overlay" />
        <div className="project-visual__caption">JJSOFT GLOBAL · VERIFIED DEPLOYMENT</div>
      </div>
    )
  }

  return (
    <div className={`project-visual project-visual--${variant}`}>
      <div className="project-visual__grid" />
      {variant === 'gem' ? (
        <div className="project-visual__mock">
          <div className="project-visual__mock-header">
            <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
            <span className="project-visual__mock-title">Shimla Gems ERP · Inventory Ledger</span>
          </div>
          <div className="project-visual__mock-body">
            <div className="project-visual__panel"><span>Tracked Gemstones</span><b>4,820 pcs</b><small>Ceylon Sapphire & Ruby</small></div>
            <div className="gem gem--one" /><div className="gem gem--two" /><div className="gem gem--three" />
          </div>
        </div>
      ) : null}
      {variant === 'court' ? (
        <div className="project-visual__mock">
          <div className="project-visual__mock-header">
            <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
            <span className="project-visual__mock-title">sl-qc.com · Judicial Portal</span>
          </div>
          <div className="court-building"><span className="court-building__roof" /><span className="court-building__pillars" /><span className="court-building__base" /></div>
          <div className="project-visual__panel"><span>Quazi Court</span><b>Online Booking</b><small>Public appointment workflow</small></div>
        </div>
      ) : null}
      {variant === 'shop' ? (
        <div className="project-visual__mock">
          <div className="project-visual__mock-header">
            <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
            <span className="project-visual__mock-title">iShopMaster Cloud POS</span>
          </div>
          <div className="shop-screen"><div className="shop-screen__top" /><div className="shop-screen__charts"><i /><i /><i /><i /></div><div className="shop-screen__rows"><i /><i /><i /><i /><i /></div></div>
          <div className="phone"><div className="phone__camera" /><div className="phone__screen"><i /><i /><i /></div></div>
          <div className="project-visual__panel"><span>Active Stores</span><b>3 Branches</b><small>IMEI &amp; Sales Synced</small></div>
        </div>
      ) : null}
      {variant === 'school' ? (
        <div className="project-visual__mock">
          <div className="project-visual__mock-header">
            <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
            <span className="project-visual__mock-title">alif-international.com · School ERP</span>
          </div>
          <div className="school-screen" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '28px', borderRadius: '6px', background: '#52227B', color: '#fff', textAlign: 'center', lineHeight: '28px', fontSize: '12px', fontWeight: 800 }}>A</span>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#e2e8f0' }}>Alif International School</span>
                <small style={{ color: '#94a3b8', fontSize: '9px' }}>Multi-Campus Admissions &amp; Portal</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
              <div style={{ background: 'rgba(82, 34, 123, 0.25)', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '6px', padding: '6px 8px' }}>
                <span style={{ fontSize: '9px', color: '#a78bfa', display: 'block' }}>Online Applications</span>
                <b style={{ fontSize: '12px', color: '#fff' }}>100% Digital</b>
              </div>
              <div style={{ background: 'rgba(8, 122, 61, 0.25)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '6px', padding: '6px 8px' }}>
                <span style={{ fontSize: '9px', color: '#34d399', display: 'block' }}>Active Campuses</span>
                <b style={{ fontSize: '12px', color: '#fff' }}>2 Branches</b>
              </div>
            </div>
          </div>
          <div className="project-visual__panel"><span>Alif Platform</span><b>2,500+ Users</b><small>Admissions, SMS &amp; Notices</small></div>
        </div>
      ) : null}
      <div className="project-visual__caption">JJSOFT GLOBAL</div>
    </div>
  )
}
