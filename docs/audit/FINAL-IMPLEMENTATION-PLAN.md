# Aboy Systems Final Implementation Plan

**Created:** 2026-09-01
**Branch:** `portfolio-v2-engineering`
**Supersedes as the operative plan:** `PORTFOLIO-ROADMAP.md`
**Evidence base:** `PORTFOLIO-AUDIT.md` (Claude, 2026-08-30→09-01) · `CODEX-SECOND-REVIEW.md` (Codex, 2026-09-01) · independent re-verification performed for this document on 2026-09-01

**Status:** Planning only. Nothing here has been implemented. No production code, configuration, or asset was modified in producing this document.

---

## Method note

Every disagreement between the two prior reviews was re-checked against the repository, the existing build artifacts in `.next/`, `npm audit`, and the public GitHub and deployment surfaces. Where a prior conclusion did not survive that check it was rejected, regardless of which review produced it. Contrast ratios were recomputed from the OKLCH tokens rather than carried over. Three findings in this document are new — they came out of the re-verification and appear in neither prior review; they are marked **NEW**.

**Standing constraints — these override anything below that appears to conflict:**

1. Do not invent clients, testimonials, revenue, users, performance results, or metrics.
2. Do not represent self-initiated work as paid client work.
3. Do not add email, phone, WhatsApp, Telegram, Calendly, or a contact form to this site.
4. Do not claim tests, CI, security controls, or WCAG conformance until the artifact provably exists.
5. Prefer removing a false claim over building something to justify it.
6. Do not publish a link that has not been verified to resolve **and** verified to be contact-clean.
7. Preserve the `proof` / `roadmap` labelling, `honestyNote()`, `metricsNote`, and the "start of my freelance career" candour. These are the portfolio's differentiator.

---

## 1. Executive Decision

**Verdict: INCREMENTAL UPGRADE. Do not rebuild.**

Both prior reviews reached this conclusion independently and the repository supports it. The architecture is not the problem:

- `tsconfig.json` sets `"strict": true`; a full-tree grep for `: any`, `as any`, `@ts-ignore` returns nothing.
- Only four files carry `"use client"` — every route is a server component and every route prerenders statically.
- No `.env` files, no `process.env` in `src/`, no API routes, no server actions, no `proxy.ts`/`middleware.ts`, no third-party scripts, no analytics, no user input. The application attack surface is genuinely near-zero.
- Per-page canonicals, one `<h1>` per route, sitemap, robots, and JSON-LD are all correctly wired.
- The honesty machinery (`ProjectStatus` union, `statusLabel`, `metricsNote`, `honestyNote()`, empty-href social filtering) is well designed and working.

**What needs to change is the data those correct structures are being fed, plus four specific defects.**

The one-sentence diagnosis: **the portfolio describes its only real product as something it is not, hides the proof that would correct that, ships its content invisible, and routes a marketplace visitor one click from a published email address.** Everything else across 3,358 lines of prior audit is secondary to those four things.

A rebuild would destroy working structure to fix a data problem. The repair for the critical tier is confined to `src/data/projects.ts`, `src/data/tech-stack.ts`, `src/data/site.ts`, one 27-line motion component, and settings on the GitHub account — roughly a day of careful work, not a rewrite.

**Scale correction:** the prior roadmap listed 58 items across four priorities. This plan carries **30**, with **4** at P0. That reduction is not softening — the P0 bar applied here is stricter than either prior document used. It is the removal of unsupported findings, duplicate tasks, and infrastructure recommended for appearance rather than function.

---

## 2. Reconciliation Summary

### Claude findings accepted

| Finding | Status after re-verification |
|---|---|
| FieldOps advertises Next.js/TypeScript/Tailwind; the real project is Python/SQL/SQLite/Streamlit/Plotly | **Confirmed.** `src/data/projects.ts:282`; repo README lists Python, Faker, NumPy, pandas, SQLite, SQL, Streamlit, Plotly |
| FieldOps is badged "Deployed" while its demo renders "coming soon" | **Confirmed.** `liveUrl: null` at `projects.ts:315`; `coming soon` appears 8× in `.next/server/app/work/fieldops-analytics-os.html` |
| All `githubUrl` are null while public repositories exist | **Confirmed.** "View Source" (`work/[slug]/page.tsx:80-90`) never renders on any page |
| Unverified metrics shipped with their own TODO markers attached | **Confirmed.** `projects.ts:7`, `:306`, `:314` |
| All page content prerenders at `opacity:0` | **Confirmed, and worse than stated.** The homepage `<h1>` sits literally inside `<div style="opacity:0;transform:translateY(20px)">`. 10 of 12 prerendered HTML files affected; 37 occurrences on the homepage |
| `useReducedMotion()` only zeroes `y`; the opacity fade still runs | **Confirmed.** `reveal.tsx:19` |
| `--faint` fails WCAG AA | **Confirmed by independent recomputation.** 3.90 / 3.74 / 3.50 against background / surface / surface-raised. The audit's figures were exactly right |
| The site promises verifiability in at least four places and delivers none | **Confirmed.** `work/page.tsx:41`, `about/page.tsx`, `process.ts:82-84` |
| ShopPulse has no public implementation | **Confirmed.** All 12 public repos enumerated; none matches `shoppulse*` |
| ClientFlow is a 3-commit repo with a default Create Next App README | **Confirmed** |
| ServicePro Lead Engine exists, is deployed, and is on-stack | **Confirmed.** Next/React/TS/Tailwind/Supabase/Zod, live on Vercel |
| No Open Graph or Twitter image | **Confirmed.** `layout.tsx` declares `openGraph`/`twitter` objects with no `images` key; no file-convention asset exists |
| `zod@4.4.3` declared and never imported | **Confirmed** |
| Two conflicting web manifests | **Confirmed.** `public/manifest.webmanifest` vs `src/app/manifest.ts` |
| No CI, no tests, no `typecheck` script, bare `lint` | **Confirmed.** `package.json` scripts are `dev`/`build`/`start`/`lint` only |
| Homepage promises a weekly preview cadence absent from `/process` | **Confirmed.** `process-preview.tsx:23` vs the six steps in `process.ts` |
| Nonce-based CSP is incompatible with full static rendering | **Confirmed** against `node_modules/next/dist/docs/`. Decisive — see §7 |
| Duplicated `serviceIcons`, three CTA implementations, `Section` used inconsistently | **Confirmed**, and correctly rated low |
| Dead `public/` assets | **Confirmed.** 6 files unreferenced, plus an orphaned 61 KB maskable icon |
| README misstates content location and reduced-motion support | **Confirmed** |

### Claude findings rejected

| Finding | Why rejected |
|---|---|
| §10.1 — "safe to attach to an Upwork, Fiverr, or Freelancer profile today" | **Wrong.** `github.com/aboychandradas` publishes `dasavoy828@gmail.com` in its profile README *and* profile sidebar. The footer links straight there. Codex was right |
| P0-006 — add ServicePro immediately, with its live URL, as the lead proof item | **Wrong, and actively harmful.** The live demo carries `hello@servicepro.app`, a working `/contact` form, a "Talk to me directly" CTA, and the byline "Portfolio demo by **Avoy** Chandra Das". Executing this P0 would have broken the site's own hard constraint |
| P1-018 — `rel="noreferrer"` needs `noopener` added | **Not a defect.** `noreferrer` implies `noopener` per the HTML spec. Not a security fix |
| P1-016 — mobile menu needs focus trap, `inert`, body scroll lock, outside-click dismissal | **Wrong pattern.** `navbar.tsx:63-101` is an in-flow disclosure inside `<header>`, not a modal dialog. It has `aria-expanded`, `aria-controls`, a state-dependent label, and DOM-order links. Modal machinery would add state and failure modes for no benefit |
| P2-007 — `/start` is absent from primary navigation | **Factually wrong.** `site.ts:41` defines it as `cta.secondary`; `navbar.tsx:46-48` renders it on desktop and `:90-97` on mobile. It is in the nav, just not in the `nav` array |
| §6.6 — "PDF reports" has no repository evidence | **Wrong.** `business-expense-sales-dashboard` is publicly described as producing "Excel and PDF report exports". The real defect is the *universal* framing, not absent evidence |
| §3.4 / §13.2 — `Reveal` "pulls nearly all page content into the client tree" | **Mechanism wrong, outcome right.** Server children passed to a client component are server-rendered and handed over as props; they are not compiled into the client bundle. The payload, hydration, and hidden-content problems are all real — the stated cause is not |
| §11.2 — the homepage `h1`→`h3` skip is "a genuine WCAG 1.3.1 violation" | **Overstated.** A skipped numeric level is a semantic defect, not proof of nonconformance without assistive-technology testing. Fix it; do not label it a violation |
| §12.2 / §11.6 — footer cramped at 768px; footer links fail target size | **Not findings.** The audit states plainly that no device or emulator testing was done. These are QA test cases |
| §5.2 — manifest precedence "can differ between local `next start` and the deployment target" | **Speculation.** The existing build artifact deterministically contains the `manifest.ts` values. Keep the cleanup, drop the claim |
| §9.2 — "6 high severity, fix is `next@16.3.3`" | **Stale.** Today's `npm audit --omit=dev` reports 4 high-severity entries and offers `next@16.3.4` |

### Codex findings accepted

| Finding | Status after re-verification |
|---|---|
| U-01 / M-01 — the site is contact-clean locally but not marketplace-safe | **Confirmed.** The GitHub profile publishes an email; the footer links to it |
| U-02 / M-02 — ServicePro's live demo is not a safe drop-in link | **Confirmed.** Email, contact form, "Talk to me directly", and an off-brand byline |
| M-05 — ServicePro uses "Avoy", the portfolio uses "Aboy" | **Confirmed**, and broader than Codex found (see NEW-1) |
| M-03 — the "500+ jobs seeded" metric is *mislabelled*, not merely unverified | **Confirmed and important.** The repo fixture is 500 buyers / 1,500 providers / **10,000 work orders**. Whichever entity "500+" refers to, the label is wrong |
| M-04 — sitewide technology absolutes contradict the real project mix | **Confirmed.** `tech-stack.ts:50` "the base of every screen I build", `:56` "the framework behind every app I ship", `:158` "Deployment for every build". FieldOps is Streamlit on Streamlit Cloud |
| U-03 — the mobile menu is a disclosure, not a modal | **Confirmed** by reading `navbar.tsx` |
| U-04 — `noreferrer` already supplies opener protection | **Confirmed** |
| U-05 — `/start` is in the navbar | **Confirmed** |
| U-06 / U-07 — heading skip and `<summary>` semantics are quality issues, not established violations | **Accepted.** Correct epistemics |
| U-08 — the manifest conflict is a config ambiguity, not a demonstrated runtime failure | **Accepted** |
| U-09 — PDF and GitHub-documentation claims are over-broad, not unevidenced | **Confirmed** |
| U-10 — the client-boundary mechanism was stated imprecisely | **Confirmed** |
| U-11 — static responsive estimates are test cases, not defects | **Accepted** |
| M-06 — the advisory set has moved; re-audit on implementation day | **Confirmed.** 4 entries; `next@16.3.4` |
| Overengineering risks 1-9 | **Accepted in full.** Each is addressed in §8 |
| Priority disagreements #2-#5, #6-#20, #25-#26, #30-#31 | **Accepted** — see §3 |

### Codex findings rejected

| Finding | Why rejected |
|---|---|
| M-07 — "CLAUDE.md contains only a lone `@`" → "remove or replace meaningless instruction files" | **Factually wrong.** `od -c CLAUDE.md` shows `@AGENTS.md\n` — a valid Claude Code import directive resolving to `AGENTS.md`, which carries real Next.js-version guidance. The file is correct and must not be touched |
| M-07 — "README says OG/Twitter tags exist while the implementation is incomplete" | **Half wrong.** `layout.tsx` declares both `openGraph` and `twitter` metadata objects. README line 22 says "Open Graph/Twitter tags", which is accurate. The gap is the missing *image asset*, which the README never claims |
| Priority #21-#24, #27, #32 — promote OG image, screenshots, process cadence, deliverable wording, case-study depth, and reduced motion to P1 | **Partially rejected, on classification only.** All six are correct in substance and all are retained. But under this plan's stated definitions, conversion and presentation assets belong in P2 and accessibility fundamentals in P1. Reduced motion and contrast sit at P1 here; OG image, screenshots, and case-study depth at P2. A labelling difference, not a disagreement about value — each sits near the front of its tier |

### Merged / duplicate items

| Prior IDs | Merged into | Rationale |
|---|---|---|
| P0-001, P0-002, P0-003 (FieldOps portion), P0-007 | **P0-001** | All four are edits to the same FieldOps record in one file. One commit |
| P0-010, P2-006, plus Codex M-04 | **P0-002** | One sitewide claim-consistency pass; all are ripples of the same FieldOps correction |
| P0-008, motion half of P3-005 | **P0-003** | Both live in `reveal.tsx` |
| P2-011, Codex M-01 | **P0-004** | One marketplace contact-path closure |
| P1-005, P1-006 | **P1-001** and **P1-003** | Scripts must exist before CI can call them |
| P1-004 | **P1-002** | Replaced by one targeted data-invariant check |
| P1-014, remaining half of P3-005 | **P1-006** | One accessibility-baseline pass |
| P2-004, process half of §4.1 | **P1-007** | The duplication *is* the cause of the contradiction |
| P1-012, M-07, §4.7 | **P1-008** | One documentation-accuracy pass |
| P2-001, P2-002, P2-009 | **P2-001**, **P2-002**, **P2-007** | Kept separate because each is independently shippable, but scoped so none overlaps |
| P0-004, P0-005, P2-003 | **P2-003**, **P2-004** | Re-ranking and calibration, not truth failures |
| P1-003, §4.8 | **P3-001** | Manifest and dead assets are the same cleanup commit |
| P3-001, P3-002, P3-003, P3-004 | **P3-004** | Opportunistic dedupe, one batched item |
| P3-007, P3-008, P3-012, P3-015, §11.6, §12.2 | **P3-009** | One test-led QA checklist; promote only reproduced failures |

### Removed overengineering items

Removed outright, with reasons in §8: `SECURITY.md` · `CHANGELOG.md` · `CONTRIBUTING.md` · PR template · issue templates · branch protection · a three-document `docs/` suite (`ARCHITECTURE.md` + `DEPLOYMENT.md` + `DECISIONS.md`) · a general test framework (Vitest component tests, Playwright E2E) · Dependabot as a P1 · nonce-based CSP · HSTS `includeSubDomains`/`preload` · `Cross-Origin-Opener-Policy` · `interest-cohort` · moving all page copy into `src/data/` · `Service`/`BreadcrumbList`/`Organization` schema expansion · adding a PDF library to justify existing copy · mobile-menu modal machinery · availability-copy automation.

**Net: 58 prior roadmap items → 30 final tasks.**

---

## 3. Resolved Disagreements

### D-1 · Is the portfolio marketplace-safe today?

| | |
|---|---|
| **Claude position** | §10.1: "On its own terms, this site is safe to attach to an Upwork, Fiverr, or Freelancer profile today." The GitHub → `avoy-portfolio` → contact-form path was rated a three-click, low-likelihood second-order concern (§10.3b) |
| **Codex position** | U-01/M-01: not safe. The footer links LinkedIn and a GitHub profile that visibly publishes an email. P0 before publication |
| **Verified evidence** | `site.ts:45-54` defines GitHub and LinkedIn socials; `footer.tsx:76-93` renders both. Fetching `github.com/aboychandradas` on 2026-09-01 returns display name "Aboy C. Das" with **`dasavoy828@gmail.com` shown in the profile sidebar and repeated in the profile README** ("Email: dasavoy828@gmail.com"). The path is footer → profile → email: **one click**, not three |
| **Final decision** | **Codex is correct; the audit's assurance is withdrawn.** This is a verified policy concern, not a speculative one. The resolution is to fix the *source* rather than delete the proof: sanitize the GitHub account, keep the GitHub links, and drop LinkedIn from the footer (see §11) |
| **Final priority** | **P0** — `P0-004` |

### D-2 · Should ServicePro Lead Engine be added immediately as the lead proof item?

