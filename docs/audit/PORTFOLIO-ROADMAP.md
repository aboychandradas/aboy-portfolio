# Aboy Systems Portfolio — Remediation Roadmap

**Companion to:** `docs/audit/PORTFOLIO-AUDIT.md`
**Created:** 2026-09-01
**Repository state:** `portfolio-v2-engineering`, clean working tree
**Status:** Planning only — **nothing in this document has been implemented.**

---

## How to read this document

| Priority | Meaning |
|---|---|
| **P0** | Critical — truth, trust, or broken behaviour. Ship-blocking. |
| **P1** | Engineering foundation — the base everything else stands on. |
| **P2** | Client conversion and case-study depth. |
| **P3** | Polish and optional enhancements. |

**Totals:** 10 × P0 · 19 × P1 · 14 × P2 · 15 × P3 = **58 items**

### Standing constraints — apply to every item

These are non-negotiable and override any suggestion below that appears to conflict.

1. Do not invent clients, testimonials, revenue, users, performance results, or project metrics.
2. Do not represent self-initiated work as paid client work.
3. Do not add email, phone, WhatsApp, Telegram, Calendly, contact forms, or any off-platform contact method.
4. Do not claim tests, CI, security controls, or accessibility conformance until the artifact provably exists.
5. Do not claim formal WCAG compliance at any point.
6. Prefer removing a false claim over building something to justify it.
7. When a claim and reality disagree, **change the claim first**, then decide whether to build.

---

# PHASE 1 — Truth & Proof Correction

**Contains:** P0-001 … P0-010
**Rationale:** Every item here is a factual defect on a live site. Until this phase is complete, all downstream work amplifies inaccurate claims. This phase is almost entirely data edits and link additions — it requires no new features.

---

### P0-001 — FieldOps Analytics OS advertises a technology stack it does not use

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth / project accuracy |

**Problem**
`src/data/projects.ts:282` declares `techStack: ["Next.js", "TypeScript", "Tailwind CSS"]` for FieldOps Analytics OS. The real repository (`github.com/aboychandradas/fieldops-analytics-os`, public, 23 commits, MIT) is a **Python / SQL / SQLite / Streamlit / Plotly** application. The live case study page renders "Next.js" 9×, "TypeScript" 9×, "Tailwind CSS" 7×, and Python/SQLite/Streamlit **0×**.

Supporting copy compounds the error:
- `overview` (line 245): "implements the exact playbook I bring to client work"
- `whatIBuilt[3]` (line 293): "The design language this portfolio shares: dense tables, calm charts"
- `features[5]` (line 276-280): "Responsive layout" — framework-controlled in Streamlit, not authored
- `lessonsLearned[0]` (line 296): "Aggregation logic belongs in one **tested** layer" — the repo has no tests

**Why it matters**
This is the portfolio's only `status: "proof"` project. The entire credibility argument rests on it. A technical reviewer who clicks through to GitHub discovers the contradiction in under a minute, and at that point every other claim on the site becomes suspect. It also violates the file's own honesty rules (lines 1-10).

**Affected files**
- `src/data/projects.ts` — the `fieldops-analytics-os` entry (lines 236-320), `techStack`, `overview`, `solution`, `features`, `whatIBuilt`, `lessonsLearned`
- Downstream (no edit needed, renders automatically): `src/app/work/[slug]/page.tsx`, `src/components/work/project-card.tsx`, `src/components/home/featured-work.tsx`, `src/components/tech/tech-badge.tsx`

**Recommended solution**
Rewrite the entry to describe the build that actually exists:
1. Set `techStack` to `["Python", "SQL", "SQLite", "Streamlit", "Pandas", "Plotly"]`. `src/data/tech-stack.ts` already has icons for Python, Pandas, SQLite, and Streamlit — Plotly will fall back to a text chip via `TechBadge`.
2. Rewrite `overview`, `solution`, and `whatIBuilt` around what the repo does: synthetic data generation, SQLite loading, a 13-file SQL analysis library, and a Streamlit dashboard.
3. Remove `features[5]` ("Responsive layout") or reword it accurately.
4. Remove the word "tested" from `lessonsLearned[0]` unless tests are added (see P1-004).
5. Reframe the positioning honestly and to advantage: this demonstrates **data modelling, SQL, and analytics** — genuine range alongside the Next.js work in P0-006, not a lesser credential.

Do **not** rebuild the project in Next.js to make the claim true. Correcting the description is hours; rebuilding is weeks, and the Python build is already good evidence.

**Dependencies**
None — this is the first item.

**Acceptance criteria**
- [ ] `techStack` matches the technologies actually used in the repository
- [ ] No copy in the entry claims Next.js, TypeScript, Tailwind, or React for this project
- [ ] No copy claims tests, unless tests exist
- [ ] `honestyNote()` still renders and still states this is not paid client work
- [ ] Rendered case study mentions Python/SQLite/Streamlit and no longer mentions Next.js/Tailwind

**Verification procedure**
```bash
npx next build
grep -oE "Next\.js|TypeScript|Tailwind|Streamlit|Python|SQLite" \
  .next/server/app/work/fieldops-analytics-os.html | sort | uniq -c
```
Expect zero Next.js/Tailwind occurrences and non-zero Streamlit/Python/SQLite. Then open the repository README side by side with the case study and confirm every factual claim matches.

---

### P0-002 — FieldOps is labelled "Deployed" while its live demo is hidden

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth / broken behaviour |

**Problem**
`statusLabel` is `"Self-initiated build · Deployed"` and `honestyNote()` states the project was "designed, built, and deployed by me" — but `liveUrl` is `null` (line 315), so `src/app/work/[slug]/page.tsx:69-78` renders a disabled **"Live demo · coming soon"** placeholder. Live verification on 2026-08-30 found that string **4 times** on the FieldOps page. The real demo has been public throughout at `https://fieldops-analytics-os.streamlit.app/`.

**Why it matters**
The page simultaneously asserts "Deployed" and "coming soon" — a self-contradiction visible without leaving the page. A visitor either concludes the claim is false or that the site is broken. Both are worse than the truth, which is that the demo exists and works.

**Affected files**
- `src/data/projects.ts:315` — `liveUrl`
- `src/data/projects.ts:314` — remove the resolved `TODO(aboy)` comment
- Renders via `src/app/work/[slug]/page.tsx:54-93` (`DemoLinks`) and `src/components/work/project-card.tsx:64-74`

**Recommended solution**
Set `liveUrl: "https://fieldops-analytics-os.streamlit.app/"`. Remove the stale TODO. Confirm the URL responds before committing. Consider a short note that the demo runs on generated data — the existing `metricsNote` pattern already establishes this convention.

**Dependencies**
Do together with **P0-001** — publishing the link before fixing the stack description sends visitors to a Streamlit app from a page that says Next.js.

**Acceptance criteria**
- [ ] `liveUrl` is set to the verified working URL
- [ ] "Live demo · coming soon" no longer appears on this project's pages
- [ ] The "Live demo" button renders and opens the demo in a new tab
- [ ] `TODO(aboy)` on line 314 is removed
- [ ] The demo is confirmed loading at the time of the change

**Verification procedure**
```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://fieldops-analytics-os.streamlit.app/
npx next build
grep -c "coming soon" .next/server/app/work/fieldops-analytics-os.html   # expect 0
```
Then click the button on `/work/fieldops-analytics-os` in a browser.

---

### P0-003 — Every source-repository link is null while the repositories are public

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth / trust |

**Problem**
All three projects have `githubUrl: null`. Because the "View Source" button (`src/app/work/[slug]/page.tsx:80-90`) is conditional on that field, **it never renders on any page**. Meanwhile:

| Project | Repository status |
|---|---|
| `fieldops-analytics-os` | Public, 23 commits, MIT |
| `clientflow-os` | Public, 3 commits |
| ShopPulse | **No repository exists** (see P0-004) |

**Why it matters**
`src/data/process.ts:81-84` sells "GitHub from day one — Every project lives in a repository with readable commits — you can watch progress, not just trust it." The site provides no repository link for any project. The proof exists and is public; the site simply refuses to point at it.

**Affected files**
- `src/data/projects.ts:141, 231, 316` — `githubUrl` fields
- `src/data/projects.ts:314` — stale TODO
- Renders via `src/app/work/[slug]/page.tsx:80-90`

**Recommended solution**
Populate `githubUrl` for the two projects that have repositories. Leave ShopPulse `null` until P0-004 is resolved. Verify each URL returns 200 and is public (not just accessible while logged in as the owner) before committing.

**Dependencies**
Coordinate with **P0-001** (FieldOps description must be accurate before inviting inspection) and **P0-005** (ClientFlow copy must be calibrated before linking a 3-commit repo).

**Acceptance criteria**
- [ ] `githubUrl` set for `fieldops-analytics-os` and `clientflow-os`
- [ ] Each URL verified public in a logged-out browser session
- [ ] "View Source" button renders on both case studies
- [ ] ShopPulse remains `null` (no fabricated link)

**Verification procedure**
```bash
for u in fieldops-analytics-os clientflow-os; do
  curl -sS -o /dev/null -w "$u %{http_code}\n" \
    "https://github.com/aboychandradas/$u"
done
npx next build
grep -c "View Source" .next/server/app/work/fieldops-analytics-os.html   # expect >= 1
```
Confirm in a private/incognito window that both repos load without authentication.

---

### P0-004 — ShopPulse Analytics OS is featured first but has no implementation

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth / positioning |

**Problem**
ShopPulse is `featured: true` and appears **first** in `projects.ts`, so it leads both `/work` and the homepage featured section. Verification of all 12 public repositories on `github.com/aboychandradas` confirmed **no repository named `shoppulse*` exists**. There is no code, no demo, and no artifact of any kind.

`whatIBuilt[3]` (line 120) additionally claims "UI direction consistent with my FieldOps build" — asserting design continuity with a Streamlit application (P0-001).

**Why it matters**
The `"roadmap"` label is honest, and a written build spec is legitimate portfolio content. The defect is **prominence**: the portfolio leads with its least substantiated item while a deployed, on-stack application goes unmentioned (P0-006). A visitor who reads top-to-bottom encounters a specification before any evidence.

**Affected files**
- `src/data/projects.ts:54-145` — the ShopPulse entry, especially `featured` (line 144), array position, and `whatIBuilt[3]` (line 120)
- Renders via `src/components/home/featured-work.tsx`, `src/app/work/page.tsx`

**Recommended solution**
Preferred: set `featured: false` and move it last in the array, so deployed work leads. Keep the case study page — a well-written spec is a legitimate writing sample when it is not standing in for proof.

Alternative: remove the entry entirely and reintroduce it once code exists.

Either way, remove or rewrite the FieldOps design-continuity claim in `whatIBuilt[3]`.

**Dependencies**
Should land with **P0-006** so a real project takes the vacated featured slot.

**Acceptance criteria**
- [ ] ShopPulse no longer occupies the first featured position
- [ ] At least one deployed, linked project appears before it
- [ ] `whatIBuilt[3]` no longer claims shared UI direction with FieldOps
- [ ] If retained, the page still labels it clearly as a roadmap
- [ ] No fabricated repository or demo URL is added

**Verification procedure**
```bash
npx next build
```
Load `/` and `/work`; confirm the first project card shows a deployed status with working demo and source links. Confirm ShopPulse still renders its roadmap badge and honesty note wherever it appears.

---

### P0-005 — ClientFlow OS copy overstates a 3-commit starter repository

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth |

**Problem**
The case study renders the heading **"What I've built so far"** (`src/app/work/[slug]/page.tsx:325`) above four bullets describing a completed v1 specification, an 11-screen inventory, a relational data model, a three-role permission matrix, and an activity-timeline model. The repository has **3 commits** and a README that is still default Next.js starter text.

