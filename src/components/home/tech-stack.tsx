import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TechStackGrid } from "@/components/tech/tech-stack-grid";

export function TechStack() {
  return (
    <Section id="stack">
      <Reveal>
        <SectionHeading
          eyebrow="Stack"
          title="Tools I use to build practical web apps"
          lede="A focused stack for dashboards, CRM tools, admin panels, data workflows, and deployment-ready portfolio projects."
        />
      </Reveal>
      <div className="mt-12">
        <TechStackGrid />
      </div>
    </Section>
  );
}