| | |
|---|---|
| **Claude position** | P0-006 and §17.2: ServicePro is "the strongest asset available" and its omission "the portfolio's largest self-inflicted wound"; add it at slot 1 with its live URL |
| **Codex position** | U-02/M-02/M-05: a candidate, not a safe drop-in. Gate it behind identity, contact, and claim sanitation. P1 at most |
| **Verified evidence** | Fetching `servicepro-lead-engine.vercel.app` on 2026-09-01 returns: email `hello@servicepro.app`; a `/contact` page with a form; a footer CTA reading **"Talk to me directly"**; and the byline **"Portfolio demo by Avoy Chandra Das"**. The repo README documents `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, and `NEXT_PUBLIC_DEMO_EMAIL`, and credits "Avoy Das". The dashboard displays uncaveated figures ("Total 248", "+18%", "+22%") |
| **Final decision** | **Codex is correct and the audit's recommendation must not be executed as written.** Linking this demo from a site whose stated hard constraint is "no direct contact method" would contradict that constraint at the exact moment the portfolio is trying to prove it keeps its word. The engineering evidence is real and worth having — via the **source repository first**, after the "Avoy"/"Aboy" identity is reconciled, and via the live demo only after it is sanitized |
| **Final priority** | **P2, gated** — `P2-005`. Not P0. Its absence is a missed opportunity; its careless addition would be a defect |

### D-3 · Is "Demo jobs seeded: 500+" unverified, or wrong?

| | |
|---|---|
| **Claude position** | §3.5: unverified, provenance unestablished, TODO still attached |
| **Codex position** | M-03: mislabelled, not merely unverified — the README describes 500 buyers, 1,500 providers, 10,000 work orders |
| **Verified evidence** | The FieldOps README documents a two-sided marketplace fixture: **"500 buyers", "1,500 providers", "10,000 work orders"**, plus payment records, reviews, and support tickets. The portfolio renders "Demo jobs seeded: **500+**". If "jobs" means work orders the figure is off by 20×; if it means buyers, the label names the wrong entity |
| **Final decision** | **Codex is correct, and this materially strengthens the finding.** A buyer who follows the soon-to-be-published repo link can compare both numbers in under a minute. Derive every displayed figure from the actual fixture, or remove it |
| **Final priority** | **P0**, inside `P0-001` |

### D-4 · Is the FieldOps problem only the stack?

| | |
|---|---|
| **Claude position** | §3.1/§7.3: the stack is misstated; the description differs ("job-centric dashboard" vs "marketplace finance and work-order analytics") |
| **Codex position** | §8: the *data model* is also wrong — buyers/providers/work-orders does not match the coordinator/technician story |
| **Verified evidence** | The repo describes a "field-service marketplace with two-sided transactions": buyers, providers, work orders, payments, reviews, support tickets. Dashboard sections include buyer concentration, payment delay risk, revenue by category, and a finance deep-dive. The portfolio describes a dispatch board: job status, technician workload, assignees, due dates, overdue filters, "who's free" |
| **Final decision** | **Codex is correct.** Correcting only `techStack` would leave a case study whose *entire narrative* — problem, solution, six features, business value — describes software that does not exist. The record must be rebuilt from the repository, not patched |
| **Final priority** | **P0**, inside `P0-001` |

### D-5 · Are ShopPulse's prominence and ClientFlow's tense P0 failures?

| | |
|---|---|
| **Claude position** | P0-004 and P0-005: both P0 |
| **Codex position** | Both P1. They are explicitly labelled roadmap; prominence is a conversion problem, tense a wording problem |
| **Verified evidence** | Both carry `status: "roadmap"` and `statusLabel: "Client-grade build roadmap"`. ShopPulse's overview reads "This page documents the full build specification … and will grow into a complete case study as the build ships." ClientFlow's `whatIBuilt` describes **specification artifacts** — "A complete v1 specification: 11 screens, the relational data model, and a permission matrix", "Pipeline mechanics *designed* before code", "UI direction" — not shipped features. Both `metricsNote` values read "Scope figures from the v1 build specification — not usage claims." The only real tension is the detail-page heading `"What I've built so far"` (`work/[slug]/page.tsx:325`) |
| **Final decision** | **Codex is correct, and this plan goes one step further.** These are not merely non-P0 — they are among the *better* parts of the portfolio. The labelling is honest, consistent, and machine-enforced by a type union. Promoting them to P0 would misdirect effort toward the one thing the site already does well. Re-ranking is conversion work; the heading is a wording fix |
| **Final priority** | **P2** — `P2-003` (re-ranking) and `P2-004` (ClientFlow wording). Below Codex's P1 |

### D-6 · Does `Reveal` bundle server content into the client?

| | |
|---|---|
| **Claude position** | §3.4/§13.2: it "pulls nearly all page content into the client tree", causing 802 KB of homepage JS |
| **Codex position** | U-10: mechanism imprecise. Children passed to a client component are not compiled to client modules. Payload and hydration concerns remain real |
| **Verified evidence** | Only four files carry `"use client"`: `reveal.tsx`, `navbar.tsx`, `brand-logo.tsx`, `profile-photo.tsx`. Every file under `src/app/` is a server component. `Reveal` is used 65 times across 18 files, always with server-rendered children |
| **Final decision** | **Codex is right on the mechanism; the audit is right on the consequences.** The real costs are (a) framer-motion landing in the shared chunk every route loads, (b) 65 hydrated motion islands, and (c) all content prerendered at `opacity:0`. Consequence (c) is the P0. Consequences (a) and (b) are a measurement task, not an assumption |
| **Final priority** | **P0** for visibility (`P0-003`); **P3** for payload reduction (`P3-003`), and only after measurement |

### D-7 · Is `rel="noreferrer"` without `noopener` a security defect?

| | |
|---|---|
| **Claude position** | P1-018 / §9.4: flagged, "risk is negligible", "reviewers explicitly look for it" |
| **Codex position** | U-04: not a defect. Remove the item |
| **Verified evidence** | `footer.tsx:86-87`, `button.tsx:60-61`, `project-card.tsx:67-68` all set `rel="noreferrer"`. Per the HTML specification, `noreferrer` implies `noopener` |
| **Final decision** | **Codex is correct.** Removed entirely. Adding `noopener` for readability is fine if those lines are touched anyway, but it is not a task and not a security fix |
| **Final priority** | **Removed** |

### D-8 · Does the mobile menu need modal focus management?

| | |
|---|---|
| **Claude position** | P1-016 / §11.3: needs Escape, focus trap, focus restoration, outside-click dismissal, background inerting, scroll lock |
| **Codex position** | U-03: it is an in-flow disclosure, not a modal. Modal machinery is inappropriate complexity |
| **Verified evidence** | `navbar.tsx:63-101` renders the panel *inside* `<header>`, immediately after the toggle, with `border-t` and `bg-background`. It has no `role="dialog"` and no `aria-modal`. The toggle is a native `<button>` with `aria-expanded`, `aria-controls="mobile-nav"`, and a state-dependent `aria-label`. Links call `closeMenu` on click |
| **Final decision** | **Codex is correct.** This is the ARIA disclosure-navigation pattern, correctly implemented. A focus trap on a non-modal disclosure is a defect, not a fix. One legitimate residue: the header is `sticky z-50`, so the open panel does visually overlay content — which makes **Escape-to-close** worth adding as optional polish. Nothing more |
| **Final priority** | **P3** — `P3-002`, Escape-to-close only |

### D-9 · Is `/start` missing from primary navigation?

| | |
|---|---|
| **Claude position** | P2-007 / §6.4: absent from primary nav; "a deliberate-looking choice worth revisiting" |
| **Codex position** | U-05: it is rendered as the global CTA on desktop and mobile. Remove the item |
| **Verified evidence** | `site.ts:40-42` → `cta.secondary = { label: "How to Start", href: "/start" }`. `navbar.tsx:45-49` renders it as a desktop `ButtonLink`; `navbar.tsx:90-97` renders it full-width in the mobile panel; `footer.tsx:51` appends it to the Pages column |
| **Final decision** | **Codex is correct — the audit's claim is factually wrong.** `/start` appears in the navbar at every viewport, styled as the most prominent element in it. Removed |
| **Final priority** | **Removed** |

### D-10 · Do "PDF reports" and "GitHub documentation" have no evidence?

| | |
|---|---|
| **Claude position** | §6.6: "no PDF library in `package.json`; no project mentions PDF generation; no repository evidence" |
| **Codex position** | U-09: account evidence includes a project documenting PDF report export. The defect is the universal framing |
| **Verified evidence** | `business-expense-sales-dashboard` is publicly described as "Automated CSV/Excel data cleaning and profit dashboard for small businesses with **Excel and PDF report exports**". Separately, `services/page.tsx:47-55` frames the list as "What ships with **every project**", and `clientflow-os`'s README is still starter text |
| **Final decision** | **Codex is correct.** The audit's evidence check was scoped to this repository and to `projects.ts`, which was too narrow. The genuine defect is the word "every" applied to unevenly evidenced deliverables. Fix the framing; do not add a PDF library to justify copy |
| **Final priority** | **P2** — `P2-006` |

### D-11 · Which dependency advisory state is current?

| | |
|---|---|
| **Claude position** | §9.2: 6 high severity (4 production); `sharp` and `postcss`; fix is `next@16.3.3` |
| **Codex position** | C-09/M-06: 4 high-severity entries including **direct** Next advisories; fix is `next@16.3.4`; treat the roadmap version as historical |
| **Verified evidence** | `npm audit --omit=dev` on 2026-09-01 reports **4 high-severity entries**: `nanoid`, `next` (nine advisories), `postcss`, `sharp`. Remediation offered: **`next@16.3.4`**. Applicability checked directly: no `proxy.ts`/`middleware.ts`, no `"use server"`, no `route.ts` handlers, no rewrites (`next.config.ts` is empty), no custom server, `dangerouslyAllowSVG` unset. **All nine Next advisories address features this deployment does not use** |
| **Final decision** | **Codex is correct on both the numbers and the discipline.** Patch anyway — the public advisory state on a public repo is a credibility issue and the fix is one minor bump — but state exposure accurately and re-audit on implementation day rather than trusting either document's snapshot |
| **Final priority** | **P1** — `P1-004` |

### D-12 · Do the sitewide technology absolutes need correcting?

| | |
|---|---|
| **Claude position** | Noted at §7.5 as a cross-cutting accuracy issue, but **no roadmap task was created for it** |
| **Codex position** | M-04: a missing finding, P0 — fixing only the FieldOps card leaves material sitewide contradictions |
| **Verified evidence** | `tech-stack.ts:50` "Component-based UI — **the base of every screen I build**"; `:56` "The framework behind **every app I ship**"; `:158` "Deployment for **every build** — live URLs and preview links"; `:112` "Validates **every form and import**" (while `zod` is never imported in this repo). FieldOps is a Streamlit application on Streamlit Cloud with no React and no Vercel deployment |
| **Final decision** | **Codex is correct, and this is the single most valuable thing Codex added.** The audit spotted the contradiction but did not schedule the fix, which would have left the highest-traffic page contradicting the corrected case study. These are absolute claims about *existing work* — precisely what the P0 bar covers |
| **Final priority** | **P0** — `P0-002` |

### D-13 · Should LinkedIn be removed from the footer?

| | |
|---|---|
| **Claude position** | §10.3a: a judgment call; consider keeping LinkedIn but omitting it from the Fiverr-facing link |
| **Codex position** | §10: remove the LinkedIn exit; use the strictest marketplace's rules for one shared version |
| **Verified evidence** | `site.ts:49-53` defines the LinkedIn social; `footer.tsx:76-93` renders it on every page as an external link. LinkedIn supports direct messaging. The site has exactly three external destinations: two GitHub URLs and this one |
| **Final decision** | **Codex's outcome, reached by a different route.** The audit's "one version per platform" idea is operationally fragile — a single deployed site cannot serve different link sets to different marketplaces without detection logic nobody will maintain. The deciding factor is *proof value*: GitHub links carry engineering evidence and must be preserved; LinkedIn carries none. Removing the single link with zero proof value is the least restrictive change that closes the risk. **The LinkedIn channel is unharmed** — traffic flows LinkedIn → site, and the site does not need to link back |
| **Final priority** | **P0** — `P0-004` |

### D-14 · Are the GitHub links themselves the problem?

| | |
|---|---|
| **Claude position** | §10.2: GitHub links are "Low risk — universally accepted work evidence"; the transitive `avoy-portfolio` path is a second-order concern |
| **Codex position** | U-01: "eliminate visible contact data on linked proof surfaces, or link only to sanitized proof surfaces" |
| **Verified evidence** | The exposure is on the **account**, not the link: the profile README and profile sidebar publish the email. **NEW-1:** all 17 commits in the public `aboy-portfolio` repository are authored `Avoy22 <dasavoy828@gmail.com>`, so the same address sits in this repository's own public commit metadata, and the "Avoy"/"Aboy" split is not confined to ServicePro |
| **Final decision** | **Neither review's framing is quite right, and this is where the "least restrictive solution" instruction bites.** Removing GitHub links would destroy the entire proof strategy to solve a problem that is not in the links. The fix belongs at the source: enable GitHub's private-email setting, clear the profile email field, and remove the email line from the profile README. Then the GitHub links stay and **all engineering proof is preserved**. Residual: historical commits retain the address in their patch metadata unless history is rewritten — that rewrite is disproportionate and is deferred (§8) |
| **Final priority** | **P0** — `P0-004`, account-hygiene half |

### D-15 · Is the homepage heading skip a WCAG violation?

| | |
|---|---|
| **Claude position** | §11.2: "a genuine WCAG 1.3.1 heading-order violation" |
| **Codex position** | U-06: a semantic-quality issue; a numeric skip alone is not proof of nonconformance |
| **Verified evidence** | `trust-badges.tsx:59` emits three `<h3>` elements in a section with no `<h2>`, directly after the hero `<h1>` |
| **Final decision** | **Codex is correct on epistemics.** The defect is real and should be fixed; the *label* "violation" cannot be asserted without assistive-technology testing, and standing constraint 4 forbids conformance claims in either direction |
| **Final priority** | **P2** — `P2-008`, during the content pass |

### D-16 · Do the responsive and touch-target findings stand?

| | |
|---|---|
| **Claude position** | §12.2 footer cramped at 768px (ASSESSMENT); §11.6 footer links ~20px, below the 24px SC 2.5.8 minimum |
| **Codex position** | U-11: no browser measurement, overflow trace, screenshot, or device test was supplied. Test cases, not defects |
| **Verified evidence** | The audit itself states at §12: "No live device or emulator testing was performed — findings below are analytical, and the low-risk assessments are predictions, not verified results" |
| **Final decision** | **Codex is correct, on the audit's own admission.** Both become checklist entries. Promote to a task only if reproduced at a defined viewport |
| **Final priority** | **P3** — `P3-009` |

### D-17 · Is `CLAUDE.md` a meaningless file?

| | |
|---|---|
| **Claude position** | Not raised |
| **Codex position** | M-07: "CLAUDE.md contains only a lone '@'" → "remove or replace meaningless instruction files" |
| **Verified evidence** | `od -c CLAUDE.md` returns exactly `@ A G E N T S . m d \n`. This is a Claude Code **import directive** that resolves `AGENTS.md`, which contains the project's Next.js-version guidance |
| **Final decision** | **Codex is wrong.** The file is correct and functional. Acting on this recommendation would delete working tooling configuration. **Do not touch `CLAUDE.md` or `AGENTS.md`** |
| **Final priority** | **Rejected** |

### D-18 · Does the README overstate Open Graph support?

| | |
|---|---|
| **Claude position** | §14.2: no `og:image` on any route — accurate, and framed as a missing asset |
| **Codex position** | M-07: "README says … OG/Twitter tags exist, while the implementation is incomplete" |
| **Verified evidence** | `layout.tsx` declares a full `openGraph` object (title, description, url, siteName, type, locale) and a `twitter` object (`card: "summary"`). Neither has an `images` key, and no `opengraph-image` file exists. README line 22 says "Open Graph/Twitter tags" |
| **Final decision** | **The audit's framing is right; Codex overreached.** The tags exist exactly as described. The missing piece is an image asset the README never promised. The README's genuinely inaccurate lines are 21 (reduced motion) and 67 (content location) — both already scheduled |
| **Final priority** | **P1** — `P1-008`, lines 21 and 67 only |

### D-19 · Is the hero dashboard mock a problem? — **NEW-2**

| | |
|---|---|
| **Claude position** | §6.5 / P2-006: "edges toward implying a screenshot that does not exist"; rated P2 |
| **Codex position** | Not raised |
| **Verified evidence** | `dashboard-mock.tsx:37` renders a sidebar label reading **`FIELDOPS`**, above KPI figures `$12,480`, `37` active jobs, `94%` on-time, `+8.2%`. The real FieldOps application is a Streamlit dashboard over a 10,000-work-order marketplace fixture and produces none of these numbers. The file's own comment states it is "deliberately labeled as a preview so it never reads as a real client's data" — but the caption is 10px `text-faint`, which fails contrast at 3.90:1 |
| **Final decision** | **This is the FieldOps misrepresentation expressed visually, and it belongs in the same commit.** Attaching an invented dark-dashboard mock, branded with a real project's name and figures that project does not produce, to the top of the homepage is incorrect proof affecting credibility. The fix is a one-string change to a neutral label. Because it is one line inside a pass already editing claim language, it is folded into P0-002 rather than promoted as its own P0 |
| **Final priority** | **P0**, inside `P0-002` |

### D-20 · Is the process duplication a copy nit or a commercial risk? — **NEW-3**

| | |
|---|---|
| **Claude position** | §4.1 / P2-004: duplication has "drifted into a substantive inconsistency"; rated P2 |
| **Codex position** | Priority #23: promote to P1 — "a client expectation/scope-control problem" |
| **Verified evidence** | `process-preview.tsx` defines 4 steps; `process.ts` defines 6, with entirely different titles ("Map the workflow" vs "Understand the workflow"; "Spec the system" vs "Plan the screens and data"). `process-preview.tsx:23` commits to **"Working software on a live preview link every week"** — a delivery cadence that appears nowhere in the canonical `/process` data |
| **Final decision** | **Codex is right to elevate it, and the cause matters more than the symptom.** A prospective client reading the homepage takes "every week" as a commitment; the process page they are pointed to does not support it. That is a scope-dispute risk for a freelancer, not a typo. But the *reason* it happened is that the same content has two independent sources — which makes the fix an architecture fix, not a copy edit |
| **Final priority** | **P1** — `P1-007` |

---

## 4. Final P0 — Critical Truth and Trust

Four tasks. Each meets the strict bar: materially misleading information, major technology inconsistency, broken important functionality, or meaningful marketplace-policy risk. Nothing here is an improvement; everything here is a defect on a live site.

---

### P0-001 — Rebuild the FieldOps record from the real repository and deployment

| | |
|---|---|
| **Goal** | Make the portfolio's only proof project describe the software that actually exists, and connect it to the evidence that proves it. |
| **Current problem** | `src/data/projects.ts` presents FieldOps as a Next.js/TypeScript/Tailwind field-service dispatch board with a job status board, technician workload views, and 500+ seeded jobs, with `liveUrl: null` and `githubUrl: null`. The real project is a Python/SQLite/Streamlit/Plotly analytics dashboard over a two-sided marketplace fixture, publicly deployed and MIT-licensed. Nearly every field in the record — `techStack`, `subtitle`, `problem`, `solution`, all six `features`, `businessValue`, `whatIBuilt`, `metrics` — describes software that does not exist. |
| **Verified evidence** | `projects.ts:282` → `techStack: ["Next.js", "TypeScript", "Tailwind CSS"]`. `projects.ts:315-316` → `liveUrl: null, githubUrl: null`. `projects.ts:306` → `// TODO(aboy): adjust these to match the real seeded build before publishing.` and `:314` → `// TODO(aboy): add the real deployment + repo URLs when ready to publish them.`; `:7` → the file-level metrics TODO. `github.com/aboychandradas/fieldops-analytics-os` (fetched 2026-09-01): Python, Faker, NumPy, pandas, SQLite, SQL, Streamlit, Plotly; MIT; 23 commits; live at `https://fieldops-analytics-os.streamlit.app/`; fixture of **500 buyers, 1,500 providers, 10,000 work orders**, plus payments, reviews, support tickets; sections include executive KPI overview, monthly revenue trends, work-order status breakdown, revenue by category, buyer concentration, payment delay risk, top location performance, finance deep dive; CSV export of the active filtered dataset; no tests, no CI. Built output: `coming soon` appears 8× in `.next/server/app/work/fieldops-analytics-os.html` while the badge reads "Self-initiated build · Deployed". |
| **Why it matters** | This is the single artifact the entire credibility argument rests on, on a site whose stated premise is "show, don't claim". A technical reviewer who clicks through finds the contradiction in under a minute — and once the repo link is published (which this task does), the mismatch becomes trivially checkable by anyone. `lessonsLearned[0]` also states "Aggregation logic belongs in one **tested** layer" while the repository has no tests, which violates standing constraint 4. |
| **Files likely affected** | `src/data/projects.ts` (the FieldOps object, lines ~236-320) |
| **Implementation approach** | Rewrite the FieldOps object from the repository README, SQL library, and live UI — do not patch the existing copy. Specifically: (1) `techStack` → `["Python", "SQL", "SQLite", "Streamlit", "pandas", "Plotly"]`; (2) rewrite `subtitle`, `problem`, `solution` around the real domain — marketplace finance and work-order analytics for a two-sided marketplace, not dispatch; (3) replace all six `features` with the dashboard sections that actually exist; (4) rewrite `whatIBuilt` to the real deliverables (data generation, SQLite load, a SQL query library, the Streamlit front end) and delete the "design language this portfolio shares" claim — a Streamlit app cannot share bespoke Tailwind styling; (5) delete `features[5]` "Responsive layout", which is framework-controlled in Streamlit and not authored; (6) delete the "tested layer" phrasing from `lessonsLearned[0]` or reword it as an intention; (7) replace `metrics` with figures traceable to the fixture — e.g. `Work orders analysed: 10,000`, `Providers modelled: 1,500`, `SQL queries: <actual count>` — or remove any figure that cannot be traced; (8) set `liveUrl: "https://fieldops-analytics-os.streamlit.app/"` and `githubUrl: "https://github.com/aboychandradas/fieldops-analytics-os"`; (9) delete all three TODO comments; (10) keep `status: "proof"`, `statusLabel`, `metricsNote`, and the generated-data disclosure — extend `metricsNote` to name the fixture explicitly. **Do not invent a number that cannot be traced to the repository.** |
| **Acceptance criteria** | No occurrence of "Next.js", "TypeScript", or "Tailwind" remains in the FieldOps record. `techStack` matches the repository. Every `metrics` entry is traceable to a documented fixture count or is removed. `liveUrl` and `githubUrl` both resolve. Zero `TODO` strings remain anywhere in `projects.ts`. `metricsNote` names the generated fixture. No claim of tests survives. |
| **Verification procedure** | `grep -n "TODO" src/data/projects.ts` → empty. `grep -c "Next.js\|TypeScript\|Tailwind" ` within the FieldOps object → 0. `npx tsc --noEmit` → exit 0. `npm run lint` → exit 0. `npm run build` → succeeds. `grep -c "coming soon" .next/server/app/work/fieldops-analytics-os.html` → 0. Open both published URLs and confirm HTTP 200. Read the rendered case study side by side with the repository README and confirm no statement contradicts it. |
| **Expected commit message** | `fix(projects): rebuild FieldOps case study from the real repository` |

