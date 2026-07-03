import type { Metadata } from "next";
import {
  Check,
  CircleCheck,
  ClipboardList,
  FileText,
  GitBranch,
  ListChecks,
  MessagesSquare,
} from "lucide-react";
import {
  bestFitProjects,
  clarityPractices,
  processSteps,
  type ClarityIcon,
} from "@/data/process";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageCta } from "@/components/sections/page-cta";

const pageDescription =
  "How Aboy Systems runs a project: six steps from understanding your workflow to a deployed, documented business web app — with scoped phases, GitHub visibility, and test checklists at every stage.";

export const metadata: Metadata = {
  title: "Process",
  description: pageDescription,
  alternates: { canonical: "/process" },
  openGraph: {
    title: `Process — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/process`,
    siteName: site.name,
    type: "website",
  },
};

const clarityIcons: Record<ClarityIcon, React.ComponentType<{ className?: string }>> = {
  phases: ClipboardList,
  commits: GitBranch,
  communication: MessagesSquare,
  checklist: ListChecks,
  deployment: FileText,
};

export default function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-subtle mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black_20%,transparent_100%)]"
        />
        <Container className="relative pb-4 pt-16 sm:pt-24">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Process"
              title="No black boxes. Six steps, each with something in your hands."
              lede="You approve the plan before I write code, watch progress on a live preview link, and end every step with a concrete deliverable — not a status meeting."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <ol className="max-w-3xl">
            {processSteps.map((step, index) => {
              const isLast = index === processSteps.length - 1;
              return (
                <li key={step.number} className="flex gap-5 sm:gap-7">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-sm font-medium text-brand-bright">
                      {step.number}
                    </span>
                    {!isLast ? (
                      <span
                        aria-hidden
                        className="w-px flex-1 bg-border"
                      />
                    ) : null}
                  </div>
                  <Reveal className={isLast ? "" : "pb-10"}>
                    <div className="pt-1.5">
                      <h2 className="font-heading text-xl font-semibold tracking-tight">
                        {step.title}
                      </h2>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
                        {step.description}
                      </p>
                      <p className="mt-4 inline-flex items-start gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-muted">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                        <span>
                          <span className="font-medium text-foreground">
                            You get:{" "}
                          </span>
                          {step.deliverable}
                        </span>
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Working together"
              title="How I keep projects clear."
              lede="Freelance projects go wrong in the fog. These habits keep everything visible — especially across time zones."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clarityPractices.map((practice, index) => {
              const Icon = clarityIcons[practice.icon];
              return (
                <Reveal key={practice.title} delay={index * 0.05}>
                  <div className="h-full rounded-xl border border-border bg-surface p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                      <Icon className="h-5 w-5 text-brand-bright" />
                    </span>
                    <h3 className="mt-4 font-medium">{practice.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {practice.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Fit"
              title="Projects this process is built for."
              lede="I do my best work on operations software — the systems a business runs on daily."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {bestFitProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                  <div>
                    <h3 className="text-sm font-semibold">{project.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {project.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
              If your project isn’t on this list, I’ll say so early and point
              you toward a better fit — that’s cheaper for both of us than a
              mediocre build.
            </p>
          </Reveal>
        </Container>
      </section>

      <PageCta
        title="See what this process produces."
        body="The work page shows this playbook applied end to end — a deployed build and two fully scoped roadmaps, each labeled for what it is."
      >
        <ButtonLink href="/work" size="lg">
          View Work
        </ButtonLink>
        <ButtonLink href="/start" variant="secondary" size="lg">
          How to Start
        </ButtonLink>
      </PageCta>
    </>
  );
}
