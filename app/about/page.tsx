import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, TrophyIcon } from '@/components/icons'
import { timeline, principles, site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'
import { SiteFooter } from '@/components/site-footer'
import { personSchema, aboutFaqSchema } from '@/lib/schema'

export const metadata = buildMetadata({
  title: 'About Mohamed Jemal Mohamed Jafran (Jafran Jemal) — Founder, Engineer & Inventor',
  description:
    'Biographical profile, academic record (BEng Hons London Metropolitan University), AI research, and invention record of Mohamed Jemal Mohamed Jafran (Jafran Jemal) — Founder of JJSOFT GLOBAL & IWA 2020 Bronze Award Inventor.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section className="page-hero">
          <div className="shell page-hero__content">
            <div className="eyebrow">
              <span className="eyebrow__line" /> Corporate &amp; Founder Profile
            </div>
            <h1>A developer-led product company with a practical bias.</h1>
            <p>
              JJSOFT GLOBAL was established in 2015 by software engineer, AI professional, and independent inventor <strong>Mohamed Jemal Mohamed Jafran, BEng (Hons)</strong> (popularly known as <strong>Jafran Jemal</strong>).
            </p>
          </div>
        </section>

        {/* PRIMARY EDITORIAL & FOUNDER ENTITY DEFINITION */}
        <section className="section">
          <div className="shell content-grid">
            <article className="content-copy">
              {/* TARGETED SEMANTIC BLOCK FOR GOOGLE AI OVERVIEWS, WIKIDATA & PERPLEXITY */}
              <div
                id="who-is-jafran-jemal"
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: 'rgba(255, 36, 66, 0.04)',
                  border: '1px solid rgba(255, 36, 66, 0.2)',
                  marginBottom: '36px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Verified Entity Definition &middot; Knowledge Graph
                </span>
                <h2 style={{ fontSize: '26px', fontWeight: 850, margin: '0 0 14px', color: '#ffffff' }}>
                  Who is Mohamed Jemal Mohamed Jafran (Jafran Jemal)?
                </h2>
                <p style={{ fontSize: '15.5px', lineHeight: 1.75, color: '#e2e8f0', margin: 0 }}>
                  <strong>Mohamed Jemal Mohamed Jafran</strong> (known professionally as <strong>Jafran Jemal</strong> or <strong>JJ</strong>) is a Sri Lankan Software Engineer, AI-focused technology professional, entrepreneur, independent inventor, and independent researcher.
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#cbd5e1', marginTop: '12px', marginBottom: 0 }}>
                  He holds a <strong>BEng (Hons) in Software Engineering from London Metropolitan University (via ESOFT Metro Campus)</strong>, with academic work focused on <strong>Artificial Intelligence</strong>. He is the Founder of <strong>JJSOFT GLOBAL</strong>, an independent software innovation company established in 2015 that builds enterprise retail operating systems, cloud POS platforms, consumer mobile apps, and open-source developer tooling.
                </p>
              </div>

              {/* INDEPENDENT RESEARCH & INVENTIONS: PANAMA CANAL SHIP-LIFT & IWA 2020 BRONZE AWARD */}
              <div
                style={{
                  padding: '24px 28px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(10, 16, 23, 0.95) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  marginBottom: '36px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '10px' }}>
                  <TrophyIcon style={{ width: 22, height: 22 }} />
                  <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    International Invention Recognition &middot; IWA 2020 Bronze Award
                  </span>
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#ffffff' }}>
                  Two-Stage Movable-Tank Ship-Lift Arrangement for the Panama Canal
                </h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#cbd5e1', margin: '0 0 12px' }}>
                  His independent research journey began in 2018 during his book <em>&ldquo;How to Make Sri Lanka a Superpower Country&rdquo;</em>. While studying national and global transportation bottlenecks, he conceptualized a two-stage movable-tank ship-lift arrangement as a revolutionary alternative to conventional canal-lock operations.
                </p>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#cbd5e1', margin: '0 0 12px' }}>
                  In 2020, he presented the engineering concept at <strong>Innovation Week Morocco (IWA 2020)</strong> under the <strong>Transport Category</strong>, organized in partnership with the <strong>International Federation of Inventors&apos; Associations (IFIA)</strong> and <strong>OFeeD Morocco</strong>. Listed as an independent inventor representing Sri Lanka, he was awarded the <strong>Bronze Award (3rd Place)</strong> for a new design intended to drastically reduce water wastage in the <strong>Panama Canal</strong>.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>Active Research Stage:</span>
                  <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Analytical water-balance studies &amp; proof-of-concept development advancing toward <strong>TRL 3 &amp; TRL 4</strong> toward academic publication and engineering validation.</span>
                </div>
              </div>

              <h2>The Company Origin &amp; Product Evolution</h2>
              <p>
                JJSOFT GLOBAL began at the family home in 2015 with a single development laptop, family blessings, and a strong conviction that high-quality software should solve tangible operational bottlenecks rather than chasing speculative technology trends.
              </p>
              <p>
                The company’s portfolio traces an authentic evolution: from publishing native Android utilities like <strong>JJBrowser</strong> and <strong>JJChat</strong> in 2016 and <strong>WhatsTrim</strong> in 2017, to architecting mission-critical ERPs for certified Ceylon Sapphire exporters (<strong>Shimla Gems</strong>), public judicial booking portals for the <strong>Quazi Court of Sri Lanka</strong>, and comprehensive school ERP platforms for <strong>Alif International School</strong>.
              </p>

              <h3>Hands-On Engineering &amp; Architectural Leadership</h3>
              <p>
                Unlike agencies where technical leadership is detached from the code, <strong>{site.founder.name}</strong> directs architecture hands-on from schema design to production deployment. His core engineering competencies span:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', margin: '20px 0 28px' }}>
                {site.founder.knowsAbout.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      fontSize: '13px',
                      color: '#e2e8f0',
                    }}
                  >
                    <CheckIcon style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              <h3>Verified Photographic Archives &amp; Milestones</h3>
              <p>Visual documentation reflecting the 10-year journey from a modest home setup to international software platforms and research recognition:</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '24px 0' }}>
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: '#0a1017' }}>
                  <Image
                    src="/assets/projects/2015-company-opening-enhanced.jpg"
                    alt="2015 JJSOFT Opening Day at Family Home with Jafran Jemal"
                    width={360}
                    height={270}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ padding: '12px', fontSize: '12px', color: '#94a3b8', background: '#0e1720' }}>
                    <span style={{ color: '#facc15', fontSize: '10px', fontWeight: 800, display: 'block' }}>✦ 2015 ORIGIN</span>
                    <strong style={{ color: '#fff', display: 'block' }}>Opening at the Family Home</strong>
                    First development workstation &amp; company inauguration.
                  </div>
                </div>

                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: '#0a1017' }}>
                  <Image
                    src="/assets/founder/jafran-jemal-presentation.jpg"
                    alt="Founder Jafran Jemal presenting software architecture"
                    width={360}
                    height={200}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ padding: '12px', fontSize: '12px', color: '#94a3b8', background: '#0e1720' }}>
                    <span style={{ color: '#38bdf8', fontSize: '10px', fontWeight: 800, display: 'block' }}>ENGINEERING SCALE</span>
                    <strong style={{ color: '#fff', display: 'block' }}>Public Engineering Keynote</strong>
                    Presenting on Building Scalable Tech &amp; Architecture.
                  </div>
                </div>

                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: '#0a1017' }}>
                  <Image
                    src="/assets/founder/jafran-jemal.jpg"
                    alt={`${site.founder.name}, Founder & Lead Architect`}
                    width={320}
                    height={320}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ padding: '12px', fontSize: '12px', color: '#94a3b8', background: '#0e1720' }}>
                    <span style={{ color: '#22c55e', fontSize: '10px', fontWeight: 800, display: 'block' }}>EXECUTIVE LEADERSHIP</span>
                    <strong style={{ color: '#fff', display: 'block' }}>{site.founder.formalName}</strong>
                    Founder, Chief Systems Architect &amp; Researcher.
                  </div>
                </div>
              </div>

              {/* VERIFIED PROFILES & SAME-AS LINKS */}
              <h3>Verified Founder Links &amp; Profiles</h3>
              <p>Authentic social, code repository, and professional directory profiles for Jafran Jemal:</p>
              <div className="tag-list" style={{ marginTop: '12px', marginBottom: '40px' }}>
                <a className="tag" href={site.founder.wikidata} target="_blank" rel="noreferrer" style={{ background: 'rgba(51, 153, 102, 0.15)', color: '#33cc66', borderColor: 'rgba(51, 153, 102, 0.35)' }}>
                  Wikidata Entity: Q141474525
                </a>
                <a className="tag" href={site.founder.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn: jafran-jemal
                </a>
                <a className="tag" href={site.founder.github} target="_blank" rel="noreferrer">
                  GitHub: @jafranjemal
                </a>
                <a className="tag" href={site.founder.facebook} target="_blank" rel="noreferrer">
                  Personal Facebook: jafranjemal.jjsoft
                </a>
                <a className="tag" href={site.socials.facebook} target="_blank" rel="noreferrer">
                  Company Facebook: jjsoftGlobal
                </a>
              </div>

              {/* FAQ ACCORDION FOR DIRECT SEARCH & AI OVERVIEWS */}
              <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '36px' }}>
                <h2>Frequently Asked Questions About Founder &amp; Company</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                      Who is Mohamed Jemal Mohamed Jafran (Jafran Jemal)?
                    </strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14.5px', lineHeight: 1.7 }}>
                      Mohamed Jemal Mohamed Jafran, BEng (Hons) (known professionally as Jafran Jemal) is a Sri Lankan software engineer, AI-focused technology professional, entrepreneur, independent inventor, and independent researcher. He is the founder and lead software architect of JJSOFT GLOBAL (est. 2015).
                    </p>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                      What degree and university did Mohamed Jemal Mohamed Jafran graduate from?
                    </strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14.5px', lineHeight: 1.7 }}>
                      He holds a BEng (Hons) in Software Engineering from London Metropolitan University (via ESOFT Metro Campus), with academic work focused on Artificial Intelligence.
                    </p>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                      What international award did Jafran Jemal receive for his Panama Canal research?
                    </strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14.5px', lineHeight: 1.7 }}>
                      At Innovation Week Morocco (IWA 2020), organized in partnership with the International Federation of Inventors&apos; Associations (IFIA) and OFeeD, he was awarded the Bronze Award in the Transport Category as an independent inventor from Sri Lanka for his conceptual two-stage movable-tank ship-lift arrangement designed to save water in the Panama Canal.
                    </p>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                      What products and systems has JJSOFT GLOBAL shipped?
                    </strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14.5px', lineHeight: 1.7 }}>
                      JJSOFT GLOBAL has shipped iShopMaster (retail ERP &amp; POS), DT POS (cloud point of sale), Find Soulmate (Muslim matrimonial mobile app), AavanamKit (visual document engine on npm), WhatsTrim (lossless video trimmer), JJChat (instant messenger), and JJBrowser (lightweight mobile browser).
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* SIDEBAR TIMELINE */}
            <aside className="content-aside">
              <span className="content-aside__label">Corporate Milestones</span>
              <h3>10-Year Timeline</h3>
              {timeline.map((item) => (
                <div className="timeline-aside" key={item.year} style={{ marginTop: '16px' }}>
                  <strong style={{ color: 'var(--accent)', display: 'block', fontSize: '12px' }}>{item.year}</strong>
                  <div style={{ fontWeight: 800, fontSize: '13px', margin: '3px 0' }}>{item.title}</div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>{item.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* GUIDING PRINCIPLES */}
        <section className="section surface-dark">
          <div className="shell">
            <div className="section-heading section-heading--light">
              <div className="eyebrow">
                <span className="eyebrow__line" /> Principles
              </div>
              <h2>What the work keeps coming back to.</h2>
              <p>These principles turn the portfolio into a coherent product story rather than a list of disconnected technologies.</p>
            </div>
            <div className="principles-grid">
              {principles.map((item, idx) => (
                <article className="principle" key={item.title}>
                  <span className="principle__number">0{idx + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <Link className="button button--primary" href="/contact" style={{ marginTop: '28px', display: 'inline-flex' }}>
              Start a conversation <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* JSON-LD INJECTIONS FOR PERSON ENTITY AND ABOUT FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema()).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutFaqSchema()).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