---

### P0-002 — Remove sitewide technology absolutes that the real project mix contradicts

| | |
|---|---|
| **Goal** | Ensure the rest of the site does not contradict the corrected FieldOps case study. |
| **Current problem** | Four sitewide claims assert that *every* project uses React, Next.js, Vercel, and Zod. FieldOps — after P0-001, the site's only proof project — uses none of them. The homepage hero also brands an invented dashboard mock with the FieldOps name, and the featured-work lede calls two build specifications "products". |
| **Verified evidence** | `src/data/tech-stack.ts:50` "Component-based UI — the base of **every screen I build**"; `:56` "The framework behind **every app I ship**"; `:112` "Validates **every form and import**" (while `grep -rn 'from "zod"' src` returns nothing); `:158` "Deployment for **every build**". `src/components/home/dashboard-mock.tsx:37` renders the sidebar label `FIELDOPS` above `$12,480` / `37 active jobs` / `94%` — figures the real application does not produce. `src/components/home/featured-work.tsx:17` "Self-initiated **products** that prove out real business workflows" above two `roadmap` cards. `src/data/projects.ts:120` (ShopPulse) "UI direction consistent with **my FieldOps build**: dense tables, calm charts". |
| **Why it matters** | Fixing only the FieldOps card would leave the homepage — the highest-traffic page — asserting absolutes the corrected case study directly refutes. That is a worse outcome than the current state: today the contradiction is between the site and an external repo; after P0-001 alone it would be between two pages of the same site. The `FIELDOPS`-branded mock is the same misrepresentation in visual form. |
| **Files likely affected** | `src/data/tech-stack.ts`, `src/components/home/dashboard-mock.tsx`, `src/components/home/featured-work.tsx`, `src/data/projects.ts` (ShopPulse `whatIBuilt[3]` only), `src/data/faq.ts` (one answer) |
| **Implementation approach** | Replace absolutes with scoped language: "the base of every screen I build" → "my default for interactive screens"; "the framework behind every app I ship" → "my default framework for web apps"; "Deployment for every build" → "where my web apps deploy"; "Validates every form and import" → "validates forms and imports in my TypeScript builds". Change `dashboard-mock.tsx:37` from `FIELDOPS` to a neutral label (e.g. `OPS OS`) so no invented visual carries a real project's name. Change the featured-work lede from "Self-initiated products" to wording that covers both a shipped build and two specs — e.g. "Self-initiated systems — one deployed, the rest scoped in the open." Rewrite ShopPulse's `whatIBuilt[3]` to drop the FieldOps design-continuity claim. In `faq.ts`, the "What tech stack do you use?" answer describes the default client stack accurately and needs only a short clause acknowledging Python/SQL for data work. **Do not delete the technologies from the stack grid** — Python, pandas, Streamlit, and SQLite are the ones FieldOps actually evidences, and they become more credible after P0-001, not less. |
| **Acceptance criteria** | No claim on the site asserts that *every* project or *every* build uses a specific technology. `grep -rn "every screen\|every app\|every build\|every form" src/data/` returns nothing. The hero mock carries no real project's name. The featured-work lede is true of the actual mix of one proof and two roadmaps. |
| **Verification procedure** | `grep -rniE "every (screen|app|build|form|project)" src/` and review each remaining hit. `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass. Read `/`, `/work`, and the corrected FieldOps case study in sequence and confirm no statement on one contradicts another. |
| **Expected commit message** | `fix(content): scope technology claims to what the projects actually use` |

---

### P0-003 — Render page content visible by default

| | |
|---|---|
| **Goal** | Make the site readable without JavaScript, and stop sending hidden content to reduced-motion users. |
| **Current problem** | `Reveal` sets `initial={{ opacity: 0 }}` unconditionally. Because it wraps nearly every content block on every page, the prerendered HTML ships hidden. Content becomes visible only after framer-motion loads, React hydrates, and an IntersectionObserver fires. `useReducedMotion()` zeroes the `y` translate but leaves the opacity fade running. |
| **Verified evidence** | `src/components/motion/reveal.tsx:19` → `initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}`. Built output: `opacity:0` appears in **10 of 12** prerendered HTML files — homepage 37, `/start` 22, `/process` 21, `/about` 17, `/services` 13, each case study 13, `/faq` 10, `/work` 5. The homepage `<h1>` — the LCP element — is directly inside `<div style="opacity:0;transform:translateY(20px)">`, confirmed by grep against `.next/server/app/index.html`. `Reveal` is used 65 times across 18 files. |
| **Why it matters** | Broken important functionality. A JS failure, a slow network, or a crawler that does not execute scripts yields a blank page on a site whose entire job is to be read by prospective clients. Links inside not-yet-revealed blocks are keyboard-focusable while invisible. Reduced-motion users — the population the setting exists to protect — still receive content that starts invisible. `README.md:21` claims the animations "respect reduced-motion preferences", which is not true as written. |
| **Files likely affected** | `src/components/motion/reveal.tsx` |
| **Implementation approach** | Invert the default so visibility never depends on script execution. Two viable shapes: (a) drive the animation with CSS that starts from the visible state and only animates when motion is both safe and available; or (b) keep framer-motion but render the visible state as the server output and opt into the hidden start only after mount, so the prerendered HTML is never hidden. Either way: when `useReducedMotion()` is true, render children with **no** initial transform and **no** opacity transition at all. The component's public API (`delay`, `className`, `children`) must not change — 65 call sites depend on it. |
| **Acceptance criteria** | Zero occurrences of `opacity:0` in any prerendered HTML file. The homepage `<h1>` is visible in the raw server response. With JavaScript disabled, every route renders complete, readable content. With `prefers-reduced-motion: reduce`, content appears immediately with no fade. No call site changes. |
| **Verification procedure** | `npm run build`, then `grep -rc 'opacity:0' .next/server/app/` → 0 across all files. `curl https://<preview>/ \| grep -o 'style="opacity:0[^"]*"'` → empty. Load each route in a browser with JS disabled (DevTools → Settings → Debugger → Disable JavaScript) and confirm full content. Enable OS reduced-motion and reload — content must appear with no fade. Tab through the homepage from the top and confirm focus never lands on an invisible element. |
| **Expected commit message** | `fix(motion): render content visible by default and honour reduced motion` |

---

### P0-004 — Close the marketplace contact path

| | |
|---|---|
| **Goal** | Make the outbound link graph — not just the local HTML — contact-clean, without giving up engineering proof. |
| **Current problem** | The site itself contains no email, phone, or contact form, and that is genuinely well enforced. But the footer links to a GitHub profile that publishes an email address in plain sight, and to LinkedIn, which is a direct-messaging channel. The audit declared the site marketplace-safe on the strength of the local HTML alone. |
| **Verified evidence** | `src/data/site.ts:45-54` defines GitHub and LinkedIn socials; `src/components/layout/footer.tsx:76-93` renders both on every page. `github.com/aboychandradas` (fetched 2026-09-01): profile sidebar shows `dasavoy828@gmail.com`, and the profile README repeats "Email: dasavoy828@gmail.com". Path: footer → profile → email, **one click**. **NEW-1:** `git log --format='%an <%ae>'` on this repository returns `Avoy22 <dasavoy828@gmail.com>` for all 17 commits, all public. Upwork treats social handles as contact information and restricts contact details on linked sites before a contract; Fiverr and Freelancer both restrict routing communication off-platform. |
| **Why it matters** | Meaningful marketplace-policy risk, verified rather than speculative. The portfolio's stated differentiator is that it respects platform rules — a reviewer who finds a published email one click away concludes the opposite. The effort already invested in on-site compliance is undercut by the adjacent surface. |
| **Files likely affected** | `src/data/site.ts` (remove the LinkedIn socials entry) · `src/components/layout/footer.tsx` (no change expected — `visibleSocials` already filters) · **plus GitHub account settings, which are outside this repository** |
| **Implementation approach** | Two halves, both required before the site is shared on any marketplace. **In-repo:** remove the LinkedIn entry from `site.socials`. The existing `visibleSocials` filter and the `Person` schema's `sameAs` filter both handle absence correctly, so no component change should be needed — verify that. Keep both GitHub URLs: they are the proof strategy, and the exposure is not in the link. **Account-side (checklist, not code):** (1) GitHub → Settings → Emails → enable "Keep my email addresses private" and "Block command line pushes that expose my email"; (2) clear the public Email field on the profile; (3) remove the email line from the `aboychandradas` profile README; (4) set the local git user email to the `@users.noreply.github.com` address so future commits do not re-expose it; (5) decide what to do about `avoy-portfolio`, which is public and described as containing a Supabase contact form — archive it, mark it superseded in its README, or accept it deliberately. **Residual, stated honestly:** the 17 existing commits keep the address in their patch metadata unless history is rewritten. That rewrite is deferred (§8) as disproportionate. |
| **Acceptance criteria** | No LinkedIn link renders anywhere on the site. `grep -rn "linkedin" src/` returns nothing except, if retained, a non-rendered comment. `github.com/aboychandradas` shows no email in the sidebar or profile README. A new test commit shows a `noreply` author address. A logged-out visitor starting at the site footer cannot reach a direct contact channel in one click. |
| **Verification procedure** | `npm run build`, then `grep -ri "linkedin" .next/server/app/` → 0. `grep -o '"sameAs":\[[^]]*\]' .next/server/app/index.html` → GitHub only. Load the deployed footer and confirm only GitHub renders. Open `github.com/aboychandradas` in a logged-out private window and confirm no email is visible. Make one throwaway commit and confirm `git log -1 --format='%ae'` shows the noreply address. Walk the full logged-out path — site → every outbound link → every link on those destinations — and record what a reviewer can reach. |
| **Expected commit message** | `chore(site): remove direct-message social exit from the footer` |

