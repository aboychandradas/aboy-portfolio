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

export const site = {
  name: "Aboy Systems",
  owner: "Aboy Chandra Das",
  role: "Full-Stack Business Systems Developer",
  // TODO: replace with the real domain after the first Vercel deploy.
  url: "https://aboy-systems.vercel.app",
  email: "dasavoy828@gmail.com",
  description:
    "Aboy Systems is the studio of Aboy Chandra Das — a full-stack developer building dashboards, CRM systems, automation tools, and admin workflows for small businesses, agencies, and e-commerce teams. Next.js, TypeScript, Tailwind CSS.",
  availability: "Available for new projects · Remote, worldwide",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
  ] as NavItem[],
  cta: {
    primary: { label: "View Case Studies", href: "/work" },
    secondary: { label: "Start a Project", href: "/contact" },
  },
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Zod",
    "Framer Motion",
    "Vercel",
  ],
  socials: [
    // TODO: confirm the GitHub username and add the remaining profile URLs.
    { label: "GitHub", href: "https://github.com/Avoy22", icon: "github" },
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "Upwork", href: "", icon: "upwork" },
    { label: "Fiverr", href: "", icon: "fiverr" },
  ] as SocialLink[],
};
