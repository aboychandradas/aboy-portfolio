# Aboy Systems Portfolio — Engineering & Positioning Audit

**Audit date:** 2026-08-30 → 2026-09-01
**Branch audited:** `portfolio-v2-engineering` (clean working tree, identical to `origin/main` at time of audit)
**Repository:** `https://github.com/aboychandradas/aboy-portfolio` (public, 15 commits)
**Deployment:** `https://aboysystems.com/` (verified reachable, HTTP 200, Vercel, static prerender)
**Framework:** Next.js 16.2.10 (App Router) · React 19.2.4 · TypeScript 5.9.3 · Tailwind CSS 4.3.2

**Scope:** Read-only analysis. No production code, configuration, or assets were modified.

**Evidence policy for this document:**
Findings are split into **Confirmed** (verified by running a command, reading a file, inspecting built output, or fetching a public URL) and **Assessment** (reasoned judgment from confirmed evidence). Nothing in this document asserts a client, testimonial, revenue figure, user count, performance result, test suite, CI pipeline, security control, or WCAG conformance claim that was not verified.

---

## 1. Executive Summary

This repository is, on engineering craft, better than most freelance portfolios. It type-checks clean, lints clean, builds clean, prerenders every route statically, exposes no secrets, ships no third-party trackers, and enforces a deliberate marketplace-safety constraint that is documented in code and genuinely honoured throughout. The design system is coherent and the copy is unusually well written.

It also has one problem large enough to overshadow all of that.

**The portfolio's single "proof" project describes a technology stack that the real project does not use.** `src/data/projects.ts` presents FieldOps Analytics OS as a deployed Next.js / TypeScript / Tailwind CSS build. The actual public repository — `github.com/aboychandradas/fieldops-analytics-os`, 23 commits, MIT-licensed, live at `https://fieldops-analytics-os.streamlit.app/` — is a **Python / SQL / SQLite / Streamlit / Plotly** application. The live case study page currently renders "Next.js" 9 times, "TypeScript" 9 times, and "Tailwind CSS" 7 times, and does not mention Python, SQLite, or Streamlit once.

That is not a marketing exaggeration. It is a factual misstatement about the one artifact the entire credibility argument rests on, published on a site whose stated premise is "show, don't claim," and it is the first thing a technical reviewer will discover if they click through.

The failure compounds into a broader pattern: **the portfolio systematically hides real proof and displays unbacked specification instead.**

- Every `liveUrl` and `githubUrl` in `projects.ts` is `null`. The site therefore shows "Live demo · coming soon" on all three projects — including FieldOps, which has been publicly deployed the whole time, and whose own status badge reads "Self-initiated build · **Deployed**."
- `ShopPulse Analytics OS` is featured first on the homepage and has **no repository and no code anywhere** on the GitHub account.
- `ServicePro Lead Engine` — a genuinely deployed Next.js / React / TypeScript / Tailwind / Supabase / Zod full-stack app with an admin dashboard, server-side validation, and CSV export, live at `https://servicepro-lead-engine.vercel.app` — **is not mentioned anywhere in the portfolio.** It is the closest thing on the account to the work the portfolio claims to do, and it is invisible.

Separately, a rendering decision undermines the site mechanically: **the `Reveal` animation wrapper prerenders essentially all page content at `opacity:0`.** The built homepage contains 37 elements carrying `style="opacity:0;transform:translateY(20px)"`, including the `<h1>`. Content only becomes visible after JavaScript loads, hydrates, and an IntersectionObserver fires.

The good news is that the repair is mostly **subtraction and reconnection, not construction.** The proof already exists on GitHub. The copy is already well written. The honesty scaffolding — status labels, `metricsNote`, the `proof` vs `roadmap` type, the marketplace-safety comment block — is already built and working. What is missing is telling the truth about which project is which, and linking to work that is already public.

**Priority totals:** 10 × P0 · 19 × P1 · 14 × P2 · 15 × P3.

---

## 2. Current Strengths

These are verified, not assumed. They are worth protecting during remediation.

### 2.1 The build is genuinely clean

| Check | Command | Result |
|---|---|---|
| Type check | `npx tsc --noEmit` | **Exit 0**, zero errors |
| Lint | `npx eslint .` | **Exit 0**, zero warnings |
| Production build | `npx next build` | **Success**, 17 routes |
| Rendering | build output | **All routes `○ Static` or `● SSG`** — nothing dynamic |

`tsconfig.json` sets `"strict": true`. A full-repository grep for `: any`, `as any`, and `@ts-ignore` returned **no matches** — the TypeScript is honestly strict, not strict-with-escape-hatches.

### 2.2 No secrets, no third-party surface

- No `.env*` files exist in the repository or working tree.
- `process.env` and `NEXT_PUBLIC_` appear **zero times** across `src/`.
- A pattern scan for `api_key`, `secret`, `token`, `password`, `bearer`, and private-key headers across `src/`, `public/`, and root configs returned **no matches**.
- **No analytics, no tag manager, no third-party scripts, no iframes, no embeds.** The only `<script>` tags are two inline JSON-LD blocks (`src/app/page.tsx:26`, `src/app/faq/page.tsx:41`).

For a portfolio that will be scraped and inspected by prospective clients, a zero-tracker footprint is a real, defensible position.

### 2.3 Marketplace safety is correctly implemented

A scan across `src/`, `public/`, `README.md`, and `LAUNCH-CHECKLIST.md` for `mailto:`, `tel:`, email patterns, phone patterns, `whatsapp`, `wa.me`, `telegram`, `t.me`, `calendly`, `cal.com`, `discord`, `skype`, and `zoom.us` returned **zero real matches.**

The constraint is enforced structurally, not just by discipline:

- `src/data/site.ts:13-18` carries an explicit hard-constraint comment forbidding a contact field, with the reasoning.
- `src/data/site.ts:54-55` gives Upwork and Fiverr empty `href` values, and `src/components/layout/footer.tsx:34` filters them out — so unfinished links cannot leak as broken anchors.
- `/start`, `/faq` (two dedicated answers), the footer note, and every CTA route clients back to the originating platform.

This is the cleanest part of the codebase and it should not be disturbed.

### 2.4 Honest-labelling scaffolding already exists

`src/data/projects.ts` is architecturally set up to tell the truth — the problem is the data inside it, not the design:

- A `ProjectStatus = "proof" | "roadmap"` union forces every project to declare its nature.
- `statusLabel`, `metricsNote`, and the `honestyNote()` function (`src/app/work/[slug]/page.tsx:47-51`) surface that declaration in the UI.
- The file header (lines 1-10) states the honesty rules as enforceable constraints.
- `liveUrl`/`githubUrl`/`image` are `string | null`, and the UI degrades safely when they are null.

The machinery is right. It is being fed wrong values.

### 2.5 SEO fundamentals are correctly wired

Verified by grepping the built HTML in `.next/server/app/`:

- **Per-page canonicals are correct on every route** — `/`, `/about`, `/faq`, `/process`, `/services`, `/start`, `/work`, and `/work/[slug]` each emit their own self-referencing canonical. (This is a common Next.js failure mode — inheriting the root `alternates.canonical` — and it was avoided here.)
- Exactly **one `<h1>` per page**, on all 8 routes.
- `<html lang="en">` and a correct viewport meta are present.
- `robots.txt` and `sitemap.xml` generate correctly; the sitemap contains all 10 URLs including the three case studies.
- `metadataBase` is set, so relative metadata URLs resolve.

### 2.6 Accessibility work that is already correct

- A working skip link (`src/app/layout.tsx:101-106`) with proper `sr-only` / `focus:not-sr-only` handling.
- A global `:focus-visible` outline (`src/app/globals.css:78-81`) at 2px with offset — verified at **6.61:1** contrast against the page background.
- `aria-expanded`, `aria-controls`, and a state-dependent `aria-label` on the mobile menu button (`src/components/layout/navbar.tsx:54-56`).
- `aria-current="page"` on active nav links.
- Decorative images correctly carry `alt=""` alongside an `aria-label` on the wrapping link (`src/components/layout/brand-logo.tsx:21-35`).
- Native `<details>`/`<summary>` for the FAQ instead of a hand-rolled accordion.
- `prefers-reduced-motion` handled in CSS for scroll behaviour and card hover (`globals.css:60-64`, `99-104`).
- Body text contrast is strong: `--muted` on `--background` measures **7.68:1**.

### 2.7 A real, self-aware launch checklist

