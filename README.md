# JJSOFT GLOBAL — Production Website

A mobile-first, high-fidelity Next.js App Router implementation inspired by the supplied JJSOFT GLOBAL reference screenshot.

## Stack
- Next.js 16.3.4
- React 19.2.8
- TypeScript
- App Router
- Semantic HTML + CSS design tokens
- Local public assets (no remote image dependency for the core UI)

## Architecture
- `app/` — routes, metadata, sitemap, robots, manifest
- `components/` — reusable UI and page sections
- `data/` — portfolio content + source URL registry
- `lib/` — metadata + structured-data helpers
- `public/assets/` — local brand/product/reference assets

## SEO / AI crawlability
- Route-level metadata and canonical URLs
- Open Graph / Twitter metadata
- `robots.ts`
- `sitemap.ts`
- Web manifest
- Organization + software/product + project JSON-LD
- Text-rich product, work, about, technology and insight pages
- Clear semantic headings and link structure

Next.js's current App Router supports file-based robots/sitemap metadata and recommends JSON-LD for structured understanding by search engines and other automated systems.

## Run
```bash
npm install
npm run dev
```

Production:
```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain before deployment.

## Asset note
The environment used to prepare this package could not resolve the user-supplied external asset hosts over the container network. To keep the project self-contained, the core logo and product marks are local SVG assets, while the supplied reference screenshot was cropped for two visual references. Replace those local reference assets with the original high-resolution brand/product photography before the final launch if you have the original files.

No sensitive personal data from the supplied source material is included in the website code.
