/**
 * Honesty rules for this file:
 * - "proof" projects are real, self-initiated builds — never framed as paid client work.
 * - "roadmap" projects are planned, client-grade builds and must always be labeled as such.
 * - Review every description against the actual build before publishing. No invented features.
 */

export type ProjectStatus = "proof" | "roadmap";
export type ProjectMotif = "chart" | "pipeline" | "table";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  /** Short, honest label shown on cards, e.g. "Self-initiated build · Deployed". */
  statusLabel: string;
  highlights: string[];
  stack: string[];
  /** Which abstract CSS thumbnail the card renders — no fake screenshots. */
  motif: ProjectMotif;
  featured: boolean;
  hasCaseStudy: boolean;
}

export const projects: Project[] = [
  {
    slug: "shoppulse-analytics-os",
    name: "ShopPulse Analytics OS",
    tagline:
      "E-commerce operations dashboard — orders, revenue, stock alerts, and channel performance in one live view.",
    status: "roadmap",
    statusLabel: "Client-grade build roadmap",
    highlights: [
      "Revenue and order analytics with date-range filters",
      "Low-stock alerts and product performance",
      "One-click CSV export for accounting",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    motif: "chart",
    featured: true,
    hasCaseStudy: false,
  },
  {
    slug: "clientflow-os",
    name: "ClientFlow OS",
    tagline:
      "CRM for agencies and service businesses — leads, deals, tasks, and client history in one pipeline.",
    status: "roadmap",
    statusLabel: "Client-grade build roadmap",
    highlights: [
      "Kanban pipeline with stages and owners",
      "Client profiles with an activity timeline",
      "Follow-up reminders that don't get lost",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    motif: "pipeline",
    featured: true,
    hasCaseStudy: false,
  },
  {
    slug: "fieldops-analytics-os",
    name: "FieldOps Analytics OS",
    tagline:
      "Operations dashboard for field-service teams — jobs, technicians, and performance in one place.",
    status: "proof",
    statusLabel: "Self-initiated build · Deployed",
    highlights: [
      "Job board with status tracking",
      "Technician workload and performance metrics",
      "Exportable weekly reports (CSV)",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    motif: "table",
    featured: true,
    hasCaseStudy: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
