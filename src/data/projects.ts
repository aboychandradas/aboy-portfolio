/**
 * Honesty rules for this file (hard constraints):
 * - "proof" projects are real, self-initiated builds — never framed as paid client work.
 * - "roadmap" projects are scoped, client-grade build specs — always labeled as such,
 *   and their copy describes the spec/plan, not a delivered product.
 * - Metrics are either build-scope figures (roadmap) or demo-build facts (proof).
 *   TODO(aboy): verify every number and claim below against the real builds before publishing.
 * - liveUrl / githubUrl / image are placeholders: null renders a safe "coming soon"
 *   state, so only fill them in when the links are real.
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
      "An operations dashboard for field-service teams — jobs, technicians, and performance in one place instead of a whiteboard and three spreadsheets.",
    category: "Field service operations",
    status: "proof",
    statusLabel: "Self-initiated build · Deployed",
    overview:
      "FieldOps is a self-initiated product I designed, built, and deployed end to end as the proof piece of my portfolio. It implements the exact playbook I bring to client work: take an operations workflow that lives in spreadsheets, give it a proper data model, and put a calm dashboard on top. Everything below describes the working build, which runs on seeded demo data.",
    problem:
      "Field-service coordinators run the day from a whiteboard and scattered updates: which jobs are open, who's overloaded, what actually got done this week. The information exists — in texts, job sheets, and a spreadsheet — but assembling it costs the evening, and the weekly report is built by hand every Friday.",
    solution:
      "A job-centric dashboard: every job carries a status and an assignee, technicians get workload views, and the week's performance aggregates itself from the underlying data. Filters answer the real operational questions — what's overdue, who's free — and a one-click CSV export replaces the hand-built weekly report.",
    features: [
      {
        title: "Job status board",
        description:
          "Every job with status, assignee, and due date — filterable by technician, status, and date range.",
      },
      {
        title: "Technician workload",
        description:
          "Open and completed jobs per technician, so dispatch decisions stop being guesswork.",
      },
      {
        title: "Performance metrics",
        description:
          "Completion rates and weekly throughput aggregated automatically from job data.",
      },
      {
        title: "Weekly report export",
        description:
          "The Friday report as one click of CSV, shaped for a spreadsheet-native manager.",
      },
      {
        title: "Search & filters",
        description:
          "Find any job fast — when the dashboard is the source of truth, lookup speed matters.",
      },
      {
        title: "Responsive layout",
        description:
          "Readable on the office laptop and on smaller screens between site visits.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    businessValue: [
      "The coordinator's evening assembly ritual becomes a glance at a live board.",
      "Overload gets visible before the schedule breaks, not after the missed job.",
      "Weekly reporting drops from an hour of copy-paste to one export.",
      "A shared board means 'what's the status?' is answered by a link, not another manual update.",
    ],
    whatIBuilt: [
      "The full build, end to end: data model, dashboard UI, aggregation logic, CSV export, and deployment.",
      "Status and filtering mechanics tuned for how a dispatcher actually scans a board.",
      "A seeded demo dataset that exercises the edge cases — overdue jobs, idle technicians, heavy weeks.",
      "The design language this portfolio shares: dense tables, calm charts, no dashboard theater.",
    ],
    lessonsLearned: [
      "Aggregation logic belongs in one tested layer — scattering metric math across components breeds contradictory numbers.",
      "Empty and edge states are the real UI work; a dashboard is judged on its worst data day.",
      "Building for a non-technical dispatcher forces plain-language labels — jargon is a bug.",
    ],
    futureImprovements: [
      "Role-based auth separating coordinator and technician views.",
      "A technician-facing mobile view for status updates from the field.",
      "Notification hooks for overdue and unassigned jobs.",
      "Scheduled weekly report emails.",
    ],
    // TODO(aboy): adjust these to match the real seeded build before publishing.
    metrics: [
      { label: "Demo jobs seeded", value: "500+" },
      { label: "Dashboard views", value: "12" },
      { label: "Report export", value: "1 click" },
    ],
    metricsNote:
      "Figures from the seeded demo build — portfolio data, not client data.",
    // TODO(aboy): add the real deployment + repo URLs when ready to publish them.
    liveUrl: null,
    githubUrl: null,
    image: null,
    motif: "table",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
