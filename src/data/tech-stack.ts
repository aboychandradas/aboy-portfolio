import type { ComponentType } from "react";
import {
  SiFramer,
  SiGit,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
// Recharts has no official Simple Icons entry — a neutral chart glyph stands in.
import { ChartColumn } from "lucide-react";

export type TechCategory =
  | "Frontend"
  | "Backend & Database"
  | "Data & Analytics"
  | "Tools & Deployment";

export interface TechItem {
  name: string;
  category: TechCategory;
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend & Database",
  "Data & Analytics",
  "Tools & Deployment",
];

export const techStack: TechItem[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    icon: SiReact,
    description: "Component-based UI — the base of every screen I build.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: SiNextdotjs,
    description: "The framework behind every app I ship — routing, rendering, and APIs in one place.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: SiTypescript,
    description: "Types end to end, so bugs surface while building — not after handoff.",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: SiJavascript,
    description: "The language under everything. I keep it modern and readable.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    description: "Fast, consistent styling without a pile of custom CSS.",
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    icon: SiFramer,
    description: "Small, subtle animations — enough to feel polished, never showy.",
  },

  // Backend & Database
  {
    name: "Node.js",
    category: "Backend & Database",
    icon: SiNodedotjs,
    description: "Server-side logic for APIs, imports, and scheduled work.",
  },
  {
    name: "Prisma",
    category: "Backend & Database",
    icon: SiPrisma,
    description: "Typed database access — queries the compiler can check.",
  },
  {
    name: "PostgreSQL",
    category: "Backend & Database",
    icon: SiPostgresql,
    description: "My default database for business data that has to stay consistent.",
  },
  {
    name: "SQLite",
    category: "Backend & Database",
    icon: SiSqlite,
    description: "Light, file-based storage for small tools and internal apps.",
  },
  {
    name: "Zod",
    category: "Backend & Database",
    icon: SiZod,
    description: "Validates every form and import, so bad data stops at the door.",
  },

  // Data & Analytics
  {
    name: "Python",
    category: "Data & Analytics",
    icon: SiPython,
    description: "Data cleanup and scripting when spreadsheets get messy.",
  },
  {
    name: "Pandas",
    category: "Data & Analytics",
    icon: SiPandas,
    description: "Heavy lifting for CSV and Excel data before it reaches the app.",
  },
  {
    name: "Streamlit",
    category: "Data & Analytics",
    icon: SiStreamlit,
    description: "Quick data tools and internal prototypes in pure Python.",
  },
  {
    name: "Recharts",
    category: "Data & Analytics",
    icon: ChartColumn,
    description: "Clean dashboard charts — readable first, decorative never.",
  },

  // Tools & Deployment
  {
    name: "Git",
    category: "Tools & Deployment",
    icon: SiGit,
    description: "Version control on every project, from the first commit.",
  },
  {
    name: "GitHub",
    category: "Tools & Deployment",
    icon: SiGithub,
    description: "Where my projects live — commits you can actually follow.",
  },
  {
    name: "Vercel",
    category: "Tools & Deployment",
    icon: SiVercel,
    description: "Deployment for every build — live URLs and preview links.",
  },
];

const techByName = new Map(
  techStack.map((tech) => [tech.name.toLowerCase(), tech])
);

/** Case-insensitive lookup so project stacks can resolve icons by name. */
export function getTechByName(name: string): TechItem | undefined {
  return techByName.get(name.toLowerCase());
}
