# Aboy Systems — Portfolio

Professional portfolio of **Aboy Chandra Das** (Aboy Systems): a full-stack developer building practical business web apps — dashboards, CRM systems, automation tools, and admin panels.

**Live Demo:** https://aboy-portfolio-xi.vercel.app/

## What this site is

A proof-first portfolio for global freelance clients on Upwork, Fiverr, Freelancer, and LinkedIn. Every project is labeled for exactly what it is — a deployed, self-initiated build or a clearly marked build roadmap. No invented clients, no fake testimonials, no stock case studies.

### Marketplace-safe by design

This site is used as a portfolio link on freelance marketplaces, so it deliberately contains **no direct contact method** — no contact form, email, phone, or scheduling links. Clients are pointed back to the platform where they found the portfolio (see the **How to Start** page). Communication and payment for marketplace projects stay inside that platform, start to finish. Do not add direct contact channels without understanding the marketplace rules first.

## Features

- Dark, product-focused design system (near-black / white / deep indigo) built on Tailwind CSS v4 tokens
- Case study pages with honest status labels, demo/scope metrics, and safe "coming soon" placeholders for demo and repo links
- Tech stack section with official icons (react-icons Simple Icons set), grouped by category
- Pure-CSS product illustrations (dashboard mock, project motifs) — no fake screenshots
- Subtle scroll animations (Framer Motion) that respect reduced-motion preferences
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter tags, sitemap, robots, FAQ structured data
- PWA basics: web manifest, app icons, apple-touch-icon (asset files supplied separately)
- Fully static — every route prerenders at build time

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, trust section, problems, services, featured work, tech stack, process, CTA |
| `/work` | All projects with honest status labels |
| `/work/[slug]` | Case studies / build plans (3 projects) |
| `/services` | Three services with deliverables and example features |
| `/process` | Six-step process with per-step deliverables |
| `/about` | Who I am, how I build, current focus |
| `/faq` | Straight answers, including marketplace communication rules |
| `/start` | How to start a project — routes marketplace clients back to their platform |

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react + react-icons · deployed on Vercel

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & checks

```bash
npm run lint       # ESLint
npm run build      # production build — all routes prerender
npm run start      # serve the production build locally
```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it in Vercel — no environment variables are required.
3. After the first deploy, set the real domain in `src/data/site.ts` (`site.url`) and redeploy so canonical URLs, Open Graph URLs, and the sitemap point at the live domain.
4. Add the image assets listed in `LAUNCH-CHECKLIST.md` (profile photo + app icons).

## Content sources

All content is typed data in `src/data/` — `site.ts` (brand, nav, CTAs, socials), `projects.ts` (case studies), `services.ts`, `process.ts`, `faq.ts`, `tech-stack.ts`. Copy changes happen there, not in components.
