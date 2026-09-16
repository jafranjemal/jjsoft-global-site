import Image from 'next/image'
import Link from 'next/link'
import './alif.css'
import { buildMetadata } from '@/lib/seo'
import { ArrowRightIcon, ArrowUpRightIcon, TrophyIcon } from '@/components/icons'
import { SiteFooter } from '@/components/site-footer'

export const metadata = buildMetadata({
  title: 'Alif International School Platform — Case Study | JJSOFT GLOBAL',
  description:
    'Case study: How JJSOFT GLOBAL built a complete school management platform, digital campus, admissions pipeline, house system, and administrative command center for Alif International School, Dharga Town, Sri Lanka.',
  path: '/work/alif',
})

export default function AlifCaseStudy() {
  return (
    <div className="alif-case-study-page">
      {/* 1. BREADCRUMBS */}
      <div className="alif-breadcrumbs">
        <div className="alif-shell">
          <ul className="alif-breadcrumbs__list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="alif-breadcrumbs__separator">/</li>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li className="alif-breadcrumbs__separator">/</li>
            <li className="alif-breadcrumbs__current">Alif International School Case Study</li>
          </ul>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="alif-hero">
        <div className="alif-shell">
          <div className="alif-hero__badge">
            <span className="alif-hero__badge-dot" />
            <span>Live Client Project &middot; School Digital Platform</span>
          </div>

          <h1 className="alif-hero__title">
            This Is Not a School Website.<br />
            <span className="alif-hero__highlight">It Is a Complete School Management System.</span>
          </h1>

          <p className="alif-hero__desc">
            Most schools have a website that sits there and collects dust. We built something entirely different for Alif International School &mdash; a full digital platform that manages admissions, communicates with parents, tracks operations, and runs the school&apos;s online presence, all from one place.
          </p>

          <div className="alif-hero__meta-grid">
            <div className="alif-meta-pill">
              <span>📍</span> <strong>Dharga Town, Sri Lanka</strong>
            </div>
            <div className="alif-meta-pill">
              <span>🎓</span> <strong>Cambridge International Curriculum</strong>
            </div>
            <div className="alif-meta-pill">
              <span>🏫</span> <strong>Montessori to O-Level</strong>
            </div>
            <div className="alif-meta-pill">
              <span>🌐</span> <strong>Live &amp; Running in Production</strong>
            </div>
          </div>

          <div className="alif-hero__actions">
            <a
              href="https://alifinternational.lk/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-alif-primary"
            >
              Visit Live School Platform <ArrowUpRightIcon />
            </a>
            <Link href="/contact" className="btn-alif-secondary">
              Request a Demo for Your School <ArrowRightIcon />
            </Link>
          </div>

          {/* Official Production Website Showcase */}
          <div className="alif-browser-frame">
            <div className="alif-browser-frame__header">
              <div className="alif-browser-frame__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="alif-browser-frame__address-bar">
                <span className="alif-browser-lock">🔒</span>
                <span className="alif-browser-url">https://alifinternational.lk</span>
              </div>
              <a
                href="https://alifinternational.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="alif-browser-live-badge"
              >
                Open Live Platform <ArrowUpRightIcon />
              </a>
            </div>
            <div className="alif-browser-frame__screen">
              <Image
                src="/assets/projects/alif-school-screenshot.png"
                alt="Alif International School Official Website and Digital Platform"
                width={1200}
                height={550}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
              <div className="alif-browser-frame__watermark">
                JJSOFT GLOBAL &middot; VERIFIED CLIENT DEPLOYMENT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED METRICS STRIP */}
      <section className="alif-stats-strip">
        <div className="alif-shell">
          <div className="alif-stats-grid">
            <div className="alif-stat-card">
              <span className="alif-stat-num">350+</span>
              <span className="alif-stat-label">Students Enrolled</span>
              <span className="alif-stat-sub">Active school community</span>
            </div>
            <div className="alif-stat-card">
              <span className="alif-stat-num">25+</span>
              <span className="alif-stat-label">Qualified Teachers</span>
              <span className="alif-stat-sub">Montessori &amp; Cambridge</span>
            </div>
            <div className="alif-stat-card">
              <span className="alif-stat-num">15+</span>
              <span className="alif-stat-label">Subjects Offered</span>
              <span className="alif-stat-sub">Comprehensive curriculum</span>
            </div>
            <div className="alif-stat-card">
              <span className="alif-stat-num">20+</span>
              <span className="alif-stat-label">Awards Won</span>
              <span className="alif-stat-sub">Academic &amp; sports honors</span>
            </div>
            <div className="alif-stat-card">
              <span className="alif-stat-num">95%</span>
              <span className="alif-stat-label">Parent Satisfaction</span>
              <span className="alif-stat-sub">Verified feedback rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PROBLEM WE SOLVED */}
      <section className="alif-section">
        <div className="alif-shell">
          <div className="alif-section-header">
            <div className="alif-eyebrow">
              <span>✦</span> THE PROBLEM WE SOLVED
            </div>
            <h2 className="alif-section-title">Schools Deserve More Than a Brochure Page</h2>
            <p className="alif-section-desc">
              A school is a living institution. It has daily operations, hundreds of families, ongoing admissions, and a brand to protect. A basic website cannot carry any of that weight.
            </p>
          </div>

          <div className="alif-duality-grid">
            {/* The Old Problem */}
            <div className="duality-card duality-card--problem">
              <h3>❌ What Most Schools Are Stuck With</h3>
              <ul className="duality-list">
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>A static website that nobody updates</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Parents calling to ask basic questions answered on the site</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Admissions enquiries tracked on paper or WhatsApp</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Notices shared informally &mdash; no official record</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>No idea how many new families enquired this month vs last year</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Gallery photos buried on Facebook, not on the school&apos;s own platform</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Job vacancies posted on social media with no formal application process</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✕</span>
                  <span>Management has to call staff to know basic numbers</span>
                </li>
              </ul>
            </div>

            {/* The JJSOFT Solution */}
            <div className="duality-card duality-card--solution">
              <h3>✅ What JJSOFT Global Delivered</h3>
              <ul className="duality-list">
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>A professional platform that the school&apos;s own staff keeps updated &mdash; no developer needed</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Online admissions form that auto-qualifies the child&apos;s class based on age</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Full admissions pipeline &mdash; track every family from enquiry to enrolment</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Official digital notice board with urgent popup alerts for parents</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Real-time dashboard showing admissions growth year over year</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>School&apos;s own managed gallery &mdash; no third-party platforms</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Careers portal with structured online applications received directly in admin</span>
                </li>
                <li className="duality-item">
                  <span className="duality-icon">✓</span>
                  <span>Principal sees all key metrics the moment they open the admin &mdash; no chasing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE BUILT (EVERY FEATURE, BUILT FOR REAL SCHOOL LIFE) */}
      <section className="alif-section" style={{ background: 'rgba(10, 12, 20, 0.6)' }}>
        <div className="alif-shell">
          <div className="alif-section-header">
            <div className="alif-eyebrow">
              <span>✦</span> WHAT WE BUILT
            </div>
            <h2 className="alif-section-title">Every Feature, Built for Real School Life</h2>
            <p className="alif-section-desc">
              Not a template. Not a plugin. Every module was designed around how schools actually work &mdash; and how parents, students, and management actually behave.
            </p>
          </div>

          <div className="alif-features-grid">
            {/* Feature 1 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--purple">📋</div>
                <span className="feature-tag">ONLINE ADMISSIONS</span>
              </div>
              <h3>Smart Online Admissions</h3>
              <p>
                Parents fill out a structured enquiry &mdash; not a generic form. The system automatically tells them which class their child qualifies for based on date of birth and expected start date.
              </p>
              <ul className="feature-subpoints">
                <li>Captures child&apos;s full details and parent contacts</li>
                <li>Auto-calculates age and class placement instantly</li>
                <li>Every submission lands directly in the admin pipeline</li>
                <li>No WhatsApp, no paper, no lost enquiries</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--green">📢</div>
                <span className="feature-tag">OFFICIAL CIRCULARS</span>
              </div>
              <h3>Digital Notice Board</h3>
              <p>
                The school publishes official circulars and announcements from the admin. They appear on the public website immediately &mdash; and urgent notices pop up automatically for every visitor.
              </p>
              <ul className="feature-subpoints">
                <li>Publish a notice in seconds &mdash; live instantly</li>
                <li>Mark notices as urgent &mdash; triggers an automatic popup</li>
                <li>All notices archived with dates for official record-keeping</li>
                <li>Parents always have one trusted place to check</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--blue">📅</div>
                <span className="feature-tag">CAMPUS CALENDAR</span>
              </div>
              <h3>Events &amp; School Life</h3>
              <p>
                Add events &mdash; sports days, prize ceremonies, parent meetings, exhibitions &mdash; and they appear on the public website automatically, sorted by date, with full details.
              </p>
              <ul className="feature-subpoints">
                <li>Set event type, date, time, location, and audience</li>
                <li>Upcoming events shown publicly in real time</li>
                <li>Photo gallery per event can be linked</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--gold">🖼️</div>
                <span className="feature-tag">MANAGED MEDIA</span>
              </div>
              <h3>School Gallery &mdash; Fully Owned</h3>
              <p>
                The school&apos;s photos and videos live on the school&apos;s own platform &mdash; not Facebook, not Google Drive. Upload, organise into albums, and publish in one place.
              </p>
              <ul className="feature-subpoints">
                <li>Upload from admin &mdash; published to website instantly</li>
                <li>Organised into albums by event or category</li>
                <li>School retains complete ownership of all media</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--rose">💼</div>
                <span className="feature-tag">RECRUITMENT</span>
              </div>
              <h3>Careers Portal</h3>
              <p>
                Post teaching and non-teaching vacancies on the school&apos;s own website. Applicants apply directly &mdash; CVs and details come straight into the admin, ready to review.
              </p>
              <ul className="feature-subpoints">
                <li>Post, edit, and close job listings from admin</li>
                <li>Applicants upload CVs and fill structured forms</li>
                <li>All applications tracked by status in the admin panel</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="alif-feature-card">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--purple">🎵</div>
                <span className="feature-tag">SCHOOL IDENTITY</span>
              </div>
              <h3>Interactive School Song Experience</h3>
              <p>
                A first of its kind &mdash; an immersive anthem page where visitors listen to the official school song, read the full lyrics stanza by stanza, and explore the meaning of the school&apos;s flag and colours.
              </p>
              <ul className="feature-subpoints">
                <li>Live audio playback with animated sound visualiser</li>
                <li>Full anthem manuscript &mdash; stanzas with titles</li>
                <li>Tri-colour flag symbolism explained with visual cards</li>
                <li>Copy lyrics or print as a formatted sheet</li>
              </ul>
            </div>

            {/* Feature 7 - Wide Card */}
            <div className="alif-feature-card alif-feature-card--wide">
              <div className="feature-top">
                <div className="feature-icon-badge feature-icon-badge--green">📚</div>
                <span className="feature-tag">CURRICULUM STRUCTURE</span>
              </div>
              <h3>Academic Stages Showcase &mdash; Clearly Structured for Parents</h3>
              <p>
                Every academic programme is presented clearly &mdash; from Montessori at 2.5 years through Cambridge O-Level at Grade 11. Parents understand exactly where their child fits and what to expect at each stage.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                  <strong style={{ color: '#c084fc', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Stage 01 &mdash; Early Years &amp; Montessori</strong>
                  <small style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5, display: 'block' }}>
                    Ages 2.5&ndash;5: M1, M2, KG &mdash; play-based, sensory, phonics, and Islamic etiquette.
                  </small>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                  <strong style={{ color: '#34d399', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Stage 02 &mdash; Cambridge Primary</strong>
                  <small style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5, display: 'block' }}>
                    Grades 1&ndash;5: Core English, Mathematics, Science, STEAM Discovery, Quran &amp; Islamic Studies.
                  </small>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                  <strong style={{ color: '#38bdf8', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Stage 03 &mdash; Cambridge Secondary &amp; IGCSE</strong>
                  <small style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5, display: 'block' }}>
                    Grades 6&ndash;11: Checkpoint, O-Level, Science Labs, Debate, Leadership &mdash; 100% Pass Rate Benchmark.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCHOOL TRADITIONS & ATHLETICS: THE THREE HOUSES & ROLL OF HONOUR */}
      <section className="alif-section">
        <div className="alif-shell">
          <div className="alif-section-header">
            <div className="alif-eyebrow" style={{ color: '#facc15' }}>
              <span>✦</span> SCHOOL TRADITIONS &amp; ATHLETICS
            </div>
            <h2 className="alif-section-title">The Three School Houses &amp; Roll of Honour</h2>
            <p className="alif-section-desc">
              Athletic rivalry, student leadership recognition, and championship legacy come alive on the school&apos;s digital platform &mdash; complete with student house captains, house masters, and an annual historical archive.
            </p>
          </div>

          {/* Three Houses Cards */}
          <div className="alif-houses-grid">
            {/* Emerald House */}
            <div className="house-card house-card--emerald">
              <span className="house-badge-pill">🟢 Green</span>
              <h3>Emerald House</h3>
              <span className="house-motto">Vitality &amp; Growth</span>
              <p className="house-desc">
                Represented by the proud green banner, symbolizing spiritual vitality, flourishing intellect, relentless perseverance, and enduring youth.
              </p>
              <ul className="house-roster">
                <li className="house-roster-item">
                  <span>🎖️</span>
                  <div>
                    <strong>Ahmed Rayan</strong> <span className="house-roster-role">(Grade 11) &middot; Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>🥈</span>
                  <div>
                    <strong>Mariam Zaid</strong> <span className="house-roster-role">(Grade 10) &middot; Vice-Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>👨‍🏫</span>
                  <div>
                    <strong>Mr. M. F. Farhan</strong> <span className="house-roster-role">&middot; House Master</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Ruby House */}
            <div className="house-card house-card--ruby">
              <span className="house-badge-pill">🔴 Red</span>
              <h3>Ruby House</h3>
              <span className="house-motto">Courage &amp; Passion</span>
              <p className="house-desc">
                Embodying fiery valor, spirited athletic energy, fearlessness in the face of challenges, and an unyielding dedication to excellence.
              </p>
              <ul className="house-roster">
                <li className="house-roster-item">
                  <span>🎖️</span>
                  <div>
                    <strong>Zayan Farook</strong> <span className="house-roster-role">(Grade 11) &middot; Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>🥈</span>
                  <div>
                    <strong>Amina Nazeer</strong> <span className="house-roster-role">(Grade 10) &middot; Vice-Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>👩‍🏫</span>
                  <div>
                    <strong>Mrs. S. Rizvi</strong> <span className="house-roster-role">&middot; House Mistress</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sapphire House */}
            <div className="house-card house-card--sapphire">
              <span className="house-badge-pill">🔵 Blue</span>
              <h3>Sapphire House</h3>
              <span className="house-motto">Wisdom &amp; Integrity</span>
              <p className="house-desc">
                Reflecting noble wisdom, calm focus, steadfast loyalty, and unwavering moral integrity that shines as a guiding light.
              </p>
              <ul className="house-roster">
                <li className="house-roster-item">
                  <span>🎖️</span>
                  <div>
                    <strong>Ihsan Kareem</strong> <span className="house-roster-role">(Grade 11) &middot; Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>🥈</span>
                  <div>
                    <strong>Fathima Nuha</strong> <span className="house-roster-role">(Grade 10) &middot; Vice-Captain</span>
                  </div>
                </li>
                <li className="house-roster-item">
                  <span>👨‍🏫</span>
                  <div>
                    <strong>Mr. A. R. Niyas</strong> <span className="house-roster-role">&middot; House Master</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Digital Roll of Honour & Trophy Cabinet Showcase */}
          <div className="trophy-cabinet-card">
            <div className="trophy-header">
              <div className="trophy-icon-wrapper">🏆</div>
              <div className="trophy-title-wrap">
                <span>ATHLETIC EXCELLENCE &middot; DIGITAL ROLL OF HONOUR</span>
                <h3>Preserving Every Year&apos;s Sports Champions Forever</h3>
              </div>
            </div>
            <p className="trophy-cabinet-desc">
              At the conclusion of each sports meet, the school management crowns the champion in the admin panel with a single click. The website automatically spotlights the <strong>Defending Champions</strong>, updates the <strong>All-Time Trophy Cabinet</strong>, and archives the scores, winning captain, best march past, and trophy presentation photo into an interactive historical timeline for students and alumni.
            </p>
            <div className="trophy-features-row">
              <div className="trophy-feature-pill">
                <strong>One-Click Champion Crowning</strong>
                <small>Admin panel instantly updates public badges &amp; banner awards.</small>
              </div>
              <div className="trophy-feature-pill">
                <strong>All-Time Trophy Cabinet</strong>
                <small>Historic tally of house championships since the school&apos;s founding.</small>
              </div>
              <div className="trophy-feature-pill">
                <strong>March Past &amp; Spirit Archives</strong>
                <small>Special trophies for best squad drill, discipline, and cheers.</small>
              </div>
              <div className="trophy-feature-pill">
                <strong>Alumni Heritage Timeline</strong>
                <small>Archived photos and rosters celebrating past student captains forever.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE ADMIN PANEL */}
      <section className="alif-admin-section">
        <div className="alif-shell">
          <div className="alif-section-header">
            <div className="alif-eyebrow" style={{ color: '#34d399' }}>
              <span>✦</span> THE ADMIN PANEL
            </div>
            <h2 className="alif-section-title">Management Sees Everything. Controls Everything.</h2>
            <p className="alif-section-desc">
              This is not a simple admin where you edit text on a page. The school&apos;s management has a real-time operations centre &mdash; built specifically for how a school runs, not how a generic website runs.
            </p>
          </div>

          <div className="alif-admin-grid">
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">📊</span>
              <h4>Live Admissions Dashboard</h4>
              <p>See exactly how many new enquiries came in &mdash; today, this month, this year &mdash; compared to the same period last year. Know if the school is growing. No spreadsheets required.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">🔄</span>
              <h4>Admissions Pipeline Tracking</h4>
              <p>Every enquiry moves through a clear pipeline: New &rarr; Contacted &rarr; Interview Scheduled &rarr; Offer Made &rarr; Enrolled. No family falls through the cracks.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">👫</span>
              <h4>Student Demographics</h4>
              <p>Instantly see the gender breakdown of all applicants, which academic stage is most in demand, and where enquiries are coming from &mdash; all as visual charts.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">📅</span>
              <h4>Academic Calendar Control</h4>
              <p>Set term dates, teaching weeks, and school holidays from the admin. A live countdown to the next holiday and a term progress bar keep management oriented at all times.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">👩‍🏫</span>
              <h4>Staff &amp; Faculty Overview</h4>
              <p>See total staff count broken down by role &mdash; teaching staff, section heads, leadership, and non-academic. Manage the people directory shown on the school website.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">⚙️</span>
              <h4>Site Control &mdash; No Developer Needed</h4>
              <p>Update the hero banner, school phone, email, operating hours, and contact details from the admin. Everything on the website stays current &mdash; without calling a developer.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">📬</span>
              <h4>Contact Messages Inbox</h4>
              <p>Every message submitted through the website&apos;s contact form arrives in the admin inbox &mdash; with the sender&apos;s name, email, phone, and full message. Tracked as new or responded.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">📦</span>
              <h4>Content at a Glance</h4>
              <p>One screen shows the count of every content type &mdash; gallery photos, events, downloadable resources, achievements, open career posts &mdash; so management always knows what is live on the website.</p>
            </div>
            <div className="admin-intel-card">
              <span className="admin-intel-card__icon">📁</span>
              <h4>Parent Resources &amp; Downloads</h4>
              <p>Upload forms, handbooks, timetables, and circulars as downloadable files. Parents find them on the website. No emailing attachments, no broken links, no outdated PDFs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SIDE BY SIDE (THE DIFFERENCE IS CLEAR) */}
      <section className="alif-section">
        <div className="alif-shell">
          <div className="alif-section-header">
            <div className="alif-eyebrow">
              <span>✦</span> SIDE BY SIDE
            </div>
            <h2 className="alif-section-title">The Difference Is Clear</h2>
            <p className="alif-section-desc">
              Here is exactly what changes when a school moves from a basic website to a JJSOFT Global school platform.
            </p>
          </div>

          <div className="alif-compare-card">
            <table className="alif-compare-table">
              <thead>
                <tr>
                  <th>Situation</th>
                  <th className="col-bad">❌ Basic School Website</th>
                  <th className="col-good">✅ JJSOFT School Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="dim-text">Admissions enquiries</td>
                  <td className="bad-val">Parents call or walk in. Tracked on paper.</td>
                  <td className="good-val">Online form &mdash; lands in admin, tracked through full pipeline to enrolment.</td>
                </tr>
                <tr>
                  <td className="dim-text">Parent notices</td>
                  <td className="bad-val">WhatsApp groups. Easily missed.</td>
                  <td className="good-val">Official digital notice board. Urgent alerts pop up on the school website.</td>
                </tr>
                <tr>
                  <td className="dim-text">School gallery</td>
                  <td className="bad-val">Facebook page or Google Drive links.</td>
                  <td className="good-val">Managed gallery on the school&apos;s own website. School owns the content.</td>
                </tr>
                <tr>
                  <td className="dim-text">Admissions growth</td>
                  <td className="bad-val">No data. Nobody knows how this year compares to last year.</td>
                  <td className="good-val">Year-over-year chart with growth percentage &mdash; visible the moment admin opens.</td>
                </tr>
                <tr>
                  <td className="dim-text">Job vacancies</td>
                  <td className="bad-val">Posted on social media. Applications via email &mdash; unstructured.</td>
                  <td className="good-val">School careers portal. Structured applications received in admin. CVs stored.</td>
                </tr>
                <tr>
                  <td className="dim-text">Updating the website</td>
                  <td className="bad-val">Wait for the web developer. Pay per change.</td>
                  <td className="good-val">School staff update everything from the admin &mdash; no technical knowledge needed.</td>
                </tr>
                <tr>
                  <td className="dim-text">Management visibility</td>
                  <td className="bad-val">No data. Must call staff for basic numbers.</td>
                  <td className="good-val">Real-time executive dashboard &mdash; all key metrics on one screen, always current.</td>
                </tr>
                <tr>
                  <td className="dim-text">School identity online</td>
                  <td className="bad-val">A generic template that looks like every other school.</td>
                  <td className="good-val">Custom-built for the school &mdash; colours, houses, values, culture, and academic stages fully represented.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. BUILT FOR SCHOOLS LIKE YOURS (CTA) */}
      <section className="alif-cta-section">
        <div className="alif-shell">
          <div className="alif-cta-card">
            <div className="alif-hero__badge" style={{ margin: '0 auto 20px', background: 'rgba(82, 34, 123, 0.4)' }}>
              <span>Built for Schools Like Yours</span>
            </div>
            <h2>Your School Deserves a Platform That Works as Hard as You Do</h2>
            <p>
              We build this as a custom system for your school &mdash; with your name, your colours, your houses, your values, and your curriculum. No templates. No compromise. Just a platform your school can be proud of and your management can rely on.
            </p>
            <div className="alif-cta-actions">
              <Link href="/contact" className="btn-alif-primary" style={{ padding: '15px 36px', fontSize: '15px' }}>
                Request a Demo for Your School &rarr;
              </Link>
              <Link href="/work" className="btn-alif-secondary" style={{ padding: '15px 28px', fontSize: '15px' }}>
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. AUTHENTIC FOOTER NOTE */}
      <div style={{ textAlign: 'center', padding: '0 20px 40px', color: '#64748b', fontSize: '13px' }}>
        <strong style={{ color: '#94a3b8' }}>JJSOFT Global</strong> &nbsp;&middot;&nbsp; We build systems that institutions run on. &nbsp;&middot;&nbsp; This case study is based on a live deployment for Alif International School, Dharga Town, Sri Lanka.
      </div>

      {/* 11. SITE FOOTER */}
      <SiteFooter />
    </div>
  )
}
