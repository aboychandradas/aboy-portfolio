export type ServiceIcon = "dashboard" | "crm" | "automation" | "admin";

export interface Service {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    slug: "business-dashboards",
    title: "Business Dashboards & Reporting",
    description:
      "Live views of revenue, operations, and team output — replacing the weekly copy-paste report.",
    deliverables: [
      "KPI overview with filters and date ranges",
      "Charts your team can actually read",
      "CSV export for accounting and audits",
    ],
    icon: "dashboard",
  },
  {
    slug: "crm-systems",
    title: "CRM & Client Management",
    description:
      "Leads, deals, and client history in one pipeline — built around your sales process, not a template.",
    deliverables: [
      "Pipeline with stages and assignments",
      "Client profiles with full activity history",
      "Follow-up reminders and notes",
    ],
    icon: "crm",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation & Internal Tools",
    description:
      "Multi-step manual processes turned into guided flows with rules, roles, and an audit trail.",
    deliverables: [
      "Form → review → approval flows",
      "Email and status notifications",
      "A history of who did what, and when",
    ],
    icon: "automation",
  },
  {
    slug: "admin-panels",
    title: "Admin Panels & Data Management",
    description:
      "Safe, fast editing for the data behind your business — with validation so nothing breaks downstream.",
    deliverables: [
      "Search, filters, and bulk actions",
      "Role-based access control",
      "Import and export without developer help",
    ],
    icon: "admin",
  },
];
