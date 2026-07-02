export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  /** Links with an empty href are hidden until the real profile URL is added. */
  href: string;
  icon: "github" | "linkedin" | "upwork" | "fiverr";
}

/**
 * Marketplace compliance (hard constraint): this site must NOT expose a direct
 * contact method — no email, phone, WhatsApp, Telegram, Calendly, or contact
 * form. Clients from Upwork/Fiverr/Freelancer are pointed back to the platform
 * where they found the portfolio (see /start). Do not re-add an email field.
 */
export const site = {
  name: "Aboy Systems",
  owner: "Aboy Chandra Das",
  role: "Full-Stack Business Systems Developer",
  // TODO: replace with the real domain after the first Vercel deploy.
  url: "https://aboy-systems.vercel.app",
  description:
    "Aboy Systems is the studio of Aboy Chandra Das — a full-stack developer building dashboards, CRM systems, automation tools, and admin workflows for small businesses, agencies, and e-commerce teams. Next.js, TypeScript, Tailwind CSS.",
  availability: "Available for new projects · Remote, worldwide",
  marketplaceNote:
    "For marketplace projects, please communicate through the platform where you found this portfolio.",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ] as NavItem[],
  cta: {
    primary: { label: "View Work", href: "/work" },
    secondary: { label: "How to Start", href: "/start" },
  },
  socials: [
    // TODO: confirm the GitHub username and add the remaining profile URLs.
    { label: "GitHub", href: "https://github.com/Avoy22", icon: "github" },
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "Upwork", href: "", icon: "upwork" },
    { label: "Fiverr", href: "", icon: "fiverr" },
  ] as SocialLink[],
};
