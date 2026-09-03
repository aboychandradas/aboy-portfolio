/**
 * Honesty rules for this file (hard constraints):
 * - "proof" projects are real, self-initiated builds — never framed as paid client work.
 * - "roadmap" projects are scoped, client-grade build specs — always labeled as such,
 *   and their copy describes the spec/plan, not a delivered product.
 * - Metrics are either build-scope figures (roadmap) or demo-build facts (proof).
 * - liveUrl / githubUrl / image are placeholders: null renders a safe state
 *   (or hides the repo action), so only fill them in when the links are real.
 */

export type ProjectStatus = "proof" | "roadmap";
export type ProjectMotif = "chart" | "pipeline" | "table";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: ProjectStatus;
  /** Short, honest label shown on cards, e.g. "Self-initiated build · Deployed". */
  statusLabel: string;
  overview: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  techStack: string[];
  businessValue: string[];
  whatIBuilt: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
  /** Honest demo/scope figures only — see the note at the top of this file. */
  metrics: ProjectMetric[];
  metricsNote: string;
  liveUrl: string | null;
  githubUrl: string | null;
  /** Screenshot path under /public once real captures exist; motif renders meanwhile. */
  image: string | null;
  /** Which abstract CSS thumbnail the card renders — no fake screenshots. */
  motif: ProjectMotif;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "shoppulse-analytics-os",
    title: "ShopPulse Analytics OS",
    subtitle:
      "An e-commerce operations dashboard that turns raw store data into daily decisions — orders, revenue, stock, and channel performance in one live view.",
    category: "E-commerce analytics",
    status: "roadmap",
    statusLabel: "Client-grade build roadmap",
    overview:
      "ShopPulse is a client-grade product I'm building in the open as part of my portfolio: an analytics OS for small e-commerce teams who currently run their business out of storefront admin screens and spreadsheet exports. This page documents the full build specification — the problem it targets, the system design, and the v1 scope — and will grow into a complete case study as the build ships.",
    problem:
      "Small store owners rarely lack data — it's just scattered. Orders live in the storefront admin, payouts in the payment dashboard, ad numbers in another tab, and stock counts in a spreadsheet that gets updated when someone remembers. Mornings start with an export-and-paste ritual, stockouts get noticed after the sale is already lost, and nobody can answer 'how did last week actually go?' without an hour of assembly.",
    solution:
      "One dashboard over a clean data model: orders, products, and channels imported into PostgreSQL, with KPIs computed server-side and presented in views a non-analyst can read in thirty seconds. Per-product thresholds drive low-stock alerts instead of manual checks, date-range comparisons replace ad-hoc spreadsheet math, and every table exports back to CSV so accountants and agencies keep their existing workflow.",
    features: [
      {
        title: "Daily KPI overview",
        description:
          "Revenue, orders, average order value, and refunds with date-range compare — designed for a 30-second morning read.",
      },
      {
        title: "Low-stock alerts",
        description:
          "Per-product thresholds feeding a restock queue, surfaced in the dashboard instead of buried in email.",
      },
      {
        title: "Channel performance",
        description:
          "Sales split by channel and campaign source, so ad-spend decisions stop being guesses.",
      },
      {
        title: "Order drill-down",
        description:
          "From any chart to the underlying orders in one click — no black-box numbers.",
      },
      {
        title: "CSV in both directions",
        description:
          "Import legacy sheets to seed the system; export any view for accounting or agencies.",
      },
      {
        title: "Roles & access",
        description:
          "Owner, manager, and read-only accountant roles with appropriately scoped views.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Recharts",
      "Zod",
    ],
    businessValue: [
      "Mornings start with numbers, not exports — the daily status ritual drops from an hour to a glance.",
      "Stockouts become an alert you act on, not a surprise you apologize for.",
      "One shared source of truth ends the 'which spreadsheet is current?' problem.",
      "Clean CSV exports keep accountants and agencies happy without handing out store-admin access.",
    ],
    whatIBuilt: [
      "A complete v1 specification: 14 screens, the PostgreSQL data model, and the alert-rules design.",
      "KPI definitions written down precisely — what counts as revenue, when an order counts, how refunds land.",
      "An import mapping designed for messy real-world CSVs: inconsistent SKUs, currencies, and date formats.",
      "UI direction consistent with my FieldOps build: dense tables, calm charts, no dashboard theater.",
    ],
    lessonsLearned: [
      "Alert design is a product problem, not a query — naive thresholds train people to ignore alerts.",
      "Every store defines 'revenue' slightly differently; pinning metric definitions before building charts prevents expensive rework.",
      "CSV import is the real onboarding feature — if seeding data is painful, the dashboard never gets adopted.",
    ],
    futureImprovements: [
      "v1 — core dashboard: KPI overview, orders, products, CSV import/export.",
      "v1.1 — low-stock alerts with per-product thresholds and a restock queue.",
      "v2 — channel and campaign attribution, plus multi-store support.",
      "Later — scheduled email digests and a Shopify importer.",
    ],
    metrics: [
      { label: "Screens scoped", value: "14" },
      { label: "Core modules", value: "6" },
      { label: "User roles", value: "3" },
    ],
    metricsNote:
      "Scope figures from the v1 build specification — not usage claims.",
    liveUrl: null,
    githubUrl: null,
    image: null,
    motif: "chart",
    featured: true,
  },
  {
    slug: "clientflow-os",
    title: "ClientFlow OS",
    subtitle:
      "A CRM for agencies and service businesses — leads, deals, tasks, and client history in one pipeline instead of five tools and a group chat.",
    category: "CRM & client management",
    status: "roadmap",
    statusLabel: "Client-grade build roadmap",
    overview:
      "ClientFlow is a client-grade CRM I'm building as a portfolio product, aimed at the small service teams that generic CRMs are too heavy for. This page documents the build specification: the workflow it replaces, the system design, and the v1 scope. It will become a full case study as the build ships.",
    problem:
      "Most small service businesses track leads in a spreadsheet, conversations in an inbox, and tasks in someone's head. Follow-ups slip because nothing reminds anyone, handoffs lose context because history lives in private threads, and the owner can't see pipeline value without asking around. The tools exist — they're just not one system.",
    solution:
      "A pipeline-first CRM shaped around how small service teams actually sell: a kanban board where deals move through explicit stages, client profiles that collect every note, task, and status change into one timeline, and a follow-up queue that turns 'remembering to check in' into a daily worklist.",
    features: [
      {
        title: "Kanban deal pipeline",
        description:
          "Stages, owners, and deal values — move a card and the pipeline numbers update with it.",
      },
      {
        title: "Client profiles & timeline",
        description:
          "Every note, task, and status change in one scrollable history per client.",
      },
      {
        title: "Follow-up queue",
        description:
          "Due and overdue follow-ups as a daily worklist, not calendar archaeology.",
      },
      {
        title: "Task assignment",
        description:
          "Small-team handoffs with owners and due dates attached directly to deals.",
      },
      {
        title: "Pipeline reporting",
        description:
          "Win rate, stage conversion, and pipeline value — without exporting anything.",
      },
      {
        title: "CSV import & export",
        description:
          "Bring in the old lead sheet; get your data back out anytime. No lock-in.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Zod",
    ],
    businessValue: [
      "Follow-ups stop depending on memory — the deals that slip are the ones nobody was reminded about.",
      "New team members inherit full client context instead of asking 'where are we with this one?'",
      "The owner sees pipeline value and win rate live, without a Friday reporting ritual.",
      "The client list stays yours — importable in, exportable out.",
    ],
    whatIBuilt: [
      "A complete v1 specification: 11 screens, the relational data model, and a permission matrix for three roles.",
      "Pipeline mechanics designed before code — stage rules, deal ownership, and what 'won' actually triggers.",
      "An activity-timeline model that keeps notes, tasks, and status changes in one queryable history.",
      "UI direction: a calm, dense board that holds up on a laptop in a client meeting.",
    ],
    lessonsLearned: [
      "CRMs fail on data-entry friction — every required field removed from the spec makes adoption more likely.",
      "Designing the timeline as an append-only activity log simplifies both the UI and future auditability.",
      "Small teams need opinionated defaults, not configuration screens — the spec cuts settings ruthlessly.",
    ],
    futureImprovements: [
      "v1 — pipeline board, client profiles, tasks, and CSV import/export.",
      "v1.1 — follow-up queue with a daily digest view.",
      "v2 — email logging and simple pipeline reports.",
      "Later — rule-based lead scoring to rank the follow-up queue. No black boxes.",
    ],
    metrics: [
      { label: "Screens scoped", value: "11" },
      { label: "Pipeline stages", value: "5" },
      { label: "User roles", value: "3" },
    ],
    metricsNote:
      "Scope figures from the v1 build specification — not usage claims.",
    liveUrl: null,
    githubUrl: null,
    image: null,
    motif: "pipeline",
    featured: true,
  },
  {
    slug: "fieldops-analytics-os",
    title: "FieldOps Analytics OS",
    subtitle:
      "Marketplace finance and operations analytics for a field-service platform — a seeded Python-to-SQLite pipeline, a versioned SQL analysis library, and a deployed dashboard over revenue, fulfilment, and payment risk.",
    category: "Marketplace analytics",
    status: "proof",
    statusLabel: "Self-initiated build · Deployed",
    overview:
      "FieldOps Analytics OS is a self-initiated build I designed, built, and deployed end to end as the proof piece of my portfolio. It models a two-sided field-service marketplace — buyers, providers, work orders, payments, reviews, and support tickets — generates the dataset from a fixed seed, loads it into SQLite, analyses it through a library of SQL files, and presents the results in a Streamlit dashboard. Everything below describes the working build, which runs entirely on generated demo data.",
    problem:
      "A field-service marketplace holds its numbers in transaction records, not in answers. Leadership needs to know how much volume the platform is moving, how much revenue it keeps after provider payouts, whether the take rate is holding across months and categories, how concentrated revenue is in a handful of buyer accounts, and which buyers are drifting late on payment. Reading that out of raw work-order and payment tables means writing the query again every time someone asks.",
    solution:
      "A repeatable pipeline instead of ad-hoc queries: generate the marketplace dataset with a fixed seed, load it into a relational SQLite database, and keep the analysis in a versioned SQL library rather than scattered across notebooks. The dashboard sits on top of that layer — sidebar filters, KPI cards, Plotly charts, a finance deep dive, a metric glossary, and CSV export of whatever the current filters select.",
    features: [
      {
        title: "Executive KPI overview",
        description:
          "Gross work-order value, platform revenue, provider payout, take rate, success and cancellation rates, and average payment delay, read in one pass.",
      },
      {
        title: "Revenue and take-rate trends",
        description:
          "Gross value, platform revenue, and payout by month, with take-rate movement tracked over time and across service categories.",
      },
      {
        title: "Buyer revenue concentration",
        description:
          "Revenue share ranked by buyer account, so dependence on a few names is measured rather than assumed.",
      },
      {
        title: "Payment delay risk",
        description:
          "Buyer-level late-payment rates and average days past due, bucketed into risk levels for collections follow-up.",
      },
      {
        title: "Filtered views with CSV export",
        description:
          "Sidebar filters for date range, service category, work-order status, buyer industry, and country — every KPI and chart recomputes, and the active selection exports to CSV.",
      },
      {
        title: "Finance deep dive",
        description:
          "Monthly finance performance, average work-order value, category finance performance, and a metric glossary that defines every KPI on the page.",
      },
    ],
    techStack: [
      "Python",
      "SQL",
      "SQLite",
      "Streamlit",
      "pandas",
      "Plotly",
    ],
    businessValue: [
      "Revenue quality is visible month by month: what the platform keeps after payouts, and whether the take rate is holding.",
      "Buyer concentration is measured, so dependence on a few accounts surfaces before it becomes an exposure.",
      "Late-payment risk arrives as a ranked shortlist instead of a collections hunt through payment records.",
      "Recurring finance questions get answered from a versioned SQL library rather than a fresh one-off query each time.",
    ],
    whatIBuilt: [
      "A seeded synthetic data generator for a two-sided marketplace: buyers, providers, work orders, payments, reviews, and support tickets.",
      "The Python-to-SQLite load step that turns those tables into a relational analytics database, plus a bootstrap that rebuilds it on deploy when the database file is absent.",
      "A library of 13 SQL analysis files covering revenue KPIs, work-order health, provider and category performance, location revenue, payment delay, take-rate trend, and buyer concentration.",
      "The Streamlit dashboard: sidebar filters, KPI cards, Plotly charts, interactive tables, a finance deep dive, a metric glossary, and CSV export of the filtered dataset.",
      "The written layer around it — an MIT-licensed repository with a case study, data model, SQL guide, and business-insight write-ups.",
    ],
    lessonsLearned: [
      "Metric definitions belong in one place. Take rate and success rate can each be computed two defensible ways, and two different answers to the same question is what a stakeholder remembers.",
      "A fixed random seed is what makes a synthetic dataset defensible — the figures quoted in the documentation have to still be there when someone reruns the pipeline.",
      "Empty and edge states are the real dashboard work; a filtered view is judged on the selection that returns almost nothing.",
      "Writing for a business reader forces plain-language labels — a metric glossary is not decoration.",
    ],
    futureImprovements: [
      "Automated tests over the pipeline and the metric calculations — the repository has none today.",
      "A CI check that runs those tests and the SQL library on every push.",
      "A scheduled pipeline run so the analytics database refreshes on a cadence instead of on a manual rebuild.",
      "Swapping the synthetic generator for a real data source behind the same SQL layer.",
    ],
    metrics: [
      { label: "Work orders analysed", value: "10,000" },
      { label: "Providers modelled", value: "1,500" },
      { label: "SQL analyses", value: "13" },
    ],
    metricsNote:
      "Figures from the generated demo fixture — 500 buyers, 1,500 providers, and 10,000 work orders produced by a fixed-seed generator, plus the 13 SQL files in the repository. Portfolio data, not client data.",
    liveUrl: "https://fieldops-analytics-os.streamlit.app/",
    githubUrl: "https://github.com/aboychandradas/fieldops-analytics-os",
    image: null,
    motif: "table",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