---

## 5. Final P1 — Engineering Foundation

Eight tasks. Each is included because it solves a problem this repository actually has — none is here to look professional. The test in every case: *if this were removed, what specifically would go wrong?*

---

### P1-001 — Add `typecheck` and `test` scripts and tighten `lint`

| | |
|---|---|
| **Goal** | Make the checks that already pass runnable by name, so CI and contributors invoke the same commands. |
| **Current problem** | `package.json` defines only `dev`, `build`, `start`, `lint`. Type checking — which the site sells as a capability — has no script. `lint` is bare `eslint` with no target and no warning ceiling, so warnings pass silently. There is no `test` script for P1-002 to attach to. |
| **Verified evidence** | `package.json` scripts block, read directly. `npx tsc --noEmit` passes at exit 0, so the check is real but unnamed. |
| **Why it matters** | Proof infrastructure. Every subsequent task's verification procedure references `npm run typecheck` and `npm run test`; those commands must exist before CI can call them. It also removes a small credibility gap: TypeScript strictness is advertised on `/services` and in `tech-stack.ts` but is not a runnable check in the repository that advertises it. |
| **Files likely affected** | `package.json` |
| **Implementation approach** | Add `"typecheck": "tsc --noEmit"` and `"test": "node --test tests/"` (or the runner P1-002 settles on). Change `lint` to `eslint . --max-warnings 0`. No new dependencies — `tsc` and `eslint` are already installed, and Node's built-in test runner needs nothing. |
| **Acceptance criteria** | `npm run typecheck` exits 0. `npm run lint` exits 0 with the warning ceiling in place. `npm run test` exists and exits 0 (trivially, until P1-002 lands). No dependency added. |
| **Verification procedure** | Run all three. Confirm `git diff package-lock.json` is empty. |
| **Expected commit message** | `chore(scripts): add typecheck and test scripts, fail lint on warnings` |

---

### P1-002 — Add a project-data invariant check

| | |
|---|---|
| **Goal** | Make the P0-001 class of defect impossible to reintroduce. |
| **Current problem** | Nothing in the repository prevents a project record from claiming `status: "proof"` with `liveUrl: null`, from shipping a `TODO` marker to production, or from carrying metrics with no qualifying note. All three shipped to a live site simultaneously. |
| **Verified evidence** | The FieldOps record simultaneously held `status: "proof"`, `statusLabel: "…Deployed"`, `liveUrl: null`, three TODO comments, and unverifiable metrics — and passed `tsc`, `eslint`, and `next build` at exit 0. The type system enforces *shape*; nothing enforced *truth*. |
| **Why it matters** | This is the one test worth writing in this repository, and the argument for it is specific rather than aspirational: it encodes the exact failure that caused the P0 tier. Codex's overengineering point stands — testing `cn()` or a slug getter would prove nothing — but an invariant check over `projects.ts` is high-value and cheap. |
| **Files likely affected** | new `tests/projects.test.ts` (or `.mjs`), `package.json` if the runner needs wiring |
| **Implementation approach** | Use Node's built-in `node:test` and `node:assert` — no new dependency. Assert over the exported `projects` array: (1) slugs are unique and URL-safe; (2) `status` is `"proof"` or `"roadmap"`; (3) every `proof` project has a non-null `liveUrl` **and** `githubUrl`; (4) `statusLabel` containing "Deployed" implies a non-null `liveUrl`; (5) no string field anywhere in the array contains `TODO`; (6) `techStack` is non-empty; (7) `metrics` non-empty implies a non-empty `metricsNote`; (8) `featured` projects with `status: "proof"` sort ahead of `roadmap` ones (supports P2-003). Keep it under ~60 lines. Do not test rendering. |
| **Acceptance criteria** | `npm run test` passes against corrected data. Reverting P0-001 causes it to fail with a readable message naming the offending field. No new dependency. |
| **Verification procedure** | `npm run test` → exit 0. Temporarily set a `proof` project's `liveUrl` to `null` and confirm a failing assertion; revert. Temporarily insert `TODO` into a description and confirm failure; revert. |
| **Expected commit message** | `test(projects): assert proof projects carry live and source links` |

---

### P1-003 — Add one CI workflow

| | |
|---|---|
| **Goal** | Turn four checks that already pass into a public green check on every commit. |
| **Current problem** | No `.github/workflows/` exists. The repository passes lint, typecheck, and build cleanly and gets no visible credit for it, and nothing prevents a regression from being pushed. |
| **Verified evidence** | Filesystem: no `.github/` directory. `npx tsc --noEmit`, `npm run lint`, and `npx next build` all exit 0 today. No repository on the account has CI. |
| **Why it matters** | The cheapest credibility win available, and the only piece of "engineering proof infrastructure" that pays for itself here. It converts an existing verified fact into something a prospective client can see, and it requires **no new claim** — the site does not currently assert that it has CI, and must not until this lands (standing constraint 4). Once green, it also enforces P1-002 on every push, which is what makes P0-001 stick. |
| **Files likely affected** | new `.github/workflows/ci.yml` |
| **Implementation approach** | One workflow, one job, triggered on push and pull request to `main` and `portfolio-v2-engineering`. Steps: checkout → setup-node with the project's Node version and npm cache → `npm ci` → `npm run lint` → `npm run typecheck` → `npm run test` → `npm run build`. Pin action versions. No matrix, no deploy step, no artifact upload, no coverage gate. Do **not** add a badge to the README until the workflow has actually run green. |
| **Acceptance criteria** | The workflow runs on push and completes green. All four steps execute. Total runtime under ~3 minutes. No secrets required. |
| **Verification procedure** | Push the branch; confirm the run is green in the Actions tab. Deliberately break a type in a scratch commit and confirm the run fails at the typecheck step; revert. |
| **Expected commit message** | `ci: add lint, typecheck, test, and build workflow` |

---

### P1-004 — Patch dependencies to the implementation-day safe release

| | |
|---|---|
| **Goal** | Clear the public advisory state on a public repository. |
| **Current problem** | `next` is pinned at `16.2.10`. Today's production audit reports four high-severity entries. |
| **Verified evidence** | `npm audit --omit=dev` on 2026-09-01: **4 high-severity entries** — `nanoid` (2 advisories), `next` (9 advisories), `postcss` (4), `sharp` (1). Remediation offered: **`next@16.3.4`**. **Applicability verified directly against this repository:** no `proxy.ts` or `middleware.ts`; no `"use server"` anywhere in `src/`; no `route.ts` handlers; `next.config.ts` is empty, so no rewrites and no `dangerouslyAllowSVG`; no custom server. **All nine Next advisories concern Proxy, Server Actions, custom servers, attacker-controlled rewrites, cache confusion on requests with bodies, or SVG image optimisation — none of which this deployment uses.** `postcss` is build-time only. `sharp` runs in the image optimiser, which serves only same-origin local raster images. |
| **Why it matters** | The exploitable risk to this deployment is effectively nil and the plan should say so rather than inflate it. The reason to patch is different and still good: this is a **public repository** that a prospective client may inspect, and four high-severity advisories resolvable by one minor bump is a maintenance signal, not a security incident. Codex's discipline point is adopted — do not carry either document's snapshot into implementation. |
| **Files likely affected** | `package.json`, `package-lock.json` |
| **Implementation approach** | Re-run `npm audit` and `npm audit --omit=dev` **on the day of implementation** and work from that output, not from the numbers in this document. Bump `next` and `eslint-config-next` to the current safe minor. Run `npm install` to refresh the lockfile. Re-run the full check suite. Before merging, re-read `node_modules/next/dist/docs/` for any deprecation notice introduced by the bump, per `AGENTS.md`. Record actual exposure in the commit body — state which advisories do not apply and why. |
| **Acceptance criteria** | `npm audit --omit=dev` reports zero high-severity entries, or every remainder is documented as inapplicable with a stated reason. Lint, typecheck, test, and build all pass after the bump. Every route still prerenders statically. |
| **Verification procedure** | `npm audit --omit=dev` · `npm audit` · `npm run lint` · `npm run typecheck` · `npm run test` · `npm run build` (confirm all routes still `○ Static` / `● SSG`) · load every route in `npm run start` and confirm no console errors · confirm the deployed preview renders identically. |
| **Expected commit message** | `chore(deps): update next to clear production advisories` |

---

### P1-005 — Add a minimal, tested security header set

