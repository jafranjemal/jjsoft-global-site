export interface ProductFeature {
  title: string
  description: string
  benefit?: string
}

export interface ProductFaq {
  q: string
  a: string
}

export interface ProductTechSpecs {
  platform: string
  technologyStack: string
  hardwareSupport?: string
  deployment: string
  releaseYear: string
  license: string
}

export interface ProductItem {
  slug: string
  name: string
  eyebrow: string
  tagline: string
  description: string
  longOverview: string[]
  problemSolved: string
  architectureOverview: string
  href: string
  logo: string
  featured: boolean
  releaseDate?: string
  capabilities: string[]
  featureDetails: ProductFeature[]
  techSpecs: ProductTechSpecs
  faqs: ProductFaq[]
  applicationCategory: string
  operatingSystem: string
  offers: {
    price: string
    priceCurrency: string
    category: string
  }
  screenshots?: string[]
}

export const site = {
  name: 'JJSOFT GLOBAL',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jjsoftglobal.com',
  description:
    'JJSOFT GLOBAL is an independent software product company founded in 2015 by Jafran Jemal, B.Eng (Hons). We engineer enterprise retail operating systems, cloud POS platforms, consumer mobile applications, and open-source developer tooling.',
  founded: '2015',
  founder: {
    name: 'Jafran Jemal',
    legalName: 'Mohamed Jemal Mohamed Jafran',
    formalName: 'Mohamed Jemal Mohamed Jafran, BEng (Hons)',
    credential: 'BEng (Hons)',
    degree: 'BEng (Hons) in Software Engineering',
    university: 'London Metropolitan University',
    affiliateCollege: 'ESOFT Metro Campus',
    academicFocus: 'Artificial Intelligence & Software Engineering',
    title: 'Founder, Chief Systems Architect & Independent Researcher',
    nationality: 'Sri Lankan',
    bio: 'Mohamed Jemal Mohamed Jafran (known professionally as Jafran Jemal) is a Sri Lankan software engineer, AI-focused technology professional, entrepreneur, independent inventor, and researcher. He holds a BEng (Hons) in Software Engineering from London Metropolitan University (via ESOFT) with academic work in Artificial Intelligence. He is the Founder of JJSOFT GLOBAL (established 2015).',
    shortBio: 'Founder & Chief Architect of JJSOFT GLOBAL, BEng (Hons) London Met (AI Focus), IWA 2020 Bronze Award Inventor.',
    fullBio:
      'Mohamed Jemal Mohamed Jafran is a Sri Lankan Software Engineer, AI-focused technology professional, entrepreneur, independent inventor and independent researcher. He holds a BEng (Hons) in Software Engineering from London Metropolitan University (via ESOFT), with academic work in Artificial Intelligence. He is the Founder of JJSOFT GLOBAL, a software innovation company. His independent research journey began in 2018 during his book "How to Make Sri Lanka a Superpower Country". While studying transportation challenges, he developed a conceptual two-stage movable-tank ship-lift arrangement as an alternative to conventional canal-lock operation. In 2020, he presented the concept at Innovation Week Morocco (IWA 2020) under the Transport category, where he was listed as an independent inventor from Sri Lanka and received a Bronze award for a new design intended to reduce water wastage in the Panama Canal. Currently, he is advancing the research through analytical water-balance studies and proof-of-concept development toward TRL 3 & TRL 4, with a long-term goal of academic publication and engineering validation.',
    research: {
      title: 'Two-Stage Movable-Tank Ship-Lift Arrangement',
      purpose: 'Reducing water wastage in the Panama Canal as an alternative to conventional canal locks',
      origin: 'Began in 2018 during authoring of the book "How to Make Sri Lanka a Superpower Country"',
      award: 'Bronze Award at Innovation Week Morocco (IWA 2020) — Transport Category (IFIA & OFeeD)',
      status: 'Analytical water-balance studies and proof-of-concept development toward TRL 3 & TRL 4',
    },
    wikidata: 'https://www.wikidata.org/wiki/Q141474525',
    linkedin: 'https://www.linkedin.com/in/jafran-jemal/',
    github: 'https://github.com/jafranjemal',
    facebook: 'https://www.facebook.com/jafranjemal.jjsoft/',
    image: '/assets/founder/jafran-jemal.jpg',
    presentationImage: '/assets/founder/jafran-jemal-presentation.jpg',
    originImage: '/assets/projects/2015-company-opening-enhanced.jpg',
    knowsAbout: [
      'Software Engineering & System Architecture',
      'Artificial Intelligence & Applied Machine Learning',
      'Hydraulic Transport Systems & Ship-Lift Design',
      'Panama Canal Water Conservation Engineering',
      'Enterprise Resource Planning (ERP) Systems',
      'Point of Sale (POS) & Retail Systems',
      'Full-Stack Web Development (Next.js, React, Node.js)',
      'Mobile Application Engineering (React Native, Android Java/Kotlin, iOS)',
      'C# & ASP.NET Core Enterprise APIs',
      'Database Architecture (MSSQL, MongoDB, PostgreSQL)',
      'Headless Visual Document Rendering Engines',
      'Role-Based Access Control (RBAC) & Data Security',
    ],
  },
  socials: {
    facebook: 'https://www.facebook.com/jjsoftGlobal/',
  },
}

