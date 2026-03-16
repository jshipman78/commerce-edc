# Commerce EDC Website

## Tech Stack
- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** with brand design system (CSS-based `@theme`)
- **MDX** via `next-mdx-remote` for news posts
- **React Server Actions** for forms
- Deploy target: **Vercel**

## Brand Colors
- Navy: `#1B2A4A` — headers, nav, primary buttons, footer
- Amber: `#B45309` — CTAs, highlights, badges, hover states
- Green: `#0D7E6B` — success, "rail-served" badge, secondary accent
- Cream: `#F7F4EF` — page backgrounds, alternating sections

## Brand Fonts
- **Playfair Display** (serif) — h1-h3 headings
- **Inter** (sans-serif) — body text, data tables

## Architecture Rules
- Server Components by default; `'use client'` only for interactivity
- Data lives in `src/data/*.ts` — typed, no database
- News content as MDX in `src/content/news/`
- Navigation is data-driven from `src/data/navigation.ts`
- PDFs are static in `/public/documents/`
- Use `next/image` for all images

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Key Directories
- `src/app/` — ~30 routes
- `src/components/` — layout/, ui/, sections/, seo/
- `src/data/` — TypeScript data files
- `src/lib/` — utils, mdx, metadata, actions
- `src/content/news/` — MDX news posts