`LAUNCH-CHECKLIST.md` already anticipates several findings in this audit — including *"every claim, metric, and feature matches the real builds (especially FieldOps numbers)"* and *"Add real `liveUrl` / `githubUrl` to projects."* The author knew. The checklist was simply never completed before launch (every box is still unchecked while the site is live).

---

## 3. Critical Problems

Five issues, in order of damage to credibility.

### 3.1 The proof project's stated stack is wrong — **CONFIRMED**

| | Portfolio claims (`src/data/projects.ts:282`) | Actual repository |
|---|---|---|
| Stack | `["Next.js", "TypeScript", "Tailwind CSS"]` | **Python, SQL, SQLite, Streamlit, Plotly** |
| Live URL | `null` → renders "coming soon" | `https://fieldops-analytics-os.streamlit.app/` (live) |
| Repo URL | `null` → "View Source" never renders | Public, 23 commits, MIT licensed |
| Description | "job-centric dashboard… technicians… CSV export" | "marketplace finance and work-order analytics dashboard" |

The overview copy (`projects.ts:245`) states FieldOps *"implements the exact playbook I bring to client work"* — but the playbook the portfolio sells is Next.js/TypeScript/Tailwind, and this build is a Streamlit application. Live page verification on 2026-08-30 confirmed the deployed case study renders Next.js/TypeScript/Tailwind and **zero** mentions of Python, SQLite, or Streamlit.

This is the highest-severity finding in the audit. A technical hiring manager who clicks the GitHub profile finds the contradiction in under a minute.

### 3.2 Real, deployed proof is hidden while unbuilt specs are featured — **CONFIRMED**

Verified against `github.com/aboychandradas` (12 public repositories):

| Portfolio slot | Portfolio status | Repository reality |
|---|---|---|
| ShopPulse Analytics OS (featured **1st**) | "Client-grade build roadmap" | **No repository exists.** No code anywhere on the account. |
| ClientFlow OS (featured 2nd) | "Client-grade build roadmap" | Public, **3 commits**, README is default Next.js starter text, no demo |
| FieldOps Analytics OS (featured 3rd) | "Self-initiated build · Deployed" | Public, 23 commits, live — but wrong stack advertised (§3.1) |
| *(absent)* | — | **`servicepro-lead-engine`** — Next.js/React/TS/Tailwind/Supabase/Zod, **live at `servicepro-lead-engine.vercel.app`**, admin dashboard, server-side validation, status tracking, search/filter, CSV export |
| *(absent)* | — | `gadget-retail-intelligence-os` (TypeScript) |
| *(absent)* | — | `business-expense-sales-dashboard` — CSV/Excel cleaning + profit dashboard |
| *(absent)* | — | `ai-lead-tracker-crm` — Sheets CRM + Apps Script + React dashboard |
| *(absent)* | — | `study-abroad-tracker` (TypeScript) |

The portfolio leads with a project that does not exist and omits the one deployed application that matches its own positioning most exactly. `servicepro-lead-engine` is a *lead-generation site with a mini CRM* — which is precisely what `/services` sells under "CRM & Lead Management Systems."

### 3.3 Every proof link is dead, while the copy promises verifiability — **CONFIRMED**

All three projects have `liveUrl: null` and `githubUrl: null`. Consequences in the shipped UI:

- `src/app/work/[slug]/page.tsx:69-78` renders a disabled "Live demo · coming soon" placeholder. Live verification found this string **4 times** on the FieldOps page alone.
- The "View Source" button (`page.tsx:80-90`) is conditional on `githubUrl` and therefore **never renders on any page**.
- `src/components/work/project-card.tsx:64-74` never renders its live-demo link.

Meanwhile the site repeatedly promises the opposite:

| Claim | Location |
|---|---|
| "you can check everything yourself" | `src/app/work/page.tsx:41` |
| "habits you can verify in the work and the repos" | `src/app/about/page.tsx` — "How I build" lede |
| "Every project lives in a repository with readable commits — you can watch progress, not just trust it" | `src/data/process.ts:82-84` |
| "leading with proof instead of promises" | `src/app/about/page.tsx` — Current focus 03 |

A visitor cannot verify a single project claim from this site. The proof exists on GitHub; the site simply does not link to it.

### 3.4 All page content ships invisible — **CONFIRMED**

`src/components/motion/reveal.tsx` sets `initial={{ opacity: 0, y: 20 }}` with `whileInView`. Because `Reveal` wraps nearly every content block on every page, the prerendered HTML ships hidden:

| Built file | Elements with `style="opacity:0;transform:translateY(20px)"` |
|---|---|
| `.next/server/app/index.html` | **37** (including the `<h1>`) |
| `.next/server/app/work/fieldops-analytics-os.html` | **13** |
| `.next/server/app/work.html` | **5** |

Grep confirmed the homepage `<h1>` sits directly inside an `opacity:0` wrapper.

Consequences: the largest-contentful-paint element cannot paint until framer-motion (45.4 KB gzip) loads, React hydrates, and an IntersectionObserver fires; any JS failure yields a blank page; non-JS-executing crawlers and link-preview bots see hidden content; and links inside not-yet-revealed blocks are keyboard-focusable while invisible.

`useReducedMotion()` is called, but it only zeroes the `y` translate — the opacity fade still runs for reduced-motion users. `README.md` claims the animations *"respect reduced-motion preferences,"* which is only partly accurate.

### 3.5 Unverified metrics were shipped with their own TODO markers still attached — **CONFIRMED**

`src/data/projects.ts` line 306 reads:

```
// TODO(aboy): adjust these to match the real seeded build before publishing.
```

Directly beneath it (lines 307-311), published live:

- `{ label: "Demo jobs seeded", value: "500+" }`
- `{ label: "Dashboard views", value: "12" }`
- `{ label: "Report export", value: "1 click" }`

The file header (line 7) carries a matching global TODO: *"verify every number and claim below against the real builds before publishing."* Line 314 adds: *"add the real deployment + repo URLs when ready to publish them."*

These numbers describe a build whose stack is misstated (§3.1), so their provenance is unestablished. They are the only numeric claims on the site, which makes them disproportionately load-bearing.

---

## 4. Code Quality Findings

### 4.1 Duplicated logic — **CONFIRMED**

| Duplication | Locations |
|---|---|
| `serviceIcons` icon map, defined identically twice | `src/app/services/page.tsx:41-45`, `src/components/home/services-preview.tsx:13-17` |
| End-of-page CTA block, hand-rolled instead of reusing `PageCta` | `src/app/work/[slug]/page.tsx:385-408` vs `src/components/sections/page-cta.tsx` |
| Process steps, maintained as two independent copies | `src/data/process.ts:27-70` (6 steps) vs `src/components/home/process-preview.tsx:6-31` (4 steps) |

The process duplication has already drifted into a **substantive inconsistency**: the homepage promises *"Working software on a live preview link **every week**"* (`process-preview.tsx:23`), a cadence commitment that appears nowhere in the canonical `/process` data. Step titles differ entirely between the two ("Map the workflow" vs "Understand the workflow"; "Spec the system" vs "Plan the screens and data").

### 4.2 Content hard-coded in components, contradicting the documented convention — **CONFIRMED**

`README.md` states: *"All content is typed data in `src/data/` … Copy changes happen there, not in components."* This is not accurate. Substantial client-facing copy lives inside components:

| File | Hard-coded content |
|---|---|
| `src/app/start/page.tsx:34-116` | `platformReasons`, `beforeYouMessage`, `messageChecklist`, `afterYouMessage` (4 blocks) |
| `src/app/about/page.tsx:46-102` | `buildPrinciples`, `currentFocus` |
| `src/app/services/page.tsx:47-55` | `commonDeliverables` |
| `src/components/home/process-preview.tsx:6-31` | 4 process steps |
| `src/components/home/problem-section.tsx:5-30` | 4 problem cards |
| `src/components/home/trust-badges.tsx:7-26` | 3 promise cards |
| `src/components/home/dashboard-mock.tsx:3-10` | KPI figures |

`/start` — a primary conversion page — has **none** of its copy in `src/data/`.

### 4.3 Unused dependency — **CONFIRMED**

`zod@4.4.3` is declared in `dependencies` but a full grep of `src/` for `from "zod"` returns **no matches**. It is never imported. It is simultaneously advertised in the UI (`src/data/tech-stack.ts:109-113` — *"Validates every form and import, so bad data stops at the door"*) and listed in two project stacks — while this codebase contains no forms and no validation.

### 4.4 Client-component boundaries are wider than necessary — **CONFIRMED**

