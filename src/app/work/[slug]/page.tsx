import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { MotifPreview } from "@/components/work/motif-preview";
import { TechBadge } from "@/components/tech/tech-badge";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Case study not found" };
  }

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.subtitle,
      url: `${site.url}/work/${project.slug}`,
      siteName: site.name,
      type: "article",
    },
  };
}

function honestyNote(project: Project) {
  return project.status === "proof"
    ? `${project.title} is a self-initiated product — designed, built, and deployed by me to prove out exactly this kind of system. It runs on seeded demo data. It is not a paid client project.`
    : `${project.title} is a client-grade build roadmap — a fully scoped system I'm building as a portfolio product. This page is the build spec, labeled as such. It is not a delivered client project.`;
}

/** Live demo / GitHub actions that degrade to safe, non-clickable placeholders. */
function DemoLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <>
      {project.liveUrl ? (
        <ButtonLink href={project.liveUrl} external className={className}>
          Live demo
          <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      ) : (
        <span
          aria-disabled="true"
          title="Demo link coming soon"
          className={buttonClasses({
            variant: "secondary",
            className: cn("cursor-not-allowed opacity-60", className),
          })}
        >
          Live demo · coming soon
        </span>
      )}
      {project.githubUrl ? (
        <ButtonLink
          href={project.githubUrl}
          external
          variant="secondary"
          className={className}
        >
          <FaGithub className="h-4 w-4" />
          View code
        </ButtonLink>
      ) : (
        <span
          aria-disabled="true"
          title="Repository link coming soon"
          className={buttonClasses({
            variant: "secondary",
            className: cn("cursor-not-allowed opacity-60", className),
          })}
        >
          <FaGithub className="h-4 w-4" />
          Code · coming soon
        </span>
      )}
    </>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isProof = project.status === "proof";
  const otherProjects = projects.filter((other) => other.slug !== project.slug);

  const glance: [string, string][] = [
    ["Status", project.statusLabel],
    ["Category", project.category],
    ["Role", "Design & engineering"],
    ["Type", isProof ? "Self-initiated product" : "Portfolio build spec"],
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute left-1/2 -top-56 h-88 w-160 -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
        />
        <Container className="relative pb-12 pt-10 sm:pb-16 sm:pt-14">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>

            <div className="mt-7 flex flex-wrap gap-2">
              <Badge tone={isProof ? "brand" : "neutral"}>
                {project.statusLabel}
              </Badge>
              <Badge>{project.category}</Badge>
            </div>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <DemoLinks project={project} />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
              <p>{honestyNote(project)}</p>
            </div>
          </Reveal>

          <Reveal delay={0.22} className="mt-10">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-border bg-surface sm:h-80 lg:h-96">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  fill
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full bg-background/50">
                  <MotifPreview motif={project.motif} />
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <aside className="lg:order-2">
            <Reveal className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                  At a glance
                </p>
                <dl className="mt-4 space-y-3">
                  {glance.map(([term, detail]) => (
                    <div
                      key={term}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <dt className="shrink-0 text-faint">{term}</dt>
                      <dd className="text-right text-muted">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                  {isProof ? "Demo metrics" : "Build scope"}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-heading text-lg font-semibold tracking-tight">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-faint">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-faint">
                  {project.metricsNote}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                  Tech stack
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tool) => (
                    <TechBadge key={tool} name={tool} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <DemoLinks project={project} className="w-full" />
              </div>
            </Reveal>
          </aside>

          <div className="space-y-14 lg:order-1">
            <CaseSection title="Overview">
              <p>{project.overview}</p>
            </CaseSection>

            <CaseSection title="The problem">
              <p>{project.problem}</p>
            </CaseSection>

            <CaseSection title="The solution">
              <p>{project.solution}</p>
            </CaseSection>

            <Reveal>
              <section>
                <h2 className="font-heading text-2xl font-semibold tracking-tight">
                  Key features
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-border bg-surface p-5"
                    >
                      <h3 className="text-sm font-semibold">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <CaseSection title="Business value">
              <CheckList items={project.businessValue} />
            </CaseSection>

            <CaseSection title={isProof ? "What I built" : "What I've built so far"}>
              <CheckList items={project.whatIBuilt} />
            </CaseSection>

            <CaseSection title="Lessons learned">
              <CheckList items={project.lessonsLearned} />
            </CaseSection>

            <CaseSection
              title={isProof ? "Future improvements" : "The build roadmap"}
            >
              <DotList items={project.futureImprovements} />
            </CaseSection>
          </div>
        </div>
      </Container>

      <section className="border-t border-border/60">
        <Container className="py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              More systems
            </h2>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
            >
              All work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {otherProjects.map((other) => (
              <Link
                key={other.slug}
                href={`/work/${other.slug}`}
                className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <Badge tone={other.status === "proof" ? "brand" : "neutral"}>
                  {other.statusLabel}
                </Badge>
                <h3 className="mt-3.5 font-heading text-lg font-semibold tracking-tight">
                  {other.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                  {other.subtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors group-hover:text-foreground">
                  {other.status === "proof"
                    ? "Read the case study"
                    : "Read the build plan"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Want a system like this behind your business?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Describe how the work happens today — spreadsheet, inbox,
              whiteboard — in a message on the platform where you found this
              portfolio, and I’ll come back with an honest scope: what to
              build first, and what it takes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={site.cta.secondary.href} size="lg">
                {site.cta.secondary.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary" size="lg">
                Back to all work
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
