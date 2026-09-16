import {
  AboutSection,
  ArchivalOrigin,
  BuiltForConfidence,
  CapabilityStrip,
  ClosingCTA,
  DeveloperToolingSection,
  FlagshipSection,
  FounderSection,
  Hero,
  MobileAppsSpotlight,
  ProjectsSection,
  SolutionsGridSection,
  TrustedBrandsStrip,
  UpcomingPipelineSection,
} from '@/components/home-sections'
import { SiteFooter } from '@/components/site-footer'
import { productCollectionSchema, projectCollectionSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <main>
      {/* 1. COSMIC HERO: Custom Software Solutions for a Smarter Tomorrow */}
      <Hero />

      {/* 2. CAPABILITY FEATURE STRIP: Web Apps, Mobile Apps, Cloud, IT Consulting */}
      <CapabilityStrip />

      {/* 3. ABOUT SECTION: Your Vision, Our Technology (Crisp White Theme & Floating Stats) */}
      <AboutSection />

      {/* 4. SOLUTIONS GRID: Powerful Solutions for Every Business Need (Dark 2x3 Grid) */}
      <SolutionsGridSection />

      {/* 5. TRUSTED BY INNOVATIVE BRANDS: Monochrome Vector Partner Strip */}
      <TrustedBrandsStrip />

      {/* 6. DEDICATED SPOTLIGHT: Find Soulmate & WhatsTrim Consumer Platforms */}
      <MobileAppsSpotlight />

      {/* 7. INNOVATION ROADMAP: Upcoming Products & Projects Pipeline */}
      <UpcomingPipelineSection />

      {/* 8. FLAGSHIP DEEP DIVE: iShopMaster Retail Operating System (5-Tab Live Engine) */}
      <FlagshipSection />

      {/* 9. SELECTED ENTERPRISE CASE STUDIES: Quazi Court, Gem Management, DT POS */}
      <ProjectsSection />

      {/* 10. HISTORIC ORIGIN: 2015 Family Home Opening & "Big dreams start small." */}
      <ArchivalOrigin />

      {/* 11. FOUNDER LEADERSHIP: Jafran Jemal, B.Eng (Hons) Keynote & Hands-On Engineering */}
      <FounderSection />

      {/* 12. DEVELOPER TOOLING: AavanamKit Headless Document Engine */}
      <DeveloperToolingSection />

      {/* 13. BUILT FOR SERIOUS PRODUCTS: Risk Reduction (Product, UX, Scalability, Security) */}
      <BuiltForConfidence />

      {/* 14. CLOSING CONVERSION BANNER */}
      <ClosingCTA />

      {/* 15. STUDIO FOOTER */}
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([...productCollectionSchema(), ...projectCollectionSchema()]).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}
