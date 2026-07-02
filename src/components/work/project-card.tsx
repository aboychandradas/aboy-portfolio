import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { MotifPreview } from "@/components/work/motif-preview";
import { TechBadge } from "@/components/tech/tech-badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong lg:grid-cols-5">
      <div className="h-56 border-b border-border bg-background/50 lg:col-span-2 lg:h-auto lg:min-h-72 lg:border-b-0 lg:border-r">
        <MotifPreview motif={project.motif} />
      </div>

      <div className="flex flex-col p-7 sm:p-9 lg:col-span-3">
        <div className="flex flex-wrap gap-2">
          <Badge tone={project.status === "proof" ? "brand" : "neutral"}>
            {project.statusLabel}
          </Badge>
          <Badge>{project.category}</Badge>
        </div>

        <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors hover:text-brand-bright"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
          {project.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-heading text-lg font-semibold tracking-tight">
                {metric.value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.techStack.map((tool) => (
            <TechBadge key={tool} name={tool} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-5 pt-7">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
          >
            {project.status === "proof"
              ? "Read the case study"
              : "Read the build plan"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Live demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