| Component | `"use client"` reason | Cost |
|---|---|---|
| `src/components/motion/reveal.tsx` | framer-motion | Pulls nearly all page content into the client tree (see §3.4, §13) |
| `src/components/layout/brand-logo.tsx` | an *optional* `onClick` prop | Footer uses it **without** `onClick` and still pays the client boundary |
| `src/components/about/profile-photo.tsx` | `useState` for an `onError` fallback | Forces a client boundary on the homepage for an image that exists in-repo |

`Navbar` is correctly a client component (`useState` + `usePathname`).

### 4.5 Inconsistent layout primitives — **CONFIRMED**

A `Section` component exists (`src/components/ui/section.tsx:4-27`) and is used by 6 home components. All 7 files under `src/app/` bypass it and hand-roll `<section>` + `<Container>` with repeated `border-t border-border/60` and `py-16 sm:py-24` strings. Two conventions coexist for the same job.

### 4.6 Fragile styling contract — **ASSESSMENT**

`ProfilePhoto` bakes `aspect-[4/5] w-full max-w-56` into its base classes, then callers override with conflicting utilities from different Tailwind groups — e.g. `className="h-20 w-20 …"` in `src/components/home/trust-badges.tsx:35`. `tailwind-merge` cannot dedupe across those groups, so `aspect-[4/5]` and `max-w-56` survive alongside `h-20 w-20`. The rendered result happens to be acceptable, but the override depends on CSS precedence rather than an intended API.

### 4.7 Stale comments — **CONFIRMED**

- `src/app/manifest.ts:5-7`: *"Icon files are placeholders until real assets are added to /public"* — the icons exist.
- `LAUNCH-CHECKLIST.md:16`: *"GitHub URL … (currently guessed as `Avoy22`)"* — now correctly `aboychandradas`.
- `LAUNCH-CHECKLIST.md:29`: *"`src/app/favicon.ico` replaced"* — no such file exists (`src/app/icon.png` and `apple-icon.png` are used instead).

### 4.8 Dead assets — **CONFIRMED**

Zero references from `src/`: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (create-next-app leftovers), `public/favicon-old.ico`, and `public/icon-maskable-512.png` (61,928 bytes — orphaned by the manifest conflict in §5.2).

---

## 5. Architecture Findings

### 5.1 Overall structure is sound — **CONFIRMED**

`src/app/` (routes) · `src/components/{ui,layout,home,work,tech,sections,motion,about}/` · `src/data/` (typed content) · `src/lib/` (utilities). Path alias `@/*` configured. Every content file exports typed interfaces. `generateStaticParams` and `generateMetadata` are correctly implemented for `/work/[slug]`. `notFound()` is correctly used for unknown slugs.

### 5.2 Two conflicting web manifests serve the same URL — **CONFIRMED**

| Source | `name` | `theme_color` | `background_color` | Maskable icon |
|---|---|---|---|---|
| `public/manifest.webmanifest` (static) | "Aboy Systems Portfolio" | `#111827` | `#0b1118` | `icon-maskable-512.png` |
| `src/app/manifest.ts` (generated) | "Aboy Systems — Business Web Apps" | `#0e0e15` | `#0e0e15` | `icon-512.png` |

Both resolve to `/manifest.webmanifest`. The build emitted no warning. Next.js documents that *"Headers are checked before the filesystem which includes pages and `/public` files"* — but precedence between a `public/` file and an App Router metadata route is not something to rely on, and it can differ between local `next start` and the deployment target.

Two secondary defects follow: `theme_color` disagrees with `src/app/layout.tsx:86` (`#0e0e15`), and `manifest.ts` reuses the standard `icon-512.png` for `purpose: "maskable"` — maskable icons require safe-zone padding, so Android will crop it.

### 5.3 Rendering strategy constrains the security roadmap — **CONFIRMED**

Every route is statically prerendered. Per this version's own documentation (`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`):

> "To use a nonce, your page must be **dynamically rendered**. This is because Next.js applies nonces during server-side rendering… Static pages are generated at build time, when no request or response headers exist—so no nonce can be injected."

A nonce-based strict CSP is therefore **incompatible with the current architecture** without abandoning static rendering. This is decisive for §9 and must not be papered over with generic "add a strict CSP" advice.

Also version-specific and confirmed: in Next.js 16, `middleware.ts` has been **renamed to `proxy.ts`** (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).

### 5.4 `next.config.ts` is empty — **CONFIRMED**

```ts
const nextConfig: NextConfig = {
  /* config options here */
};
```

No `headers()`, no `poweredByHeader: false`, no image configuration. Every hardening opportunity available at the framework level is unused.

### 5.5 Metrics are rendered without their qualifier on cards — **CONFIRMED**

`src/components/work/project-card.tsx:36-45` renders `project.metrics` as bare figures. `project.metricsNote` — the field that exists specifically to qualify them (*"Scope figures from the v1 build specification — not usage claims"*) — is only rendered on the detail page (`src/app/work/[slug]/page.tsx:265-267`). On `/work`, "500+", "14", and "11" appear as unqualified numbers next to project titles.

---

## 6. Portfolio / UX Findings

### 6.1 Positioning is genuinely problem-first — **ASSESSMENT**

The site largely achieves *problem → solution → evidence → outcome*. `/` opens with a workflow problem, not a stack list; `ProblemSection` names four concrete operational failures; every case study runs Overview → Problem → Solution → Features → Business value. Copy is specific and non-generic ("the workbook that quietly became mission-critical"). This is materially better than typical developer portfolios.

**The chain breaks at "evidence."** Every other link is strong; the evidence link is empty (§3.3).

### 6.2 The featured-work lede miscategorises two of three projects — **CONFIRMED**

`src/components/home/featured-work.tsx:17`:

> "Self-initiated **products** that prove out real business workflows."

Two of the three featured items are roadmaps with no product — one with 3 commits, one with no repository at all. The per-card `Badge` corrects this, but the section lede asserts the stronger claim first.

### 6.3 Repetition across pages — **ASSESSMENT**

`bestFitProjects` renders on both `/process` and `/start`. Three near-identical CTA blocks exist (`FinalCta`, `PageCta`, and the inline one in `work/[slug]`). "Message me on the platform where you found this portfolio" appears on `/faq`, `/start`, the footer, `FinalCta`, and the case-study CTA. The marketplace rule is correct and worth stating — but at five repetitions it starts to read as defensive.

### 6.4 `/start` is a conversion page absent from primary navigation — **CONFIRMED**

`src/data/site.ts:32-38` lists Work, Services, Process, About, FAQ. `/start` is reachable only via the navbar CTA button, footer, and in-page CTAs. It *is* in the sitemap. Given that `/start` is the page that tells a buyer how to hire, its absence from the nav is a deliberate-looking choice worth revisiting.

### 6.5 The hero mock reads as a product screenshot — **ASSESSMENT**

`src/components/home/dashboard-mock.tsx` is a hand-built div mock displaying concrete figures — `$12,480`, `37` active jobs, `94%` on-time, `+8.2%` — under a sidebar labelled **`FIELDOPS`** (line 37). It is correctly `aria-hidden` and captioned "Ops dashboard · Preview," but that caption is 10px `text-faint` (measured **3.90:1** contrast) in the corner.

The numbers do not correspond to the FieldOps case study's own figures ("500+ demo jobs seeded" vs "37 active jobs"). Branding an invented mock with a real project's name is the one place where this otherwise scrupulous site edges toward implying a screenshot that does not exist.

### 6.6 Unbacked deliverable claims — **CONFIRMED**

`src/app/services/page.tsx:47-55` — "What ships with **every project**" — lists:

- **"PDF reports"** — no PDF library in `package.json`; no project in `projects.ts` mentions PDF generation; no repository evidence.
- **"GitHub documentation"** — plausible, but currently unverifiable from the site, and `clientflow-os`'s README is default starter text.

---

## 7. Project Accuracy Findings

Complete per-project reconciliation. **All GitHub data verified against public repositories.**

### 7.1 ShopPulse Analytics OS — **no implementation exists**

| Field | Portfolio value | Reality |
|---|---|---|
| Repository | `githubUrl: null` | **No repository named `shoppulse*` exists** on the account (all 12 public repos enumerated) |
| Status | `"roadmap"` / "Client-grade build roadmap" | Accurate as a label |
| Featured | `featured: true`, listed **first** | Leads the portfolio with zero artifact |
| Stack claimed | Next.js, TypeScript, PostgreSQL, Prisma, Tailwind, Recharts, Zod | Aspirational; nothing built |
| Metrics | 14 screens / 6 modules / 3 roles | Spec figures, correctly qualified by `metricsNote` |

