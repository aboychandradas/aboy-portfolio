import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects, type ProjectMotif } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

/** Abstract CSS thumbnails per project — deliberately not fake screenshots. */
function MotifPreview({ motif }: { motif: ProjectMotif }) {
  if (motif === "chart") {
    return (
      <div className="flex h-full items-end gap-2 p-6">
        {[38, 58, 44, 72, 52, 84, 66, 95].map((height, index) => (
          <div
            key={index}
            className={
              index === 7 ? "w-full rounded-sm bg-brand" : "w-full rounded-sm bg-brand/25"
            }
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    );
  }

  if (motif === "pipeline") {
    return (
      <div className="grid h-full grid-cols-3 gap-2.5 p-6">
        {[
          ["h-9", "h-12", "h-7"],
          ["h-12", "h-8"],
          ["h-8", "h-10", "h-9"],
        ].map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2.5">
            <div className="h-1.5 w-8 rounded-full bg-border-strong" />
            {column.map((height, cardIndex) => (
              <div
                key={cardIndex}
                className={`${height} rounded-md border ${
                  columnIndex === 1 && cardIndex === 0
                    ? "border-brand/40 bg-brand-muted"
                    : "border-border bg-surface-raised/60"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-6">
      <div className="flex gap-2.5">
        <span className="h-2 w-10 rounded-full bg-brand/50" />
        <span className="h-2 flex-1 rounded-full bg-brand/25" />
        <span className="h-2 w-14 rounded-full bg-brand/25" />
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex gap-2.5">
          <span className="h-2 w-10 rounded-full bg-border" />
          <span className="h-2 flex-1 rounded-full bg-border/70" />
          <span className="h-2 w-14 rounded-full bg-border" />
        </div>
      ))}
    </div>
  );
}

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
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
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
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.tagline}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-faint"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  {project.hasCaseStudy ? (
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
                    >
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-xs text-faint">
                      Case study coming as the build ships.
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24}>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
        >
          All projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