export const products: ProductItem[] = [
  {
    slug: 'ishopmaster',
    name: 'iShopMaster',
    eyebrow: 'Retail POS · Mobile Phone ERP · Multi-Branch Ecosystem',
    tagline: 'The complete business operating platform engineered specifically for mobile phone retail, repair centers, serial IMEI tracking, and multi-branch distribution.',
    description: 'Flagship business management ecosystem for mobile phone shops, repair centers, multi-branch retail, serial tracking and billing.',
    longOverview: [
      'iShopMaster is an enterprise-grade retail operating platform and ERP developed by JJSOFT GLOBAL specifically to solve the unique operational complexities of mobile phone retailers, electronics distributors, and device repair centers. Unlike generic retail software, iShopMaster is architected around serialized device lifecycle tracking—managing every phone or accessory from supplier purchase order down to individual IMEI registration, technician work orders, and point-of-sale customer billing.',
      'Deployed across multi-branch retail stores in Sri Lanka and regional commercial centers, iShopMaster consolidates high-speed cashier checkout, automated thermal receipt printing via ESC/POS standards, live stock rebalancing between central warehouses and storefronts, barcode scanner hardware integration, and comprehensive financial audit ledgers.',
      'The platform is available in three distinct editions: iShopMaster Elite for single-store speed, iShopMaster Pro for growing multi-branch chains with dedicated repair hubs, and iShopMaster ERP for large wholesale and distribution operations.'
    ],
    problemSolved:
      'Standard retail POS systems cannot manage unique serial or IMEI numbers for individual electronic items. When an electronics store sells a smartphone, they must record the exact IMEI number, vendor warranty, and customer details. When a customer brings a broken phone for repair, service centers struggle with lost paper job sheets and untracked replacement parts. iShopMaster completely eliminates paper job cards, inventory shrinkage, and warranty disputes through automated digital workflows.',
    architectureOverview:
      'Engineered with a responsive Next.js/React frontend paired with a high-throughput Node.js/Express and MSSQL/MongoDB data layer. Optimized for local hardware connectivity via direct raw socket and WebSerial drivers for 58mm/80mm ESC/POS thermal printers, multi-line customer displays, cash drawers, and high-frequency 1D/2D barcode scanners.',
    href: 'https://ishopmaster.lk/',
    logo: '/assets/logos/ishopmaster.svg',
    featured: true,
    capabilities: [
      'POS & sales billing with instant IMEI capture',
      'Serialized inventory & multi-branch tracking',
      'Device service center & repair job management',
      'Warranty validation & RMA claims management',
      'Multi-branch cloud synchronization',
      'Automated ESC/POS thermal receipt generation',
      'Supplier purchase orders & vendor payables',
      'Granular role-based staff permissions (RBAC)',
      'Real-time gross margin & profitability analytics',
    ],
    featureDetails: [
      {
        title: 'Serialized IMEI & Serial Lifecycle Tracking',
        description: 'Every smartphone, tablet, and high-value gadget is assigned its unique IMEI or serial number during warehouse intake. When scanned at the point of sale, the invoice directly records the serial number, enabling one-click warranty verification and fraud prevention.',
        benefit: 'Completely eliminates customer warranty disputes and prevents inventory leakage.'
      },
      {
        title: 'Service Center & Repair Job Management',
        description: 'Full digital workflow for device repair departments. Log customer complaints, passcode/pattern locks, pre-existing cosmetic flaws, assign jobs to bench technicians, track spare parts consumed, and trigger automatic SMS alerts when the device is ready.',
        benefit: 'Accelerates turnaround times and builds customer trust with transparent tracking.'
      },
      {
        title: 'High-Speed Cashier Engine with Thermal Receipt Support',
        description: 'Engineered for sub-second barcode scans, fast customer lookup, split-payment processing (cash, card, bank transfer), cash drawer kickers, and automated 58mm/80mm thermal receipt printing.',
        benefit: 'Maintains rapid checkout flow during peak retail hours without lag or cashier errors.'
      },
      {
        title: 'Multi-Branch Distributed Inventory Synchronization',
        description: 'Centralized cloud intelligence that allows store managers to monitor live stock levels across all outlets, execute inter-branch stock transfer requests with transit tracking, and consolidate business reports.',
        benefit: 'Prevents stockouts at high-demand branches and optimizes stock allocation.'
      }
    ],
    techSpecs: {
      platform: 'Web, Windows Desktop, Hybrid Cloud Server',
      technologyStack: 'React, Next.js, Node.js, Express, MSSQL, MongoDB, Tailwind CSS',
      hardwareSupport: 'ESC/POS Thermal Printers (58mm/80mm), USB & Bluetooth Barcode Scanners, Electronic Cash Drawers',
      deployment: 'Cloud SaaS or Hybrid On-Premises Local Server',
      releaseYear: '2023–Present',
      license: 'Commercial Enterprise SaaS & Perpetual License Options'
    },
    faqs: [
      {
        q: 'What is iShopMaster?',
        a: 'iShopMaster is a specialized retail POS and ERP operating platform designed by JJSOFT GLOBAL specifically for mobile phone shops, electronics retailers, and device repair centers to track IMEI serial numbers, sales billing, customer warranties, and multi-branch stock.'
      },
      {
        q: 'How does iShopMaster handle mobile phone IMEI numbers?',
        a: 'iShopMaster registers each unique IMEI or serial number during stock procurement. When a product is scanned at POS checkout, the serial number is bonded to the customer invoice, facilitating instant warranty tracking and return validation.'
      },
      {
        q: 'Can iShopMaster manage phone repair and technician workflows?',
        a: 'Yes. iShopMaster includes a dedicated Service Center module with digital job cards, fault logging, spare parts inventory allocation, technician labor tracking, and automated customer status notifications.'
      },
      {
        q: 'Does iShopMaster support multi-branch retail operations?',
        a: 'Yes. iShopMaster provides centralized inventory synchronization across multiple store locations, allowing store managers to view stock across branches, initiate inter-branch stock transfers, and consolidate financial reports.'
      }
    ],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser, Windows 10/11, macOS, Linux, Android POS',
    offers: {
      price: 'Contact for Enterprise Quote',
      priceCurrency: 'USD',
      category: 'Commercial SaaS'
    }
  },
  {
    slug: 'dt-pos',
    name: 'DT POS',
    eyebrow: 'Smart Retail & Cloud POS Solution',
    tagline: 'High-speed cloud-native point of sale solution built for retail shops, repair workflows, rapid cashier checkouts, and real-time inventory.',
    description: 'A modern cloud-first point of sale solution built for retail shops, repair workflows, fast checkout and inventory operations.',
    longOverview: [
      'DT POS is a cloud-first point of sale and inventory management application designed for modern retail merchants requiring lightning-fast transaction speeds and minimal hardware overhead. Engineered by JJSOFT GLOBAL, DT POS runs directly in modern web browsers and touchscreen terminals, eliminating expensive proprietary terminal hardware.',
      'The engine features rapid barcode scanning, live stock reconciliation, automated thermal receipt generation, discount management, and multi-terminal cashier synchronization. It serves retail storefronts, convenience outlets, and specialized repair shops looking for a clean, intuitive, zero-bloat sales terminal.'
    ],
    problemSolved:
      'Traditional legacy POS machines are expensive, clunky, and difficult to update. Small and medium retail merchants often endure system crashes, cumbersome interfaces, and delayed stock updates that frustrate customers in queue. DT POS solves this with a lightweight web interface that works on any screen with sub-second response times.',
    architectureOverview:
      'Built with Next.js, React, TypeScript, and modern edge-deployed APIs. Connects seamlessly with standard USB and wireless POS peripherals including barcode scanners and ESC/POS thermal receipt printers.',
    href: 'https://dt-pos-elite.vercel.app/',
    logo: '/assets/logos/dt-pos.svg',
    featured: false,
    capabilities: [
      'Touchscreen-optimized POS interface',
      'Live product catalog & instant category search',
      'Barcode scanner integration',
      'Order holding, split payments & discount rules',
      'Automated ESC/POS thermal printing',
      'Branch inventory reconciliation & low-stock alerts',
      'Cashier shifts & daily revenue reconciliation'
    ],
    featureDetails: [
      {
        title: 'Sub-Second Touchscreen Checkout',
        description: 'Optimized touch interface designed to complete customer transactions in seconds with minimal clicks, supporting barcode scans and fast keyword search.',
        benefit: 'Reduces queue waiting times and improves customer satisfaction.'
      },
      {
        title: 'Real-Time Stock Updates',
        description: 'Every sale automatically decrements inventory levels across connected terminals, triggering low-stock indicators before items run out.',
        benefit: 'Zero inventory overselling and instant replenishment awareness.'
      },
      {
        title: 'Thermal Receipt Printing & Cash Drawer Kick',
        description: 'Direct browser printing to standard 58mm and 80mm thermal receipt printers with custom store logos, tax breakdowns, and automated cash drawer kickers.',
        benefit: 'Professional branded customer receipts with standard retail hardware.'
      }
    ],
    techSpecs: {
      platform: 'Web Browser, Touchscreen Terminals, Tablets',
      technologyStack: 'Next.js, React, TypeScript, Tailwind CSS, Vercel Edge',
      hardwareSupport: 'Standard USB/Bluetooth Barcode Readers, ESC/POS Thermal Printers',
      deployment: 'Cloud Native SaaS',
      releaseYear: '2024–Present',
      license: 'Commercial SaaS'
    },
    faqs: [
      {
        q: 'What is DT POS?',
        a: 'DT POS is a cloud-first retail point of sale solution engineered by JJSOFT GLOBAL for high-speed transactions, touchscreen checkout, and live inventory control.'
      },
      {
        q: 'What hardware is required to run DT POS?',
        a: 'DT POS runs on any device with a modern web browser, including Windows PCs, Mac, tablets, and touchscreen POS terminals. It connects with standard USB and Bluetooth barcode scanners and thermal receipt printers.'
      },
      {
        q: 'Can multiple cashiers use DT POS simultaneously?',
        a: 'Yes. DT POS supports multi-terminal operation with real-time stock synchronization across all active cashiers and cashier shift closing reports.'
      }
    ],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser, Windows, macOS, Android, iPadOS',
    offers: {
      price: 'Free Demo Available',
      priceCurrency: 'USD',
      category: 'Commercial SaaS'
    }
  },
  {
    slug: 'find-soulmate',
    name: 'Find Soulmate',
    eyebrow: 'Muslim Matrimonial Mobile Application',
    tagline: 'Dedicated Muslim Nikah service mobile application built around Islamic values, halal interactions, privacy protection, and values-based matchmaking.',
    description: 'Dedicated Muslim Nikah service mobile application built around Islamic values, halal interactions, privacy protection and matchmaking.',
    longOverview: [
      'Find Soulmate is a dedicated Muslim Nikah mobile application designed and developed by JJSOFT GLOBAL to facilitate ethical, values-based matrimonial connections within the global Muslim community. Recognizing that mainstream dating apps are incompatible with Islamic matrimonial principles, Find Soulmate was purposefully built around privacy, halal compatibility, family involvement, and serious intentions toward marriage.',
      'The platform incorporates strict privacy controls, including guardian (Wali) verification protocols, controlled photo privacy settings with photo blur reveal permissions, and secure end-to-end communication. Published natively for Android on Google Play and for iOS on the Apple App Store, Find Soulmate has empowered thousands of singles to discover compatible life partners in Sri Lanka and internationally.'
    ],
    problemSolved:
      'Mainstream relationship platforms prioritize superficial swiping and casual dating, which fundamentally contradicts Islamic values of modesty, respect, and marriage intentionality. Traditional matchmaking channels, on the other hand, are often slow, limited in scope, and lack privacy. Find Soulmate bridges this gap by offering a modern, beautiful mobile experience that strictly adheres to Islamic guidelines and privacy safeguards.',
    architectureOverview:
      'Engineered with React Native (Expo) and Redux Toolkit for seamless cross-platform mobile performance on both Android and iOS. Supported by a secure Node.js/Express REST backend, JWT authentication, and Firebase infrastructure for encrypted cloud media storage with granular access tokens.',
    href: 'https://play.google.com/store/apps/details?id=com.jjsoft.findsoulmate.v2muslim',
    logo: '/assets/logos/find-soulmate.svg',
    featured: false,
    releaseDate: 'Dec 18, 2023',
    capabilities: [
      'Values-based Islamic compatibility matching',
      'Comprehensive religious and cultural profiles',
      'Wali (guardian) verification and communication protocols',
      'Halal privacy guards: controlled photo blur and selective visibility',
      'Advanced demographic and religious practice filters',
      'Interactive real-time messaging with safety moderation',
      'Published natively on Google Play and Apple App Store',
    ],
    featureDetails: [
      {
        title: 'Wali (Guardian) Verification Protocol',
        description: 'Provides dedicated integration options for family guardians to participate in communications and verify marital intentions in alignment with Islamic customs.',
        benefit: 'Ensures sincere, respectful communication and peace of mind for families.'
      },
      {
        title: 'Controlled Photo Privacy Guards',
        description: 'Users maintain complete sovereignty over their images. Photos can be blurred by default and only unlocked for specific verified candidates upon mutual consent.',
        benefit: 'Guarantees modesty and safeguards personal identity against unauthorized viewing.'
      },
      {
        title: 'Values-Based Matchmaking Algorithm',
        description: 'Calculates compatibility based on religious commitment, lifestyle, family background, prayer frequency, and life aspirations rather than superficial metrics.',
        benefit: 'Connects individuals with shared life values who are genuinely seeking marriage.'
      }
    ],
    techSpecs: {
      platform: 'Android (Google Play) & iOS (Apple App Store)',
      technologyStack: 'React Native, Expo, Redux Toolkit, Node.js, Express, MongoDB, Firebase',
      hardwareSupport: 'Compatible with all modern Android and iOS smartphones',
      deployment: 'Google Play Store & Apple App Store',
      releaseYear: '2023–Present',
      license: 'Free Download with Optional In-App Matchmaking Subscriptions'
    },
    faqs: [
      {
        q: 'What is Find Soulmate?',
        a: 'Find Soulmate is a Muslim matrimonial mobile application developed by JJSOFT GLOBAL to help practicing Muslims find compatible marriage partners through respectful, values-based, and halal matchmaking.'
      },
      {
        q: 'How does Find Soulmate protect user privacy and Islamic values?',
        a: 'Find Soulmate enforces strict privacy protocols including photo blur privacy controls (allowing users to decide who can view their pictures), optional guardian/Wali verification, and moderated messaging that prohibits casual dating behavior.'
      },
      {
        q: 'Where is Find Soulmate available for download?',
        a: 'Find Soulmate is available for download on Google Play for Android devices and the Apple App Store for iOS devices, as well as on APKPure.'
      },
      {
        q: 'Who developed Find Soulmate?',
        a: 'Find Soulmate was engineered and published by JJSOFT GLOBAL under the technical leadership of founder Jafran Jemal, B.Eng (Hons).'
      }
    ],
    applicationCategory: 'MobileApplication',
    operatingSystem: 'Android, iOS',
    offers: {
      price: 'Free',
      priceCurrency: 'USD',
      category: 'Mobile App'
    },
    screenshots: [
      '/assets/products/find-soulmate-screen-0.webp',
      '/assets/products/find-soulmate-screen-1.webp',
    ],
  },
  {
    slug: 'aavanamkit',
    name: 'AavanamKit',
    eyebrow: 'Open Source · Visual Document & Template Engine',
    tagline: 'A visual document layout designer and headless JSON rendering ecosystem to design invoices and PDF templates visually instead of guessing coordinates in code.',
    description: 'A visual document layout designer and headless JSON rendering ecosystem to design templates visually instead of coding coordinates blindly.',
    longOverview: [
      'AavanamKit is an open-source visual document design ecosystem and headless layout engine created by JJSOFT GLOBAL. For software engineers building billing systems, ERPs, and e-commerce platforms, generating PDF invoices, dispatch slips, and receipts has historically been a painful chore: developers had to hardcode pixel coordinates blindly in libraries like jsPDF or PDFKit, or fight with print CSS converting HTML to low-quality, blurry output.',
      'AavanamKit transforms document layout into a first-class visual development workflow. Developers and designers use the visual canvas designer to craft pixel-perfect invoices, thermal receipts, labels, and certificates with live data bindings. When completed, the layout exports as a clean, standardized JSON template that can be rendered dynamically on the client or in headless server runtimes with sub-millisecond efficiency.'
    ],
    problemSolved:
      'Engineers frequently spend days guessing coordinate numbers like `doc.text("Total:", 400, 750)`, running scripts repeatedly, and adjusting pixels trial-and-error. Print CSS to PDF tools often yield blurry text, huge PDF file sizes, and unpredictable page breaks. AavanamKit replaces this broken workflow with a visual GUI editor and lightweight JSON declarative templates.',
    architectureOverview:
      'Published on npm as `@aavanamkit/designer` with a visual canvas editor built on React, HTML5 Canvas, and TypeScript. Supported by a headless renderer that converts JSON template descriptors directly into crisp vector PDFs or thermal ESC/POS commands without needing a headless browser.',
    href: 'https://aavanamkit-demo.vercel.app/',
    logo: '/assets/logos/aavanamkit.svg',
    featured: false,
    capabilities: [
      'Interactive visual document canvas editor',
      'Standardized declarative JSON document schema',
      'Headless backend rendering engine (no Chromium dependency)',
      'Vector-quality PDF invoice and receipt generation',
      'Published as an open-source npm package (@aavanamkit/designer)',
      'Dynamic variable placeholders and repeating table rows',
      'Lightweight bundle footprint suitable for edge runtimes',
    ],
    featureDetails: [
      {
        title: 'Visual Drag-and-Drop Canvas Designer',
        description: 'Design invoices, packing slips, barcode labels, and receipts on a visual grid with real-time ruler guides, typography controls, and dynamic table layouts.',
        benefit: 'Saves 80% of development time compared to hardcoding layout coordinates.'
      },
      {
        title: 'Clean Declarative JSON Template Export',
        description: 'Layouts are compiled into clean JSON templates that completely decouple document styling from backend business logic.',
        benefit: 'Templates can be stored in databases and modified without touching application code.'
      },
      {
        title: 'Ultra-Fast Headless PDF & Thermal Renderer',
        description: 'Renders templates into vector-sharp PDFs or raw thermal printer command streams in milliseconds without requiring heavy headless Chrome instances.',
        benefit: 'Extremely lightweight server resource usage and instantaneous customer receipt printing.'
      }
    ],
    techSpecs: {
      platform: 'NPM Package, Web Designer, Headless Node.js Engine',
      technologyStack: 'TypeScript, React, HTML5 Canvas, WebGL, Node.js, JSON Schema',
      hardwareSupport: 'Thermal Receipt Printers (ESC/POS), Standard Office Laser Printers',
      deployment: 'NPM Library (@aavanamkit/designer) & Hosted Vercel Studio',
      releaseYear: '2025–Present',
      license: 'Open Source / MIT'
    },
    faqs: [
      {
        q: 'What is AavanamKit?',
        a: 'AavanamKit is an open-source visual document designer and headless JSON rendering engine created by JJSOFT GLOBAL to allow developers to visually design invoices, receipts, and PDF templates instead of hardcoding coordinate numbers in code.'
      },
      {
        q: 'How does AavanamKit work?',
        a: 'Developers use the visual web designer to arrange text, tables, and images. The designer outputs a declarative JSON template. At runtime, the headless engine takes dynamic data and merges it into the JSON template to produce vector-quality PDFs or thermal receipts instantly.'
      },
      {
        q: 'Is AavanamKit open source?',
        a: 'Yes, AavanamKit is open source and available as an npm package (@aavanamkit/designer) with code repositories on GitHub and an interactive live web demo.'
      }
    ],
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-Platform (Node.js, Web Browsers, Linux, macOS, Windows)',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      category: 'Open Source / Free'
    }
  },
  {
    slug: 'whatstrim',
    name: 'WhatsTrim',
    eyebrow: 'Native Android Video Utility',
    tagline: 'Android utility application designed for effortlessly trimming and sequencing videos for WhatsApp status updates with zero loss in visual quality.',
    description: 'Android utility application designed for effortlessly trimming and preparing videos for WhatsApp status updates with zero quality loss.',
    longOverview: [
      'WhatsTrim is an Android video utility application engineered and published by JJSOFT GLOBAL. Because social messaging platforms like WhatsApp enforce strict 30-second duration limits on status story uploads, users frequently struggle to split longer videos accurately, resulting in abrupt cuts, awkward audio transitions, and severe video re-compression artifacts.',
      'WhatsTrim solves this problem by providing an automated one-tap splitting engine that slices any video into sequentially numbered 30-second clips. Engineered with efficient native Android media APIs, WhatsTrim preserves original frame rates (up to 60fps) and visual resolution without re-encoding quality degradation, ensuring continuous chronological playback on status stories.'
    ],
    problemSolved:
      'Manually cutting video clips using default gallery trimmers is tedious, imprecise, and frequently causes out-of-order posting. WhatsTrim automates the entire process in one tap, guaranteeing exact 30-second splits with preserved bitrate and sequential naming.',
    architectureOverview:
      'Native Android application written in Java and Android SDK media codecs. Uses hardware-accelerated media multiplexing to segment video streams without quality-degrading re-compression passes.',
    href: 'https://apkcombo.com/es/whatstrim-no-1-best-gb-whatssapp-downloader/com.jjsoft.jafranjemal.whatsTrim/',
    logo: '/assets/logos/whatstrim.svg',
    featured: false,
    releaseDate: 'Jul 29, 2017',
    capabilities: [
      'Automated one-tap 30-second video status slicing',
      'Lossless video trimming with original resolution preservation',
      'Smooth 60fps frame rate retention',
      'Chronological numbered output for ordered status posting',
      'Low memory footprint and fast processing speed',
      'Published and downloaded across global Android utility repositories',
    ],
    featureDetails: [
      {
        title: 'Lossless Slicing Engine',
        description: 'Splits video containers along keyframes without re-encoding pixels, preserving 100% of the original video clarity, color saturation, and audio fidelity.',
        benefit: 'Crisp, high-definition WhatsApp status videos with zero blurriness.'
      },
      {
        title: 'One-Tap Chronological Sequencing',
        description: 'Automatically saves split clips as sequentially numbered parts (Part 1, Part 2, Part 3), allowing users to upload continuous long videos in seconds.',
        benefit: 'Eliminates manual timeline scrubbing and prevents uploading clips out of order.'
      }
    ],
    techSpecs: {
      platform: 'Android Smartphone & Tablet OS',
      technologyStack: 'Java, Android MediaCodec, Android NDK, Gradle',
      hardwareSupport: 'All Android devices (ARM64, x86)',
      deployment: 'Published on APKCombo & Android Application Directories',
      releaseYear: '2017–Present',
      license: 'Free Android Utility'
    },
    faqs: [
      {
        q: 'What is WhatsTrim?',
        a: 'WhatsTrim is an Android utility application developed by JJSOFT GLOBAL that allows users to split long videos into exact 30-second clips for WhatsApp status updates with zero loss in quality.'
      },
      {
        q: 'Does WhatsTrim reduce video quality or resolution?',
        a: 'No. WhatsTrim utilizes lossless container splitting to preserve the original resolution, bitrate, and frame rate without ugly re-compression.'
      },
      {
        q: 'Who developed WhatsTrim?',
        a: 'WhatsTrim was developed and released by Jafran Jemal under the JJSOFT GLOBAL software organization.'
      }
    ],
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Android 5.0 and above',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      category: 'Free Utility'
    }
  },
  {
    slug: 'jjchat',
    name: 'JJChat',
    eyebrow: 'Real-Time Messaging Application · Android',
    tagline: 'Published native Android real-time messaging application providing lightweight, high-speed instant communication.',
    description: 'One of the company’s earliest published mobile applications, providing lightweight, real-time messaging on Android.',
    longOverview: [
      'JJChat is one of JJSOFT GLOBAL’s earliest published mobile communication applications, launched in October 2016. Engineered during the early years of modern mobile Android adoption, JJChat provided real-time text communication, contact synchronization, and multimedia attachment sharing within a compact, resource-efficient package.',
      'The application served as a foundational milestone for JJSOFT GLOBAL’s mobile engineering expertise, establishing the real-time websocket and asynchronous database networking patterns that later informed enterprise messaging and POS synchronization systems.'
    ],
    problemSolved:
      'In 2016, many popular instant messaging applications consumed heavy background RAM and excessive mobile data, creating lag on budget Android smartphones. JJChat was engineered as an ultra-compact, data-saving communication client.',
    architectureOverview:
      'Native Android APK developed with Java and lightweight socket communication protocols, featuring local SQLite caching and secure socket data transmission.',
    href: 'https://apkpure.com/jj-chat/com.wJJchat',
    logo: '/assets/logos/jjchat.svg',
    featured: false,
    releaseDate: 'Oct 13, 2016',
    capabilities: [
      'Real-time peer-to-peer messaging',
      'Address book contact discovery and status updates',
      'Photo and audio media attachments',
      'Ultra-lightweight APK footprint (< 5MB)',
      'Optimized for low-bandwidth 2G/3G mobile networks',
    ],
    featureDetails: [
      {
        title: 'Low-Memory Real-Time Socket Engine',
        description: 'Engineered with custom socket protocols to maintain persistent connections with minimal battery drain and background RAM consumption.',
        benefit: 'Fluid messaging even on low-spec Android devices.'
      },
      {
        title: 'Local Cache Architecture',
        description: 'Instant message retrieval using optimized local SQLite storage with background synchronization.',
        benefit: 'Immediate chat history rendering with zero loading screens.'
      }
    ],
    techSpecs: {
      platform: 'Android Mobile OS',
      technologyStack: 'Java, Android SDK, SQLite, WebSockets, Soft112 / APKPure Distribution',
      hardwareSupport: 'Android smartphones running Android 4.0+',
      deployment: 'APKPure & Soft112 Mobile Directories',
      releaseYear: '2016',
      license: 'Free Communication App'
    },
    faqs: [
      {
        q: 'What is JJChat?',
        a: 'JJChat was a lightweight real-time mobile messaging application engineered and published by JJSOFT GLOBAL on Android in October 2016.'
      },
      {
        q: 'Who engineered JJChat?',
        a: 'JJChat was engineered by Jafran Jemal, B.Eng (Hons), as part of JJSOFT GLOBAL’s early mobile application development portfolio.'
      }
    ],
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Android',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      category: 'Free App'
    },
    screenshots: [
      '/assets/products/jjchat-screen-0.webp',
      '/assets/products/jjchat-screen-1.webp',
    ],
  },
  {
    slug: 'jjbrowser',
    name: 'JJBrowser',
    eyebrow: 'Ultra-Fast Lightweight Web Browser',
    tagline: 'Compact, resource-efficient mobile web browser engineered for high-speed browsing and low memory consumption on Android devices.',
    description: 'A compact, resource-efficient mobile web browser engineered for high-speed browsing and low memory consumption on Android devices.',
    longOverview: [
      'Published in July 2016, JJBrowser was engineered by JJSOFT GLOBAL as a nimble, low-memory alternative to bloated mobile browsers. At a time when mobile web browsing frequently bogged down mid-tier smartphones with heavy cache files and memory leaks, JJBrowser introduced aggressive memory recycling and lightweight rendering pipelines.',
      'With support for tabbed browsing, privacy modes, fast page rendering, and data compression, JJBrowser demonstrated JJSOFT’s early commitment to performance-first software architecture.'
    ],
    problemSolved:
      'Heavy mobile browsers routinely exhausted RAM and battery life on entry-level Android devices. JJBrowser delivered rapid webpage loading with a fraction of the memory footprint of major alternatives.',
    architectureOverview:
      'Native Android client wrapping an optimized WebKit/Chromium engine with custom resource interceptors, privacy sandboxing, and local bookmark synchronization.',
    href: 'https://apkpure.com/jj-browser/com.wJJBrows',
    logo: '/assets/logos/jjbrowser.svg',
    featured: false,
    releaseDate: 'Jul 20, 2016',
    capabilities: [
      'Ultra-fast web page rendering and caching',
      'Tabbed navigation with fast switching',
      'Low memory consumption (< 15MB active RAM)',
      'Data-saving compression for mobile networks',
      'Bookmark and history management',
    ],
    featureDetails: [
      {
        title: 'Optimized Rendering Pipeline',
        description: 'Direct WebKit integration with accelerated hardware rendering and background tab memory freezing.',
        benefit: 'Smooth scrolling and instant page navigation.'
      },
      {
        title: 'Compact Package Size',
        description: 'Micro APK distribution engineered without bloated analytics or intrusive background tracking services.',
        benefit: 'Installs in seconds on any Android phone.'
      }
    ],
    techSpecs: {
      platform: 'Android Mobile OS',
      technologyStack: 'Java, Android SDK, WebKit, APKPure Distribution',
      hardwareSupport: 'Android smartphones and tablets',
      deployment: 'APKPure Mobile Directory',
      releaseYear: '2016',
      license: 'Free Browser'
    },
    faqs: [
      {
        q: 'What is JJBrowser?',
        a: 'JJBrowser was an ultra-lightweight, high-speed mobile web browser developed by JJSOFT GLOBAL for Android in July 2016.'
      },
      {
        q: 'What made JJBrowser unique?',
        a: 'JJBrowser focused on extreme resource efficiency, utilizing minimal RAM and mobile data while delivering fast web rendering on Android smartphones.'
      }
    ],
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Android',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      category: 'Free Browser'
    },
    screenshots: [
      '/assets/products/jjbrowser-screen-0.webp',
    ],
  },
]