**Assessment:** The labelling is honest — `"roadmap"`, "This page documents the full build specification." The problem is prominence, not deception. A spec with no code should not occupy the first featured slot ahead of deployed work.

One internal inconsistency: `whatIBuilt[3]` (line 120) claims *"UI direction consistent with my FieldOps build,"* asserting design continuity with a project that is actually a Streamlit app.

### 7.2 ClientFlow OS — **repository exists but is near-empty**

| Field | Portfolio value | Reality (verified) |
|---|---|---|
| Repository | `githubUrl: null` | **Public**, `aboychandradas/clientflow-os` |
| Commits | — | **3** |
| README | — | Default Next.js starter content |
| Live demo | `liveUrl: null` | None set |
| LICENSE / tests / CI | — | **None** |
| Stack claimed | Next.js, TypeScript, PostgreSQL, Prisma, Tailwind, Zod | Repo shows Next.js + TypeScript + Prisma + PostCSS — **broadly consistent** |
| Metrics | 11 screens / 5 stages / 3 roles | Spec figures, correctly qualified |

**Assessment:** Stack claims are *consistent*, which is a real point in its favour. But the case study heading renders as **"What I've built so far"** (`src/app/work/[slug]/page.tsx:325`) over four bullets describing a completed specification, permission matrix, and activity-timeline model. Against 3 commits and a starter README, "built so far" overstates. The repo is not linked, so a reader cannot calibrate.

### 7.3 FieldOps Analytics OS — **material stack misstatement**

| Field | Portfolio value | Reality (verified) |
|---|---|---|
| Status | `"proof"` / "Self-initiated build · **Deployed**" | Genuinely deployed — **but not linked** |
| **Stack** | **`["Next.js", "TypeScript", "Tailwind CSS"]`** | **Python, SQL, SQLite, Streamlit, Plotly** |
| Live URL | `null` → "coming soon" | **`https://fieldops-analytics-os.streamlit.app/`** |
| Repo URL | `null` → no "View Source" | **Public**, 23 commits, **MIT licensed** |
| Description | "job-centric dashboard… technicians… dispatch" | "marketplace finance and work-order analytics dashboard" |
| Metrics | 500+ jobs / 12 views / 1-click export | **Unverified**, TODO still in file (line 306) |
| Tests / CI | — | **None** |

Repository topics: `business-intelligence`, `dashboard`, `data-analysis`, `finance-analytics`, `marketplace-analytics`, `pandas`, `plotly`, `portfolio-project`, `python`, `sql`, `sqlite`, `streamlit`. Structure: `generate_data.py`, `load_to_sqlite.py`, a 13-file SQL library, and a Streamlit front end.

**Additional inconsistencies:**

- `features[5]` claims *"Responsive layout — Readable on the office laptop and on smaller screens"* — Streamlit's responsive behaviour is framework-controlled, not authored.
- `whatIBuilt[3]` claims *"The design language this portfolio shares: dense tables, calm charts"* — this portfolio's design language is bespoke Tailwind; a Streamlit app cannot share it.
- `lessonsLearned[0]` (*"Aggregation logic belongs in one tested layer"*) implies tests. The repository has **none**.

This is the P0 that must be fixed before any other work.

### 7.4 ServicePro Lead Engine — **exists, deployed, and entirely absent**

Not present in `src/data/projects.ts`, anywhere in `src/`, or anywhere in the repository's git history (verified by `git log --all -S "ServicePro"` and a full-tree grep — both empty).

Verified repository reality:

| Attribute | Value |
|---|---|
| Repository | `aboychandradas/servicepro-lead-engine` — **public** |
| Description | "Full-stack lead generation website and mini CRM for service businesses" |
| **Live demo** | **`https://servicepro-lead-engine.vercel.app`** |
| Stack | **Next.js, React, TypeScript, Tailwind CSS, Supabase, Zod** |
| Commits | 8 |
| Features (per README) | Form submission, Supabase storage, **server-side validation**, **protected admin dashboard**, status tracking, notes, search/filtering, **CSV export** |
| Tests / CI / LICENSE | None |

**Assessment:** This is the strongest proof asset on the account and the best match to the portfolio's own positioning. Its stack is exactly what the site advertises. Its feature list maps directly onto `/services` → "CRM & Lead Management Systems" (pipeline, client history, CSV import) and onto `TrustBadges`' "Spreadsheet-friendly by design" and "Type-safe, production-minded code" (Zod validation is real here — unlike in this repository, §4.3).

Omitting it while featuring a spec with no code is the portfolio's largest self-inflicted wound.

### 7.5 Cross-cutting accuracy issue

`src/data/tech-stack.ts` presents 18 technologies with confident capability statements — *"Vercel: Deployment for every build"*, *"GitHub: Where my projects live — commits you can actually follow"*, *"Zod: Validates every form and import."* Of these, **Streamlit, Pandas, Python, and SQLite are the ones actually evidenced by the deployed FieldOps build** — and the case study attributes that build to Next.js/TypeScript/Tailwind instead. The stack grid is arguably more accurate than the case study it contradicts.

---

## 8. Trust & Proof Findings

### 8.1 What a skeptical client can verify today — **CONFIRMED**

| Proof type | Present? | Evidence |
|---|---|---|
| Live demo links | **No** | All `liveUrl: null`; "coming soon" ×4 on the live FieldOps page |
| Source repository links | **No** | All `githubUrl: null`; "View Source" never renders |
| Real screenshots | **No** | All `image: null`; CSS motifs only (`motif-preview.tsx`) |
| Architecture documents | **No** | No `docs/` directory existed before this audit |
| Tests | **No** | None in this repo or any project repo |
| CI | **No** | No `.github/workflows` in this repo or any project repo |
| Release history | **No** | No releases, no tags, no `CHANGELOG.md` |
| Commit history | **Partially** | Real and public — but not linked from the site |
| Security notes | **No** | No `SECURITY.md` |
| Stated limitations | **Yes** | `honestyNote()`, `metricsNote`, "I don't have a wall of client logos" |
| Testimonials / clients | **Correctly absent** | None invented — this is a strength |

The only working external link on the entire site is the **"View GitHub"** button on `/about`, pointing to `site.portfolioRepoUrl`. That repository is **public and live** (verified: 15 commits, website `https://aboysystems.com/`). So exactly one proof link works — and it proves the portfolio itself, not any project.

### 8.2 The verifiability gap is the core trust problem — **ASSESSMENT**

The site makes verifiability an explicit selling point in at least four places (§3.3) while providing zero verifiable artifacts. This is worse than a portfolio that makes no such promise: it invites the check, then fails it.

**The asymmetry is the important part.** The proof exists. `fieldops-analytics-os` (23 commits, MIT, live), `servicepro-lead-engine` (live, on-stack, real features), `business-expense-sales-dashboard`, `ai-lead-tracker-crm`, `gadget-retail-intelligence-os`, and `study-abroad-tracker` are all public right now. The gap is entirely one of connection, not of substance.

### 8.3 A competing portfolio dilutes the proof surface — **CONFIRMED**

`aboychandradas/avoy-portfolio` is public and described as: *"Full-stack developer portfolio featuring case studies, **Supabase contact form**, admin dashboard, automation audit, and resume."*

Two consequences:

1. **Positioning:** the GitHub profile that this site links to as its proof surface lists a second, different portfolio. A reviewer must work out which one is current.
2. **Marketplace exposure:** that portfolio contains a **contact form** — a direct off-platform contact channel. It is two clicks from this marketplace-safe site (footer → GitHub → `avoy-portfolio`). See §10.3.

### 8.4 Honesty framing that works — **CONFIRMED**

Worth preserving verbatim during remediation: `honestyNote()` (`work/[slug]/page.tsx:47-51`) explicitly states *"It is not a paid client project"* / *"It is not a delivered client project."* `/about` states plainly: *"I'm at the start of my freelance career, and I don't have a wall of client logos."* No testimonials, no client logos, no invented metrics. This candour is a genuine differentiator and should survive every fix in the roadmap.

---

## 9. Security Findings

### 9.1 Live response headers — **CONFIRMED** (`curl -I https://aboysystems.com/`, 2026-08-30)

**Present:**

