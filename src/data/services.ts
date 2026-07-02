export type ServiceIcon = "dashboard" | "crm" | "automation";

export interface Service {
  slug: string;
  title: string;
  /** One-line summary used on cards and the homepage preview. */
  description: string;
  /** Fuller "what it is" paragraph for the /services page. */
  whatItIs: string;
  bestFor: string[];
  clientsGet: string[];
  exampleFeatures: string[];
  /** Slug into src/data/projects.ts — null hides the related-build link. */
  relatedProjectSlug: string | null;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    slug: "business-dashboards",
    title: "Business Dashboard Development",
    description:
      "Live views of revenue, operations, and team output — replacing the weekly copy-paste report.",
    whatItIs:
      "A custom dashboard over your real data: KPIs, charts, and tables that answer the questions you actually ask every week — instead of exports assembled by hand every Friday.",
    bestFor: [
      "E-commerce stores tracking sales, stock, and channels",
      "Service businesses monitoring jobs and team output",
      "Founders who want the week's numbers without the ritual",
    ],
    clientsGet: [
      "KPI overview with filters and date ranges",
      "Drill-down tables behind every number",
      "CSV export for accounting and audits",
      "Role-based access for the team",
    ],
    exampleFeatures: [
      "Revenue and orders overview",
      "Low-stock and threshold alerts",
      "Team performance views",
      "Date-range comparisons",
      "Search and saved filters",
    ],
    relatedProjectSlug: "fieldops-analytics-os",
    icon: "dashboard",
  },
  {
    slug: "crm-lead-management",
    title: "CRM & Lead Management Systems",
    description:
      "Leads, deals, and client history in one pipeline — built around your sales process, not a template.",
    whatItIs:
      "A pipeline built around how you actually sell: leads and deals in explicit stages, every client's history in one timeline, and follow-ups that surface themselves instead of depending on memory.",
    bestFor: [
      "Agencies juggling leads across inbox and spreadsheet",
      "Service businesses where follow-ups slip through",
      "Small sales teams that outgrew the shared sheet",
    ],
    clientsGet: [
      "Kanban pipeline with stages and owners",
      "Client profiles with full activity history",
      "Follow-up queue and reminders",
      "CSV import of your existing lead sheet",
    ],
    exampleFeatures: [
      "Deal values and win-rate view",
      "Task assignment on deals",
      "Notes and timeline per client",
      "Overdue follow-up alerts",
      "Export anytime — no lock-in",
    ],
    relatedProjectSlug: "clientflow-os",
    icon: "crm",
  },
  {
    slug: "automation-internal-tools",
    title: "Automation & Internal Tools",
    description:
      "Multi-step manual processes turned into guided flows with rules, roles, and an audit trail.",
    whatItIs:
      "Manual, multi-step processes turned into guided software: forms, approvals, admin panels, and data tools with validation, permissions, and a history of who did what — so the process stops living in chat threads.",
    bestFor: [
      "Teams running operations on copy-paste between tools",
      "Businesses with approval flows living in chat threads",
      "Anyone maintaining the spreadsheet nobody dares touch",
    ],
    clientsGet: [
      "Guided form → review → approval flows",
      "Admin panel with validation and bulk actions",
      "Email and status notifications",
      "Audit-friendly activity history",
    ],
    exampleFeatures: [
      "Spreadsheet-to-web-app conversion",
      "CSV/Excel import and export",
      "Role-based permissions",
      "Scheduled reports",
      "Safe data editing with validation",
    ],
    relatedProjectSlug: null,
    icon: "automation",
  },
];
