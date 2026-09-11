import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { previewProcessSteps } from "@/data/process";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function ProcessPreview() {
  return (
    <Section id="process">
      <Reveal>
        <SectionHeading
          eyebrow="Process"
          title="A predictable path from messy workflow to working app."
          lede="No black box. You approve the plan before I write code, and watch progress on a live preview link."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {previewProcessSteps.map((step, index) => (
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
          className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
        >
          See the full process
          <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