| Header | Value | Source |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000` | Vercel default (no `includeSubDomains`, no `preload`) |
| HTTPS | Enforced | Vercel |
| `x-powered-by` | **Absent** | Stripped by Vercel |

**Absent:**

| Header | Impact |
|---|---|
| `Content-Security-Policy` | No injection defence-in-depth |
| `X-Content-Type-Options: nosniff` | MIME-sniffing not blocked |
| `Referrer-Policy` | Full URLs leak on outbound navigation to GitHub/LinkedIn |
| `Permissions-Policy` | Camera/mic/geolocation not explicitly denied |
| `X-Frame-Options` / `frame-ancestors` | **The site can be framed by any origin** |
| `Cross-Origin-Opener-Policy` | Not set |

Also observed: `Access-Control-Allow-Origin: *` on the HTML document (Vercel default for static assets — harmless for public marketing content).

**Assessment:** For a static brochure site with no authentication, forms, cookies, or user input, the *exploitable* risk is low. Clickjacking is the only header gap with real substance, and its impact is limited by the absence of any state-changing action.

**But the framing matters more than the risk.** This portfolio sells engineering judgment. A prospective client — or a competitor — who runs it through `securityheaders.com` sees a failing grade on the developer's own site. Headers are cheap, static-compatible, and directly demonstrable. This is proof-of-competence work as much as security work.

### 9.2 Dependency vulnerabilities — **CONFIRMED** (`npm audit`)

**6 high-severity vulnerabilities (4 in production dependencies).**

| Package | Advisory | Notes |
|---|---|---|
| `sharp` `<0.35.0` | Inherited libvips CVEs: **CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591** | Powers `next/image` optimisation |
| `postcss` (nested under `next`) | **GHSA-fxqj-rqcc-2cmp**, **GHSA-r28c-9q8g-f849** — path traversal via `sourceMappingURL` → arbitrary `.map` disclosure | Build-time |

`npm audit` reports the fix requires **`next@16.3.3`**; the project pins `16.2.10`.

**Assessment:** `postcss` is build-time only, so exploitation requires attacker-controlled build input — not applicable here. `sharp` runs in the image optimiser at request time, but `next/image` only serves same-origin local images with no remote patterns configured, which sharply limits the attack surface. **Real-world risk: low. Remediation cost: one minor version bump.** The reputational cost of a public repo with 4 high-severity production advisories is the larger issue.

### 9.3 CSP is architecturally constrained — **CONFIRMED**

Two inline `<script type="application/ld+json">` blocks exist (`src/app/page.tsx:26-29`, `src/app/faq/page.tsx:41-44`), both using `dangerouslySetInnerHTML` with `JSON.stringify`.

Two distinct issues:

1. **Escaping (latent).** `JSON.stringify` does not escape `<`, `>`, or `&`. Content is authored in-repo and trusted today, so there is no live XSS. But if any FAQ answer or project field ever contained `</script>`, it would break out of the script context. This is a latent hazard, not a current vulnerability.
2. **CSP compatibility (structural).** Per §5.3, nonces require dynamic rendering. Since every route is static, a nonce-based strict CSP would force the entire site dynamic. The viable static-compatible options are: (a) SHA-256 hash-based `script-src` covering both JSON-LD blocks plus Next.js's own bootstrap scripts, (b) moving JSON-LD out of inline scripts, or (c) a CSP that omits `script-src` while still setting the other directives. **Option (c) delivers most of the value at near-zero risk** and is the recommended starting point.

### 9.4 External link handling — **CONFIRMED**

Three locations use `target="_blank" rel="noreferrer"` without `noopener`:

- `src/components/layout/footer.tsx:86-87`
- `src/components/ui/button.tsx:60-61`
- `src/components/work/project-card.tsx:67-68`

All modern browsers imply `noopener` when `target="_blank"` is present, so **actual risk is negligible**. It is flagged because it is a two-character fix that reviewers explicitly look for.

### 9.5 Confirmed clean

No secrets, no `.env` files, no `process.env` usage, no third-party scripts, no iframes, no analytics, no user input, no authentication, no cookies, no API routes, no server actions. **The application attack surface is genuinely minimal.**

---

## 10. Marketplace Safety Findings

### 10.1 On-site compliance: clean — **CONFIRMED**

A scan of `src/`, `public/`, `README.md`, and `LAUNCH-CHECKLIST.md` found **zero** instances of email addresses, `mailto:`, phone numbers, `tel:`, WhatsApp, `wa.me`, Telegram, `t.me`, Calendly, `cal.com`, Discord, Skype, or Zoom links.

Additional verified positives:

- No contact form exists anywhere.
- No Upwork/Fiverr/Freelancer **logos** are used (avoiding trademark issues).
- No text encourages off-platform communication; `/faq` explicitly refuses off-platform payment.
- Empty-href socials are filtered before render (`footer.tsx:34`), so no broken or placeholder profile links leak.

**On its own terms, this site is safe to attach to an Upwork, Fiverr, or Freelancer profile today.**

### 10.2 The complete external link inventory — **CONFIRMED**

Only three external destinations exist in the entire codebase:

| URL | Location | Risk |
|---|---|---|
| `https://github.com/aboychandradas` | `site.ts:46` (footer) | **Low** — universally accepted work evidence |
| `https://github.com/aboychandradas/aboy-portfolio` | `site.ts:26` (`/about`) | **Low** |
| `https://www.linkedin.com/in/aboy-chandra-das` | `site.ts:51` (footer) | **See §10.3** |

### 10.3 Two second-order exposure paths — **ASSESSMENT**

Neither is an on-site violation. Both are worth a deliberate decision.

**(a) LinkedIn.** LinkedIn supports direct messaging, so linking a profile creates a one-click off-platform contact channel. Marketplaces generally tolerate LinkedIn on a portfolio as professional context, and Upwork is more permissive here than Fiverr. Fiverr's rules around anything routing a buyer off-platform are the stricter of the two. This is a judgment call the site owner should make consciously — for example, keeping LinkedIn but omitting it from the Fiverr-facing link, rather than discovering the rule later.

**(b) The GitHub profile as a transitive surface.** The footer links to the GitHub profile, which lists `avoy-portfolio` — a second public portfolio described as containing a **Supabase contact form** (§8.3). Path: this site → GitHub profile → `avoy-portfolio` → deployed contact form. That is three clicks to a direct contact channel that this site deliberately refuses to provide.

This does not violate any marketplace rule and no reviewer is likely to follow it. But the effort invested in on-site compliance is undercut if the adjacent public surface contradicts it. Worth resolving deliberately — by archiving, renaming, or clarifying which portfolio is current.

### 10.4 Pre-existing awareness

`LAUNCH-CHECKLIST.md` §5 already encodes the correct marketplace checks, including *"GitHub profile email set to private if you want zero indirect contact paths"* — which anticipates §10.3(b). The checklist is sound; it was never executed.

---

## 11. Accessibility Findings

Reviewed against **WCAG 2.2 AA practices**. This section does **not** assert conformance — no formal audit, assistive-technology testing, or automated scan was performed, and no such claim should be made anywhere on the site.

### 11.1 Colour contrast — **CONFIRMED by computation**

Palette values from `src/app/globals.css:3-25`, converted OKLCH → sRGB → WCAG relative luminance:

| Token pair | Resolved | Ratio | AA normal (4.5) |
|---|---|---|---|
| `foreground` / `background` | `#eff0f3` on `#090a0d` | **17.36** | Pass |
| `foreground` / `surface` | `#eff0f3` on `#0f1015` | **16.64** | Pass |
| `muted` / `background` | `#9fa1aa` on `#090a0d` | **7.68** | Pass |
| `muted` / `surface` | `#9fa1aa` on `#0f1015` | **7.36** | Pass |
| **`faint` / `background`** | `#6c6e77` on `#090a0d` | **3.90** | **FAIL** |
| **`faint` / `surface`** | `#6c6e77` on `#0f1015` | **3.74** | **FAIL** |
| `brand-bright` / `background` | `#808aff` on `#090a0d` | **6.61** | Pass |
| `brand-foreground` / `brand` | `#f7f8fc` on `#5959e8` | **4.92** | Pass |
| `ring` / `background` | `#808aff` on `#090a0d` | **6.61** | Pass |

**`--color-faint` fails AA for normal-size text.** It appears **30 times**, of which roughly **22 are non-decorative text at 9px–14px** — all below the 18.66px large-text threshold, so all require 4.5:1.