| | |
|---|---|
| **Goal** | Set the headers that are free, static-compatible, and demonstrably useful — and none of the ones that are not. |
| **Current problem** | `next.config.ts` is empty. The live response carries Vercel's default HSTS and nothing else: no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`, no frame restriction. |
| **Verified evidence** | `next.config.ts` contains only `const nextConfig: NextConfig = { /* config options here */ };`. Both reviews independently confirmed the absent headers on the live response. `x-powered-by` is already absent — Vercel strips it. Per `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`, nonce-based CSP **requires dynamic rendering**, so it is architecturally unavailable here without abandoning static output. |
| **Why it matters** | Clickjacking is the only gap with real substance, and its impact is limited by the absence of any state-changing action. The stronger argument is demonstrative: this portfolio sells engineering judgment, and a prospective client running it through a header scanner currently sees a bare result on the developer's own site. The headers are cheap, static-compatible, and directly checkable. |
| **Files likely affected** | `next.config.ts` |
| **Implementation approach** | Add `poweredByHeader: false` and an `async headers()` returning, for all paths: `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` — minus `interest-cohort`, which is obsolete; `X-Frame-Options: SAMEORIGIN` plus `Content-Security-Policy: frame-ancestors 'self'`. **Explicitly do not add:** any `script-src` directive (it would need SHA-256 hashes covering both inline JSON-LD blocks *and* Next's bootstrap scripts, and an untested one silently breaks structured data); a nonce (incompatible with static rendering); HSTS `includeSubDomains` or `preload` (not without auditing every subdomain — an availability risk, not a security win); `Cross-Origin-Opener-Policy` (no demonstrated need on a site with no cross-origin window interaction). |
| **Acceptance criteria** | Each header is present on the deployed response. Every route still renders correctly. Both JSON-LD blocks still validate. Nothing is framed from a foreign origin. `x-powered-by` remains absent. |
| **Verification procedure** | `npm run build` and `npm run start`, then `curl -I http://localhost:3000/` and confirm each header. Deploy a preview and repeat against the preview URL. Run both JSON-LD blocks through a structured-data validator. Attempt to frame the preview from a scratch HTML file on another origin and confirm it is blocked. Confirm the browser console shows no CSP violations on any route. |
| **Expected commit message** | `feat(security): add baseline response headers` |

---

### P1-006 — Complete the accessibility baseline: contrast and reduced motion

| | |
|---|---|
| **Goal** | Fix the two accessibility defects that are computationally verified rather than predicted. |
| **Current problem** | `--faint` fails WCAG AA for normal-size text against all three surfaces and is used 30 times, mostly at 9-14px. `animate-pulse` on the hero availability dot has no `motion-safe:` prefix and animates regardless of user preference. The navbar's `AnimatePresence` height animation ignores reduced motion entirely. |
| **Verified evidence** | Recomputed independently for this document from the OKLCH tokens in `globals.css:3-25`. `--faint: oklch(0.54 0.014 277)` → `#6c6e77`: **3.90:1** on `--background`, **3.74:1** on `--surface`, **3.50:1** on `--surface-raised`. All below the 4.5:1 threshold; all use sites are below the 18.66px large-text exemption. **Verified fix value: `oklch(0.62 0.014 277)` yields 5.43 / 5.20 / 4.86 — clearing AA on all three surfaces.** `hero.tsx:24` — `animate-pulse` with no `motion-safe:`, confirmed present in the built homepage HTML. `navbar.tsx:63-72` — height animation with no `useReducedMotion()` guard. |
| **Why it matters** | Reliability and accessibility fundamentals, and one specific trust consequence: `metricsNote` — the text that qualifies the site's only numeric claims — renders in `--faint` at 10px, making the site's most important honesty disclaimer its hardest text to read. That is an accessibility failure and a credibility failure in the same element. |
| **Files likely affected** | `src/app/globals.css`, `src/components/home/hero.tsx`, `src/components/layout/navbar.tsx` |
| **Implementation approach** | Raise `--faint` to `oklch(0.62 0.014 277)`. Recheck each of the 30 use sites visually — the token is also used for decorative eyebrow labels where the change is harmless, so a single token change is sufficient and no per-site override is needed. Add `motion-safe:` to the `animate-pulse` class in `hero.tsx`. Guard the navbar height animation with the existing `useReducedMotion()` pattern so it snaps rather than animates when motion is reduced. **Do not claim WCAG conformance anywhere in the codebase, README, or site copy** — standing constraint 4. |
| **Acceptance criteria** | `--faint` measures ≥4.5:1 against `--background`, `--surface`, and `--surface-raised`. No pulse animation runs under `prefers-reduced-motion: reduce`. The mobile menu opens and closes without animation under reduced motion. No conformance claim is added anywhere. |
| **Verification procedure** | Recompute the three ratios from the new token value and confirm each ≥4.5. Sample five `text-faint` sites in browser DevTools' contrast inspector. Enable OS reduced-motion, reload, and confirm the availability dot is static and the menu snaps. Run an automated scanner (axe DevTools or Lighthouse accessibility) before and after and record the contrast-violation delta — as evidence, not as a conformance claim. |
| **Expected commit message** | `fix(a11y): raise faint text contrast and honour reduced motion` |

---

### P1-007 — Give the process content one source of truth

| | |
|---|---|
| **Goal** | Eliminate a delivery-cadence commitment the rest of the site does not support, and remove the duplication that produced it. |
| **Current problem** | Process content exists in two independently maintained copies that have already diverged. The homepage version commits to a weekly delivery cadence that appears nowhere in the canonical process data. |
| **Verified evidence** | `src/data/process.ts:27-70` defines six steps: "Understand the workflow", "Plan the screens and data", "Build the MVP", "Test with real sample data", "Deploy and document", "Improve after feedback". `src/components/home/process-preview.tsx:6-31` defines four different steps: "Map the workflow", "Spec the system", "Build in the open", "Launch & handoff". Line 23 of the preview commits to **"Working software on a live preview link every week"** — no equivalent exists in `process.ts`. |
| **Why it matters** | A prospective client reads the homepage as a commitment and the process page as the detail. When they disagree about delivery cadence, the gap becomes a scope dispute — a real commercial risk for a freelancer, not a copy nit. And the root cause is architectural: two sources for one piece of content will keep drifting. Fixing the copy without fixing the duplication only resets the clock. |
| **Files likely affected** | `src/data/process.ts`, `src/components/home/process-preview.tsx` |
| **Implementation approach** | Delete the local `steps` array in `process-preview.tsx` and derive the homepage preview from `process.ts` — either take the first four canonical steps or add an explicit `featured` flag to the data so the homepage subset is a data decision rather than a duplicated array. Then resolve the cadence claim deliberately: either add a matching, honestly-scoped cadence commitment to the canonical `process.ts` (if weekly previews are genuinely intended), or drop the "every week" phrasing in favour of something the process page supports, such as "a live preview link you can watch as it is built". **Do not keep both.** |
| **Acceptance criteria** | Exactly one source defines process step content. The homepage and `/process` agree on step titles. No delivery-cadence promise appears on one page and not the other. `grep -rn "every week" src/` returns nothing unless the canonical data now carries it too. |
| **Verification procedure** | `grep -rn "Map the workflow\|Spec the system"` → only in `process.ts` if those titles are kept, or nowhere if the canonical titles win. Read `/` and `/process` in sequence and confirm the step names match. `npm run typecheck`, `npm run lint`, `npm run build` all pass. |
| **Expected commit message** | `refactor(process): derive homepage preview from canonical process data` |

---

### P1-008 — Correct the repository documentation

| | |
|---|---|
| **Goal** | Make the repository's own documentation match verified reality, since a public README is itself part of the engineering proof. |
| **Current problem** | `README.md` makes two inaccurate statements. `LAUNCH-CHECKLIST.md` is thorough, correct in intent, and entirely unchecked while the site is live — including items that anticipated the P0 findings. Three code comments are stale. |
| **Verified evidence** | `README.md:21` — "Subtle scroll animations (Framer Motion) that **respect reduced-motion preferences**": false until P0-003 and P1-006 land. `README.md:67` — "All content is typed data in `src/data/` … Copy changes happen there, not in components": false — `start/page.tsx:34-116`, `about/page.tsx:46-102`, `services/page.tsx:47-55`, `process-preview.tsx`, `problem-section.tsx`, `trust-badges.tsx`, and `dashboard-mock.tsx` all hold client-facing copy. `manifest.ts:5-7` — "Icon files are placeholders until real assets are added to /public": the icons exist. `LAUNCH-CHECKLIST.md:16` — GitHub URL "currently guessed as `Avoy22`": it is now `aboychandradas`. `LAUNCH-CHECKLIST.md:29` — "`src/app/favicon.ico` replaced": no such file exists; `src/app/icon.png` and `apple-icon.png` are used. **README line 22 ("Open Graph/Twitter tags") is accurate and must not be "corrected"** — both metadata objects genuinely exist; only the image is missing (see D-18). |
| **Why it matters** | Documentation. A public README that describes checks as done when they were only described is the exact signal a technical evaluator reads as carelessness — the opposite of what this portfolio is arguing. This task runs *after* the behaviour it documents is fixed, never before. |
| **Files likely affected** | `README.md`, `LAUNCH-CHECKLIST.md`, `src/app/manifest.ts` (comment only) |
| **Implementation approach** | Update README line 21 only after P0-003 and P1-006 have landed, and describe what is actually true. Rewrite line 67 to describe the real convention — structured and repeated content lives in `src/data/`; page-specific prose is colocated — rather than promising a convention the code does not follow (see D-10's principle: fix the claim, not the code, unless the code is wrong). Add a short "Architecture and deployment" section: routing model, why fully static, why no contact form, why no nonce CSP, and current limitations. **One section in the README — not three separate documents** (§8). Delete the stale `manifest.ts` comment. Correct the two `LAUNCH-CHECKLIST.md` lines and check off items that are genuinely complete, leaving the rest honestly unchecked. **Do not touch `CLAUDE.md` or `AGENTS.md`** — they are correct (D-17). |
| **Acceptance criteria** | Every factual statement in `README.md` is verifiable against the code at the time of the commit. No claim of tests, CI, or WCAG conformance beyond what exists. `LAUNCH-CHECKLIST.md` reflects real state. No stale comments remain in `manifest.ts`. `CLAUDE.md` and `AGENTS.md` are unmodified. |
| **Verification procedure** | Read README line by line against the code and confirm each claim. `git diff CLAUDE.md AGENTS.md` → empty. `grep -rn "favicon.ico" .` → no stale reference. Confirm no CI badge is present unless P1-003 has run green. |
| **Expected commit message** | `docs: correct README claims and add an architecture section` |

---

## 6. Final P2 — Client Conversion and Proof

Eight tasks. This tier is where the portfolio starts *winning* work rather than merely being honest about it.

---

### P2-001 — Add a social preview image

| | |
|---|---|
| **Goal** | Make every share of this URL render as a card with an image. |
| **Current problem** | `openGraph` and `twitter` metadata objects exist but declare no image, and no file-convention asset exists. Every LinkedIn post, marketplace profile link, Slack paste, and WhatsApp share renders as a bare text card. |
| **Verified evidence** | `src/app/layout.tsx` — `openGraph` object with title/description/url/siteName/type/locale and no `images` key; `twitter: { card: "summary" }` with no image. `grep -o 'og:image' .next/server/app/index.html` → empty on every route. No `opengraph-image.*` file anywhere. |
| **Why it matters** | The highest-leverage conversion gap on the site, and the cheapest to close. LinkedIn is one of the four named channels, and a portfolio selling visual product craft that previews as plain text argues against itself before anyone clicks. Codex rated this P1; it sits at the front of P2 here purely because it is a conversion asset by this plan's definitions. |
| **Files likely affected** | new `src/app/opengraph-image.tsx` (or a static `opengraph-image.png`), `src/app/layout.tsx` if `twitter.card` is upgraded |
| **Implementation approach** | Use the App Router file convention so Next wires the metadata automatically. Either a static 1200×630 PNG or a generated image via `next/og`. Content: the wordmark, the role line, and the positioning sentence — **no invented metrics, no fake screenshot, no client logos**. Upgrade `twitter.card` from `summary` to `summary_large_image`. Consider a per-case-study `opengraph-image` later; the root one first. |
| **Acceptance criteria** | `og:image` and `twitter:image` are present on every route with absolute URLs. The image is 1200×630 and renders legibly at thumbnail size. The card shows correctly in at least two validators. |
| **Verification procedure** | `npm run build`, then `grep -o 'og:image[^>]*' .next/server/app/*.html` on every route. Deploy a preview and run it through LinkedIn Post Inspector and one other card validator. Paste the URL into Slack and confirm the rendered card. |
| **Expected commit message** | `feat(seo): add Open Graph and Twitter preview image` |

---

### P2-002 — Add real FieldOps screenshots

| | |
|---|---|
| **Goal** | Replace the abstract CSS motif on the one deployed project with images of the software running. |
| **Current problem** | Every project has `image: null`, so all three render `MotifPreview` — a decorative CSS pattern. FieldOps has been publicly deployed the whole time and no capture of it exists in the repository. |
| **Verified evidence** | `projects.ts` — `image: null` on all three records. `src/components/work/motif-preview.tsx` renders the fallback. The FieldOps deployment at `fieldops-analytics-os.streamlit.app` is reachable and renders a working dashboard. |
| **Why it matters** | Screenshots are the proof a non-technical buyer actually evaluates. After P0-001 the case study will describe a real Streamlit analytics dashboard; showing it removes the last reason to doubt. The `image` field and its null-safe rendering already exist — this is filling a supported slot, not building a feature. |
| **Files likely affected** | new files under `public/`, `src/data/projects.ts` (`image` field), possibly `src/components/work/motif-preview.tsx` if a gallery is added |
| **Implementation approach** | Capture 2-4 real screens from the live deployment: the KPI overview, one analytical view (revenue trend or buyer concentration), and the filtered data table. Export at 2× and compress. Add the primary capture to `image` on the FieldOps record. Keep `MotifPreview` as the fallback for `roadmap` projects — that distinction is honest and worth preserving. If a case-study gallery is added, wrap it in an `overflow-x: auto` container, since no horizontal-scroll pattern exists in the codebase yet. **Do not retouch a screenshot to show data the application does not produce.** |
| **Acceptance criteria** | At least one real FieldOps screenshot renders on `/work` and on the case study. `roadmap` projects still render the motif. Images are served through `next/image` with correct `sizes`. No screenshot has been edited to alter displayed data. |
| **Verification procedure** | `npm run build` and confirm optimised variants are emitted. Compare each screenshot against the live deployment side by side. Check `/work` and the case study at 375px, 768px, and 1440px for layout and overflow. Confirm no horizontal page scroll appears at any width. |
| **Expected commit message** | `feat(work): add real FieldOps screenshots` |

---

### P2-003 — Re-rank featured work and qualify metrics on cards

| | |
|---|---|
| **Goal** | Lead with the project that has proof, and stop showing bare numbers without their qualifier. |
| **Current problem** | ShopPulse — which has no public implementation — occupies the first featured slot, ahead of the deployed project. On `/work`, metric values render as unqualified figures; the `metricsNote` that exists specifically to qualify them renders only on detail pages. |
| **Verified evidence** | `projects.ts` array order: ShopPulse, ClientFlow, FieldOps — all `featured: true`, rendered in array order by `featuredProjects`. All 12 public repos enumerated on 2026-09-01; none matches `shoppulse*`. `src/components/work/project-card.tsx:36-45` renders `metric.value` and `metric.label` with no `metricsNote`; `work/[slug]/page.tsx:265-267` renders it on detail pages only. |
| **Why it matters** | Portfolio positioning. A visitor's first impression should be the thing that can be verified. This is a conversion problem, not a truth failure — both roadmap records are honestly labelled (D-5) — and the fix is reordering plus surfacing an existing field. **Note the epistemic limit:** only the absence of a *public* repository was verified. The site must not state that no ShopPulse work exists. |
| **Files likely affected** | `src/data/projects.ts` (array order), `src/components/work/project-card.tsx` (render `metricsNote`) |
| **Implementation approach** | Move the FieldOps record to the first position so it leads `/work` and the homepage. Decide ShopPulse's fate deliberately: keep it as a clearly secondary roadmap card, or shorten it to a concept card. Either is defensible; leading with it is not. Render `metricsNote` on `ProjectCard` beneath the metric row, in a size and colour that is actually readable (P1-006 raises `--faint`, which helps). If P1-002's ordering assertion is in place, it will enforce this. |
| **Acceptance criteria** | The first featured project on `/` and `/work` is a `proof` project with working links. Every card showing metrics also shows its `metricsNote`. No copy asserts that ShopPulse has no implementation — only that no public proof link exists yet. `npm run test` passes the ordering invariant. |
| **Verification procedure** | `npm run build`; confirm card order in `.next/server/app/index.html` and `work.html`. `grep -c "Scope figures from the v1 build specification" .next/server/app/work.html` → ≥2. Visual check at 375px and 1440px that the note does not break card layout. |
| **Expected commit message** | `feat(work): lead with the deployed project and qualify card metrics` |

---

### P2-004 — Calibrate ClientFlow to its actual stage

| | |
|---|---|
| **Goal** | Keep an honest roadmap honest as the repository behind it becomes visible. |
| **Current problem** | The detail-page heading renders "What I've built so far" above four bullets describing specification artifacts. The repository has 3 commits and a default Create Next App README. The record is not linked, so a reader cannot calibrate. |
| **Verified evidence** | `work/[slug]/page.tsx:325` → `title={isProof ? "What I built" : "What I've built so far"}`. `projects.ts` ClientFlow `whatIBuilt` describes a v1 specification, a data model, a permission matrix, pipeline mechanics "designed before code", and "UI direction" — all design artifacts, correctly future-framed elsewhere ("It will become a full case study as the build ships"). `github.com/aboychandradas/clientflow-os` (fetched 2026-09-01): 3 commits, default CNA README, Next/TS/Prisma/Tailwind scaffold, no demo, no license, no tests, no CI. |
| **Why it matters** | The copy is already substantially honest — this is a wording refinement, not a truth fix (D-5). But "built so far" over spec bullets is the one phrase that reads as implementation progress, and it becomes more visible once the neighbouring FieldOps card carries real links. |
| **Files likely affected** | `src/app/work/[slug]/page.tsx` (heading), `src/data/projects.ts` (ClientFlow record) |
| **Implementation approach** | Change the roadmap heading from "What I've built so far" to something that names the artifact type — "What is specified so far" or "What exists today". Add an explicit stage line to the ClientFlow record naming the current milestone. **Do not link the repository yet**: a default Create Next App README is weaker evidence than no link. Add the `githubUrl` only after that README describes the project — at which point P1-002's invariant will already allow it, since ClientFlow is `roadmap`, not `proof`. |
| **Acceptance criteria** | No roadmap page heading implies shipped implementation. The current stage is stated explicitly. `status` and `statusLabel` are unchanged. The repository is linked only if its README has been replaced. |
| **Verification procedure** | `grep -c "What I've built so far" .next/server/app/work/*.html` → 0. Read the ClientFlow page start to finish and confirm no sentence implies working software. `npm run test` still passes. |
| **Expected commit message** | `fix(work): name the roadmap stage instead of implying shipped work` |

---

### P2-005 — Prepare ServicePro Lead Engine for safe inclusion — **GATED**

| | |
|---|---|
| **Goal** | Capture the strongest on-stack engineering evidence on the account without importing a contact surface or an identity contradiction. |
| **Current problem** | ServicePro is absent from the portfolio. It is also, as it stands, unsafe to link: its live demo carries an email, a contact form, a "Talk to me directly" CTA, and a byline under a different name. |
| **Verified evidence** | Repository (fetched 2026-09-01): Next.js, React, TypeScript, Tailwind, Supabase, Zod, Vercel; lead capture form, server-side validation, protected admin dashboard, status tracking, notes, search and filtering, CSV export; 8 commits; no license, no tests, no CI; README credits "Avoy Das" and documents `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_DEMO_EMAIL`. Live deployment: `hello@servicepro.app`, a `/contact` form, footer CTA "Talk to me directly", byline "Portfolio demo by **Avoy** Chandra Das", dashboard figures "Total 248", "+18%", "+22%" shown without a seeded-data caveat. |
| **Why it matters** | Its stack is exactly what the site advertises and its feature set maps directly onto `/services` → "CRM & Lead Management Systems". It is the best available answer to "show me something like what I'm buying". It is also the clearest demonstration of why P0-004 exists: adding it carelessly would break the constraint the portfolio is built around. |
| **Files likely affected** | `src/data/projects.ts` (new record) — **and, before that, the ServicePro repository and deployment, which are outside this repository** |
| **Implementation approach** | Strictly sequential; do not skip a gate. **Gate 1 — identity.** Decide the public name once (the portfolio, domain, JSON-LD, and GitHub display name all use "Aboy"; the repo, demo byline, and every commit in *this* repository use "Avoy" — see NEW-1). Reconcile the ServicePro README and demo byline to the chosen identity. **Gate 2 — contact surface.** Remove or disable the `/contact` form, the `hello@servicepro.app` address, and the "Talk to me directly" CTA from the deployed demo, or accept that the live URL cannot be linked. **Gate 3 — claims.** Caveat the dashboard figures as seeded demo data, or remove them. **Gate 4 — link.** Add the record with `githubUrl` only; add `liveUrl` only after Gate 2 passes. Because `status: "proof"` requires both links under P1-002's invariant, either complete Gate 2 or add the record as `roadmap` until it can be. Write the case study conservatively — implemented behaviour only, no performance or spam-resistance claims. **Note explicitly: documented `NEXT_PUBLIC_*` variable *names* are not a secret leak, and nothing in this plan should describe them as one.** |
| **Acceptance criteria** | The public identity is consistent across the portfolio, both repositories, and any linked demo. Any linked ServicePro surface exposes no email, no contact form, and no direct-contact prompt. Every claim in the new record maps to verified behaviour. `npm run test` passes. |
| **Verification procedure** | Fetch every linked ServicePro URL in a logged-out private window and grep the rendered page for `mailto:`, `@`, `whatsapp`, `contact`, and "directly". Confirm the byline matches the portfolio identity. Walk the full link graph from the portfolio footer and confirm no direct contact channel is reachable. `npm run test` and `npm run build` pass. |
| **Expected commit message** | `feat(work): add ServicePro Lead Engine case study` |

---

### P2-006 — Scope the universal deliverable claims

| | |
|---|---|
| **Goal** | Replace "ships with every project" with language the evidence actually supports. |
| **Current problem** | `/services` presents seven items under "What ships with every project", including "PDF reports" and "GitHub documentation". No project in `projects.ts` produces PDFs, and `clientflow-os`'s README is still starter text. |
| **Verified evidence** | `src/app/services/page.tsx:47-55` — `commonDeliverables` includes `PDF reports` and `GitHub documentation`. **Contra the original audit**, evidence for PDF reporting does exist at account level: `business-expense-sales-dashboard` is publicly described as producing "Excel and PDF report exports" (D-10). `clientflow-os` README verified as default Create Next App text on 2026-09-01. |
| **Why it matters** | The defect is the universality, not the capability. "Every" is a promise a buyer can hold against a delivery, and it is currently unevenly evidenced. This is conversion copy about future work, which is legitimate to offer — it just needs accurate scoping. |
| **Files likely affected** | `src/app/services/page.tsx` |
| **Implementation approach** | Reframe the heading from "What ships with every project" to capability language — "What I typically deliver" or "Standard deliverables, scoped per project". Keep every item, including PDF reports: the capability is evidenced, just not universal. **Do not add a PDF library to this repository to justify the copy** (§8) — this portfolio has no forms and no reports to generate. |
| **Acceptance criteria** | No deliverable is promised for "every project" without evidence. All seven items are retained under scoped framing. No new dependency. |
| **Verification procedure** | `grep -rn "every project" src/` → no unsupported hit. Read `/services` and confirm no absolute commitment. `git diff package.json` → empty. |
| **Expected commit message** | `fix(services): scope deliverables instead of promising them universally` |

---

### P2-007 — Add engineering depth to the proof case study

| | |
|---|---|
| **Goal** | Give a technical evaluator something to assess beyond feature bullets. |
| **Current problem** | Case studies run Overview → Problem → Solution → Features → Business value with no architecture note, no explicit limitations section, and no trade-off discussion. |
| **Verified evidence** | `src/app/work/[slug]/page.tsx` section sequence, read directly. `honestyNote()` at `:47-51` is the only limitation-shaped content and is a single generated sentence. No architecture or trade-off content exists in the `Project` interface. |
| **Why it matters** | Engineering evidence. After P0-001, FieldOps is a real system with a real data pipeline — generation, SQLite load, a SQL query library, a Streamlit front end. Explaining one design decision and one honest limitation is the difference between a project listing and a case study, and it extends the honesty pattern the site already does well rather than inventing a new one. |
| **Files likely affected** | `src/data/projects.ts` (optional `architectureNote` and `limitations` fields), `src/app/work/[slug]/page.tsx` (render them) |
| **Implementation approach** | Add two optional fields to the `Project` interface — `architectureNote?: string` and `limitations?: string[]` — so roadmap projects can omit them and existing records stay valid. For FieldOps, write from the real repository: how generated data flows to SQLite, why the SQL query library is separate from the presentation layer, and one honest trade-off. State limitations plainly: seeded rather than production data; no authentication; no tests; Streamlit constrains layout control. Keep it short — a paragraph and a short list, not a document. |
| **Acceptance criteria** | The FieldOps case study carries an architecture note and a limitations list, both traceable to the repository. Roadmap projects render unchanged when the fields are absent. No claim of tests, CI, or security controls appears. |
| **Verification procedure** | `npx tsc --noEmit` confirms the optional fields do not break existing records. `npm run test` passes. Read the architecture note against the repository structure and confirm every statement is checkable. Confirm the two roadmap pages render with no empty section. |
| **Expected commit message** | `feat(work): add architecture and limitations to the FieldOps case study` |

---

### P2-008 — Correct the homepage heading hierarchy

| | |
|---|---|
| **Goal** | Give the homepage a heading outline that describes its structure. |
| **Current problem** | The homepage goes `h1` → `h3` with no intervening `h2`, because the trust-badges section emits three `<h3>` elements without a section heading. `/start` and `/process` use `h2` for card titles at the same level as section headings, flattening the outline. |
| **Verified evidence** | `src/components/home/trust-badges.tsx:59` emits three `<h3>` in a section with no `<h2>`. Heading sequences extracted from built HTML: `/` → `h1 → h3 h3 h3 → h2 …`; `/process` and `/start` flattened. Every page has exactly one `<h1>` — verified across all 8 routes, and that must be preserved. |
| **Why it matters** | Screen-reader users navigate by heading. An outline that cannot distinguish a section from an item inside it makes the page harder to scan. **Framing per D-15: this is a semantic-quality defect, not an asserted WCAG violation** — no assistive-technology testing has been done, and standing constraint 4 forbids conformance claims in either direction. |
| **Files likely affected** | `src/components/home/trust-badges.tsx`, `src/app/start/page.tsx`, `src/app/process/page.tsx` |
| **Implementation approach** | Add a real `<h2>` to the trust-badges section — visible if it improves the page, `sr-only` if the design has no room. Demote card titles on `/start` and `/process` from `h2` to `h3` so they sit under their section heading, matching the convention every other page already follows. Change nothing about the single-`h1` rule. |
| **Acceptance criteria** | No page skips a heading level. Card titles sit one level below their section heading. Exactly one `<h1>` per route, unchanged. |
| **Verification procedure** | `npm run build`, then `grep -oE '<h[1-6][ >]' .next/server/app/index.html` and confirm no skip; repeat for `start.html` and `process.html`. `grep -c '<h1' ` on each route → exactly 1. Inspect the outline in a browser accessibility panel. |
| **Expected commit message** | `fix(a11y): repair heading hierarchy on home, start, and process` |

---

## 7. Final P3 — Polish and Optional Improvements

Ten tasks. None blocks anything. Several should only be done opportunistically, when the affected file is already open for higher-value work.

---

### P3-001 — Consolidate the manifest and delete dead assets

| | |
|---|---|
| **Goal** | One manifest, no orphaned files. |
| **Current problem** | Two sources resolve to `/manifest.webmanifest` with different names, theme colours, and icon sets. Seven files in `public/` are unreferenced, including a purpose-built maskable icon that the winning manifest does not use. |
| **Verified evidence** | `public/manifest.webmanifest` (name "Aboy Systems Portfolio", `theme_color: #111827`, maskable → `icon-maskable-512.png`) vs `src/app/manifest.ts` (name "Aboy Systems — Business Web Apps", `theme_color: #0e0e15`, maskable → `icon-512.png`). The built artifact deterministically contains the `manifest.ts` values. `layout.tsx` `viewport.themeColor` is `#0e0e15`, agreeing with `manifest.ts` and disagreeing with the static file. Reference counts from `src/`: `favicon-old.ico` 0, `file.svg` 0, `globe.svg` 0, `next.svg` 0, `vercel.svg` 0, `window.svg` 0, `icon-maskable-512.png` 0 (61,928 bytes). |
| **Why it matters** | Configuration hygiene, and one small real defect: a correct maskable icon exists in `public/` while the active manifest reuses the standard square for `purpose: "maskable"`, which Android will crop. **Per D-16 and Codex U-08, do not claim an install-prompt bug** — none was demonstrated. |
| **Files likely affected** | delete `public/manifest.webmanifest`, `src/app/manifest.ts`, delete 6 create-next-app leftovers |
| **Implementation approach** | Delete the static manifest and keep the metadata route, which the local Next docs recommend. Point the `purpose: "maskable"` entry at the existing `icon-maskable-512.png`. Delete `favicon-old.ico`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`. Verify each has zero references before deleting. |
| **Acceptance criteria** | Exactly one manifest source. `theme_color` matches `layout.tsx`. The maskable entry points at the padded icon. No deleted file is referenced anywhere. |
| **Verification procedure** | `npm run build`, then fetch `/manifest.webmanifest` and confirm the expected values. Run Lighthouse PWA/installability. `grep -rn "file.svg\|globe.svg\|next.svg\|vercel.svg\|window.svg\|favicon-old" src/ public/` → empty. Install the PWA on Android and confirm the icon is not cropped. |
| **Expected commit message** | `chore(pwa): consolidate the manifest and remove unused assets` |

---

### P3-002 — Add Escape-to-close to the mobile disclosure

| | |
|---|---|
| **Goal** | The one piece of the audit's mobile-menu recommendation that is actually appropriate. |
| **Current problem** | The disclosure has no keyboard dismissal. Because the header is `sticky z-50`, an open panel visually overlays content, so a keyboard user has no quick way to close it. |
| **Verified evidence** | `navbar.tsx:14-17` — no `keydown` handler. Header is `sticky top-0 z-50`. The panel already closes on link click via `closeMenu` (line 78). |
| **Why it matters** | Small usability improvement for keyboard users. **Explicitly not** a focus trap, `inert`, body scroll lock, outside-click handler, or focus restoration — this is a disclosure, not a modal (D-8), and that machinery would add state and failure modes for no benefit. |
| **Files likely affected** | `src/components/layout/navbar.tsx` |
| **Implementation approach** | Add a `keydown` listener while `open` is true that calls `closeMenu` on Escape and returns focus to the toggle. Roughly ten lines. Nothing else. |
| **Acceptance criteria** | Escape closes the menu and focus returns to the toggle. No focus trap, no scroll lock, no `inert`. The disclosure semantics are unchanged. |
| **Verification procedure** | Open the menu with the keyboard, press Escape, confirm it closes and focus is on the toggle. Confirm Tab still moves naturally into page content when the menu is closed. Confirm no scroll behaviour changed. |
| **Expected commit message** | `feat(nav): close the mobile disclosure on Escape` |

---

### P3-003 — Measure, then reduce, front-end payload

| | |
|---|---|
| **Goal** | Decide whether the bundle is a problem, using measurement rather than assumption. |
| **Current problem** | The homepage requests ~802 KB raw / ~245 KB gzip of JavaScript for a mostly static brochure whose only interactivity is a menu toggle and native `<details>`. Three font families ship 18 WOFF2 files totalling ~357 KB. |
| **Verified evidence** | Both reviews independently measured ~802 KB raw / ~245-251 KB gzip across 11-13 chunks. `Reveal` is used 65 times across 18 files and imports framer-motion, which lands in the shared chunk every route loads. `layout.tsx:8-21` loads Inter, Geist, and Geist Mono; all three are genuinely referenced in `globals.css:42-46`. |
| **Why it matters** | Real, but **must follow P0-003 and must be evidence-led**. The audit's stated mechanism was wrong (D-6): server children are not bundled into the client. The genuine cost is framer-motion plus 65 hydrated islands. Once P0-003 makes content visible by default, the animation may be reducible or removable entirely — and that decision needs a measurement, not a guess. |
| **Files likely affected** | `src/components/motion/reveal.tsx`, `src/app/layout.tsx`, various call sites |
| **Implementation approach** | Measure first: record route-level JS, LCP, and INP after P0-003 lands. Then test one change at a time — replace framer-motion in `Reveal` with a CSS-only implementation; reduce `Reveal` instances where the animation adds nothing; drop one font family if Inter and Geist prove visually redundant at the sizes actually used. Keep only changes with a material measured delta. |
| **Acceptance criteria** | Before/after numbers are recorded for every change kept. No visual regression at any breakpoint. Reduced-motion behaviour from P0-003 and P1-006 is preserved. |
| **Verification procedure** | `npm run build` and compare per-route chunk sizes before and after. Lighthouse on `/` and one case study, throttled, three runs, median reported. Confirm no layout shift is introduced. |
| **Expected commit message** | `perf(motion): reduce client payload after measurement` |

---

### P3-004 — Opportunistic deduplication

| | |
|---|---|
| **Goal** | Remove duplication when the file is already open — not as a dedicated refactor. |
| **Current problem** | The `serviceIcons` map is defined identically twice; three CTA implementations exist; `Section` is used by home components but bypassed by all seven files under `src/app/`. |
| **Verified evidence** | `services/page.tsx:41-45` and `services-preview.tsx:13-17` — identical maps. `work/[slug]/page.tsx:385-408` hand-rolls what `PageCta` provides. `src/components/ui/section.tsx:4-27` is used by 6 home components; every `src/app/` route hand-rolls `<section>` + `<Container>` with repeated class strings. |
| **Why it matters** | Individually trivial. Collectively they mean a copy change requires knowing which of two places to edit — the same failure mode that produced the process divergence in P1-007. But that risk is already handled where it mattered, so per Codex's overengineering point 9, a portfolio-wide primitive cleanup is not worth its own change. |
| **Files likely affected** | `src/app/services/page.tsx`, `src/components/home/services-preview.tsx`, `src/app/work/[slug]/page.tsx`, various |
| **Implementation approach** | Extract `serviceIcons` to a shared module — the one item worth doing on its own, since it is an exact duplicate. Replace the inline case-study CTA with `PageCta` **only if** the visual result is identical. Leave the `Section` inconsistency alone unless a route is being restructured for another reason. |
| **Acceptance criteria** | `serviceIcons` is defined once. Any CTA replacement is visually identical. No route is restructured solely for consistency. |
| **Verification procedure** | `grep -rn "serviceIcons" src/` → one definition. Compare before/after screenshots of any touched CTA at 375px and 1440px. `npm run lint`, `npm run typecheck`, `npm run build` all pass. |
| **Expected commit message** | `refactor(ui): share the service icon map` |

---

### P3-005 — Make a licence decision

| | |
|---|---|
| **Goal** | Decide deliberately whether this repository grants reuse rights. |
| **Current problem** | No `LICENSE` file. The repository is public, so it is visible but not licensed for reuse. |
| **Verified evidence** | Filesystem: no `LICENSE`. `fieldops-analytics-os` carries MIT; `clientflow-os`, `servicepro-lead-engine`, and `aboy-portfolio` carry none. |
| **Why it matters** | Per Codex's priority #10, a licence is a reuse decision, not a quality badge — public visibility does not require granting permission to reuse. For a portfolio whose value is partly that the design is *yours*, "no licence" may be the correct answer. The task is to decide, not necessarily to add. |
| **Files likely affected** | possibly new `LICENSE` |
| **Implementation approach** | Decide: permissive (MIT, matching FieldOps) if the goal is maximum openness; source-available-but-not-licensed (the current state, made explicit in the README) if the design should not be copied wholesale. Either is defensible. If nothing is added, state the choice in the README so it reads as deliberate. |
| **Acceptance criteria** | The choice is recorded somewhere a reader can see. If a licence is added, it is a standard unmodified text with the correct copyright holder and year. |
| **Verification procedure** | Confirm GitHub's repository sidebar reflects the intended state. Confirm the copyright name matches the identity chosen in P2-005 Gate 1. |
| **Expected commit message** | `docs: record the repository licensing decision` |

---

### P3-006 — Stop stamping every sitemap URL with the build time

| | |
|---|---|
| **Goal** | Make `lastmod` a real signal or remove it. |
| **Current problem** | `sitemap.ts` computes `new Date()` once at build time and applies it to all 10 URLs, so every page claims to have changed on every deploy. |
| **Verified evidence** | `src/app/sitemap.ts:6` — a single `new Date()` shared across every entry. Observed in the built sitemap as one identical timestamp on all 10 URLs. |
| **Why it matters** | Search engines discount `lastmod` when all URLs share a build timestamp, so the signal is wasted rather than harmful. Codex's framing is right: false freshness is worse than no date. |
| **Files likely affected** | `src/app/sitemap.ts` |
| **Implementation approach** | Either derive per-route dates from real content-change timestamps, or omit `lastModified` entirely. Omission is the simpler honest option and is preferred unless per-route dates can be sourced without new machinery. |
| **Acceptance criteria** | No two unrelated URLs share a synthetic build timestamp. Either every date is real or none is present. |
| **Verification procedure** | `npm run build`, then read `.next/server/app/sitemap.xml`. Validate against a sitemap validator. |
| **Expected commit message** | `fix(seo): stop stamping every sitemap URL with the build time` |

---

### P3-007 — Prioritise the header logo and recompress the profile image

| | |
|---|---|
| **Goal** | Two small, measurable image wins. |
| **Current problem** | The navbar brand logo renders with `loading="lazy"` despite appearing above the fold in a sticky header on every page. `public/aboy-profile.jpg` is 199,565 bytes for an image that renders at 80×80 and ~240px. |
| **Verified evidence** | Built HTML shows `<img alt="" loading="lazy" width="32" height="32" …>` for the brand logo; `brand-logo.tsx:29-35` omits `priority`. `stat` on `public/aboy-profile.jpg` → 199,565 bytes. `/about` passes `priority` to `ProfilePhoto`; the homepage instance does not. |
| **Why it matters** | Lazy-loading an always-above-the-fold logo delays the header's first paint on every route. The oversized source has minimal runtime impact — `next/image` generates correct variants at build time — so this is repository hygiene more than performance. |
| **Files likely affected** | `src/components/layout/brand-logo.tsx`, `public/aboy-profile.jpg` |
| **Implementation approach** | Add `priority` to the brand logo image. Recompress the profile source to a reasonable maximum dimension and quality. |
| **Acceptance criteria** | The brand logo is not lazy-loaded. The profile source is materially smaller with no visible quality loss at either render size. |
| **Verification procedure** | `npm run build`, then confirm the logo `<img>` no longer carries `loading="lazy"`. Compare the profile photo at 80px and 240px before and after. Check Lighthouse LCP on `/`. |
| **Expected commit message** | `perf(images): prioritise the header logo and recompress the profile source` |

---

### P3-008 — Escape `<` in inline JSON-LD

| | |
|---|---|
| **Goal** | Close a latent injection path before any data becomes externally sourced. |
| **Current problem** | Two inline `<script type="application/ld+json">` blocks use `dangerouslySetInnerHTML` with plain `JSON.stringify`, which does not escape `<`, `>`, or `&`. |
| **Verified evidence** | `src/app/page.tsx:26-29` and `src/app/faq/page.tsx:41-44`. All values are trusted in-repo constants today, so **no live vulnerability exists**. The local Next JSON-LD guide recommends escaping `<` defensively. |
| **Why it matters** | Purely defensive. If any FAQ answer or project field ever contained `</script>`, it would break out of the script context. Both reviews agree this is latent, not current — the plan must not describe it as a vulnerability. |
| **Files likely affected** | `src/app/page.tsx`, `src/app/faq/page.tsx`, possibly a small helper in `src/lib/` |
| **Implementation approach** | Add a tiny serializer that replaces `<` with `<` and use it at both call sites. No dependency. |
| **Acceptance criteria** | Neither block emits a raw `<` from data. Both still validate as structured data. |
| **Verification procedure** | `npm run build`, then run both JSON-LD blocks through a structured-data validator. Temporarily insert `</script>` into a test FAQ answer and confirm the page does not break; revert. |
| **Expected commit message** | `fix(seo): escape angle brackets in inline JSON-LD` |

---

### P3-009 — Run a responsive and accessibility QA pass

| | |
|---|---|
| **Goal** | Convert untested predictions into either confirmed defects or closed items. |
| **Current problem** | Several findings across both reviews are analytical predictions with no browser measurement behind them. |
| **Verified evidence** | The audit states at §12: "No live device or emulator testing was performed — findings below are analytical, and the low-risk assessments are predictions, not verified results." Codex U-11 makes the same point. |
| **Why it matters** | Testing is cheap; carrying unverified findings in a plan is not. Per D-16, these are test cases until reproduced. |
| **Files likely affected** | none unless a failure is reproduced |
| **Implementation approach** | Test at 320, 375, 430, 768, 1024, 1280, 1440px: footer grid density at 768px; footer link target sizes; the 9-10px metric labels after P1-006's contrast change; zoom/reflow at 200% and 400%; `<details>`/`<summary>` keyboard and screen-reader output; external-link announcement; the "coming soon" placeholder (which should have disappeared with P0-001). File a task only for what actually fails at a named viewport. |
| **Acceptance criteria** | Each item is recorded as pass or fail with the viewport and method. Failures become tasks; passes are closed. No fix is made without a reproduced failure. |
| **Verification procedure** | Real device or emulator at each width, with results recorded. Keyboard-only pass through every route. One screen-reader pass on `/` and one case study. Automated axe scan for delta comparison. |
| **Expected commit message** | `docs: record responsive and accessibility QA results` |

---

### P3-010 — Remove the unused `zod` dependency

| | |
|---|---|
| **Goal** | Stop shipping a production dependency the codebase never imports. |
| **Current problem** | `zod@^4.4.3` is declared in `dependencies` and never imported anywhere in `src/`. |
| **Verified evidence** | `package.json` `dependencies` includes `"zod": "^4.4.3"`. `grep -rn 'zod' src/` returns nothing. |
| **Why it matters** | Package hygiene. Per Codex's priority #19 this is bundle-neutral here, so it is not a release blocker. The *claim* side — `tech-stack.ts:112` "Validates every form and import" — is already handled by P0-002, and that separation matters: Zod is genuinely used in `servicepro-lead-engine`, so the capability is real even though this repository does not exercise it. |
| **Files likely affected** | `package.json`, `package-lock.json` |
| **Implementation approach** | Remove `zod` from `dependencies` and refresh the lockfile. Do this alongside P1-004 if convenient, so there is only one lockfile churn. **Do not remove Zod from the tech-stack grid** — the capability is evidenced elsewhere on the account. |
| **Acceptance criteria** | `zod` is absent from `dependencies`. Lint, typecheck, test, and build all pass. Zod remains in the tech-stack grid with the scoped wording from P0-002. |
| **Verification procedure** | `npm run lint` · `npm run typecheck` · `npm run test` · `npm run build` · `npm audit --omit=dev` shows no new entry · confirm `/` still renders the Zod tile. |
| **Expected commit message** | `chore(deps): remove unused zod dependency` |

---

## 8. Deferred Work

Ideas from either review that should **not** be implemented now, each with the reason.

| Item | Source | Why deferred |
|---|---|---|
| `SECURITY.md` | Claude P1-009 | A static personal portfolio with no authentication, no user data, and no API has essentially no disclosure surface. A reporting policy nobody maintains is worse than none. Add only if a real process will exist |
| `CHANGELOG.md` | Claude P1-010 | Git history plus tags already provide release visibility. A hand-maintained changelog on a solo portfolio drifts within weeks and adds nothing a client reads |
| `CONTRIBUTING.md` | Claude P1-011 | There are no outside contributors and none are invited. Contribution machinery for a repository with one author is documentation theatre |
| PR and issue templates | Claude P1-013 | The repository has no PR-based workflow — branches are pushed and merged directly. Templates for a workflow that is not used prove nothing |
| Branch protection | Claude §17.5 | Same reason. Meaningful only once CI (P1-003) is green and a PR workflow is actually adopted. Revisit then |
| Three separate `docs/` documents (`ARCHITECTURE.md`, `DEPLOYMENT.md`, `DECISIONS.md`) | Claude P1-012 | One README section (P1-008) is more credible because it stays current. Three documents on a project this size guarantee at least two go stale |
| A general test framework (Vitest component tests, Playwright E2E) | Claude P1-004 | Testing `cn()` or a slug getter proves nothing. The one high-value check — data invariants — is P1-002 and needs no framework. Revisit E2E only if interactive features are added |
| Dependabot | Claude P1-007 | Useful automation, but only after CI exists to validate its PRs and a triage habit exists to act on them. Otherwise it produces PRs nobody merges — worse than silence. Revisit after P1-003 has been green for a few weeks |
| Nonce-based CSP | Claude §9.3 / §17.4 | **Architecturally impossible without abandoning static rendering.** Confirmed against `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`. The trade would be worse than the gain |
| Hash-based `script-src` CSP | Claude §9.3 option (a) | Requires SHA-256 hashes covering both JSON-LD blocks *and* Next's bootstrap scripts, and silently breaks structured data when it drifts. P1-005 delivers most of the value at near-zero risk. Revisit only if a real script-injection surface appears |
| HSTS `includeSubDomains` / `preload` | Claude §17.4 | Cannot be safely enabled without auditing every subdomain, and `preload` is effectively irreversible. An availability risk, not a security win |
| `Cross-Origin-Opener-Policy` | Claude §9.1 | No cross-origin window interaction exists on this site. No demonstrated need |
| Moving all page copy into `src/data/` | Claude P2-013 | Page-specific prose is maintainable colocated. P1-007 moves the content that was actually causing divergence; P1-008 corrects the README claim. Moving the rest is churn |
| `Service`, `BreadcrumbList`, `Organization`, `WebSite` schema | Claude P2-012 | Speculative SEO with uncertain value, and each addition is another claim to keep true. `Person` and `FAQPage` already exist. An OG image (P2-001) and real screenshots (P2-002) are worth more |
| Adding a PDF library to justify the "PDF reports" copy | implied by Claude §6.6 | Inverts the standing constraint — change the claim, not the code. This portfolio has no forms and no reports to generate |
| Mobile-menu modal machinery | Claude P1-016 | Wrong pattern for a disclosure (D-8). Only Escape-to-close survives, as P3-002 |
| Rewriting git history to scrub the commit email | implied by NEW-1 | Disproportionate. Rewriting 17 commits invalidates every existing clone and reference to fix metadata that the profile-level changes in P0-004 already make hard to find. The forward-looking fix (private email setting) is sufficient; the residual is stated honestly rather than papered over |
| A dedicated `/engineering` route | Claude §17 (implied) | There is nothing verified to put on it yet — no tests beyond P1-002, no releases, no CI history. A page promising engineering depth the repository cannot back is exactly the theatre this plan is removing. See §9 |
| Automating the availability copy | Claude P2-014 | A CMS or scheduled job to update one sentence. Manual update at launch, on the checklist |
| Building ShopPulse to justify its case study | implied by Claude §17.2 | The label is honest; the copy is correctly framed as a spec. Build it because it is worth building, not to rescue a page |
| Changing `/faq` `<summary>` elements into headings | Claude P2-008 | `<details>`/`<summary>` is valid disclosure semantics. Any change should follow assistive-technology testing (P3-009), and invalid heading/summary nesting must be avoided |

---

## 9. Final Portfolio Architecture

**No new routes.** The existing eight-route structure is correct for this business and no reconciled finding justifies expanding it.

| Route | Purpose | Change under this plan |
|---|---|---|
| `/` | Problem → capability → proof → process → CTA | Hero mock relabelled (P0-002); tech-stack absolutes scoped (P0-002); featured order leads with proof (P2-003); process preview derived from canonical data (P1-007); heading hierarchy repaired (P2-008); content visible without JS (P0-003) |
| `/work` | All projects with honest status labels | FieldOps first; `metricsNote` rendered on cards (P2-003); real screenshots (P2-002); ServicePro added once gated (P2-005) |
| `/work/[slug]` | Case studies and build plans | FieldOps rebuilt from the repository (P0-001); live and source links live; architecture note and limitations (P2-007); roadmap heading corrected (P2-004) |
| `/services` | Three services with deliverables | Universal deliverable claims scoped (P2-006) |
| `/process` | Six-step process, canonical | Becomes the single source for process content (P1-007) |
| `/about` | Who, how, current focus | Unchanged. The "start of my freelance career" candour is protected |
| `/faq` | Straight answers, marketplace rules | One tech-stack answer widened to acknowledge Python/SQL work (P0-002). Disclosure semantics unchanged pending testing |
| `/start` | How to begin, platform-only funnel | Unchanged. Already in the navbar at every viewport (D-9) |

### On `/engineering`

**Not justified — do not add it.** The case for a dedicated engineering page rests on artifacts that do not exist: no test suite beyond the single invariant check in P1-002, no CI history until P1-003 has run, no releases, no tags, no architecture documents. A route promising engineering depth the repository cannot back would be exactly the theatre this plan removes.

Engineering evidence has better homes: **inside case studies** (P2-007), where a buyer is already evaluating; **in the README** (P1-008), where a technical reviewer looks; **in the repository itself**, as a green CI check and readable commits. Revisit only when there are at least two `proof` projects with real screenshots, CI green for a sustained period, and something to say that the case studies cannot hold.

### Structural rules that must survive every change

1. Every route stays statically prerendered. No route becomes dynamic.
2. Exactly one `<h1>` per route.
3. Per-page self-referencing canonicals.
4. `ProjectStatus` stays a closed union; every project declares `proof` or `roadmap`.
5. `honestyNote()` and `metricsNote` render wherever their data renders.
6. `liveUrl` / `githubUrl` / `image` stay nullable with safe degradation.
7. No contact field is ever added to `site.ts`. The hard-constraint comment at `site.ts:13-18` stays.

---

## 10. Engineering Proof Strategy

The minimum credible proof system for this portfolio — no more.

### The principle

> **Show fewer projects, and make every one of them verifiable.**

The current structure inverts this: it leads with a specification that has no code and hides the deployed application. The fix is reallocation, not construction.

### The seven proof surfaces

| Surface | Minimum credible standard | Status after this plan |
|---|---|---|
| **GitHub repositories** | Link only repositories that are presentation-ready — a real README, a coherent commit history, and no contact exposure. A default Create Next App README is weaker evidence than no link at all | FieldOps linked at P0-001. ClientFlow linked only after its README is replaced (P2-004). ServicePro linked only after the identity gate (P2-005). ShopPulse has no public repository and must not be implied to have one |
| **Live demos** | Link only demos that resolve **and** are contact-clean | FieldOps at P0-001. ServicePro gated behind contact sanitisation (P2-005). Roadmap projects link nothing, and the "coming soon" placeholder disappears rather than persisting |
| **Screenshots** | Real captures of running software, unretouched. `MotifPreview` remains the honest fallback for roadmap projects | FieldOps at P2-002. The distinction between real capture and CSS motif is itself an honesty signal and must be preserved |
| **Documentation** | One README architecture section, one architecture note plus limitations per proof case study. Not a document suite | P1-008 and P2-007 |
| **Tests** | **One** invariant check over `projects.ts` — the exact class of defect that caused this plan's P0 tier. Not a coverage target, not component tests, not E2E | P1-002 |
| **CI** | **One** workflow running lint, typecheck, test, and build — four commands that already pass. A public green check on every commit, requiring no new claim | P1-003 |
| **Release / version proof** | Git history plus tags at meaningful milestones. **Not** a hand-maintained changelog | Existing history; tags optional. `CHANGELOG.md` deferred (§8) |

### What must not be claimed

Until each artifact provably exists and has run: no claim of tests, no claim of CI, no claim of security controls, no claim of WCAG conformance, no CI badge in the README. The site does not currently make any of these claims — that restraint is correct and must survive every task in this plan.

### The asymmetry worth remembering

The proof already exists. `fieldops-analytics-os` (23 commits, MIT, deployed), `servicepro-lead-engine` (deployed, on-stack), `business-expense-sales-dashboard`, `ai-lead-tracker-crm`, `gadget-retail-intelligence-os`, and `study-abroad-tracker` are all public right now. **The gap is connection, not substance** — which is why the P0 tier is mostly data edits and link additions rather than construction.

---

## 11. Marketplace-Safe Architecture

### One portfolio, contact-clean at the strictest denominator

Do not build platform-specific variants. A single deployed site cannot serve different link sets to different marketplaces without detection logic nobody will maintain, and a reviewer on any platform can see the same page as everyone else. Build one version that satisfies the strictest rule set, and let each channel link to it.

### What stays, what goes, and why

| Element | Decision | Reasoning |
|---|---|---|
| **GitHub repository and profile links** | **Keep** | This is the entire proof strategy. The exposure verified in D-1 is on the *account*, not in the link — so it is fixed at the account (P0-004), and the proof is preserved. This is the least restrictive solution that closes the risk |
| **LinkedIn footer link** | **Remove** | Zero proof value, and it is a direct-messaging channel — the clearest policy risk on the site. Removing the one link with no engineering evidence behind it costs nothing (D-13). **The LinkedIn channel itself is unaffected**: traffic flows LinkedIn → site, and the site does not need to link back |
| **Empty-href Upwork and Fiverr socials** | **Keep as-is** | `footer.tsx:34` filters them before render, so no broken or placeholder profile link can leak. This is good defensive design |
| **`/start` platform-only funnel** | **Keep and protect** | It is the mechanism that makes the whole approach work |
| **`/faq` off-platform payment refusal** | **Keep verbatim** | Explicitly refusing off-platform payment is a genuine trust asset |
| **The `site.ts:13-18` hard-constraint comment** | **Keep verbatim** | It is why the constraint has held. Structural enforcement beats discipline |
| **ServicePro live demo** | **Gate** | Contains an email, a contact form, and a "Talk to me directly" CTA (D-2). Source-only is the safe interim; the live link waits for sanitisation |
| **`avoy-portfolio`** | **Decide deliberately** | Public, on the same account, and described as containing a Supabase contact form. Archive it, mark it superseded, or accept it knowingly — but do not leave it undecided |

### Per-channel posture

| Channel | Posture after P0-004 | Notes |
|---|---|---|
| **Upwork** | Safe to link | Upwork treats social handles as contact information and restricts contact details on linked sites before a contract. After the LinkedIn removal and the GitHub account sanitisation, the site exposes neither. GitHub repository links are conventional work evidence |
| **Fiverr** | Safe to link | The strictest of the four on anything routing a buyer off-platform. The same two changes satisfy it. `/faq`'s explicit refusal of off-platform payment helps rather than hurts |
| **Freelancer** | Safe to link | Requires platform communication and prohibits publishing contact details. Same two changes |
| **LinkedIn** | Safe to link, and unaffected by the removal | LinkedIn's own services workflow permits messaging through LinkedIn. The credibility work — P0-001, P0-002, P2-001, P2-002 — matters far more here than link policy |

### The verification that actually matters

Marketplace safety cannot be verified by grepping local HTML — that was the error in the original audit's §10.1. **Verify the whole outbound graph, logged out:**

1. Open the deployed site in a logged-out private window.
2. Follow every outbound link.
3. On each destination, look for an email, phone, WhatsApp, Telegram, calendar link, or contact form.
4. Follow one further hop from each destination.
5. Record what a reviewer can reach and in how many clicks.

Re-run this before publishing and whenever a link is added. **Marketplace rules change** — re-check the current policy text at launch rather than treating any review, including this one, as permanent approval.

---

## 12. Implementation Phases

### PHASE 0 — Truth and consistency

**Tasks:** P0-001 · P0-002 · P0-004
**Gate to exit:** No published claim contradicts a verifiable fact. Zero `TODO` strings in `src/data/`. No sitewide technology absolute survives. No direct contact channel is reachable in one click from the footer. Both FieldOps links resolve.
**Why first:** Every downstream task amplifies whatever the site says. Publishing a proof link before the page it proves is accurate makes the contradiction *easier* to find, not harder.

### PHASE 1 — Engineering foundation

**Tasks:** P1-001 · P1-002 · P1-003 · P1-007 · P1-008
**Gate to exit:** CI green on the branch. `npm run typecheck` and `npm run test` exist and pass. One source of truth for process content. Every factual statement in the README verified.
**Note:** P0-003 can run in parallel with this phase — it touches one isolated file and blocks nothing.

### PHASE 2 — Portfolio proof and conversion

**Tasks:** P2-001 · P2-002 · P2-003 · P2-004 · P2-006 · P2-007 · P2-005 (gated)
**Gate to exit:** Share previews render with an image. At least one real screenshot of running software. Featured order leads with proof. Metrics qualified everywhere they appear. No universal deliverable promise. P2-005 exits only when its four gates pass — it may legitimately remain open past this phase.

### PHASE 3 — Security and reliability

**Tasks:** P1-004 · P1-005 · P3-008 · P3-010
**Gate to exit:** `npm audit --omit=dev` clean, or every remainder documented as inapplicable with a reason. Baseline headers live and verified on the deployed response. No dependency ships unused.
**Deliberately excluded:** nonce CSP, hash-based `script-src`, HSTS preload, COOP (§8).

### PHASE 4 — Accessibility and performance

**Tasks:** P0-003 *(if not already run in parallel)* · P1-006 · P2-008 · P3-003 · P3-007 · P3-009
**Gate to exit:** Zero `opacity:0` in prerendered HTML. `--faint` clears 4.5:1 on all three surfaces. No animation runs under reduced motion. No heading skips. Payload changes justified by recorded before/after measurements. QA checklist complete with pass/fail per item.
**Order note:** P0-003 must precede P3-003 — measuring the bundle before the visibility fix would measure the wrong baseline.

### PHASE 5 — UI polish

**Tasks:** P3-001 · P3-002 · P3-004 · P3-005 · P3-006
**Gate:** None. Opportunistic. P3-004 in particular should only happen when the affected file is already open.

### PHASE 6 — Final verification and release

**Tasks:** No new work. Execute the full verification matrix (§13), complete `LAUNCH-CHECKLIST.md` honestly, walk the logged-out outbound link graph (§11), and re-check current marketplace policy text.
**Gate to exit:** §14.

### Movements from the prior roadmap, with reasons

| Item | Was | Now | Reason |
|---|---|---|---|
| ServicePro addition | Phase 1 (P0-006) | Phase 2, gated (P2-005) | Its live demo would import a contact form and an identity contradiction (D-2) |
| ShopPulse demotion | Phase 1 (P0-004) | Phase 2 (P2-003) | Honestly labelled; a ranking problem, not a truth failure (D-5) |
| ClientFlow calibration | Phase 1 (P0-005) | Phase 2 (P2-004) | Same (D-5) |
| Sitewide tech absolutes | *(no task existed)* | Phase 0 (P0-002) | The audit noted it at §7.5 but never scheduled it (D-12) |
| Marketplace contact path | Phase 5 (P2-011) | Phase 0 (P0-004) | Verified one-click email exposure, not a second-order concern (D-1) |
| Security headers | Phase 2 (P1-002) | Phase 3 (P1-005) | Defence in depth on a static site with no state-changing action. Below truth and foundation |
| Process cadence contradiction | Phase 5 (P2-004) | Phase 1 (P1-007) | A client-expectation risk with an architectural root cause (D-20) |
| Reduced motion | Phase 6 (P3-005) | Phase 0 + Phase 4 | Visibility half is P0-003; pulse and navbar halves are P1-006 |
| Test framework | Phase 3 (P1-004) | Phase 1, narrowed (P1-002) | One invariant check, not a framework |
| Governance document suite | Phase 3 (P1-008…013) | Deferred | §8 |
| Footer 768px, touch targets, FAQ headings | Phases 4-6 as findings | Phase 4 as checklist entries (P3-009) | Untested predictions, on the audit's own admission (D-16) |
| `noopener` | Phase 2 (P1-018) | Removed | `noreferrer` implies it (D-7) |
| `/start` in nav | Phase 5 (P2-007) | Removed | It is already there (D-9) |

---

## 13. Verification Matrix

### Commands: what exists today, and what must be created

| Command | Status | Created by |
|---|---|---|
| `npm run dev` | **Exists** | — |
| `npm run build` | **Exists** | — |
| `npm run start` | **Exists** | — |
| `npm run lint` | **Exists**, but bare `eslint` with no warning ceiling | tightened by P1-001 |
| `npx tsc --noEmit` | **Exists** as an ad-hoc invocation; passes at exit 0 | — |
| `npm audit` / `npm audit --omit=dev` | **Exists** | — |
| `npm run typecheck` | **DOES NOT EXIST — must be created** | P1-001 |
| `npm run test` | **DOES NOT EXIST — must be created** | P1-001 (script) + P1-002 (the check) |
| CI workflow | **DOES NOT EXIST — must be created** | P1-003 |

No task's verification procedure in this document invokes `npm run typecheck` or `npm run test` before P1-001 lands.

### Per-task verification

| ID | Primary proof | Supporting checks |
|---|---|---|
| **P0-001** | `grep -n "TODO" src/data/projects.ts` → empty; both published URLs return HTTP 200; rendered case study read side by side against the repository README with no contradiction | `npx tsc --noEmit` · `npm run lint` · `npm run build` · `grep -c "coming soon" .next/server/app/work/fieldops-analytics-os.html` → 0 |
| **P0-002** | `grep -rniE "every (screen\|app\|build\|form\|project)" src/` → every remaining hit reviewed and justified | Read `/`, `/work`, and the FieldOps case study in sequence for cross-page contradictions · build passes |
| **P0-003** | `grep -rc 'opacity:0' .next/server/app/` → **0 across all files** | Manual: JS disabled on every route → full content · reduced-motion enabled → no fade · keyboard tab-through → focus never lands on an invisible element |
| **P0-004** | Logged-out private-window walk of the full outbound link graph, recording what is reachable and in how many clicks | `grep -ri "linkedin" .next/server/app/` → 0 · `sameAs` in JSON-LD shows GitHub only · `github.com/aboychandradas` shows no email logged out · `git log -1 --format='%ae'` on a new commit shows a noreply address |
| **P1-001** | `npm run typecheck` → 0 · `npm run lint` → 0 · `npm run test` → 0 | `git diff package-lock.json` → empty (no dependency added) |
| **P1-002** | `npm run test` → 0 against corrected data | Negative test: set a `proof` project's `liveUrl` to `null` → assertion fails with a readable message; revert. Insert `TODO` into a description → fails; revert |
| **P1-003** | CI run green in the Actions tab on push | Negative test: break a type in a scratch commit → run fails at typecheck; revert. Runtime under ~3 minutes |
| **P1-004** | `npm audit --omit=dev` → zero high-severity, or each remainder documented as inapplicable with a stated reason | `npm audit` · lint · typecheck · test · build · all routes still `○ Static` / `● SSG` · every route loads in `npm run start` with no console error · deprecation notices in `node_modules/next/dist/docs/` reviewed |
| **P1-005** | `curl -I` against the deployed preview shows each header | Both JSON-LD blocks validate · framing attempt from a foreign origin is blocked · no CSP violations in the console on any route · `x-powered-by` still absent |
| **P1-006** | Recomputed contrast: `--faint` ≥ 4.5:1 on `--background`, `--surface`, and `--surface-raised` | DevTools contrast inspector on five `text-faint` sites · reduced-motion enabled → dot static, menu snaps · axe or Lighthouse contrast-violation delta recorded **as evidence, not as a conformance claim** |
| **P1-007** | `grep -rn "every week" src/` → nothing, unless the canonical data now carries it too | Read `/` and `/process` in sequence and confirm step titles match · exactly one source defines process steps · typecheck, lint, build pass |
| **P1-008** | README read line by line against the code, every claim confirmed | `git diff CLAUDE.md AGENTS.md` → **empty** · `grep -rn "favicon.ico" .` → no stale reference · no CI badge unless P1-003 has run green |
| **P2-001** | `grep -o 'og:image[^>]*' .next/server/app/*.html` → present on every route with absolute URLs | LinkedIn Post Inspector plus one other validator · Slack paste renders the card · image legible at thumbnail size |
| **P2-002** | Each screenshot compared side by side with the live deployment; no edited data | Optimised variants emitted by `next/image` · `/work` and case study checked at 375, 768, 1440px · no horizontal page scroll at any width |
| **P2-003** | First featured project on `/` and `/work` is `proof` with working links | `grep -c "Scope figures from the v1 build specification" .next/server/app/work.html` → ≥2 · card layout intact at 375 and 1440px · `npm run test` ordering invariant passes |
| **P2-004** | `grep -c "What I've built so far" .next/server/app/work/*.html` → 0 | ClientFlow page read start to finish: no sentence implies working software · `npm run test` passes |
| **P2-005** | Every linked ServicePro URL fetched logged-out and grepped for `mailto:`, `@`, `whatsapp`, `contact`, "directly" → clean | Byline matches the portfolio identity · full link-graph walk from the footer finds no contact channel · `npm run test` and `npm run build` pass |
| **P2-006** | `grep -rn "every project" src/` → no unsupported hit | `/services` read for absolute commitments · `git diff package.json` → empty |
| **P2-007** | Architecture note read against the repository structure; every statement checkable | `npx tsc --noEmit` confirms optional fields do not break existing records · both roadmap pages render with no empty section |
| **P2-008** | `grep -oE '<h[1-6][ >]' .next/server/app/index.html` → no skip; repeat for `start.html` and `process.html` | `grep -c '<h1' ` on each route → exactly 1 · browser accessibility-panel outline inspected |
| **P3-001** | Fetch `/manifest.webmanifest` and confirm the expected single set of values | Lighthouse PWA/installability · `grep -rn` for each deleted asset → empty · Android install shows an uncropped icon |
| **P3-002** | Manual: open with keyboard, press Escape, menu closes and focus returns to the toggle | Tab order unchanged when closed · no scroll behaviour change |
| **P3-003** | Recorded before/after per-route JS, LCP, and INP for every change kept | Lighthouse throttled, three runs, median · no visual regression at any breakpoint · reduced-motion behaviour preserved |
| **P3-004** | `grep -rn "serviceIcons" src/` → one definition | Before/after screenshots of any touched CTA at 375 and 1440px · lint, typecheck, build pass |
| **P3-005** | GitHub repository sidebar reflects the intended state | Copyright name matches the identity chosen in P2-005 Gate 1 |
| **P3-006** | Built `sitemap.xml` read: no two unrelated URLs share a synthetic build timestamp | Sitemap validator |
| **P3-007** | Built HTML: brand logo `<img>` no longer carries `loading="lazy"` | Profile photo compared at 80px and 240px · Lighthouse LCP on `/` |
| **P3-008** | Both JSON-LD blocks validate as structured data after the change | Negative test: insert `</script>` into a test FAQ answer → page does not break; revert |
| **P3-009** | Written pass/fail per item, with viewport and method recorded | Real device or emulator at 320/375/430/768/1024/1280/1440 · keyboard-only pass on every route · one screen-reader pass on `/` and a case study · axe delta |
| **P3-010** | `zod` absent from `dependencies` | lint · typecheck · test · build · `npm audit --omit=dev` shows no new entry · `/` still renders the Zod tile |

### Cross-cutting checks — run before any release

| Check | Command or method | Expected |
|---|---|---|
| Type safety | `npm run typecheck` | Exit 0 |
| Lint | `npm run lint` | Exit 0, zero warnings |
| Data invariants | `npm run test` | Exit 0 |
| Build | `npm run build` | Success; every route `○ Static` or `● SSG` |
| Production audit | `npm audit --omit=dev` | Zero high, or each remainder documented |
| No hidden content | `grep -rc 'opacity:0' .next/server/app/` | 0 |
| No unresolved markers | `grep -rn "TODO\|FIXME" src/` | Empty |
| No contact methods on site | `grep -rniE "mailto:\|tel:\|whatsapp\|telegram\|calendly\|wa.me\|t.me" src/ public/` | Empty |
| Canonicals | `grep -o '<link rel="canonical" href="[^"]*"' .next/server/app/*.html` | One self-referencing per route |
| Single `h1` | `grep -c '<h1' ` per route | Exactly 1 |
| Social preview | `grep -o 'og:image' ` per route | Present |
| Keyboard | Manual tab-through of every route | Visible focus throughout; no focus on invisible elements |
| No-JS | Manual, JS disabled | Full content on every route |
| Reduced motion | Manual, OS setting enabled | No fade, no pulse, no menu animation |
| Responsive | Manual at 320/375/430/768/1024/1280/1440 | No horizontal page scroll |
| Live deployment | `curl -I` on the production URL | HTTP 200; expected headers present |
| Outbound link graph | Manual, logged out, two hops | No direct contact channel reachable |

---

## 14. Final Definition of Done

Aboy Systems portfolio v2 is ready to use professionally when **all** of the following are true.

### Truth — non-negotiable

- [ ] Every technology named on any page matches what the corresponding project actually uses.
- [ ] Every displayed metric is traceable to a documented fixture, query, or scope specification — or has been removed.
- [ ] Zero `TODO` or `FIXME` strings in `src/`.
- [ ] No sitewide claim asserts that *every* project uses a given technology.
- [ ] No page contradicts another page.
- [ ] No invented client, testimonial, revenue figure, user count, or performance result appears anywhere.
- [ ] No claim of tests, CI, security controls, or WCAG conformance exceeds what provably exists.
- [ ] No visual mock carries a real project's name.

### Proof

- [ ] At least one `proof` project has a working live demo link and a working source link.
- [ ] At least one real screenshot of running software is published.
- [ ] Every published link has been verified to resolve **and** to be contact-clean.
- [ ] `roadmap` projects are labelled as such and are not ranked ahead of shipped work.
- [ ] No repository is linked whose README is still starter text.
- [ ] The site does not claim that unbuilt work has no implementation — only that no public proof exists.

### Behaviour

- [ ] Zero `opacity:0` in any prerendered HTML file.
- [ ] Every route renders complete, readable content with JavaScript disabled.
- [ ] No animation runs under `prefers-reduced-motion: reduce`.
- [ ] No page skips a heading level; exactly one `<h1>` per route.
- [ ] `--faint` clears 4.5:1 against all three surfaces.
- [ ] No horizontal page scroll at any width from 320px to 1440px.

### Marketplace safety

- [ ] No email, phone, WhatsApp, Telegram, Calendly, or contact form anywhere on the site.
- [ ] No direct-messaging social exit in the footer.
- [ ] The linked GitHub profile shows no email address to a logged-out visitor.
- [ ] The full outbound link graph has been walked logged out, two hops deep, with results recorded.
- [ ] Current marketplace policy text has been re-checked at launch, not assumed from this document.
- [ ] `avoy-portfolio` has been deliberately archived, marked superseded, or knowingly accepted.

### Engineering

- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` all pass.
- [ ] CI runs those four checks and is green on the default branch.
- [ ] `npm audit --omit=dev` reports zero high-severity entries, or each remainder is documented as inapplicable with a stated reason.
- [ ] Baseline security headers are present on the deployed response.
- [ ] The README's factual statements have been verified line by line against the code.
- [ ] `LAUNCH-CHECKLIST.md` is honestly completed — checked where true, left unchecked where not.
- [ ] Every project record satisfies the P1-002 invariants.

### Conversion

- [ ] Sharing the URL renders a card with an image on LinkedIn and at least one other platform.
- [ ] The first project a visitor sees is one they can verify.
- [ ] Every card showing metrics also shows its qualifier.
- [ ] At least one case study carries an architecture note and an explicit limitations list.

### The single sentence

**The portfolio is done when a skeptical technical buyer can check every claim on it in ten minutes and find nothing that is not true.**

---

## 15. NEXT TASK

**NEXT TASK: P0-001 — Rebuild the FieldOps record from the real repository and deployment**

**Why this one.** It is the highest-value verified P0 and the smallest in blast radius — a single-file data edit in `src/data/projects.ts`, one focused commit, fully reversible. All of its evidence is already verified in this document, so implementation requires no further investigation. It is the only P0 with no prerequisite: P0-002 exists specifically to clean up its ripples and cannot be scoped until it lands. And it removes the portfolio's largest active credibility liability — a live, publicly checkable misstatement about the one artifact the entire argument rests on — replacing it with the strongest defensible evidence on the account.

Both prior reviews independently identified this as the first action. The repository evidence supports them.

**Do not implement it yet.**

---

*Reconciliation performed read-only. No production code, configuration, or asset was modified. The three prior audit documents are unchanged.*