**Why it matters**
"Built so far" implies implementation progress. The stack claims are broadly accurate (Next.js/TypeScript/Prisma — a point in the project's favour), but the volume of described design work is not supported by three commits. Once P0-003 links the repository, the gap becomes immediately checkable.

**Affected files**
- `src/data/projects.ts:206-211` — `whatIBuilt` array
- `src/data/projects.ts:154-155` — `overview`
- `src/app/work/[slug]/page.tsx:325` — the conditional heading for `roadmap` projects

**Recommended solution**
1. Reword `whatIBuilt` to describe **design and specification work** explicitly — "specified", "designed", "mapped" rather than language implying shipped software.
2. Change the roadmap heading from "What I've built so far" to something accurate, e.g. "What's specified" or "Design work completed".
3. State the current implementation stage plainly in `overview` — early-stage is fine when labelled; unlabelled it reads as concealment.

**Dependencies**
Must be complete **before or alongside P0-003** — do not link the repository while the copy overstates it.

**Acceptance criteria**
- [ ] No copy implies more implementation than 3 commits support
- [ ] The section heading for roadmap projects does not say "built"
- [ ] `overview` states the actual stage
- [ ] The `roadmap` badge and honesty note remain

**Verification procedure**
Read `/work/clientflow-os` alongside the repository's commit list and file tree. Every bullet must be defensible against what is visible in the repo. Confirm no bullet claims a running feature.

---

### P0-006 — ServicePro Lead Engine (deployed, on-stack) is entirely absent

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Trust / missing proof |

**Problem**
`github.com/aboychandradas/servicepro-lead-engine` is public and live at `https://servicepro-lead-engine.vercel.app`. Stack: **Next.js, React, TypeScript, Tailwind CSS, Supabase, Zod**. Documented features: form submission, Supabase storage, server-side validation, protected admin dashboard, status tracking, notes, search/filtering, CSV export. 8 commits.

It appears **nowhere** in the portfolio — verified by full-tree grep and `git log --all -S "ServicePro"` (both empty).

Four further real projects are also unmentioned: `gadget-retail-intelligence-os`, `business-expense-sales-dashboard` (CSV/Excel cleaning + profit dashboard), `ai-lead-tracker-crm`, `study-abroad-tracker`.

**Why it matters**
This is the strongest asset on the account and the best match to the portfolio's own positioning. Its stack is exactly what the site advertises. Its features map directly onto `/services` → "CRM & Lead Management Systems" and onto the `TrustBadges` claims about type safety and CSV workflows — and Zod validation is genuinely used there, unlike in this repository (P1-017).

`business-expense-sales-dashboard` similarly evidences the `/faq` claim about building dashboards from CSV/Excel, which currently has no supporting artifact.

**Affected files**
- `src/data/projects.ts` — new entry (and optionally a second)
- `src/data/services.ts:100` — `relatedProjectSlug` for `automation-internal-tools` is currently `null` and could point at a real build
- Renders automatically via `/work`, `/work/[slug]`, homepage featured section, and `sitemap.ts`

**Recommended solution**
1. Add ServicePro Lead Engine as `status: "proof"`, `featured: true`, with **both** `liveUrl` and `githubUrl` populated.
2. Write the case study from the repository README and the running demo — no invented metrics. Use `metricsNote` to qualify any figure.
3. Position it as the lead project (P0-004 frees the slot).
4. Consider adding `business-expense-sales-dashboard` to substantiate the CSV/Excel claim.
5. Do not describe it as paid client work. It is self-initiated; the existing `honestyNote()` will state so automatically.

**Dependencies**
Pairs with **P0-004**. Benefits from **P2-002** (screenshots).

**Acceptance criteria**
- [ ] ServicePro appears in `projects.ts` with working `liveUrl` and `githubUrl`
- [ ] Every stated feature is verifiable in the demo or README
- [ ] No invented metrics; any figure carries `metricsNote`
- [ ] Labelled `proof` and self-initiated — not client work
- [ ] Appears in the sitemap and generates a static route

**Verification procedure**
```bash
curl -sS -o /dev/null -w "demo %{http_code}\n" https://servicepro-lead-engine.vercel.app
npx next build   # expect a new /work/servicepro-lead-engine route
grep -c "servicepro" .next/server/app/sitemap.xml.body
```
Then walk the live demo and confirm each listed feature exists.

---

### P0-007 — Unverified metrics shipped with their own TODO markers attached

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth |

**Problem**
`src/data/projects.ts:306` reads `// TODO(aboy): adjust these to match the real seeded build before publishing.` Immediately beneath, published live:

- `"Demo jobs seeded": "500+"`
- `"Dashboard views": "12"`
- `"Report export": "1 click"`

The file header (line 7) carries a matching global TODO. These are the site's **only numeric claims**, and they describe a project whose stack is misstated (P0-001), so their provenance is unestablished.

**Why it matters**
Numbers carry disproportionate weight — they read as measured facts. Publishing figures flagged by their own author as unverified is precisely what the file's honesty rules forbid.

**Affected files**
- `src/data/projects.ts:306-311` — FieldOps `metrics` and the TODO
- `src/data/projects.ts:7` — global TODO
- `src/data/projects.ts:133-137, 223-227` — ShopPulse and ClientFlow scope metrics (spec-derived; verify they match the written specs)

**Recommended solution**
For each metric: verify against the actual repository, or replace with a verifiable figure, or remove it. For FieldOps, count the real seeded rows and the real number of dashboard views in the Streamlit app. Remove every TODO once resolved. Keep `metricsNote` — it is doing real work.

**Dependencies**
Depends on **P0-001** (know what the project actually is before counting).

**Acceptance criteria**
- [ ] Every metric traceable to something countable in the repository or demo
- [ ] No `TODO` comments remain in `projects.ts`
- [ ] `metricsNote` accurately describes each figure's origin
- [ ] No metric implies real-world usage, revenue, or client outcomes

**Verification procedure**
```bash
grep -n "TODO" src/data/projects.ts    # expect no output
```
For each remaining metric, state aloud where the number comes from and confirm it against the repo or demo. Any figure that cannot be sourced is removed.

---

### P0-008 — All page content prerenders at `opacity:0`

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Broken behaviour / rendering |

**Problem**
`src/components/motion/reveal.tsx:19` sets `initial={{ opacity: 0, y: 20 }}` with `whileInView`. Because `Reveal` wraps nearly every content block, the prerendered HTML ships hidden:

| Built file | `opacity:0` elements |
|---|---|
| `.next/server/app/index.html` | **37** (including the `<h1>`) |
| `.next/server/app/work/fieldops-analytics-os.html` | **13** |
| `.next/server/app/work.html` | **5** |

`useReducedMotion()` only zeroes the `y` translate — the opacity fade still runs for reduced-motion users.

**Why it matters**
- **Performance:** the LCP element cannot paint until framer-motion (45.4 KB gzip) loads, React hydrates, and an IntersectionObserver fires.
- **Reliability:** any JS failure yields a blank page.
- **Crawlers:** non-JS-executing bots and link-preview scrapers see hidden content.
- **Accessibility:** links inside unrevealed blocks are focusable while invisible (SC 2.4.7 / 2.4.11 risk).
- **Accuracy:** `README.md` claims the animations respect reduced-motion; only partly true.

**Affected files**
- `src/components/motion/reveal.tsx` (all 27 lines)
- `src/app/globals.css` — if a CSS-first approach is chosen
- `README.md` — the reduced-motion claim

**Recommended solution**
Make animation a **progressive enhancement**: content visible by default, animation layered on top.

Options, cheapest first:
1. **CSS-only reveal** — animate via a CSS class with `@starting-style` or an `IntersectionObserver` that *adds* a class, with the base state visible. Removes framer-motion from the critical path entirely (see P3-009 and §13.2 of the audit).
2. **Keep framer-motion, invert the default** — render visible, and only animate when JS has confirmed it can. Content is never hidden in the served HTML.
3. **Minimum viable** — when `useReducedMotion()` is true, set `initial={{ opacity: 1 }}` so reduced-motion users get content immediately.

Whichever is chosen, **the served HTML must never contain `opacity:0` on content**.

**Dependencies**
None. Independent of the data fixes and can proceed in parallel.

**Acceptance criteria**
- [ ] Built HTML contains **zero** `opacity:0` on content elements
- [ ] Page content is fully readable with JavaScript disabled
- [ ] Reduced-motion users see content immediately, with no fade
- [ ] `README.md`'s reduced-motion claim is accurate
- [ ] Visual result on a normal load is comparable to today

**Verification procedure**
```bash
npx next build
grep -c 'opacity:0' .next/server/app/index.html                    # expect 0
grep -c 'opacity:0' .next/server/app/work/fieldops-analytics-os.html # expect 0
```
Then: disable JavaScript in DevTools and load `/`, `/work`, `/about` — all content must be readable. Enable "Emulate `prefers-reduced-motion: reduce`" and confirm content appears without fading.

---

### P0-009 — Verifiability is promised sitewide and delivered nowhere

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth / trust |

**Problem**
The site promises checkable proof in at least four places:

| Claim | Location |
|---|---|
| "you can check everything yourself" | `src/app/work/page.tsx:41` |
| "habits you can verify in the work and the repos" | `src/app/about/page.tsx` (How I build lede) |
| "Every project lives in a repository… you can watch progress, not just trust it" | `src/data/process.ts:81-84` |
| "leading with proof instead of promises" | `src/app/about/page.tsx` (Current focus 03) |

Today a visitor can verify **nothing**: no demo links, no repo links, no screenshots, no tests, no CI.

**Why it matters**
Promising verification and then failing it is worse than making no promise. It invites the check that discovers P0-001.

**Affected files**
- `src/app/work/page.tsx:41`
- `src/app/about/page.tsx` (two locations)
- `src/data/process.ts:81-84`
- `src/app/services/page.tsx:47-55` (see P2-005, P2-010)

**Recommended solution**
Resolve **by making the claims true** — P0-002, P0-003, and P0-006 supply the links. Then re-read each claim against the finished site and soften any that remain unsupported. Specifically, `process.ts:81-84` says "**Every** project lives in a repository" — if ShopPulse remains with no repo, that word must change.

**Dependencies**
Depends on **P0-002, P0-003, P0-006**. Do this as the phase's closing pass.

**Acceptance criteria**
- [ ] Every verifiability claim is backed by at least one working link on the same page
- [ ] "Every project lives in a repository" is either true or reworded
- [ ] At least two projects expose both a live demo and source
- [ ] No claim survives that a visitor cannot act on

**Verification procedure**
Walk `/`, `/work`, each case study, `/services`, `/process`, and `/about` as a skeptical first-time visitor. For each verifiability claim, attempt the verification it invites. Any claim that cannot be acted on is rewritten. Then click every external link and confirm HTTP 200.

---

### P0-010 — Featured-work lede calls two roadmaps "products"

| | |
|---|---|
| **Priority** | P0 |
| **Category** | Truth |

**Problem**
`src/components/home/featured-work.tsx:17`: *"Self-initiated **products** that prove out real business workflows."* Of the three featured items, one has no repository (P0-004) and one has 3 commits (P0-005). Per-card badges correct this, but the section lede asserts the stronger claim first, and ledes are read first.

**Why it matters**
It is the first description of the work a homepage visitor reads, and it contradicts the labels directly beneath it. It also undercuts the honest-labelling system that is otherwise this portfolio's strongest asset.

**Affected files**
- `src/components/home/featured-work.tsx:17`
- Cross-check: `src/app/work/page.tsx:41` (same theme), `src/app/process/page.tsx:178` ("a deployed build and two fully scoped roadmaps" — accurate today, must be updated as the mix changes)

**Recommended solution**
Reword to describe the actual mix, e.g. "Systems I've designed, built, and deployed — plus scoped roadmaps, each labelled for exactly what it is." After P0-004 and P0-006 change the mix, revisit `process/page.tsx:178` so its count stays correct.

**Dependencies**
Best done after **P0-004** and **P0-006** settle the featured lineup.

**Acceptance criteria**
- [ ] The lede does not describe roadmaps as products
- [ ] `process/page.tsx:178` matches the actual project mix
- [ ] Lede and badges agree

**Verification procedure**
Read the homepage featured section top to bottom; the lede must not be contradicted by any badge beneath it. Grep for "products", "deployed", and "roadmaps" across `src/` and reconcile each against `projects.ts`.

---

# PHASE 2 — Security & Dependency Baseline

**Contains:** P1-001 … P1-003, P1-017, P1-018
**Rationale:** Small, self-contained, high signal. These are the items a technically literate client or competitor can check from outside in seconds.

---

### P1-001 — Six high-severity dependency vulnerabilities

| | |
|---|---|
| **Priority** | P1 |
| **Category** | Security |

**Problem**
`npm audit` reports **6 high-severity vulnerabilities (4 in production dependencies)**:

| Package | Advisory |
|---|---|
| `sharp` `<0.35.0` | libvips: **CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591** |
| `postcss` (nested under `next`) | **GHSA-fxqj-rqcc-2cmp**, **GHSA-r28c-9q8g-f849** — path traversal via `sourceMappingURL` |

`npm audit` states the fix requires **`next@16.3.3`**; the project pins `16.2.10`.

**Why it matters**
Actual exploitability is **low** — `postcss` is build-time only, and `sharp` serves only same-origin local images with no remote patterns configured. The real cost is reputational: a public repository selling engineering judgment carries 4 high-severity production advisories that a one-minor-version bump clears.

**Affected files**
- `package.json` — `next` and `eslint-config-next` version
- `package-lock.json`

**Recommended solution**
Bump `next` and `eslint-config-next` to `16.3.3` together (they should stay in lockstep). Re-run the full check suite. Review the Next.js changelog between 16.2.10 and 16.3.3 for behavioural changes before merging.

> **Note:** this item requires modifying `package.json` / `package-lock.json` and installing dependencies. It is therefore **out of scope for the current documentation-only phase** and must be scheduled explicitly.

**Dependencies**
None, but schedule it where a full regression pass is possible.

**Acceptance criteria**
- [ ] `npm audit` reports 0 high or critical vulnerabilities in production dependencies
- [ ] `npx tsc --noEmit` exits 0
- [ ] `npx eslint .` exits 0
- [ ] `npx next build` succeeds with all routes still static
- [ ] No visual or behavioural regression

**Verification procedure**
```bash
npm audit --omit=dev            # expect 0 high/critical
npx tsc --noEmit && npx eslint . && npx next build
```
Confirm the build output still lists every route as `○ Static` / `● SSG`, then click through all 8 routes locally.

---

### P1-002 — No security headers configured

| | |
|---|---|
| **Priority** | P1 |
| **Category** | Security |

**Problem**
`next.config.ts` is empty. Live headers on `https://aboysystems.com/` (verified 2026-08-30) show **only** `Strict-Transport-Security: max-age=63072000` (Vercel default). Absent: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` / `frame-ancestors`, `Cross-Origin-Opener-Policy`.

**Why it matters**
For a static site with no auth, forms, or cookies, exploitable risk is low — clickjacking is the only gap with real substance. But this portfolio sells engineering judgment, and a prospective client running it through a header scanner sees a failing grade on the developer's own site. Headers are cheap, static-compatible, and directly demonstrable competence.

**Critical constraint — verified from this version's docs**
`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`:

> "To use a nonce, your page must be **dynamically rendered**… Static pages are generated at build time, when no request or response headers exist—so no nonce can be injected."

Every route here is static. **A nonce-based CSP would force the entire site dynamic** and destroy its main performance advantage. Do not implement one.

Also version-specific: in Next.js 16, `middleware.ts` is renamed **`proxy.ts`**.

**Affected files**
- `next.config.ts`
- Constrained by: `src/app/page.tsx:26-29`, `src/app/faq/page.tsx:41-44` (inline JSON-LD)

**Recommended solution**
Use `headers()` in `next.config.ts` — fully compatible with static export.

**Step 1 (safe, do first):**
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `poweredByHeader: false`
- A CSP that sets `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` but **omits `script-src`**

**Step 2 (later, optional):** add `script-src` with SHA-256 hashes for the two JSON-LD blocks plus Next.js's bootstrap scripts. Test in `Content-Security-Policy-Report-Only` first.

Do **not** claim security hardening anywhere in site copy until the headers are live and verified.

**Dependencies**
Step 2 is easier after **P2-012** if JSON-LD moves out of inline scripts.

**Acceptance criteria**
- [ ] Step-1 headers present on every route in production
- [ ] All routes remain `○ Static` / `● SSG`
- [ ] No console CSP violations on any page
- [ ] `x-powered-by` absent
- [ ] No nonce-based CSP introduced
- [ ] No site copy claims security controls beyond what is deployed

**Verification procedure**
```bash
npx next build && npx next start
curl -sS -I http://localhost:3000/ | grep -iE "content-security|x-content-type|referrer|permissions|frame"
```
After deploy, re-run against the live domain and confirm via an external header scanner. Open DevTools console on every route and confirm zero CSP violations.

---

### P1-003 — Two conflicting web manifests serve the same URL

| | |
|---|---|
| **Priority** | P1 |
| **Category** | Configuration defect |

**Problem**
Both `public/manifest.webmanifest` (static) and `src/app/manifest.ts` (generated) resolve to `/manifest.webmanifest`:

| | Static file | Generated |
|---|---|---|
| `name` | "Aboy Systems Portfolio" | "Aboy Systems — Business Web Apps" |
| `theme_color` | `#111827` | `#0e0e15` |
| `background_color` | `#0b1118` | `#0e0e15` |
| Maskable icon | `icon-maskable-512.png` | `icon-512.png` |

The build emits no warning. Precedence between a `public/` file and an App Router metadata route is not reliable across environments. Two secondary defects: the static `theme_color` disagrees with `src/app/layout.tsx:86`, and reusing the standard icon as `maskable` causes Android cropping (maskable icons need safe-zone padding).

**Why it matters**
Which manifest wins is environment-dependent — an install-prompt bug that reproduces in one place and not another.

**Affected files**
- `public/manifest.webmanifest` (stale — candidate for removal)
- `src/app/manifest.ts` (canonical)
- `public/icon-maskable-512.png` (61,928 bytes — referenced only by the stale file)
- `src/app/layout.tsx:86`

**Recommended solution**
Keep exactly one source. Recommended: delete `public/manifest.webmanifest`, keep `src/app/manifest.ts` (typed, DRY, already consumes `site.ts`). Then point `manifest.ts`'s maskable entry at `icon-maskable-512.png` — the correctly padded asset that already exists. Confirm `theme_color` matches `layout.tsx:86`.

> **Note:** deleting a file under `public/` is out of scope for the documentation-only phase; schedule explicitly.

**Dependencies**
None.

**Acceptance criteria**
- [ ] Exactly one manifest source
- [ ] `theme_color` consistent across manifest and `layout.tsx`
- [ ] Maskable icon points at the padded asset
- [ ] DevTools → Application → Manifest shows no warnings
- [ ] `icon-maskable-512.png` is referenced (not orphaned)

**Verification procedure**
```bash
npx next build && npx next start
curl -sS http://localhost:3000/manifest.webmanifest
```
Confirm the served JSON matches `src/app/manifest.ts`. Open DevTools → Application → Manifest and verify no missing-icon or theme warnings.

---

### P1-017 — Unused `zod` dependency, while Zod is advertised in the UI

| | |
|---|---|
| **Priority** | P1 |
| **Category** | Dependency hygiene / accuracy |

**Problem**
`zod@4.4.3` is in `dependencies`, but `grep -rn 'from "zod"' src` returns **no matches**. It is never imported. It is simultaneously advertised in `src/data/tech-stack.ts:109-113` ("Validates every form and import, so bad data stops at the door") and listed in two project `techStack` arrays — while this codebase has no forms and no validation.

**Why it matters**
An unused production dependency is supply-chain surface with zero benefit. The claim/reality gap is minor here (the tech-stack grid describes general capability, not this repo), but P0-006's ServicePro genuinely uses Zod — making the claim honest once that project ships.

**Affected files**
- `package.json` — `dependencies.zod`
- `package-lock.json`
- Context: `src/data/tech-stack.ts:109-113`

**Recommended solution**
Remove `zod` from dependencies. Keep the tech-stack entry — it becomes properly evidenced once ServicePro (which uses Zod) is in the portfolio.

> **Note:** modifies `package.json`; out of scope for the documentation-only phase.

**Dependencies**
Bundle with **P1-001** to do one dependency change and one regression pass.

**Acceptance criteria**
- [ ] `zod` absent from `package.json`
- [ ] Build, type-check, and lint all still pass
- [ ] Tech-stack grid unchanged and evidenced by ServicePro

**Verification procedure**
```bash
grep -rn 'from "zod"' src        # expect no output
npx tsc --noEmit && npx eslint . && npx next build
```

---

### P1-018 — `rel="noreferrer"` without `noopener`

| | |
|---|---|
| **Priority** | P1 |
| **Category** | Security hygiene |

**Problem**
Three locations use `target="_blank" rel="noreferrer"` without `noopener`:
- `src/components/layout/footer.tsx:86-87`
- `src/components/ui/button.tsx:60-61`
- `src/components/work/project-card.tsx:67-68`

**Why it matters**
All modern browsers imply `noopener` when `target="_blank"` is set, so **actual risk is negligible**. It is worth fixing because it is a two-character change that reviewers specifically look for, and because P0-002/P0-003/P0-006 are about to add many more external links through exactly these components.

**Affected files**
The three files above.

**Recommended solution**
Change to `rel="noopener noreferrer"` in all three. Fixing `ButtonLink` covers most future external links automatically.

**Dependencies**
Do before **P0-002/P0-003/P0-006** add link volume, or immediately after.

**Acceptance criteria**
- [ ] All three use `rel="noopener noreferrer"`
- [ ] No `target="_blank"` anywhere lacks `noopener`
- [ ] External links still open in a new tab

**Verification procedure**
```bash
grep -rn 'target="_blank"' src -A2 | grep -c 'noopener'   # must equal target count
npx next build
grep -o 'rel="[^"]*"' .next/server/app/about.html | sort -u
```

---

# PHASE 3 — Engineering Foundation

**Contains:** P1-004 … P1-013, P1-019
**Rationale:** Converts already-true facts (clean lint, clean types, clean build) into publicly visible proof, and supplies the repository furniture a technical evaluator checks for.

---

### P1-004 — No automated tests

**Priority:** P1 · **Category:** Engineering proof

**Problem** No tests exist in this repository or in any project repository (verified: no `tests/`, `__tests__/`, `vitest.config.ts`, `playwright.config.ts`, or `jest.config.js`; no `test` script in `package.json`). Meanwhile `src/data/projects.ts:296` states "Aggregation logic belongs in one **tested** layer" and `src/data/process.ts:92-95` sells "Test checklists".

**Why it matters** The site sells testing discipline as part of the process. A reviewer checking for evidence finds none. **The site does not currently claim this repository has tests — that restraint is correct and must be preserved.** Do not add any testing claim until tests exist.

**Affected files** `package.json` (scripts, devDependencies), new test files, `src/data/projects.ts:296`

**Recommended solution** Start small and honest. A handful of tests on genuinely testable pure logic — `getProjectBySlug` and `featuredProjects` (`src/data/projects.ts:323-327`), `getTechByName` (`src/data/tech-stack.ts:167-169`), `cn` (`src/lib/utils.ts`) — plus **data-integrity tests** that would have caught P0-001: assert every `proof` project has non-null `liveUrl` and `githubUrl`; assert no `TODO` strings remain in `projects.ts`. Avoid heavy component/E2E suites for a static brochure site.

**Dependencies** None. Data-integrity tests are most valuable **after** Phase 1 so they lock in the corrections.

**Acceptance criteria**
- [ ] A test runner is configured with a `test` script
- [ ] Tests cover the pure helpers and project-data invariants
- [ ] A test fails if a `proof` project has a null `liveUrl` or `githubUrl`
- [ ] A test fails if `TODO` appears in `projects.ts`
- [ ] No site copy claims test coverage beyond what exists

**Verification procedure** Run `npm test` — all pass. Then deliberately set a `proof` project's `liveUrl` to `null` and confirm the suite fails. Revert.

---

### P1-005 — No CI pipeline

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `.github/workflows/` exists. Nothing verifies that `main` stays green.

**Why it matters** **This is the cheapest credibility win in the entire roadmap.** The repository already passes `tsc --noEmit`, `eslint`, and `next build` cleanly — verified. A single workflow converts that existing fact into a public green check on every commit, at near-zero cost and requiring no new claims.

**Affected files** New `.github/workflows/ci.yml`; `package.json` scripts (see P1-006)

**Recommended solution** One workflow on push and pull request: install with `npm ci`, then run lint, typecheck, and build. Add `npm test` once P1-004 lands. Pin the Node version to match P1-019. Keep it to a single job — a static site does not need a matrix.

**Dependencies** P1-006 (`typecheck` script) makes it cleaner. P1-001 should land first so CI does not go green on a vulnerable tree.

**Acceptance criteria**
- [ ] Workflow runs on push and PR to `main`
- [ ] Runs lint, typecheck, and build
- [ ] Passes on the current tree
- [ ] The badge/check is publicly visible
- [ ] Fails loudly when a check fails

**Verification procedure** Push a branch and confirm the workflow runs and passes. Then push a deliberate type error and confirm CI fails. Revert and confirm it goes green.

---

### P1-006 — No `typecheck` script; `lint` script is bare

**Priority:** P1 · **Category:** Tooling

**Problem** `package.json` scripts are `dev`, `build`, `start`, `lint`. There is no `typecheck` script despite type safety being an advertised selling point (`trust-badges.tsx:10-13`). The `lint` script is bare `eslint` with no explicit target and no `--max-warnings 0`.

**Why it matters** Type checking is verifiable today but not runnable by a standard command, so CI and contributors must know to invoke `npx tsc --noEmit` manually. Without `--max-warnings 0`, warnings accumulate silently.

**Affected files** `package.json` (scripts only)

**Recommended solution** Add `"typecheck": "tsc --noEmit"`. Change lint to `"lint": "eslint . --max-warnings 0"`. Optionally add a `"check"` script chaining all three.

**Dependencies** None. Do before **P1-005**.

**Acceptance criteria**
- [ ] `npm run typecheck` exists and exits 0
- [ ] `npm run lint` exits 0 with `--max-warnings 0`
- [ ] CI uses the scripts, not raw `npx`
- [ ] `README.md` documents them

**Verification procedure** `npm run typecheck && npm run lint && npm run build` — all exit 0.

---

### P1-007 — No Dependabot configuration

**Priority:** P1 · **Category:** Engineering proof / security

**Problem** No `.github/dependabot.yml`. P1-001 demonstrates the consequence: 6 high-severity advisories accumulated unnoticed.

**Why it matters** Publicly visible, automated, and directly relevant given P1-001. Prevents recurrence rather than repeating the manual audit.

**Affected files** New `.github/dependabot.yml`

**Recommended solution** Weekly `npm` ecosystem updates plus `github-actions` once P1-005 lands. Group minor and patch updates to limit PR noise on a small project.

**Dependencies** Best after **P1-001** so the first run is not flooded.

**Acceptance criteria**
- [ ] `dependabot.yml` present and valid
- [ ] Configured for `npm` and `github-actions`
- [ ] Grouped updates to limit noise
- [ ] First run produces sensible PRs

**Verification procedure** Confirm GitHub → Insights → Dependency graph → Dependabot shows the config as active with no parse errors.

---

### P1-008 — No LICENSE

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `LICENSE` in this repository. Notably, `fieldops-analytics-os` **does** carry MIT — so the practice exists but is applied inconsistently.

**Why it matters** An unlicensed public repository is legally "all rights reserved," which is a mismatched signal for a portfolio inviting inspection. Reviewers check.

**Affected files** New `LICENSE`; optionally a `README.md` reference

**Recommended solution** Add MIT, matching `fieldops-analytics-os`. Consider whether portfolio *content* (copy, case studies) should be licensed differently from code — if so, state the split briefly in the README.

**Dependencies** None.

**Acceptance criteria**
- [ ] `LICENSE` present with correct holder and year
- [ ] GitHub displays the license in the sidebar
- [ ] Consistent with other project repositories

**Verification procedure** Confirm GitHub's repository sidebar shows the license badge.

---

### P1-009 — No SECURITY.md

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `SECURITY.md` exists.

**Why it matters** Standard for a public repository and cheap. **Constraint:** the disclosure contact must not violate marketplace safety — do not publish an email address on the site. GitHub's private vulnerability reporting feature avoids this entirely.

**Affected files** New `SECURITY.md`

**Recommended solution** Enable GitHub private vulnerability reporting and direct disclosures there. Document supported versions and expected response time. Do **not** add an email, and do not link `SECURITY.md` from the site's UI — keep it a repository-level artifact.

**Dependencies** Best after **P1-002** so it can describe headers that actually exist. Do not describe controls that are not deployed.

**Acceptance criteria**
- [ ] `SECURITY.md` present
- [ ] Disclosure route contains no email/phone/messaging contact
- [ ] Only describes controls that are actually deployed
- [ ] Not surfaced in site navigation

**Verification procedure** Confirm GitHub shows the "Security policy" badge. Grep the file for `@`, `mailto:`, and phone patterns — expect no matches.

---

### P1-010 — No CHANGELOG.md

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `CHANGELOG.md`, no releases, no tags — despite 15 commits and seven phase branches representing real, sequenced work.

**Why it matters** The development history is genuinely good (linear, descriptive commits, clear phases) but invisible without reading the git log. A changelog surfaces it. It also creates a natural home for recording the Phase 1 corrections honestly.

**Affected files** New `CHANGELOG.md`

**Recommended solution** Keep-a-Changelog format. Reconstruct entries from the existing phase branches. **Record the Phase 1 truth corrections plainly** — a changelog entry noting that project metadata was corrected is itself a credibility signal, not an embarrassment.

**Dependencies** Best after **Phase 1** so the corrections can be recorded.

**Acceptance criteria**
- [ ] `CHANGELOG.md` present, following a recognised format
- [ ] History reconstructed from the phase branches
- [ ] Phase 1 corrections recorded factually
- [ ] No invented dates or version numbers

**Verification procedure** Cross-check each entry against `git log --oneline` and confirm no entry describes work that did not happen.

---

### P1-011 — No contribution or development-workflow documentation

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `CONTRIBUTING.md`. The README covers setup and build but not branching, commit conventions, review, or release. Seven phase branches exist with no documented workflow, and no PR-based process is evident.

**Why it matters** `/process` sells "Scoped phases" and "GitHub from day one" as client-facing methodology. This repository is the reference implementation of that claim.

**Affected files** New `CONTRIBUTING.md`; `README.md` cross-reference

**Recommended solution** Document what is actually done: branch naming (`phase-N-description` is already the convention), commit style, required checks before merge, and how content edits differ from code edits (`src/data/` — see P2-013). Keep it short. Even solo, it demonstrates the discipline being sold.

**Dependencies** More useful after **P1-005** (CI) and **P1-006** (scripts) so it can reference real commands.

**Acceptance criteria**
- [ ] `CONTRIBUTING.md` present
- [ ] Documents branching, commits, and required checks
- [ ] Explains the `src/data/` content convention
- [ ] Describes only practices actually followed

**Verification procedure** Follow the document to make a trivial change end to end; every referenced command must exist and work.

---

### P1-012 — No architecture or deployment documentation

**Priority:** P1 · **Category:** Engineering proof

**Problem** Only `docs/audit/` exists (created by this audit). There is no architecture overview, no deployment runbook, and no record of design decisions.

**Why it matters** **This is the highest-value documentation item.** Several genuinely interesting engineering decisions are currently invisible or buried in code comments:
- Why the site is fully static
- Why a nonce-based CSP is rejected (P1-002 — a real, version-specific trade-off)
- Why there is no contact form (`src/data/site.ts:13-18`)
- Why the `proof` / `roadmap` type distinction exists

`/services` already promises "GitHub documentation" as a standard deliverable (P2-010). This is where that claim gets substantiated.

**Affected files** New `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`

**Recommended solution**
- `ARCHITECTURE.md` — route structure, data flow from `src/data/` to components, the client/server boundary, the design-token system
- `DEPLOYMENT.md` — Vercel setup, the `site.url` requirement (already in README step 3), what to verify post-deploy
- `DECISIONS.md` — the four decisions above, each with context and trade-off

**Dependencies** `DECISIONS.md` should follow **P1-002** so the CSP reasoning is final.

**Acceptance criteria**
- [ ] All three documents exist
- [ ] `DECISIONS.md` records the static-rendering, CSP, contact-form, and project-status decisions
- [ ] `DEPLOYMENT.md` is followable start to finish
- [ ] No document claims unimplemented capabilities

**Verification procedure** Have someone unfamiliar with the repo follow `DEPLOYMENT.md` to a working preview deployment without asking questions.

---

### P1-013 — No PR or issue templates

**Priority:** P1 · **Category:** Engineering proof

**Problem** No `.github/PULL_REQUEST_TEMPLATE.md`, no `.github/ISSUE_TEMPLATE/`.

**Why it matters** Low impact but visible, and it reinforces the process claims on `/process`. A PR template is also a natural place to enforce a **content-accuracy checkbox** — a structural guard against a P0-001 recurrence.

**Affected files** New `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`

**Recommended solution** A short PR template with a checklist: checks pass; no new unverifiable claims; project data matches reality; no contact methods added. That last pair encodes this audit's two hardest constraints into the workflow.

**Dependencies** After **P1-005** so the template can reference CI.

**Acceptance criteria**
- [ ] PR template present with accuracy and marketplace-safety checkboxes
- [ ] At least one issue template present
- [ ] Template renders correctly when opening a PR

**Verification procedure** Open a draft PR and confirm the template populates.

---

### P1-019 — No toolchain pinning or formatter configuration

**Priority:** P1 · **Category:** Tooling

**Problem** No `.nvmrc`, `.editorconfig`, or formatter config. Formatting is currently consistent, but nothing enforces it. `package.json` declares no `engines` field.

**Why it matters** Prevents "works on my machine" drift and gives CI (P1-005) an authoritative Node version. Low effort, and a formatter check is another cheap green check.

**Affected files** New `.nvmrc`, `.editorconfig`, optional `.prettierrc`; `package.json` (`engines`, format script)

**Recommended solution** Add `.nvmrc` matching the local Node major, an `.editorconfig` reflecting current style (2-space, LF, final newline), and optionally Prettier with a `format:check` script wired into CI. Match the existing style so the first run produces no diff.

> **Note:** touching `package.json` is out of scope for the documentation-only phase.

**Dependencies** Do with or before **P1-005**.

**Acceptance criteria**
- [ ] `.nvmrc` present and matches CI's Node version
- [ ] `.editorconfig` reflects existing style
- [ ] If Prettier is added, a full run produces no diff on first application
- [ ] CI uses the pinned version

**Verification procedure** `node -v` matches `.nvmrc`. If Prettier is added, run `--check` across the repo and confirm zero changes.

---

# PHASE 4 — Accessibility & Rendering Integrity

**Contains:** P1-014, P1-015, P1-016
**Rationale:** Measured, specific defects with concrete pass/fail thresholds. **P0-008 belongs to this concern but is scheduled in Phase 1 due to severity.**

---

### P1-014 — `--faint` text colour fails WCAG AA contrast

**Priority:** P1 · **Category:** Accessibility

**Problem** Computed from `src/app/globals.css:16`, `--faint` resolves to `#6c6e77`:

| Pair | Ratio | AA normal (4.5:1) |
|---|---|---|
| `faint` / `background` | **3.90** | **FAIL** |
| `faint` / `surface` | **3.74** | **FAIL** |

`text-faint` appears **30 times**, roughly **22 of them non-decorative text at 9px–14px** — all below the 18.66px large-text threshold, so all require 4.5:1.

Affected includes section eyebrows (`services/page.tsx:59`, `footer.tsx:25`, `tech-stack-grid.tsx:12`, `work/[slug]/page.tsx:233,250,271`), "At a glance" terms (`work/[slug]/page.tsx:242`), metric labels at 9-10px (`work/[slug]/page.tsx:259`, `project-card.tsx:41`), `metricsNote` (`work/[slug]/page.tsx:265`), About profile card terms (`about/page.tsx:230-246`), footer note and copyright (`footer.tsx:46,99`), and the `/start` note (`start/page.tsx:263`).

**Why it matters** A measurable AA failure affecting most secondary text. Critically, **`metricsNote` — the text that qualifies the site's only numeric claims — is among the hardest to read.** That is an accessibility failure and a trust problem at once.

**Affected files** `src/app/globals.css:16` (and `:35` token mapping). Fixing the token propagates to all 30 usages.

**Recommended solution** Raise the lightness of `--faint` until it clears **4.5:1 against both `--background` (`#090a0d`) and `--surface` (`#0f1015`)** — surface is the harder target. Recompute rather than guessing; the OKLCH lightness channel maps non-linearly to WCAG luminance. Verify the result still reads as visually subordinate to `--muted` (7.36:1) so the hierarchy survives.

Separately consider whether 9px labels (`work/[slug]/page.tsx:259`) should be larger regardless of contrast — see P3-015.

**Dependencies** None. Do before **P2-003** so corrected metric qualifiers are legible where they land.

**Acceptance criteria**
- [ ] `--faint` ≥ 4.5:1 against `--background` **and** `--surface`
- [ ] `--muted` and `--foreground` still pass and the three-level hierarchy is preserved
- [ ] No new contrast failures introduced
- [ ] `metricsNote` is comfortably readable
- [ ] Ratios recorded in the commit message

**Verification procedure** Recompute all token pairs (the OKLCH → sRGB → WCAG method from the audit) and confirm every text pair ≥ 4.5:1. Then run an automated checker (axe or Lighthouse) on `/`, `/work`, `/work/[slug]`, and `/about` and confirm zero contrast violations. **Do not claim WCAG conformance** on the basis of these checks.

---

### P1-015 — Homepage skips a heading level (`h1` → `h3`)

**Priority:** P1 · **Category:** Accessibility

**Problem** Extracted from built HTML, `/` produces `h1 → h3 h3 h3 → h2 …`. The three `<h3>` elements come from `src/components/home/trust-badges.tsx:59`, in a section with no `<h2>`. This is a genuine WCAG 1.3.1 heading-order violation. Every page has exactly one `<h1>` (correct), and all other routes are structurally sound.

Related, lower severity: `/start` (`start/page.tsx:144`) and `/process` use `<h2>` for card titles, flattening the outline against the `<h3>`-for-cards convention every other page follows.

**Why it matters** Screen-reader users navigate by heading; a skipped level breaks the document outline immediately after the page title — on the highest-traffic page.

**Affected files** `src/components/home/trust-badges.tsx:59`; secondary: `src/app/start/page.tsx:144`, `src/app/process/page.tsx:88`

**Recommended solution** Give the TrustBadges section a real `<h2>` — visible, or visually hidden via `sr-only` if the design must stay as-is. Preferred is a visible heading, since the section currently has no label at all. Then align `/start` and `/process` card titles to `<h3>` for a consistent outline.

**Dependencies** None.

**Acceptance criteria**
- [ ] `/` heading sequence contains no skipped levels
- [ ] Every `<h3>` has an `<h2>` ancestor in document order
- [ ] Still exactly one `<h1>` per page
- [ ] Card titles use `<h3>` consistently across pages

**Verification procedure**
```bash
npx next build
grep -oE '<h[1-6][ >]' .next/server/app/index.html | grep -oE 'h[1-6]' | tr '\n' ' '
```
Expect no jump greater than one level. Repeat for `/start` and `/process`. Confirm with an automated heading-order check.

---

### P1-016 — Mobile menu lacks keyboard and focus management

**Priority:** P1 · **Category:** Accessibility

**Problem** `src/components/layout/navbar.tsx:63-101` opens a full-width menu lacking: Escape-to-close, focus trap, focus restoration to the trigger, outside-click dismissal, background inerting, and body scroll lock. Links do call `closeMenu` on click (line 78), so the primary mouse/touch path works.

**Why it matters** Keyboard users can Tab out of an open menu into content behind it and lose track of focus. Screen-reader users can read background content that is visually covered. This is the site's only stateful interactive component, and it is in the global header.

**Affected files** `src/components/layout/navbar.tsx` (already a client component — no new boundary needed)

**Recommended solution** Add a `keydown` listener for Escape that closes and returns focus to the toggle; trap focus within the open menu; add `inert` (or `aria-hidden` plus focus management) on background content while open; lock body scroll. Close on route change as a safety net. Respect `prefers-reduced-motion` for the open/close animation (currently ignored — see P3-005).

**Dependencies** None. Coordinate with **P3-005**.

**Acceptance criteria**
- [ ] Escape closes the menu and returns focus to the toggle
- [ ] Tab cycles only within the open menu
- [ ] Background content is not focusable or readable by AT while open
- [ ] Body scroll is locked while open
- [ ] Existing `aria-expanded` / `aria-controls` / `aria-label` behaviour preserved
- [ ] Reduced-motion users get no height animation

**Verification procedure** With a keyboard only: open the menu, Tab through every item, confirm focus never escapes, press Escape, confirm it closes and focus returns to the button. Repeat with a screen reader and confirm background content is not announced. Confirm the page behind does not scroll.

---

# PHASE 5 — Client Conversion & Case-Study Depth

**Contains:** P2-001 … P2-014
**Rationale:** With truth restored (Phase 1) and the foundation solid (Phases 2-4), this phase makes the portfolio persuasive. Doing it earlier would polish inaccurate claims.

---

### P2-001 — No Open Graph or Twitter image

**Priority:** P2 · **Category:** Conversion / SEO

**Problem** `grep 'og:image'` across the built HTML returns **zero matches on every route**. Twitter metadata is `summary` (small card) with no `twitter:image`.

**Why it matters** **Highest-leverage conversion item in the roadmap.** Every share — LinkedIn posts, Upwork/Fiverr profile links, Slack, WhatsApp, iMessage — renders as a bare text card. For a portfolio distributed primarily by link, on a site whose selling point is visual product craft, this wastes the first impression entirely.

**Affected files** New `src/app/opengraph-image.tsx` (or static asset); `src/app/layout.tsx:53-65`; per-route images for `/work/[slug]`

**Recommended solution** Use the App Router `opengraph-image` file convention. A default site-wide image plus per-case-study images. Upgrade `twitter.card` to `summary_large_image`. Design should reflect the actual palette (`#090a0d` / `#808aff`). **Do not put contact details on the image** (already correctly flagged in `LAUNCH-CHECKLIST.md:22`), and do not depict a product screenshot that does not exist.

**Dependencies** After **Phase 1** so per-project images describe corrected projects.

**Acceptance criteria**
- [ ] `og:image` present on every route with correct absolute URL and dimensions
- [ ] `twitter:card` is `summary_large_image` with an image
- [ ] Case studies have project-specific images
- [ ] No contact information on any image
- [ ] Preview verified in a real sharing context

**Verification procedure**
```bash
npx next build
grep -o 'og:image[^>]*' .next/server/app/index.html
```
Then paste the live URL into LinkedIn's post composer (do not post) and confirm the card renders, per `LAUNCH-CHECKLIST.md:60`.

---

### P2-002 — No real product screenshots anywhere

**Priority:** P2 · **Category:** Trust / conversion

**Problem** All three projects have `image: null`. Every visual is a CSS motif (`src/components/work/motif-preview.tsx`). `public/` contains only a profile photo and icons.

**Why it matters** For dashboards and CRMs, the interface **is** the product. A non-technical buyer decides largely on whether the thing looks credible. The abstract motifs are tasteful and honestly non-deceptive — but they show nothing. Once P0-002 and P0-006 link two live demos, screenshots become trivially obtainable and fully honest.

**Affected files** New `public/` screenshots; `src/data/projects.ts` `image` fields; `src/app/work/[slug]/page.tsx:210-222` (already handles the branch)

**Recommended solution** Capture real screenshots from the running demos. Add at least one per `proof` project. Keep motifs as fallback for roadmap projects — the existing conditional already does this. Use real (seeded) data, never mocked-up numbers. Provide meaningful `alt` text. Note that `MotifPreview` is `aria-hidden`, so screenshots should carry descriptive alternatives instead.

**Dependencies** Requires **P0-002** and **P0-006** (live demos to capture from).

**Acceptance criteria**
- [ ] Each `proof` project has at least one real screenshot
- [ ] Screenshots are genuine captures, not mockups
- [ ] Descriptive `alt` text provided
- [ ] Roadmap projects still fall back to motifs
- [ ] Images optimised and served via `next/image`

**Verification procedure** Compare each screenshot against the live demo — they must match. Confirm `next/image` serves optimised variants and that `alt` text is meaningful, not filler.

---

### P2-003 — Metrics render unqualified on work cards

**Priority:** P2 · **Category:** Trust

**Problem** `src/components/work/project-card.tsx:36-45` renders `project.metrics` as bare figures. `project.metricsNote` — which exists specifically to qualify them — renders **only** on the detail page (`work/[slug]/page.tsx:265-267`). On `/work`, "500+", "14", and "11" appear as unqualified numbers beside project titles.

**Why it matters** Numbers without qualifiers read as usage or outcome data. "500+" next to a project title implies scale; it actually means seeded demo rows. The qualifier exists and is well written — it is simply not shown where it is most needed.

**Affected files** `src/components/work/project-card.tsx:35-46`; optionally `src/components/home/featured-work.tsx`

**Recommended solution** Render `metricsNote` on the card, or add a short inline qualifier to each metric label. Simplest robust option: prefix labels contextually ("Screens scoped", "Demo jobs seeded" — already partly done) and add the note beneath the metric row in small text. Ensure legibility after **P1-014**.

**Dependencies** After **P1-014** (the note uses `text-faint`) and **P0-007** (metrics must be correct first).

**Acceptance criteria**
- [ ] Every metric on `/work` carries a visible qualifier
- [ ] No number implies usage, revenue, or client outcomes
- [ ] Qualifier text meets contrast requirements
- [ ] Card and detail page agree

**Verification procedure** View `/work` as a first-time visitor. For each number, ask "could this be mistaken for real-world usage?" If yes, the qualifier is insufficient.

---

### P2-004 — Homepage process contradicts `/process`

**Priority:** P2 · **Category:** Consistency

**Problem** `src/components/home/process-preview.tsx:6-31` hard-codes **4 steps** with different titles from the **6 steps** in `src/data/process.ts:27-70`. The drift has already produced a substantive inconsistency: the homepage promises *"Working software on a live preview link **every week**"* (line 23) — a cadence commitment absent from the canonical `/process` data.

**Why it matters** A prospective client reading both pages sees two different processes, and a weekly-delivery commitment that only appears in one place. That is a scope-expectation risk in a real engagement, not just an inconsistency.

**Affected files** `src/components/home/process-preview.tsx:6-31`; `src/data/process.ts:27-70`

**Recommended solution** Delete the hard-coded array and derive the preview from `processSteps`, showing a subset (e.g. `.slice(0, 4)`) or a condensed view of all six. Single source of truth. Decide deliberately whether the weekly cadence is a commitment being made — if yes, put it in `process.ts` so it appears consistently; if no, remove it.

**Dependencies** Part of **P2-013** (content consolidation).

**Acceptance criteria**
- [ ] Homepage preview derives from `src/data/process.ts`
- [ ] No hard-coded step array remains in the component
- [ ] Step titles match between `/` and `/process`
- [ ] The weekly-cadence claim is either canonical or removed
- [ ] Editing `process.ts` updates both surfaces

**Verification procedure** Change a step title in `process.ts`, rebuild, and confirm both `/` and `/process` reflect it. Then diff the two rendered lists for consistency.

---

### P2-005 — "PDF reports" claimed as a standard deliverable with no evidence

**Priority:** P2 · **Category:** Truth / unverifiable claim

**Problem** `src/app/services/page.tsx:52` lists **"PDF reports"** under "What ships with **every project**." There is no PDF library in `package.json`, no project in `projects.ts` mentions PDF generation, and no repository evidence of PDF output.

**Why it matters** "Every project" is an absolute claim. If a client contracts expecting PDF reporting, that is a scope dispute. It is the weakest link in an otherwise well-evidenced services page.

**Affected files** `src/app/services/page.tsx:47-55`

**Recommended solution** Either remove "PDF reports", or reclassify the section from "what ships with every project" to "capabilities available on request" — accurate for a deliverable that can be built but is not standard. Audit the other six entries the same way; "CSV/Excel export" is well evidenced (ServicePro has it), "Responsive UI" and "Clean deployment" are demonstrable.

**Dependencies** Relates to **P0-009** and **P2-010**.

**Acceptance criteria**
- [ ] No deliverable is claimed as standard without evidence or clear intent to deliver
- [ ] Section heading matches the strength of the claims
- [ ] Every remaining entry is defensible

**Verification procedure** For each of the seven deliverables, identify supporting evidence or a clear commitment. Anything without either is removed or reclassified.

---

### P2-006 — The hero dashboard mock reads as a FieldOps screenshot

**Priority:** P2 · **Category:** Trust

**Problem** `src/components/home/dashboard-mock.tsx` is a hand-built div mock showing `$12,480`, `37` active jobs, `94%` on-time, `+8.2%` — under a sidebar labelled **`FIELDOPS`** (line 37). It is correctly `aria-hidden` and captioned "Ops dashboard · Preview," but that caption is 10px `text-faint` (**3.90:1**) in a corner. The figures do not match the FieldOps case study's own metrics ("500+ demo jobs seeded" vs "37 active jobs").

**Why it matters** This is the one place where an otherwise scrupulous site edges toward implying a screenshot that does not exist. Branding invented data with a real project's name is exactly the pattern the rest of the portfolio avoids. It becomes sharper after P0-001 reveals FieldOps is a Streamlit app that looks nothing like this.

**Affected files** `src/components/home/dashboard-mock.tsx:3-10` (figures), `:37` (FIELDOPS label), `:28-30` (caption)

**Recommended solution** Preferred: de-brand it — replace `FIELDOPS` with a generic label so it reads as illustration, not documentation. Make the "Preview" caption legible (fixed by P1-014, but consider raising size/prominence too). Alternative, once P2-002 lands: replace the mock with a **real screenshot** of an actual demo — stronger and removes the ambiguity entirely.

**Dependencies** Sharper after **P0-001**. Best resolved alongside **P2-002**.

**Acceptance criteria**
- [ ] The mock does not carry a real project's name, **or** is replaced with a real screenshot
- [ ] The illustrative caption is legible
- [ ] No invented figure can be mistaken for real product data
- [ ] `aria-hidden` retained if it remains decorative

**Verification procedure** Show the homepage to someone unfamiliar and ask whether they believe it is a screenshot of a real product. If yes, it is still misleading.

---

### P2-007 — `/start` is a conversion page absent from primary navigation

**Priority:** P2 · **Category:** Conversion

**Problem** `src/data/site.ts:32-38` lists Work, Services, Process, About, FAQ. `/start` — the page explaining how to hire — is reachable only via the navbar CTA button, footer, and in-page CTAs. It is correctly in the sitemap.

**Why it matters** `/start` is the conversion page. It is well written and does real work (setting expectations, improving first-message quality). A visitor scanning the nav for "how do I hire this person" does not find it by name.

**Affected files** `src/data/site.ts:32-42` (`nav` and `cta`); `src/components/layout/navbar.tsx:27-49`

**Recommended solution** The CTA button already points at `/start` with the label "How to Start", so it is arguably covered. Consider adding it to `nav` as well, or making the CTA more clearly the primary path. This is an A/B-style judgment, not a defect — the current arrangement is defensible.

**Dependencies** None.

**Acceptance criteria**
- [ ] `/start` is discoverable from primary navigation without relying solely on the CTA button
- [ ] Nav does not become crowded on mobile
- [ ] The nav CTA remains visually primary

**Verification procedure** Ask someone unfamiliar to find "how to start a project" from the homepage without scrolling to the footer. If they hesitate, discoverability is insufficient.

---

### P2-008 — FAQ questions are not exposed as headings

**Priority:** P2 · **Category:** Accessibility / SEO

**Problem** `/faq` produces only `h1 h2`. The eight questions live in `<summary>` elements (`src/app/faq/page.tsx:69-72`). Valid disclosure semantics, but screen-reader users cannot navigate between questions by heading — and the `FAQPage` JSON-LD advertises 8 questions that the DOM exposes as none.

**Why it matters** Heading navigation is a primary screen-reader mechanism. There is also a mismatch between the structured data and the document structure.

**Affected files** `src/app/faq/page.tsx:66-78`

**Recommended solution** Wrap each `<summary>` content in an `<h2>` or `<h3>` (a heading inside `summary` is valid and widely supported), preserving the native `<details>` behaviour — do not replace it with a custom accordion, which would be a downgrade. Consider stable `id` anchors per question so individual answers can be linked.

**Dependencies** Coordinate with **P1-015** for consistent heading levels.

**Acceptance criteria**
- [ ] Each question is exposed as a heading
- [ ] Heading levels are consistent with other pages
- [ ] Native `<details>`/`<summary>` behaviour preserved
- [ ] Keyboard operation unchanged
- [ ] `FAQPage` JSON-LD still matches the visible questions

**Verification procedure**
```bash
npx next build
grep -oE '<h[1-6][ >]' .next/server/app/faq.html | grep -oE 'h[1-6]' | tr '\n' ' '
```
Expect one `h1` plus one heading per question. Confirm with a screen reader that heading navigation reaches each question, and that expand/collapse still works by keyboard.

---

### P2-009 — Case studies lack engineering-proof depth

**Priority:** P2 · **Category:** Conversion (technical audiences)

**Problem** Case studies cover Overview → Problem → Solution → Features → Business value → What I built → Lessons → Roadmap. They contain **no** architecture explanation, data-model discussion, technical trade-offs, or explicit limitations.

**Why it matters** The current structure serves non-technical buyers well. A technical hiring manager or a founder with a technical advisor wants to see reasoning: why this data model, what broke, what was traded away. The `lessonsLearned` field gestures at this but stays abstract.

**Affected files** `src/data/projects.ts` (new optional fields), `src/app/work/[slug]/page.tsx` (new optional sections)

**Recommended solution** Add optional fields — e.g. `architecture`, `tradeoffs`, `limitations` — rendered only when populated, matching the existing `null`-safe pattern. Start with the one project that has the most real material (FieldOps: 23 commits, a 13-file SQL library, a real data pipeline). An explicit limitations section extends the `honestyNote()` philosophy and is unusually persuasive.

**Dependencies** After **Phase 1**. Benefits from **P1-012** (`DECISIONS.md` may share material).

**Acceptance criteria**
- [ ] At least one case study includes architecture reasoning and stated limitations
- [ ] New sections are optional and degrade cleanly when empty
- [ ] Content is technically accurate and verifiable against the repository
- [ ] Non-technical readability is not degraded
- [ ] No invented technical detail

**Verification procedure** Have a technical reader assess whether the case study demonstrates engineering judgment. Cross-check every technical claim against the repository.

---

### P2-010 — "GitHub documentation" claimed as a standard deliverable

**Priority:** P2 · **Category:** Truth / unverifiable claim

**Problem** `src/app/services/page.tsx:54` lists "GitHub documentation" under what ships with every project. Currently unverifiable from the site, and `clientflow-os`'s README is still default Next.js starter text.

**Why it matters** Related to P2-005 but more readily fixable — the claim becomes true as soon as repositories are linked (P0-003) and documented (P1-012).

**Affected files** `src/app/services/page.tsx:47-55`; supported by `docs/` from **P1-012**

**Recommended solution** Substantiate rather than remove. Once P0-003 links repos and P1-012 adds `docs/`, this repository becomes the reference example. Consider linking directly to this repository's `docs/` from `/services` as live proof. Improve `clientflow-os`'s README so a linked repo does not undercut the claim.

**Dependencies** **P0-003** and **P1-012**.

**Acceptance criteria**
- [ ] The claim is backed by at least one publicly visible documented repository
- [ ] No linked repository has a default starter README
- [ ] Optionally linked from `/services` as proof

**Verification procedure** Follow the claim to its evidence: click from `/services` to a repository and confirm real documentation exists.

---

### P2-011 — LinkedIn link and the adjacent portfolio create off-platform exposure

**Priority:** P2 · **Category:** Marketplace safety

**Problem** Two second-order paths, **neither an on-site violation**:

**(a)** `src/data/site.ts:51` links a LinkedIn profile. LinkedIn supports direct messaging, so it is a one-click off-platform contact channel. Marketplaces generally tolerate LinkedIn as professional context; Fiverr is stricter than Upwork about anything routing buyers off-platform.

**(b)** The footer links the GitHub profile, which lists `avoy-portfolio` — a second public portfolio described as containing a **Supabase contact form**. Path: this site → GitHub profile → `avoy-portfolio` → deployed contact form.

**Why it matters** The on-site compliance work is genuinely excellent (§10.1 of the audit). It is undercut if the adjacent public surface contradicts it. Neither path is likely to be followed by a reviewer, but both deserve a deliberate decision rather than discovery later.

**Affected files** `src/data/site.ts:43-56` (`socials`); externally: the `avoy-portfolio` repository and the GitHub profile

**Recommended solution**
- **(a)** Make a conscious decision per platform. Options: keep LinkedIn everywhere; keep it but omit from the Fiverr-facing link; or remove it. Review the current Upwork and Fiverr policies before deciding — do not rely on this document's summary.
- **(b)** Resolve the duplicate portfolio deliberately — archive it, make it private, or clarify in its README which portfolio is current. Also action `LAUNCH-CHECKLIST.md:81`: "GitHub profile email set to private if you want zero indirect contact paths."

**Do not** add any contact method to this site as part of resolving this.

**Dependencies** None. Independent of code changes.

**Acceptance criteria**
- [ ] A documented decision exists for the LinkedIn link per platform
- [ ] The duplicate portfolio is archived, private, or clearly marked non-current
- [ ] GitHub profile email visibility deliberately set
- [ ] **No contact method added to this site**
- [ ] Rationale recorded in `docs/DECISIONS.md`

**Verification procedure** From the live site, follow every external link two hops out and note every contact channel reachable. Confirm each is intentional. Re-read current Upwork and Fiverr policies at the time of the decision.

---

### P2-012 — Structured data is thin

**Priority:** P2 · **Category:** SEO

**Problem** Only `Person` (`src/app/page.tsx:11-21`) and `FAQPage` (`src/app/faq/page.tsx:28-36`) exist. Missing: `Organization`/`ProfessionalService`, `Service` for `/services`, `BreadcrumbList` for case studies, `CreativeWork`/`SoftwareApplication` for projects, `WebSite`.

**Why it matters** For a business selling defined services, `Service` and `BreadcrumbList` are the most valuable additions — they improve how search engines interpret the offering and how case-study results display.

**Affected files** `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/work/[slug]/page.tsx`; possibly a shared helper in `src/lib/`

**Recommended solution** Add `BreadcrumbList` to case studies and `Service` to `/services`, derived from existing typed data so schema cannot drift from copy. Consider `ProfessionalService` on the homepage.

**Two constraints:**
1. **Do not add `aggregateRating`, `review`, or any rating property** — there are no reviews, and inventing them violates both the honesty rules and search-engine guidelines.
2. Extracting JSON-LD from inline `<script>` tags would simplify a future hash-based CSP (**P1-002** step 2).

**Dependencies** After **Phase 1** so schema describes corrected projects. Interacts with **P1-002**.

**Acceptance criteria**
- [ ] `BreadcrumbList` on case studies; `Service` on `/services`
- [ ] All schema derived from `src/data/`, not duplicated by hand
- [ ] **No rating, review, or aggregate-rating properties**
- [ ] Validates against a structured-data testing tool
- [ ] Schema content matches visible page content

**Verification procedure** Run each route through Google's Rich Results Test and a schema validator. Confirm zero errors and that no rating properties appear. Diff schema content against visible copy.

---

### P2-013 — Content hard-coded in components contradicts the documented convention

**Priority:** P2 · **Category:** Maintainability

**Problem** `README.md` states: *"All content is typed data in `src/data/` … Copy changes happen there, not in components."* Not accurate. Client-facing copy lives in: `start/page.tsx:34-116` (4 blocks), `about/page.tsx:46-102`, `services/page.tsx:47-55`, `process-preview.tsx:6-31`, `problem-section.tsx:5-30`, `trust-badges.tsx:7-26`, `dashboard-mock.tsx:3-10`.

`/start` — a primary conversion page — has **none** of its copy in `src/data/`.

**Why it matters** The convention is good and the README documents it correctly; the code does not follow it. This has already produced a real inconsistency (**P2-004**). Copy edits require knowing which of two locations to change.

**Affected files** All files listed above; new `src/data/` modules; `README.md`

**Recommended solution** Move remaining copy into `src/data/` with typed interfaces matching the existing pattern. Prioritise `/start` (highest copy volume, conversion-critical) and `process-preview.tsx` (already caused P2-004). `dashboard-mock.tsx` figures may reasonably stay in-component as illustration — if so, document the exception.

**Dependencies** **P2-004** is a subset. Do together.

**Acceptance criteria**
- [ ] `/start` copy lives in `src/data/`
- [ ] Process steps have a single source
- [ ] Remaining exceptions are deliberate and documented
- [ ] README's claim is accurate, or amended to match reality
- [ ] All new data modules are typed

**Verification procedure** Pick three copy strings from different pages; for each, locate the single file to edit. If any lives in a component contrary to the documented convention, the item is incomplete.

---

### P2-014 — Static availability claim can go stale

**Priority:** P2 · **Category:** Accuracy

**Problem** `src/data/site.ts:29` hard-codes `"Available for new projects · Remote, worldwide"`, rendered in the hero with a pulsing green dot (`hero.tsx:22-27`) and echoed on `/about` as "Open to new projects". Nothing prompts an update when availability changes.

**Why it matters** Low severity but real: a live "available now" indicator that is wrong wastes a prospect's time and undermines the site's accuracy positioning. The pulsing dot implies real-time status.

**Affected files** `src/data/site.ts:29`; `src/components/home/hero.tsx:22-27`; `src/app/about/page.tsx:244-250`

**Recommended solution** Keep it simple — this does not warrant a CMS. Either soften the wording so it does not imply live status, or add a checklist item to review it on each deploy. Consider removing the pulsing animation (also **P3-005**), which is what most strongly suggests real-time accuracy.

**Dependencies** Coordinate with **P3-005**.

**Acceptance criteria**
- [ ] Availability wording does not imply real-time accuracy it cannot guarantee
- [ ] A review step exists in the deploy checklist
- [ ] Homepage and `/about` agree
- [ ] No new infrastructure introduced

**Verification procedure** Confirm both surfaces show the same status and that `LAUNCH-CHECKLIST.md` includes an availability-review step.

---

# PHASE 6 — Polish & Optional Enhancements

**Contains:** P3-001 … P3-015
**Rationale:** Genuine improvements with no truth, trust, security, or accessibility impact. Safe to defer indefinitely; several are five-minute fixes worth doing opportunistically.

---

### P3-001 — Duplicated `serviceIcons` map

**Priority:** P3 · **Category:** Code quality
**Problem** Identical icon map defined twice: `src/app/services/page.tsx:41-45` and `src/components/home/services-preview.tsx:13-17`.
**Why it matters** Adding a fourth service requires editing two files; missing one produces a runtime undefined-component error.
**Affected files** Both files above; new shared module (e.g. `src/components/services/service-icon.tsx`)
**Recommended solution** Extract to one shared module, or move icon selection into `src/data/services.ts` following the `tech-stack.ts` pattern (which already stores component references in data).
**Dependencies** None.
**Acceptance criteria** Single definition; both surfaces render identically; adding a service requires one edit.
**Verification procedure** Add a temporary fourth service; confirm it renders on `/` and `/services` with one edit. Revert.

---

### P3-002 — Case-study CTA duplicates `PageCta`

**Priority:** P3 · **Category:** Code quality
**Problem** `src/app/work/[slug]/page.tsx:385-408` hand-rolls a CTA structurally identical to `src/components/sections/page-cta.tsx`. Three CTA implementations exist overall (`FinalCta`, `PageCta`, this one).
**Why it matters** CTA copy or styling changes must be applied in three places.
**Affected files** `src/app/work/[slug]/page.tsx:385-408`; `src/components/sections/page-cta.tsx`
**Recommended solution** Replace the inline block with `<PageCta>`, passing buttons as children — the component already supports this.
**Dependencies** None.
**Acceptance criteria** Case study uses `PageCta`; visual output unchanged; no duplicated CTA markup remains.
**Verification procedure** Screenshot before and after; confirm visual parity and that both buttons still work.

---

### P3-003 — `Section` primitive used inconsistently

**Priority:** P3 · **Category:** Architecture consistency
**Problem** `src/components/ui/section.tsx` is used by 6 home components; all 7 files under `src/app/` bypass it and repeat `<section className="border-t border-border/60">` + `<Container className="py-16 sm:py-24">`.
**Why it matters** Two conventions for one job; spacing and border treatment drift as pages are edited.
**Affected files** All 7 route files; `src/components/ui/section.tsx`
**Recommended solution** Either extend `Section` to cover the page-level cases and adopt it consistently, or document why route files differ. Consistency matters more than which convention wins.
**Dependencies** None. Low priority — no functional impact.
**Acceptance criteria** One documented convention; spacing and borders unchanged; no visual regression.
**Verification procedure** Screenshot every route before and after; confirm pixel parity.

---

### P3-004 — Unnecessary client-component boundaries

**Priority:** P3 · **Category:** Performance
**Problem** `src/components/layout/brand-logo.tsx` is `"use client"` solely for an **optional** `onClick`; the footer uses it without `onClick` and still pays the boundary. `src/components/about/profile-photo.tsx` is `"use client"` solely for a `useState` `onError` fallback, forcing a client boundary on the homepage.
**Why it matters** Marginal bundle and hydration cost. Minor next to P0-008 but part of the same over-clienting pattern.
**Affected files** `src/components/layout/brand-logo.tsx`; `src/components/about/profile-photo.tsx`
**Recommended solution** Split `BrandLogo` into a server default and a thin client wrapper for the navbar case. For `ProfilePhoto`, consider whether the `onError` fallback earns its boundary — the image is committed to the repository, so the failure mode is unlikely.
**Dependencies** Best measured after **P0-008** changes the client-tree shape.
**Acceptance criteria** Footer and About render the logo without a client boundary; navbar behaviour unchanged; measurable (even if small) client-JS reduction.
**Verification procedure** Compare homepage JS before and after; confirm the logo still navigates and the mobile menu still closes on logo click.

---

### P3-005 — `animate-pulse` ignores reduced-motion

**Priority:** P3 · **Category:** Accessibility
**Problem** `src/components/home/hero.tsx:24` applies `animate-pulse` to the availability dot with **no `motion-safe:` prefix**, so it animates continuously regardless of preference. The navbar `AnimatePresence` height animation (`navbar.tsx:63-72`) also ignores reduced-motion entirely.
**Why it matters** Continuous animation can affect users with vestibular sensitivity. The codebase already handles reduced-motion correctly elsewhere (`globals.css:60-64`, `99-104`; `motion-safe:` on hover transforms) — these are the exceptions.
**Affected files** `src/components/home/hero.tsx:24`; `src/components/layout/navbar.tsx:63-72`; `README.md`
**Recommended solution** Change to `motion-safe:animate-pulse`. Gate the navbar height animation on `useReducedMotion()`. Consider removing the pulse entirely (see **P2-014** — it implies real-time status).
**Dependencies** Coordinate with **P1-016** and **P2-014**. Part of making the README claim accurate (**P0-008**).
**Acceptance criteria** No animation runs under `prefers-reduced-motion: reduce`; README claim accurate; visual result unchanged for other users.
**Verification procedure** Enable "Emulate `prefers-reduced-motion: reduce`" in DevTools; confirm the dot is static and the menu opens without animating.

---

### P3-006 — Footer copyright year frozen at build time

**Priority:** P3 · **Category:** Content accuracy
**Problem** `src/components/layout/footer.tsx:101` calls `new Date().getFullYear()` in a server component on a statically prerendered page — the year is fixed at build time. If the site is not rebuilt during a calendar year, the footer shows a stale year.
**Why it matters** Cosmetic, but a stale copyright year is a common "abandoned site" signal — unhelpful for a portfolio arguing for active availability.
**Affected files** `src/components/layout/footer.tsx:99-102`
**Recommended solution** Simplest: rely on regular deploys and add a checklist item. Alternatively drop the year, or use a static start year with no end. Avoid making the footer dynamic for this alone.
**Dependencies** None.
**Acceptance criteria** Year is correct or the format cannot go stale; footer remains statically rendered.
**Verification procedure** Confirm the built HTML contains the expected year; confirm the footer is still in the static output.

---

### P3-007 — `aria-disabled` on a non-interactive placeholder

**Priority:** P3 · **Category:** Accessibility
**Problem** `src/app/work/[slug]/page.tsx:69-78` renders `<span aria-disabled="true" title="Demo link coming soon">`. `aria-disabled` on a `<span>` with no widget role conveys nothing, and `title` is unavailable to keyboard and touch users.
**Why it matters** Minor — the visible text carries the meaning. Flagged for correctness. **This element disappears once P0-002 and P0-006 populate real URLs**, so it may resolve itself.
**Affected files** `src/app/work/[slug]/page.tsx:69-78`
**Recommended solution** After Phase 1, check whether any project still needs the placeholder. If yes, remove the meaningless ARIA and rely on visible text; drop `title`. If no project needs it, remove the branch entirely.
**Dependencies** Re-evaluate after **P0-002**, **P0-003**, **P0-006**.
**Acceptance criteria** No `aria-disabled` on non-interactive elements; no `title`-only information; placeholder removed if unused.
**Verification procedure** `grep -rn 'aria-disabled' src` and confirm each remaining instance is on a real widget.

---

### P3-008 — External links do not announce opening in a new tab

**Priority:** P3 · **Category:** Accessibility
**Problem** `ButtonLink` with `external` (`src/components/ui/button.tsx:55-67`), footer socials, and project links all use `target="_blank"` with no textual or ARIA indication.
**Why it matters** Unexpected context changes can disorient screen-reader users. Practice varies; many teams accept an icon-only convention. Volume increases substantially after Phase 1 adds demo and source links.
**Affected files** `src/components/ui/button.tsx:55-67`; `src/components/layout/footer.tsx:84-92`; `src/components/work/project-card.tsx:64-74`
**Recommended solution** Add a visually hidden "(opens in a new tab)" for external links, or keep the existing `ArrowUpRight` icon and give it an accessible name. Fixing `ButtonLink` covers most cases centrally.
**Dependencies** Do alongside **P1-018** — same components.
**Acceptance criteria** Every external link conveys the new-tab behaviour to assistive tech; no visible layout change; consistent across all external links.
**Verification procedure** With a screen reader, tab to each external link and confirm the announcement includes the new-tab indication.

---

### P3-009 — Three font families / 18 font files

**Priority:** P3 · **Category:** Performance
**Problem** `src/app/layout.tsx:8-21` loads Inter, Geist, and Geist Mono → **18 `.woff2` files, 356.8 KB**. All three are genuinely referenced in `globals.css:42-46`, so none is dead.
**Why it matters** Inter and Geist are visually close; the body/heading distinction does limited work for the payload. Font bytes compete directly with the LCP that P0-008 is trying to improve.
**Affected files** `src/app/layout.tsx:8-21`; `src/app/globals.css:42-46`
**Recommended solution** Evaluate dropping Geist and using Inter for both body and headings, keeping Geist Mono for the `font-mono` accents (which are a distinctive part of the design). Reduce subsets/weights to those actually used. **Verify visually before committing** — the heading face is part of the brand.
**Dependencies** Measure after **P0-008** so improvements are attributable.
**Acceptance criteria** Font payload measurably reduced; visual identity preserved or deliberately changed; no FOUT/layout shift introduced; all three CSS font variables still resolve.
**Verification procedure** Count and total `.next/static/media/*.woff2` before and after. Screenshot every route and compare typography.

---

### P3-010 — Oversized profile source image

**Priority:** P3 · **Category:** Performance
**Problem** `public/aboy-profile.jpg` is **199,565 bytes**, rendered at 80×80 on the homepage and ~240px on `/about`.
**Why it matters** `next/image` generates correctly sized variants, so **runtime impact is minimal** — this is repository hygiene more than performance.
**Affected files** `public/aboy-profile.jpg`
**Recommended solution** Re-export at a sensible maximum (e.g. 800px on the long edge) with reasonable compression. Keep enough resolution for the largest rendered size at 2× DPR.
**Dependencies** None.
**Acceptance criteria** Source under ~100 KB; no visible quality loss at any rendered size; `next/image` still serves optimised variants.
**Verification procedure** Compare `/about` at 2× zoom before and after; confirm no visible degradation.

---

### P3-011 — Sitemap `lastmod` is uniform across all URLs

**Priority:** P3 · **Category:** SEO
**Problem** `src/app/sitemap.ts:6` computes `new Date()` once and applies it to all 10 URLs (observed: `2026-08-29T22:48:32.543Z`). Every page claims to change on every deploy.
**Why it matters** Search engines discount `lastmod` when all URLs share a build timestamp — the signal is wasted rather than harmful.
**Affected files** `src/app/sitemap.ts:5-30`
**Recommended solution** Either omit `lastmod` (cleaner than a misleading value), or derive per-page dates from git history or an explicit `updatedAt` field in `src/data/projects.ts`. Do not fabricate dates.
**Dependencies** None.
**Acceptance criteria** `lastmod` is either absent or genuinely per-page; no invented dates; sitemap still validates.
**Verification procedure** Inspect the generated `sitemap.xml`; confirm dates differ meaningfully or are absent. Validate with a sitemap validator.

---

### P3-012 — Footer grid is cramped at 768px

**Priority:** P3 · **Category:** Responsive
**Problem** `src/components/layout/footer.tsx:39` uses `md:grid-cols-[1.4fr_1fr_1fr_1fr]`. At 768px this yields ~133px per standard column, into which service titles like "Business Dashboard Development" (~30 characters at `text-sm`) must wrap to 3+ lines. Text wrapping means **no horizontal overflow**, but the result is dense.
**Why it matters** Cosmetic. Analytical finding — **not verified on a real device**.
**Affected files** `src/components/layout/footer.tsx:39`
**Recommended solution** Move the 4-column layout to `lg` and use 2 columns at `md`. Verify on a real tablet first — this may look fine in practice.
**Dependencies** None.
**Acceptance criteria** Footer readable at 768px without excessive wrapping; no horizontal overflow at any width; desktop unchanged.
**Verification procedure** Test at 768px and 1024px on a real device (per `LAUNCH-CHECKLIST.md` §6). Confirm no horizontal scroll and that service names remain scannable.

---

### P3-013 — Universal selector sets `border-color`

**Priority:** P3 · **Category:** CSS hygiene
**Problem** `src/app/globals.css:50-52` applies `* { border-color: var(--border); }` to every element.
**Why it matters** Effectively harmless — it sits in `@layer base`, so Tailwind border utilities still win on cascade order, and no bug was observed. Flagged as a specificity smell inherited from a Tailwind v3 pattern that Tailwind v4 handles differently.
**Affected files** `src/app/globals.css:49-52`
**Recommended solution** Verify whether Tailwind v4's preflight already provides the intended default. If so, remove it. Test carefully — removing it could change borders in many places at once.
**Dependencies** None. Genuinely optional.
**Acceptance criteria** If removed, no visual change anywhere; if retained, a comment explains why.
**Verification procedure** Screenshot every route before and after removal; any border difference means it is still load-bearing.

---

### P3-014 — Stale comments and checklist items

**Priority:** P3 · **Category:** Documentation hygiene
**Problem** Three confirmed staleness issues:
- `src/app/manifest.ts:5-7` — "Icon files are placeholders until real assets are added to /public" (icons exist)
- `LAUNCH-CHECKLIST.md:16` — "GitHub URL … (currently guessed as `Avoy22`)" (now correctly `aboychandradas`)
- `LAUNCH-CHECKLIST.md:29` — "`src/app/favicon.ico` replaced" (no such file; `src/app/icon.png` is used)

Additionally: **every box in `LAUNCH-CHECKLIST.md` is unchecked while the site is live.**
**Why it matters** Stale comments mislead future work. The unchecked checklist is the meta-finding — it already flagged P0-001, P0-002, P0-003, and P0-007 and was never executed.
**Affected files** `src/app/manifest.ts:5-7`; `LAUNCH-CHECKLIST.md:16,29`
**Recommended solution** Update the three stale items. Then **actually work through `LAUNCH-CHECKLIST.md`** — it is a good document that was never used. Consider whether it should become a release gate (see **P1-013**).
**Dependencies** Meaningful only after **Phase 1** resolves the items it flags.
**Acceptance criteria** No stale comments remain; checklist items reflect the current file structure; the checklist is executed and boxes reflect reality.
**Verification procedure** Read each comment against the code it describes. Work through the checklist end to end and confirm each checked box is genuinely true.

---

### P3-015 — Labels rendered at 9–10px

**Priority:** P3 · **Category:** Readability
**Problem** Metric labels render at `text-[9px]` (`src/app/work/[slug]/page.tsx:259`) and `text-[10px]` (`src/components/work/project-card.tsx:41`), with wide letter-spacing, in `text-faint`.
**Why it matters** WCAG has no absolute minimum font size, so this is **not a conformance failure**. But 9px uppercase with `tracking-widest` is difficult for many readers, and it labels the site's only numbers. **P1-014** fixes the contrast; size is a separate question.
**Affected files** `src/app/work/[slug]/page.tsx:259`; `src/components/work/project-card.tsx:41`; `src/components/home/dashboard-mock.tsx` (decorative, `aria-hidden` — exempt)
**Recommended solution** Raise non-decorative labels to at least 11–12px. The `dashboard-mock.tsx` instances are `aria-hidden` decoration and can stay. Re-evaluate after **P1-014** — improved contrast may be sufficient.
**Dependencies** After **P1-014**. Interacts with **P2-003**.
**Acceptance criteria** Non-decorative labels at least 11px; visual hierarchy preserved; combined with the contrast fix, metric labels are comfortably readable.
**Verification procedure** View `/work` and a case study on a real phone at arm's length. If labels require squinting, the size is still insufficient.

---

# Implementation Phase Summary

| Phase | Items | Count | Gate to exit |
|---|---|---|---|
| **1 — Truth & Proof Correction** | P0-001 … P0-010 | 10 | Every published claim is verifiable or removed; no `TODO` in `projects.ts`; content visible without JS |
| **2 — Security & Dependency Baseline** | P1-001, 002, 003, 017, 018 | 5 | `npm audit` clean for production; Step-1 headers live; one manifest |
| **3 — Engineering Foundation** | P1-004 … 013, 019 | 11 | CI green on `main`; LICENSE, SECURITY, CHANGELOG, docs present |
| **4 — Accessibility & Rendering** | P1-014, 015, 016 | 3 | No contrast failures; no heading skips; mobile menu keyboard-complete |
| **5 — Conversion & Case-Study Depth** | P2-001 … P2-014 | 14 | Share previews render; real screenshots; qualified metrics |
| **6 — Polish** | P3-001 … P3-015 | 15 | Opportunistic; no gate |

## Priority totals

| Priority | Count |
|---|---|
| **P0** | **10** |
| **P1** | **19** |
| **P2** | **14** |
| **P3** | **15** |
| **Total** | **58** |

## Critical path

```
P0-001 (correct FieldOps stack)
   └─> P0-002 (publish live demo)
        └─> P0-003 (publish source links)
             └─> P0-005 (calibrate ClientFlow copy)
                  └─> P0-006 (add ServicePro)
                       └─> P0-004 (demote ShopPulse)
                            └─> P0-010 (fix featured lede)
                                 └─> P0-009 (final verifiability pass)

P0-008 (visible-by-default rendering) — independent, run in parallel
P0-007 (verify metrics) — after P0-001
```

**Start with P0-001.** Every other truth fix either depends on knowing what FieldOps actually is, or risks directing visitors to evidence that contradicts the page describing it.

## Items requiring dependency or config changes

The following are **out of scope for the current documentation-only phase** and must be scheduled explicitly, since they modify `package.json`, `package-lock.json`, `next.config.ts`, or files under `public/`:

**P1-001** (Next.js bump) · **P1-002** (`next.config.ts` headers) · **P1-003** (delete `public/manifest.webmanifest`) · **P1-006** (scripts) · **P1-017** (remove `zod`) · **P1-019** (`engines`, format script)

---

## Standing constraints — restated

No roadmap item may:

1. Invent clients, testimonials, revenue, users, performance results, or metrics
2. Represent self-initiated work as paid client work
3. Add email, phone, WhatsApp, Telegram, Calendly, or a contact form
4. Claim tests, CI, or security controls before the artifact exists
5. Claim formal WCAG conformance
6. Add a `Review` or `AggregateRating` schema
7. Publish a link that has not been verified to resolve

---

*Planning document. Nothing herein has been implemented. Findings and evidence: `docs/audit/PORTFOLIO-AUDIT.md`.*
