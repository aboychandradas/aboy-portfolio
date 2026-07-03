import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    number: "01",
    title: "Map the workflow",
    description:
      "A clear project message and workflow walkthrough inside the platform — what you use now, what is slow, and what needs to be easier.",
  },
  {
    number: "02",
    title: "Spec the system",
    description:
      "I write up the data model, screens, and roles. You approve exactly what gets built before code starts.",
  },
  {
    number: "03",
    title: "Build in the open",
    description:
      "Working software on a live preview link every week — feedback early, no big reveal at the end.",
  },
  {
    number: "04",
    title: "Launch & handoff",
    description:
      "Deployment, documentation, and a walkthrough video. Your team owns the tool, not just a login.",
  },
];

export function ProcessPreview() {
  return (
    <Section id="process">
      <Reveal>
        <SectionHeading
          eyebrow="Process"
          title="A predictable path from messy workflow to working app."
          lede="No black box. You approve the plan before I write code, and you see progress every week."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.06}>
            <div className="h-full rounded-xl border border-border bg-surface p-6">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-brand-bright">
                {step.number}
              </p>
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24}>
        <Link
          href="/process"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
        >
          See the full process
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
