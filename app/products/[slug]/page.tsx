import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products } from '@/data/site'
import { buildMetadata } from '@/lib/seo'
import { ArrowRightIcon, CheckIcon, ShieldIcon } from '@/components/icons'
import { ProductLogo } from '@/components/ui'
import { SiteFooter } from '@/components/site-footer'
import { singleProductSchema, productFaqSchema } from '@/lib/schema'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) {
    return buildMetadata({
      title: 'Product not found',
      description: 'The requested software product could not be found.',
      path: `/products/${slug}`,
    })
  }
  return buildMetadata({
    title: `${product.name} — ${product.eyebrow}`,
    description: `${product.tagline || product.description} Engineered by JJSOFT GLOBAL.`,
    path: `/products/${product.slug}`,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  const productSchemaObj = singleProductSchema(product)
  const faqSchemaObj = productFaqSchema(product)

  return (
    <>
      <main>
        {/* 1. BREADCRUMBS */}
        <div style={{ background: '#05060a', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '14px 0' }}>
          <div className="shell" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
            <Link href="/" style={{ color: '#cbd5e1' }}>Home</Link>
            <span>/</span>
            <Link href="/products" style={{ color: '#cbd5e1' }}>Products</Link>
            <span>/</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{product.name}</span>
          </div>
        </div>

        {/* 2. PRODUCT HERO SECTION */}
        <section className="page-hero">
          <div className="shell page-hero__content">
            <div className="product-detail-hero">
              <ProductLogo src={product.logo} alt={`${product.name} official logo`} />
              <div>
                <div className="eyebrow">
                  <span className="eyebrow__line" /> {product.eyebrow}
                </div>
                <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', lineHeight: 1.15, margin: '12px 0 16px' }}>
                  {product.name}
                </h1>
                <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '750px' }}>
                  {product.tagline || product.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '22px' }}>
                  <a className="button button--primary" href={product.href} target="_blank" rel="noreferrer">
                    Launch / Download Source <ArrowRightIcon />
                  </a>
                  {product.releaseDate && (
                    <span className="tag" style={{ alignSelf: 'center', fontSize: '12px', padding: '8px 14px' }}>
                      Initial Release: {product.releaseDate}
                    </span>
                  )}
                  <span className="tag" style={{ alignSelf: 'center', fontSize: '12px', padding: '8px 14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                    ✓ Production Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DEEP PRODUCT SPECIFICATION & DETAILS */}
        <section className="content-section">
          <div className="shell content-grid">
            <article className="content-copy">
              {/* OPERATIONAL PROBLEM STATEMENT */}
              <h2>Operational Problem &amp; Market Need</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8 }}>
                {product.problemSolved}
              </p>

              {/* DETAILED OVERVIEW PARAGRAPHS */}
              <h2>Executive Overview &amp; Architecture</h2>
              {product.longOverview.map((paragraph, idx) => (
                <p key={idx} style={{ fontSize: '15.5px', lineHeight: 1.8 }}>
                  {paragraph}
                </p>
              ))}

              {/* TECHNICAL ARCHITECTURE SUMMARY */}
              <div style={{ padding: '22px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', margin: '28px 0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', display: 'block', marginBottom: '6px' }}>
                  System Architecture
                </span>
                <strong style={{ fontSize: '16px', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
                  Under the Hood
                </strong>
                <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#cbd5e1', margin: 0 }}>
                  {product.architectureOverview}
                </p>
              </div>

              {/* CORE CAPABILITIES CHECKLIST */}
              <h3>Key Functional Capabilities</h3>
              <ul style={{ margin: '16px 0 32px' }}>
                {product.capabilities.map((capability) => (
                  <li key={capability} style={{ marginBottom: '8px', fontSize: '15px' }}>
                    {capability}
                  </li>
                ))}
              </ul>

              {/* DEEP FEATURE BREAKDOWN */}
              {product.featureDetails && product.featureDetails.length > 0 && (
                <div style={{ marginTop: '36px' }}>
                  <h3>Detailed Engineering Features</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '18px' }}>
                    {product.featureDetails.map((feat) => (
                      <div
                        key={feat.title}
                        style={{
                          padding: '18px 22px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                        }}
                      >
                        <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#ffffff' }}>{feat.title}</h4>
                        <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#94a3b8', lineHeight: 1.65 }}>
                          {feat.description}
                        </p>
                        {feat.benefit && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>
                            <CheckIcon style={{ width: 14, height: 14 }} />
                            <span><strong>Operational Impact:</strong> {feat.benefit}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREENSHOTS (IF AVAILABLE) */}
              {product.screenshots && product.screenshots.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <h3>Application User Interface Previews</h3>
                  <p>Archived production screenshots demonstrating the live mobile UI, layout design, and user flows:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                    {product.screenshots.map((src, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          border: '1px solid var(--line)',
                          background: '#070d12',
                          boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${product.name} user interface preview ${idx + 1}`}
                          width={220}
                          height={400}
                          style={{ display: 'block', height: 'auto', maxHeight: '400px', width: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRODUCT FAQS FOR GOOGLE AI OVERVIEWS & PERPLEXITY */}
              {product.faqs && product.faqs.length > 0 && (
                <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '36px' }}>
                  <h3>Frequently Asked Questions About {product.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '18px' }}>
                    {product.faqs.map((faq) => (
                      <div
                        key={faq.q}
                        style={{
                          padding: '18px 20px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <strong style={{ color: '#ffffff', fontSize: '15px', display: 'block', marginBottom: '6px' }}>
                          {faq.q}
                        </strong>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: 1.65 }}>
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* SIDEBAR: TECHNICAL SPECIFICATIONS CARD */}
            <aside className="content-aside">
              <span className="content-aside__label">System Specifications</span>
              <h3>{product.name} Profile</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px', fontSize: '13px' }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</span>
                  <strong style={{ color: '#f1f5f9' }}>{product.techSpecs.platform}</strong>
                </div>

                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Core Technologies</span>
                  <strong style={{ color: '#f1f5f9' }}>{product.techSpecs.technologyStack}</strong>
                </div>

                {product.techSpecs.hardwareSupport && (
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hardware Integration</span>
                    <strong style={{ color: '#f1f5f9' }}>{product.techSpecs.hardwareSupport}</strong>
                  </div>
                )}

                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deployment Model</span>
                  <strong style={{ color: '#f1f5f9' }}>{product.techSpecs.deployment}</strong>
                </div>

                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License / Availability</span>
                  <strong style={{ color: '#f1f5f9' }}>{product.techSpecs.license}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engineering Author</span>
                  <strong style={{ color: '#f1f5f9' }}>Jafran Jemal, B.Eng (Hons) &middot; JJSOFT GLOBAL</strong>
                </div>
              </div>

              <a
                className="button button--primary button--compact"
                href={product.href}
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: '22px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
              >
                Access Source Platform <ArrowRightIcon />
              </a>

              <div className="tag-list" style={{ marginTop: '20px' }}>
                {product.capabilities.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* 4. EXPLORE FULL PORTFOLIO CALLOUT */}
        <section className="section surface-dark">
          <div className="shell">
            <div className="section-heading section-heading--light">
              <div className="eyebrow">
                <span className="eyebrow__line" /> Complete Portfolio
              </div>
              <h2>Explore other products engineered by JJSOFT.</h2>
              <p>
                From vertical retail POS/ERP platforms to consumer utilities, Muslim matrimonial networks, and open-source layout engines.
              </p>
            </div>
            <Link className="button button--primary" href="/products">
              Browse All Products <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* JSON-LD INJECTIONS: SOFTWARE APPLICATION & FAQ SCHEMAS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchemaObj).replace(/</g, '\\u003c'),
        }}
      />
      {faqSchemaObj && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchemaObj).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  )
}
