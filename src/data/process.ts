export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  /** The concrete artifact the client has in hand when this step ends. */
  deliverable: string;
}

export type ClarityIcon =
  | "phases"
  | "commits"
  | "communication"
  | "checklist"
  | "deployment";

export interface ClarityPractice {
  icon: ClarityIcon;
  title: string;
  description: string;
}

export interface BestFitProject {
  title: string;
  note: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the workflow",
    description:
      "A clear project message and workflow walkthrough inside the platform: what you use now, what is slow, and what needs to be easier.",
    deliverable: "A plain-language summary of the workflow and its pain points",
  },
  {
    number: "02",
    title: "Plan the screens and data",
    description:
      "I map every screen and the data model behind it, so we agree on exactly what gets built before any code starts.",
    deliverable: "A one-page build plan: screens, data model, and scope",
  },
  {
    number: "03",
    title: "Build the MVP",
    description:
      "The core workflow first — working software on a live preview link, updated as the build grows. No big reveal at the end.",
    deliverable: "A working MVP on a preview URL you can click through",
  },
  {
    number: "04",
    title: "Test with real sample data",
    description:
      "I seed the system with realistic data — including the messy edge cases — and run it the way your team would on a bad day.",
    deliverable: "A test checklist with results, not just a thumbs-up",
  },
  {
    number: "05",
    title: "Deploy and document",
    description:
      "Production deployment plus short written docs and a walkthrough video, so the tool belongs to your team — not to me.",
    deliverable: "A live app, deployment notes, and a handoff walkthrough",
  },
  {
    number: "06",
    title: "Improve after feedback",
    description:
      "Real usage beats speculation. We collect what's annoying, then fix the sharp edges in a scoped follow-up phase.",
    deliverable: "A prioritized improvement list and a scoped next phase",
  },
];

export const clarityPractices: ClarityPractice[] = [
  {
    icon: "phases",
    title: "Scoped phases",
    description:
      "Work is split into phases with named deliverables — no open-ended, 'we'll see how it goes' projects.",
  },
  {
    icon: "commits",
    title: "GitHub from day one",
    description:
      "Every project lives in a repository with readable commits — you can watch progress, not just trust it.",
  },
  {
    icon: "communication",
    title: "Clear communication",
    description:
      "Short written updates in plain language, plus demo videos for anything visual. Built for time zones.",
  },
  {
    icon: "checklist",
    title: "Test checklists",
    description:
      "Features ship against a checklist you can read — including the edge cases and the empty states.",
  },
  {
    icon: "deployment",
    title: "Deployment notes",
    description:
      "How it's deployed, where things live, and how to change them — written down, not tribal knowledge.",
  },
];

export const bestFitProjects: BestFitProject[] = [
  {
    title: "Business dashboards",
    note: "KPIs, reporting, and analytics over your real data",
  },
  {
    title: "CRM & lead tools",
    note: "Pipelines, follow-ups, and client history in one place",
  },
  {
    title: "Admin panels",
    note: "Safe editing, roles, search, and bulk actions",
  },
  {
    title: "Automation workflows",
    note: "Forms, approvals, notifications, and audit trails",
  },
  {
    title: "Spreadsheet-to-web-app",
    note: "The workbook that quietly became mission-critical",
  },
];
