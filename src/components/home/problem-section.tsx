import { Copy, EyeOff, FileSpreadsheet, Puzzle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "The spreadsheet that runs everything",
    description:
      "One workbook, six tabs, formulas nobody dares touch. It breaks quietly — usually at month-end.",
  },
  {
    icon: Copy,
    title: "Copy-paste as infrastructure",
    description:
      "Orders in one tool, clients in another, and the weekly report assembled by hand every Friday.",
  },
  {
    icon: EyeOff,
    title: "No live view of the numbers",
    description:
      "Revenue, stock, and workload are only visible after someone stops real work to compile them.",
  },
  {
    icon: Puzzle,
    title: "Software that almost fits",
    description:
      "Generic tools bent out of shape, so the real process ends up living in chat threads and memory.",
  },
];

export function ProblemSection() {
  return (
    <Section id="problems">
      <Reveal>
        <SectionHeading
          eyebrow="The problem"
          title="Running the business on spreadsheets works — until it doesn't."
          lede="Most small teams aren't short on tools. They're short on one system that matches how the work actually happens."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {problems.map((problem, index) => (
          <Reveal key={problem.title} delay={index * 0.06}>
            <div className="h-full rounded-xl border border-border bg-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                <problem.icon className="h-5 w-5 text-brand-bright" />
              </span>
              <h3 className="mt-4 font-medium">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {problem.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24}>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted">
          Every one of these is a systems problem — and a system is something
          you can build.{" "}
          <span className="font-medium text-foreground">That’s the job.</span>
        </p>
      </Reveal>
    </Section>
  );
}
