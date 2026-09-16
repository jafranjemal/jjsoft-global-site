'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  badge?: string
}

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Products', href: '/products', badge: 'New' },
  { label: 'Technology', href: '/technology' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  // Track scroll position to enhance glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('#')) return false
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}
        id="top"
      >
        {/* Subtle atmospheric aurora ambient glow at the top edge */}
        <div className="header-aurora-glow" aria-hidden="true" />

        <div className="container nav-wrap">
          {/* Official Brand Logo */}
          <Link className="brand" href="/" aria-label="JJSOFT Global home" onClick={close}>
            <div className="brand-logo-wrap">
              <Image
                src="/assets/brand/jjsoft-official-logo.svg"
                alt="JJSOFT Global"
                width={184}
                height={52}
                priority
                unoptimized
                className="brand-image"
                style={{ width: '172px', height: 'auto', objectFit: 'contain' }}
              />
              <span className="brand-glow" aria-hidden="true" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            <div className="nav-capsule">
              {NAV_LINKS.map((link) => {
                const active = isActiveLink(link.href)
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-link ${active ? 'active' : ''}`}
                    onClick={close}
                  >
                    <span>{link.label}</span>
                    {link.badge && <span className="nav-badge">{link.badge}</span>}
                    {active && <span className="active-pill-indicator" aria-hidden="true" />}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Right Header Utilities: Telemetry + CTA + Mobile Hamburger */}
          <div className="header-utilities">
            {/* Live Telemetry Beacon (Desktop) */}
            <div className="header-telemetry" title="JJSOFT Global Network: Operational">
              <span className="telemetry-beacon">
                <span className="beacon-ping" />
                <span className="beacon-core" />
              </span>
              <span className="telemetry-label">Network Active</span>
            </div>

            {/* Glowing CTA Button */}
            <Link className="header-cta" href="/contact" onClick={close}>
              <span className="cta-text">Get Started</span>
              <span className="cta-icon" aria-hidden="true">&rarr;</span>
              <span className="cta-glow-sweep" aria-hidden="true" />
            </Link>

            {/* High-Fidelity Mobile Hamburger Button */}
            <button
              className={`header-hamburger ${open ? 'is-active' : ''}`}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? 'Close menu' : 'Open navigation menu'}
              type="button"
              onClick={toggle}
            >
              <div className="hamburger-box">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </div>
              <span className="hamburger-halo" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-drawer-backdrop ${open ? 'is-visible' : ''}`}
        aria-hidden={!open}
        onClick={close}
      />

      {/* Mobile High-Fidelity Drawer Sheet */}
      <aside
        id="mobile-drawer"
        className={`mobile-drawer-sheet ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-status">
              <span className="status-dot-pulse" />
              <span>All Systems Operational</span>
            </div>
            <span className="mobile-drawer-region">HQ &middot; Colombo</span>
          </div>

          <div className="mobile-drawer-nav">
            {NAV_LINKS.map((link, idx) => {
              const active = isActiveLink(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`mobile-nav-link ${active ? 'active' : ''}`}
                  onClick={close}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span className="mobile-nav-label">
                    {link.label}
                    {link.badge && <span className="nav-badge-pill">{link.badge}</span>}
                  </span>
                  <span className="mobile-nav-chevron">&rarr;</span>
                </Link>
              )
            })}
          </div>

          <div className="mobile-drawer-footer">
            <Link className="mobile-drawer-cta" href="/contact" onClick={close}>
              <span>Launch Your Project</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <div className="mobile-drawer-contact-strip">
              <a href="mailto:info@jjsoftglobal.com" className="drawer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@jjsoftglobal.com</span>
              </a>
              <a href="tel:+94770000000" className="drawer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Enterprise Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
