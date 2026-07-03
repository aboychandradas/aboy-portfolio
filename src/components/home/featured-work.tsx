import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { MotifPreview } from "@/components/work/motif-preview";
import { TechBadge } from "@/components/tech/tech-badge";

export function FeaturedWork() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading
          eyebrow="Featured work"
          title="Systems I design and build end to end."
          lede="Self-initiated products that prove out real business workflows. No invented clients — the label on each card says exactly what it is."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <article className="card-interactive flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
              <div className="h-44 border-b border-border bg-background/50">
                <MotifPreview motif={project.motif} />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div>
                  <Badge tone={project.status === "proof" ? "brand" : "neutral"}>
                    {project.statusLabel}
                  </Badge>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.subtitle}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {project.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature.title}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
                      {feature.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tool) => (
                    <TechBadge key={tool} name={tool} />
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
                  >
                    {project.status === "proof"
                      ? "Read the case study"
                      : "Read the build plan"}
                    <ArrowUpRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24}>
        <Link
          href="/work"
          className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
        >
          All work
          <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