Affected, non-exhaustive: section eyebrow labels (`services/page.tsx:59`, `footer.tsx:25`, `tech-stack-grid.tsx:12`, `work/[slug]/page.tsx:233,250,271`), the "At a glance" definition terms (`work/[slug]/page.tsx:242`), metric labels at 9-10px (`work/[slug]/page.tsx:259`, `project-card.tsx:41`), `metricsNote` (`work/[slug]/page.tsx:265`), the About profile card `dt` elements (`about/page.tsx:230-246`), the footer marketplace note and copyright (`footer.tsx:46,99`), and the `/start` closing note (`start/page.tsx:263`).

Note that `metricsNote` — the text that qualifies the site's only numeric claims — is among the hardest text on the site to read. That is an accessibility failure and a trust problem simultaneously.

Border tokens measure 1.24:1 and 1.55:1, which is acceptable for decorative separators but means card boundaries rely on very low contrast.

### 11.2 Heading hierarchy — **CONFIRMED** (extracted from built HTML)

| Route | Heading sequence | Issue |
|---|---|---|
| `/` | `h1 → h3 h3 h3 → h2 …` | **Skipped level** |
| `/work` | `h1 h2 h2 h2 h2` | Correct |
| `/about` | `h1 h2 h3×6 h2 h3×3 h2` | Correct |
| `/services` | `h1 h2×5` | Correct |
| `/process` | `h1 h2×7 h3×5 h2 h3×5 h2` | Flattened outline |
| `/faq` | `h1 h2` only | 8 questions not exposed as headings |
| `/start` | `h1 h2 h2 h2 h2 h3…` | Flattened outline |
| `/work/[slug]` | `h1 h2×4 h3×6 h2×5 h3 h3 h2` | Correct |

Every page has **exactly one `<h1>`** — verified across all 8 routes.

- **Homepage skip (`h1` → `h3`):** `src/components/home/trust-badges.tsx:59` emits three `<h3>` elements in a section with no `<h2>`. This is a genuine WCAG 1.3.1 heading-order violation.
- **`/start` and `/process` flattening:** card titles use `<h2>` (`start/page.tsx:144`; process step titles) at the same level as major section headings, so the outline cannot distinguish sections from items. Not a strict violation; inconsistent with the `<h3>`-for-cards convention every other page follows.
- **`/faq`:** eight questions live in `<summary>` elements. Valid disclosure semantics, but screen-reader users cannot navigate between questions by heading — and the `FAQPage` JSON-LD advertises 8 questions the DOM exposes as none.

### 11.3 Mobile menu keyboard and focus handling — **CONFIRMED**

`src/components/layout/navbar.tsx:63-101` opens a full-width menu that lacks:

- **Escape-to-close** — no `keydown` handler
- **Focus trap** — Tab moves into the page behind the open menu
- **Focus restoration** — focus is not returned to the trigger on close
- **Outside-click / overlay dismissal**
- **Background inerting** — content behind stays focusable and readable by assistive tech
- **Body scroll lock**

Links do call `closeMenu` on click (line 78), so the primary path works. The gaps affect keyboard and screen-reader users specifically.

### 11.4 The "coming soon" placeholder is not accessible — **CONFIRMED**

`src/app/work/[slug]/page.tsx:69-78`:

```tsx
<span aria-disabled="true" title="Demo link coming soon" className={…}>
  Live demo · coming soon
</span>
```

`aria-disabled` on a non-interactive `<span>` conveys nothing (there is no widget role to disable), and `title` is unavailable to keyboard and touch users. The visible text does carry the meaning, so the impact is minor — but the ARIA is decorative rather than functional. This element disappears entirely once real URLs are added (P0-002).

### 11.5 Motion handling is incomplete — **CONFIRMED**

- `src/components/motion/reveal.tsx:19` — `useReducedMotion()` zeroes the `y` offset but **the opacity fade still runs**.
- `src/components/home/hero.tsx:24` — `animate-pulse` on the availability dot has **no `motion-safe:` prefix**, so it animates continuously regardless of user preference.
- `src/components/layout/navbar.tsx:63-72` — the `AnimatePresence` height animation **ignores reduced-motion entirely**.

`README.md` states the animations *"respect reduced-motion preferences."* That is partially inaccurate as written.

### 11.6 Touch target sizes — **ASSESSMENT**

WCAG 2.2 SC 2.5.8 (AA) requires 24×24 CSS px minimum.

- Mobile nav links: `px-3 py-2.5` at 15px → **~42px**. Pass.
- Hamburger button: `h-10 w-10` → **40px**. Pass.
- **Footer links and inline text links** (`text-sm` in `space-y-2.5` lists): **~20px tall**. Below 24px.

SC 2.5.8 exempts targets that are inline within a block of text. Footer navigation links arranged in a list are arguably *not* covered by that exception. Flagged as a genuine risk requiring a decision, not a confirmed failure.

### 11.7 The opacity-0 rendering also has an accessibility dimension

Per §3.4, links inside not-yet-revealed `Reveal` blocks are **focusable while invisible**. A keyboard user tabbing quickly, or any user whose IntersectionObserver has not fired, can move focus to an element they cannot see — implicating SC 2.4.7 (Focus Visible) and SC 2.4.11 (Focus Not Obscured). Because `opacity:0` does not remove content from the accessibility tree, screen-reader users are unaffected.

---

## 12. Responsive Design Findings

Reviewed by static analysis of Tailwind class usage and container arithmetic. **No live device or emulator testing was performed** — findings below are analytical, and the low-risk assessments are predictions, not verified results.

`Container` (`src/components/ui/container.tsx:11`): `mx-auto w-full max-w-6xl px-5 sm:px-8`.

### 12.1 Breakpoint-by-breakpoint assessment

| Width | Assessment | Notes |
|---|---|---|
| **320px** | **Low risk** | 280px content. Longest hero word ("spreadsheets") at `text-4xl`/36px ≈ 228px — fits. `text-balance` assists. |
| **375px** | **Low risk** | 335px content; comfortable. |
| **430px** | **Low risk** | Single-column throughout. |
| **768px** | **Moderate — footer** | 4-column footer grid engages (see §12.2). Nav is still hamburger. |
| **1024px** | **Low risk** | Desktop nav engages exactly at `lg`. Case-study sidebar activates. |
| **1280px** | **Low risk** | Below `max-w-6xl` (1152px) cap — centred. |
| **1440px+** | **Low risk** | Container caps; decorative orbs clipped by `overflow-hidden`. |

### 12.2 Footer grid is cramped at 768px — **ASSESSMENT**

`src/components/layout/footer.tsx:39` — `grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]`.

At 768px: 704px inner, minus 120px of gaps = 584px across 4.4fr → **~133px per standard column**. Service titles rendered there include "Business Dashboard Development" and "CRM & Lead Management Systems" (~30 characters at `text-sm`). These will wrap to 3+ lines. Text wrapping means **no horizontal overflow**, but the column becomes visually dense. Worth checking on a real tablet.

### 12.3 Decorative overflow is correctly contained — **CONFIRMED**

`w-168` (672px) in `hero.tsx:17` and `w-160` (640px) in `work/[slug]/page.tsx:169` both exceed narrow viewports, but each sits inside a parent carrying `relative overflow-hidden`. **No horizontal overflow results.**

### 12.4 Grid definitions are correctly written — **CONFIRMED**

`about/page.tsx:115` and `work/[slug]/page.tsx:229` both use `minmax(0,1fr)` rather than bare `1fr`, correctly preventing the classic CSS Grid blowout where long content forces a track wider than its container. This is a detail commonly missed.

### 12.5 No horizontal scroll containers exist — **CONFIRMED**

A grep for `overflow-x-auto`, `overflow-auto`, and `overflow-scroll` across `src/` returned **no matches**. Not a defect today (the site has no data tables), but it is a structural gap: the moment a real dashboard screenshot, wide table, or code block is added — all of which the roadmap anticipates — there is no established pattern to contain it.

### 12.6 Navigation breakpoint — **ASSESSMENT**

The hamburger persists to `lg` (1024px), so 768–1023px tablets get a mobile menu despite ample width for 5 nav items plus a CTA. A defensible choice, not a defect.

---

## 13. Performance Findings

All figures measured from a local production build (`npx next build`).

### 13.1 Measured payload

| Metric | Value |
|---|---|
| Total client JS emitted | **806.1 KB raw** across 13 chunks |
| **Homepage client JS** | **802.1 KB raw / 244.6 KB gzip** |
| framer-motion chunk | **137.3 KB raw / 45.4 KB gzip** |
| Homepage HTML | **235.6 KB raw / 43.8 KB gzip** |
| Font payload | **356.8 KB across 18 `.woff2` files** |
| Live homepage transfer (brotli) | **29,788 bytes** (verified via `curl`, 2026-08-30) |

