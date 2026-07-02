export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What kind of projects do you build?",
    answer:
      "Business web apps: dashboards, CRM and lead tracking systems, admin panels, and automation tools. If the work currently lives in spreadsheets, inboxes, or someone's memory, that's my lane. The Work page shows real examples, each labeled for exactly what it is.",
  },
  {
    question: "Can you build dashboards from CSV or Excel files?",
    answer:
      "Yes — that's one of my favorite starting points. Share a sample file (anonymized is fine), and I map the columns to a proper data model, then build the dashboard on top: KPIs, filters, drill-down tables, and export back to CSV so your data never gets trapped.",
  },
  {
    question: "Can you build CRM or lead management systems?",
    answer:
      "Yes. Pipelines with stages, client profiles with full history, follow-up reminders, task assignment, and CSV import of your existing lead sheet. The ClientFlow OS build plan on the Work page shows exactly how I approach a CRM.",
  },
  {
    question: "Can you improve an existing project?",
    answer:
      "Often, yes — especially if it's built on or moving to Next.js, React, and TypeScript. I start with a short review and a written list of what I'd change first, in priority order. One honest caveat: if a rebuild would be cheaper than a rescue, I'll tell you that instead of billing for the rescue.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "Next.js, React, TypeScript, and Tailwind CSS, with PostgreSQL and Prisma when the project needs a database. Deployments go to Vercel with written deployment notes. CSV and Excel workflows are a standard part of most builds.",
  },
  {
    question: "How do you manage project scope?",
    answer:
      "In writing, in phases. Before code starts you get a one-page build plan — screens, data model, and what version one includes. Each phase has named deliverables. When something new comes up mid-project, it becomes a written line item we agree on, not a quiet expansion.",
  },
  {
    question: "How should marketplace clients contact you?",
    answer:
      "Message me on the platform where you found this portfolio — Upwork, Fiverr, or Freelancer. That's deliberate: this site has no contact form. The How to Start page explains what to include in your first message so scoping goes fast.",
  },
  {
    question: "Do you accept payment outside Upwork, Fiverr, or Freelancer?",
    answer:
      "No. For projects that start on Upwork, Fiverr, or Freelancer, communication and payment stay inside that platform from start to finish. The platform's protection — milestones, escrow, disputes, reviews — exists for both sides, and keeping everything inside it is both the rules and good sense.",
  },
];