export const projects = [
  {
    slug: 'alif',
    title: 'Alif International School Platform',
    client: 'Alif International School (Dharga Town, Sri Lanka)',
    category: 'edtech',
    type: 'EdTech · School Management ERP',
    eyebrow: 'EdTech Transformation · Campus Digitalization',
    description: 'Complete digital campus transformation: multi-campus admissions pipeline, student lifecycle system, digital notices, report cards, and role-based administrative portal.',
    longDescription: 'End-to-end digital platform developed for Alif International School to modernize admissions, parent communications, fee tracking, and academic record management in Dharga Town, Sri Lanka.',
    tags: ['Next.js', 'School ERP', 'Admissions CRM', 'Fee Ledger', 'Parent Portal'],
    href: 'https://alifinternational.lk/',
    caseStudyHref: '/work/alif',
    visual: 'school',
    screenshot: '/assets/projects/alif-school-screenshot.png',
    featured: true,
    stats: [
      { label: 'Admissions Process', value: '100% Online' },
      { label: 'Admin Time Saved', value: '35+ hrs/wk' },
      { label: 'Campus Users', value: '2,500+' },
    ],
  },
  {
    slug: 'quazi-court',
    title: 'Quazi Court of Sri Lanka',
    client: 'Quazi Court Beruwala Judicial Division',
    category: 'government',
    type: 'Government · Public Service Portal',
    eyebrow: 'Government Digitization · Judicial Scheduling',
    description: 'Online appointment and reservation portal developed for the Quazi Court of Sri Lanka (Beruwala) to digitize public judicial scheduling.',
    longDescription: 'Engineered for the Quazi Court of Sri Lanka to transition judicial docket scheduling from physical logbooks to a verified online reservation portal with SMS notifications and case tracking.',
    tags: ['Appointment Booking', 'Public Service', 'Digitization', 'Docket Scheduling'],
    href: 'https://www.sl-qc.com',
    caseStudyHref: '/work/quazi-court',
    visual: 'court',
    screenshot: '/assets/projects/quazi-court-screenshot.jpg',
    featured: true,
    stats: [
      { label: 'Public Queue Time', value: '-80%' },
      { label: 'Double Bookings', value: '0' },
      { label: 'Public Satisfaction', value: '4.9 / 5' },
    ],
  },
  {
    slug: 'gem-management',
    title: 'Gem Management System',
    client: 'Shimla Gems Pvt Ltd',
    category: 'enterprise',
    type: 'Industry Software & ERP',
    eyebrow: 'Enterprise ERP · Ceylon Sapphire Ledger',
    description: 'Full-stack inventory tracking, procurement and gemstone order management system built for Shimla Gems Pvt Ltd with role-based access control.',
    longDescription: 'Bespoke ERP built for Shimla Gems Pvt Ltd to track high-value Ceylon sapphires, rubies, and precious stones from raw procurement through cutting, laboratory grading, and export documentation.',
    tags: ['Inventory', 'RBAC Security', 'Export Rules', 'MERN Stack'],
    href: 'https://beta-ms-shimla-gem.netlify.app/login',
    caseStudyHref: '/work/gem-management',
    visual: 'gem',
    featured: false,
    stats: [
      { label: 'Tracked Stones', value: '4,800+ Pcs' },
      { label: 'Audit Trail', value: 'Real-Time' },
      { label: 'Export Compliance', value: '100%' },
    ],
  },
  {
    slug: 'dt-pos',
    title: 'DT POS Smart Retail Cloud',
    client: 'Retail & Multi-Branch Merchants',
    category: 'retail',
    type: 'Smart Retail & POS Solution',
    eyebrow: 'Point of Sale · Cloud Engine',
    description: 'A modern cloud-first point of sale solution built for retail shops, repair workflows, fast checkout and inventory operations.',
    longDescription: 'High-speed touchscreen POS engine delivering sub-second barcode scans, live stock reconciliation, automated thermal receipt generation, and multi-terminal cashier synchronisation.',
    tags: ['Touchscreen POS', 'Thermal Printing', 'Barcode Scanning', 'Multi-Terminal'],
    href: 'https://dt-pos-elite.vercel.app/',
    caseStudyHref: '/products/dt-pos',
    visual: 'shop',
    featured: false,
    stats: [
      { label: 'Checkout Latency', value: '< 0.5s' },
      { label: 'Hardware Sync', value: 'Instant' },
      { label: 'Offline Resiliency', value: '100%' },
    ],
  },
  {
    slug: 'ishopmaster',
    title: 'iShopMaster Platform',
    client: 'Mobile Retailers & Service Centers',
    category: 'retail',
    type: 'Vertical SaaS / Retail Platform',
    eyebrow: 'Vertical SaaS · Retail Operating Platform',
    description: 'A complete business operating platform built for mobile phone retail, repair operations and multi-branch distribution.',
    longDescription: 'Comprehensive ERP and point-of-sale platform specifically designed for electronics and mobile phone retailers, offering serial/IMEI tracking, technician work orders, and accounting.',
    tags: ['POS', 'ERP', 'Multi-Branch', 'Service Center'],
    href: 'https://ishopmaster.lk/',
    caseStudyHref: '/work/ishopmaster',
    visual: 'shop',
    featured: false,
    stats: [
      { label: 'Retail Stores', value: 'Multi-Branch' },
      { label: 'IMEIs Tracked', value: '100,000+' },
      { label: 'System Uptime', value: '99.98%' },
    ],
  },
]

