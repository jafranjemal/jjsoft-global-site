import { ProductItem, products, projects, site } from '@/data/site'

/**
 * Canonical Person Schema for Founder Jafran Jemal
 * Optimized for Google Knowledge Graph, Google AI Overviews, Perplexity & Gemini Answer Engines
 */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#jafran-jemal`,
    name: site.founder.legalName,
    givenName: 'Mohamed',
    additionalName: 'Jemal',
    familyName: 'Jafran',
    alternateName: [
      site.founder.name,
      site.founder.legalName,
      'Mohamed Jafran',
      'JJ',
      site.founder.formalName,
    ],
    honorificPrefix: 'Mr.',
    honorificSuffix: site.founder.credential,
    jobTitle: site.founder.title,
    description: site.founder.fullBio,
    nationality: {
      '@type': 'Country',
      name: 'Sri Lanka',
      sameAs: 'https://www.wikidata.org/wiki/Q854',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: site.founder.university,
        sameAs: [
          'https://www.wikidata.org/wiki/Q1310804',
          'https://en.wikipedia.org/wiki/London_Metropolitan_University',
        ],
      },
      {
        '@type': 'EducationalOrganization',
        name: site.founder.affiliateCollege,
        sameAs: [
          'https://www.wikidata.org/wiki/Q5324316',
          'https://en.wikipedia.org/wiki/ESOFT_Metro_Campus',
        ],
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'BEng (Hons) in Software Engineering',
      educationalLevel: 'Bachelor of Engineering with Honours',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: site.founder.university,
        sameAs: 'https://www.wikidata.org/wiki/Q1310804',
      },
    },
    award: [
      'Bronze Award (3rd Place) — Innovation Week Morocco (IWA 2020) by International Federation of Inventors\' Associations (IFIA) & OFeeD (Transport Category, Panama Canal Water Conservation Ship-Lift Design)',
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
    },
    founder: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
    },
    image: `${site.url}${site.founder.image}`,
    sameAs: [
      site.founder.wikidata,
      site.founder.linkedin,
      site.founder.github,
      site.founder.facebook,
    ],
    knowsAbout: [
      {
        '@type': 'DefinedTerm',
        name: 'Artificial Intelligence',
        sameAs: 'https://www.wikidata.org/wiki/Q11660',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Software Engineering',
        sameAs: 'https://www.wikidata.org/wiki/Q83030',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Ship lift',
        sameAs: 'https://www.wikidata.org/wiki/Q1414135',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Panama Canal',
        sameAs: 'https://www.wikidata.org/wiki/Q7350',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Enterprise resource planning',
        sameAs: 'https://www.wikidata.org/wiki/Q131202',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Point of sale',
        sameAs: 'https://www.wikidata.org/wiki/Q723149',
      },
    ],
  }
}

/**
 * Organization Schema for JJSOFT GLOBAL
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: 'JJSOFT GLOBAL Software Solutions',
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og-image.png`,
    foundingDate: site.founded,
    description: site.description,
    founder: {
      '@type': 'Person',
      '@id': `${site.url}/#jafran-jemal`,
      name: site.founder.name,
      jobTitle: site.founder.title,
      url: `${site.url}/about#who-is-jafran-jemal`,
      sameAs: [site.founder.wikidata, site.founder.linkedin, site.founder.github, site.founder.facebook],
    },
    sameAs: [
      site.socials.facebook,
      site.founder.linkedin,
      site.founder.github,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${site.url}/contact`,
    },
  }
}

/**
 * Unified Knowledge Graph (WebSite + Organization + Person)
 * Generates an interconnected @graph linking founder and organization
 */
export function unifiedEntityGraphSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: {
          '@id': `${site.url}/#organization`,
        },
      },
      organizationSchema(),
      personSchema(),
    ],
  }
}

/**
 * Dedicated SoftwareApplication / Product Schema for individual product pages
 */
export function singleProductSchema(product: ProductItem) {
  return {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'Product'],
    '@id': `${site.url}/products/${product.slug}#product`,
    name: product.name,
    headline: product.tagline || product.eyebrow,
    description: product.description,
    url: `${site.url}/products/${product.slug}`,
    sameAs: product.href,
    image: `${site.url}${product.logo}`,
    applicationCategory: product.applicationCategory,
    operatingSystem: product.operatingSystem,
    author: {
      '@type': 'Person',
      '@id': `${site.url}/#jafran-jemal`,
      name: site.founder.name,
      jobTitle: site.founder.title,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
    },
    releaseDate: product.releaseDate || product.techSpecs.releaseYear,
    offers: {
      '@type': 'Offer',
      price: product.offers.price === '0' || product.offers.price === 'Free' ? '0' : '0',
      priceCurrency: product.offers.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock',
      category: product.offers.category,
    },
    featureList: product.capabilities.join(', '),
  }
}

/**
 * FAQPage Schema for a product's frequently asked questions
 */
export function productFaqSchema(product: ProductItem) {
  if (!product.faqs || product.faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

/**
 * About Page FAQ Schema for AI Overviews answering "Who is Jafran Jemal?"
 */
export function aboutFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Mohamed Jemal Mohamed Jafran (Jafran Jemal)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${site.founder.formalName} is a Sri Lankan software engineer, AI-focused technology professional, entrepreneur, independent inventor, and independent researcher. He is the Founder and Chief Systems Architect of JJSOFT GLOBAL (established 2015) and the creator of iShopMaster, DT POS, Find Soulmate, and AavanamKit.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What academic qualifications and degree does Mohamed Jemal Mohamed Jafran hold?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Mohamed Jemal Mohamed Jafran holds a BEng (Hons) in Software Engineering from London Metropolitan University (via ESOFT Metro Campus), with academic specialization and coursework in Artificial Intelligence.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What awards and independent research has Mohamed Jemal Mohamed Jafran produced?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In 2020, he presented a conceptual two-stage movable-tank ship-lift arrangement at Innovation Week Morocco (IWA 2020) under the Transport category, where he was listed as an independent inventor from Sri Lanka and won a Bronze Award (organized with the International Federation of Inventors' Associations - IFIA & OFeeD) for a design intended to reduce water wastage in the Panama Canal. His research originated in 2018 during his book "How to Make Sri Lanka a Superpower Country" and is currently advancing toward TRL 3 & TRL 4 validation.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is JJSOFT GLOBAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JJSOFT GLOBAL is an independent software innovation and engineering company founded in 2015 by Mohamed Jemal Mohamed Jafran. The company builds production retail ERP/POS ecosystems, mobile applications, and open-source developer tooling.',
        },
      },
      {
        '@type': 'Question',
        name: 'What software products has Jafran Jemal engineered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jafran Jemal has architected and shipped multiple production platforms including iShopMaster (retail ERP & POS ecosystem for mobile shops), DT POS (cloud point of sale), Find Soulmate (Muslim matrimonial mobile app on iOS & Android), AavanamKit (open-source visual document engine on npm), WhatsTrim (lossless video trimmer), JJChat (messaging app), and JJBrowser (lightweight mobile browser).',
        },
      },
    ],
  }
}

/**
 * Collection schemas for home and catalog pages
 */
export function productCollectionSchema() {
  return products.map((product) => singleProductSchema(product))
}

export function projectCollectionSchema() {
  return projects.map((project) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.href,
    creator: {
      '@type': 'Organization',
      name: site.name,
      founder: {
        '@type': 'Person',
        name: site.founder.name,
      },
    },
  }))
}