Per-route built HTML: `/index` 235.6 KB · `/work` 109.9 KB · `/services` 83.0 KB · `/about` 72.7 KB · `/process` 72.6 KB · `/start` 68.6 KB · `/faq` 60.3 KB (raw).

### 13.2 The homepage loads essentially the entire application bundle — **CONFIRMED**

802.1 KB of the 806.1 KB total is requested by the homepage — **code splitting delivers almost no benefit**. The cause is structural: `Reveal` is a client component used by nearly every section of every page, so framer-motion and the surrounding client tree land in the shared chunk that every route loads.

**244.6 KB gzip of JavaScript for a static brochure site with no interactivity beyond a mobile menu toggle** is the headline number. The site's only genuinely interactive elements are the navbar menu and native `<details>` accordions.

### 13.3 Render-blocking content reveal — **CONFIRMED**

Per §3.4: the LCP element cannot paint until framer-motion loads, React hydrates, and an IntersectionObserver fires. On a slow connection this produces a blank-then-pop sequence rather than progressive rendering. This is the single largest Core Web Vitals risk in the codebase, and it originates from one 27-line file (`src/components/motion/reveal.tsx`).

### 13.4 Three font families — **CONFIRMED**

`src/app/layout.tsx:8-21` loads Inter, Geist, and Geist Mono. All three are genuinely referenced in `globals.css:42-46` (`--font-sans`, `--font-heading`, `--font-mono`), so none is dead — but 18 `.woff2` files totalling 356.8 KB is heavy. Inter and Geist are visually close enough that the distinction between body and heading faces does limited work.

### 13.5 Above-the-fold logo is lazy-loaded — **CONFIRMED**

The built HTML shows the navbar brand logo as:

```html
<img alt="" loading="lazy" width="32" height="32" …>
```

`src/components/layout/brand-logo.tsx:29-35` omits `priority`. The logo appears in the sticky header on **every page**, always above the fold. Lazy-loading it delays the first meaningful paint of the header. The About page correctly passes `priority` to `ProfilePhoto`; the homepage instance does not.

### 13.6 Oversized source image — **CONFIRMED**

`public/aboy-profile.jpg` is **199,565 bytes**. It renders at 80×80 on the homepage (`sizes="80px"`) and ~240px on `/about`. `next/image` generates appropriately sized variants at build time, so **runtime impact is minimal** — but the source is heavier than any consumer needs.

### 13.7 Confirmed performance strengths

- **Every route is statically prerendered** — no server work at request time.
- `next/font` self-hosts fonts, eliminating a third-party connection and FOUT.
- Product visuals are pure CSS (`dashboard-mock.tsx`, `motif-preview.tsx`) — zero image bytes.
- No third-party scripts, no analytics, no tag manager.
- `next/image` used consistently for all raster images.

---

## 14. SEO Findings

### 14.1 Correctly implemented — **CONFIRMED from built HTML**

- **Per-page canonicals on all 8 routes**, each self-referencing (§2.5).
- Title template `%s — Aboy Systems` with per-page overrides.
- Unique, well-written meta descriptions per route.
- `metadataBase` set, enabling relative metadata resolution.
- `robots` directives with `googleBot` `max-image-preview: large` and `max-snippet: -1`.
- `sitemap.xml` — 10 URLs including all three case studies.
- `robots.txt` — correct `Allow` plus sitemap reference.
- One `<h1>` per page; `<html lang="en">`; correct viewport.
- Clean internal linking; no orphan pages (`/start` is in the sitemap and linked from multiple CTAs).

### 14.2 No Open Graph or Twitter image exists — **CONFIRMED**

A grep for `og:image` across the built HTML returned **zero matches** on every route. Twitter metadata is `summary` (the small card) with no `twitter:image`.

Every share of this URL — LinkedIn posts, Upwork/Fiverr profile links, Slack, WhatsApp, iMessage — renders as **a bare text card with no image**. For a portfolio whose stated distribution channel includes LinkedIn, and whose selling point is visual/product craft, this is the highest-leverage SEO and conversion gap on the site. Next.js supports file-based `opengraph-image` conventions in the App Router, so this is a low-effort fix.

### 14.3 Structured data is thin — **CONFIRMED**

| Schema | Present? | Location |
|---|---|---|
| `Person` | Yes | `src/app/page.tsx:11-21` |
| `FAQPage` | Yes | `src/app/faq/page.tsx:28-36` |
| `Organization` / `ProfessionalService` | **No** | — |
| `Service` (for `/services`) | **No** | — |
| `BreadcrumbList` (case studies) | **No** | — |
| `CreativeWork` / `SoftwareApplication` | **No** | — |
| `WebSite` | **No** | — |

The `Person` schema's `sameAs` correctly emits only the two populated profiles (GitHub, LinkedIn) — empty entries are filtered. For a business selling services, `Service` and `BreadcrumbList` are the most valuable additions.

### 14.4 Uniform `lastmod` in the sitemap — **CONFIRMED**

`src/app/sitemap.ts:6` computes `new Date()` once at build time and applies it to all 10 URLs (observed: `2026-08-29T22:48:32.543Z`). Every page therefore claims to have changed on every deploy. Search engines discount `lastmod` when all URLs share a build timestamp, so the signal is wasted rather than harmful.

### 14.5 Indexability

`robots.index: true` is correct — nothing is unintentionally blocked, and no `noindex` appears anywhere. No staging or preview URLs are referenced in the metadata.

---

## 15. GitHub / Engineering Proof Findings

### 15.1 Inventory of this repository — **CONFIRMED by filesystem check**

| Artifact | Present? |
|---|---|
| `.github/workflows/` (CI) | **No** |
| `.github/dependabot.yml` | **No** |
| `.github/ISSUE_TEMPLATE/` | **No** |
| `.github/PULL_REQUEST_TEMPLATE.md` | **No** |
| `SECURITY.md` | **No** |
| `CHANGELOG.md` | **No** |
| `CONTRIBUTING.md` | **No** |
| `LICENSE` | **No** |
| `docs/` | **No** (created by this audit) |
| Tests (`tests/`, `__tests__/`, any runner config) | **No** |
| `.prettierrc` / `.editorconfig` / `.nvmrc` | **No** |
| `README.md` | **Yes** — genuinely good |
| `LAUNCH-CHECKLIST.md` | **Yes** — thorough, entirely unchecked |
| `AGENTS.md` / `CLAUDE.md` | **Yes** |

`package.json` scripts: `dev`, `build`, `start`, `lint`. **No `typecheck` script**, no `test` script. The `lint` script is bare `eslint` with no explicit target or `--max-warnings 0`.

### 15.2 Project repositories — **CONFIRMED**

| Repository | Public | Commits | Tests | CI | LICENSE | Live demo |
|---|---|---|---|---|---|---|
| `aboy-portfolio` | Yes | 15 | No | No | No | `aboysystems.com` |
| `fieldops-analytics-os` | Yes | 23 | No | No | **MIT** | `…streamlit.app` |
| `servicepro-lead-engine` | Yes | 8 | No | No | No | `…vercel.app` |
| `clientflow-os` | Yes | **3** | No | No | No | None |
| *(shoppulse)* | **Does not exist** | — | — | — | — | — |

**No repository on the account has tests or CI.**

### 15.3 The credibility gap this creates — **ASSESSMENT**

The site makes engineering-discipline claims in several places:

| Claim | Location |
|---|---|
| "Test checklists — Features ship against a checklist you can read" | `src/data/process.ts:92-95` |
| "Aggregation logic belongs in one **tested** layer" | `src/data/projects.ts:296` |
| "Type-safe, production-minded code" | `trust-badges.tsx:10-13` |
| "GitHub from day one… you can watch progress, not just trust it" | `src/data/process.ts:81-84` |
| "Documented on GitHub — Readable commits and written notes" | `about/page.tsx` build principles |

These are process *offers* about future client work, which is legitimate. But a technical evaluator will check the public repositories for evidence of the habits being sold and will find no tests, no CI, and one project whose README is still the Next.js starter template.

**Important distinction:** the site does **not** currently claim that this repository has tests or CI. That restraint is correct and must be preserved — no roadmap item should add such a claim before the artifact exists.

### 15.4 The cheapest credibility win available — **ASSESSMENT**

