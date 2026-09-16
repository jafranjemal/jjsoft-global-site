'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/site'

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="footer section-dark" id="contact">
      <div className="container footer-grid">
        <div>
          <Image
            className="footer-logo"
            src="/assets/brand/logo.svg"
            alt="JJSOFT Global"
            width={184}
            height={52}
            unoptimized
            style={{ width: '170px', height: 'auto', objectFit: 'contain' }}
          />
          <p>
            Building digital solutions for a smarter tomorrow.<br />
            Let&apos;s create something amazing together.
          </p>
          <div className="socials" aria-label="Social links">
            <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              in
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              f
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              &#9654;
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              X
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/products">Products</Link>
          <Link href="/technology">Technology</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h3>Our Services &amp; Products</h3>
          <Link href="/products/ishopmaster">iShopMaster Retail OS</Link>
          <Link href="/products/dt-pos">DT POS Cloud</Link>
          <Link href="/products/find-soulmate">Find Soulmate</Link>
          <Link href="/products/whatstrim">WhatsTrim Utility</Link>
          <Link href="/work/quazi-court">Quazi Court Case Study</Link>
          <Link href="/work/alif">Alif School Platform</Link>
        </div>

        <div className="newsletter">
          <h3>Newsletter</h3>
          <p>
            Subscribe to get the latest updates<br />
            and news from JJSOFT Global.
          </p>
          <form
            id="newsletterForm"
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
            }}
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && (
            <small id="formMessage" role="status" style={{ color: '#10b981', display: 'block', marginTop: '8px' }}>
              Thank you for subscribing!
            </small>
          )}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; 2015&ndash;{new Date().getFullYear()} JJSOFT Global. All rights reserved.</span>
        <span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </span>
      </div>
    </footer>
  )
}