export const timeline = [
  { year: '2015', title: 'JJSOFT GLOBAL Founded', description: 'A developer-led software company begins with a product mindset and practical engineering.' },
  { year: '2016', title: 'First Mobile Apps: JJBrowser & JJChat', description: 'Published JJBrowser (Jul 2016) and JJChat (Oct 2016) on Android, establishing early mobile capabilities.' },
  { year: '2017–2019', title: 'WhatsTrim & Web Application Platforms', description: 'Launched WhatsTrim utility and delivered full-stack enterprise web portals for universities and municipal councils.' },
  { year: '2020–2022', title: 'Quazi Court Portal & Industry Systems', description: 'Built Quazi Court Sri Lanka online reservation system and the Shimla Gems management system.' },
  { year: '2023–2025', title: 'iShopMaster, DT POS & Find Soulmate', description: 'Deepened vertical product portfolio with iShopMaster (Elite, Pro, ERP), DT POS, and Find Soulmate Nikah service.' },
  { year: '2025+', title: 'AavanamKit & Global Reach', description: 'Launched AavanamKit open-source visual document ecosystem and expanding products internationally.' },
]

export const industries = ['Retail & Mobile', 'Gem & Jewellery', 'Government & Judiciary', 'Matrimonial', 'Document Systems', 'Developer Tooling']

export const principles = [
  { title: 'Solve the workflow, not the screen', description: 'The interface is only useful when it removes friction from a real operational problem.' },
  { title: 'Build for change', description: 'Products are structured so features can evolve without turning the codebase into a fragile monolith.' },
  { title: 'Make complexity legible', description: 'Dense business logic should feel understandable through hierarchy, states, context and good defaults.' },
  { title: 'Ship usable systems', description: 'A successful product connects design, engineering, deployment and the day-to-day reality of its users.' },
]