This repository already passes `tsc --noEmit`, `eslint`, and `next build` cleanly. A single CI workflow running those three commands would convert an existing, verified fact into a **public green check on every commit** — visible to anyone evaluating the work, at essentially zero engineering cost and with no new claims required.

### 15.5 Branch hygiene

Seven phase branches (`phase-2-case-studies` … `phase-7-ui-ux-polish`) plus `main` and `portfolio-v2-engineering` exist locally and on the remote. Linear history, descriptive commit messages, no merge noise. There is no PR-based workflow evident — branches appear to be pushed and merged directly.

---

## 16. Technical Debt

Ordered by remediation cost relative to benefit.

### 16.1 Data-integrity debt — *highest cost of inaction*

`src/data/projects.ts` carries unresolved TODOs (lines 7, 306, 314) that were shipped to production. The file's own honesty rules are violated by its contents (§7.3). This is the debt that actively damages the portfolio every day it stays live.

### 16.2 Rendering-strategy debt

One 27-line file (`src/components/motion/reveal.tsx`) determines that all content ships hidden, that framer-motion loads on every route, and that code splitting is ineffective (§13.2). It is simultaneously the largest performance, progressive-enhancement, and reliability liability — and the smallest file responsible for any of them.

### 16.3 Content-location debt

Copy is split between `src/data/` and hard-coded component constants (§4.2), with `README.md` documenting a convention the code does not follow. The homepage/`/process` step divergence (§4.1) is the first substantive inconsistency this has produced; it will not be the last.

### 16.4 Configuration debt

`next.config.ts` is empty. Two conflicting manifests serve one URL (§5.2). No toolchain pinning (`.nvmrc`, `.editorconfig`, formatter). No `typecheck` script despite type-checking being a selling point.

### 16.5 Dependency debt

`next@16.2.10` with 6 high-severity advisories resolvable by a minor bump (§9.2). Unused `zod` in production dependencies (§4.3). Seven dead `public/` assets (§4.8).

### 16.6 Duplication debt

Duplicated `serviceIcons` map, three CTA implementations, two process-step sources, `Section` used by half the codebase (§4.1, §4.5). Individually trivial; collectively they mean a copy change requires knowing which of two places to edit.

### 16.7 Documentation debt

`README.md` contains two inaccurate statements (content location, reduced-motion support). `LAUNCH-CHECKLIST.md` is complete and correct but entirely unchecked while the site is live. Stale comments in `manifest.ts` (§4.7).

---

## 17. Recommended Final Portfolio Architecture

Recommendations only — nothing below has been implemented.

### 17.1 Guiding principle

> **Show fewer projects, and make every one of them verifiable.**

The current structure inverts this: three projects, of which one has no code, one has three commits, and one is misdescribed — while four real, deployed projects sit unmentioned. The fix is reallocation, not construction.

### 17.2 Recommended project portfolio

| Slot | Project | Proposed status | Why |
|---|---|---|---|
| **1** | **ServicePro Lead Engine** | `proof` — deployed, linked | Live, on-stack (Next.js/TS/Tailwind/Supabase/Zod), real features. The strongest asset available. |
| **2** | **FieldOps Analytics OS** | `proof` — deployed, linked, **stack corrected to Python/Streamlit/SQLite** | Genuinely deployed, MIT-licensed, 23 commits. Corrected, it demonstrates range: SQL and data modelling alongside product work. |
| **3** | **ClientFlow OS** | `roadmap` — repo linked, "in progress" | Honest as a roadmap *if* the repo is linked so a reader can calibrate against 3 commits. |
| **4** *(optional)* | `business-expense-sales-dashboard` | `proof` or supporting | Directly evidences the `/faq` claim about CSV/Excel dashboards. |
| **Remove or defer** | **ShopPulse Analytics OS** | — | A featured slot should not hold a spec with no code. Retain as a written roadmap page if desired, but not in a featured position ahead of deployed work. |

Presenting FieldOps accurately as a Python/Streamlit analytics build is **strictly stronger** than presenting it inaccurately as a Next.js build — it is real, it is checkable, and it widens the demonstrated skill set rather than narrowing it.

### 17.3 Recommended proof model per case study

Each case study should carry at least three of:

1. A working **live demo** link
2. A working **source repository** link
3. At least one **real screenshot** of the running application (`image` is already supported and currently `null` on all three)
4. A short **architecture note** — data model, key decision, one trade-off
5. An explicit **limitations** section (extends the existing `honestyNote()` pattern)
6. Accurate `metricsNote` qualification **on cards as well as detail pages**

### 17.4 Recommended technical architecture

| Layer | Recommendation |
|---|---|
| **Rendering** | Keep fully static. Do not adopt nonce-based CSP (§5.3). |
| **Animation** | Make `Reveal` progressive — content visible by default, animation as enhancement. Never prerender content at `opacity:0`. |
| **Content** | Move all remaining hard-coded copy into `src/data/`, matching the documented convention. Single source for process steps. |
| **Security headers** | `headers()` in `next.config.ts` — `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`, strengthened HSTS, `poweredByHeader: false`. CSP without `script-src` first; hash-based `script-src` later. |
| **Dependencies** | Bump `next` to clear the 6 advisories. Remove unused `zod`. |
| **Design tokens** | Raise `--faint` lightness until it clears 4.5:1 on both `--background` and `--surface`. |
| **Engineering proof** | CI running the three checks that already pass, plus `LICENSE`, `SECURITY.md`, `CHANGELOG.md`, Dependabot. |
| **Social preview** | Add an `opengraph-image` (App Router file convention). |

### 17.5 Recommended repository structure

```
.github/
  workflows/ci.yml          # lint + typecheck + build (all three already pass)
  dependabot.yml
  PULL_REQUEST_TEMPLATE.md
docs/
  audit/                    # this audit
  ARCHITECTURE.md
  DEPLOYMENT.md
  DECISIONS.md              # e.g. why static, why no CSP nonce, why no contact form
LICENSE
SECURITY.md
CHANGELOG.md
src/
  data/                     # ALL copy, no exceptions
  components/
  app/
```

`docs/DECISIONS.md` deserves particular emphasis: the reasoning behind the marketplace-safety constraint, the fully-static choice, and the nonce/CSP trade-off is exactly the engineering judgment this portfolio is trying to demonstrate — and it is currently visible only as code comments.

### 17.6 What must not change

1. **The marketplace-safety constraint** — no email, phone, WhatsApp, Telegram, Calendly, or contact form. Keep the `site.ts` comment block.
2. **The absence of invented clients, testimonials, revenue, and user counts.**
3. **The `proof` / `roadmap` type distinction and `honestyNote()`.**
4. **The "I'm at the start of my freelance career" candour on `/about`.**
5. **Zero third-party trackers.**
6. **Per-page canonicals and single-`h1` discipline.**

---

## Appendix A — Verification Commands

Every confirmed finding is reproducible:

```bash
npx tsc --noEmit                     # exit 0
npx eslint .                         # exit 0
npx next build                       # 17 routes, all static
npm audit                            # 6 high severity

# Content ships hidden
grep -c 'opacity:0' .next/server/app/index.html          # 37

# No social preview image
grep -o 'og:image' .next/server/app/index.html           # (empty)

# Canonicals are correct
grep -o '<link rel="canonical" href="[^"]*"' .next/server/app/*.html

# Heading order
grep -oE '<h[1-6][ >]' .next/server/app/index.html

# Homepage JS weight
grep -o 'src="/_next/static/chunks/[^"]*"' .next/server/app/index.html | sort -u

# zod is never imported
grep -rn 'from "zod"' src                                 # (empty)

# No contact methods
grep -rniE "mailto:|tel:|whatsapp|telegram|calendly" src public
```

## Appendix B — Evidence Sources

| Source | Method |
|---|---|
| Repository files | Direct read, `d:\fsd-project\aboy-portfolio` |
| Build output | `npx next build` → `.next/server/app/*.html` |
| Bundle sizes | `stat` + `gzip -c9` on emitted chunks |
| Contrast ratios | OKLCH → sRGB → WCAG relative luminance, computed from `globals.css` tokens |
| Dependency advisories | `npm audit` |
| Framework behaviour | `node_modules/next/dist/docs/` (version-specific, per `AGENTS.md`) |
| GitHub repositories | Public page fetch, `github.com/aboychandradas`, 2026-08-30 |
| Live deployment | `curl -I` + page fetch, `https://aboysystems.com/`, 2026-08-30 |

---

*Audit performed read-only. No production code, configuration, or assets were modified. Remediation is specified in `PORTFOLIO-ROADMAP.md`.*
