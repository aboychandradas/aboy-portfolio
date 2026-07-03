import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  MonitorSmartphone,
  Rocket,
  Table2,
  Users,
  Workflow,
} from "lucide-react";
import { services, type ServiceIcon } from "@/data/services";
import { getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageCta } from "@/components/sections/page-cta";

const pageDescription =
  "Business dashboard development, CRM and lead management systems, and automation and internal tools — built end to end with Next.js, TypeScript, and Tailwind CSS by Aboy Systems.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/services`,
    siteName: site.name,
    type: "website",
  },
};

const serviceIcons: Record<ServiceIcon, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  crm: Users,
  automation: Workflow,
};

const commonDeliverables = [
  { icon: MonitorSmartphone, label: "Responsive UI" },
  { icon: LayoutDashboard, label: "Admin dashboard" },
  { icon: Table2, label: "Data tables" },
  { icon: FileSpreadsheet, label: "CSV/Excel export" },
  { icon: FileText, label: "PDF reports" },
  { icon: Rocket, label: "Clean deployment" },
  { icon: BookOpen, label: "GitHub documentation" },
];

function ListLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
      {children}
    </p>
  );
}

export default function ServicesPage() {
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
              eyebrow="Services"
              title="Systems that replace manual work."
              lede="Three focused services, one playbook: understand the workflow, model the data, and ship a tool your team actually uses. Every engagement is scoped in writing before code starts."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col gap-6">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              const related = service.relatedProjectSlug
                ? getProjectBySlug(service.relatedProjectSlug)
                : undefined;

              return (
                <Reveal key={service.slug} delay={index * 0.06}>
                  <article
                    id={service.slug}
                    className="rounded-2xl border border-border bg-surface p-7 sm:p-10"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-muted">
                        <Icon className="h-6 w-6 text-brand-bright" />
                      </span>
                      <div>
                        <h2 className="font-heading text-2xl font-semibold tracking-tight">
                          {service.title}
                        </h2>
                        <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-muted">
                          {service.whatItIs}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-8 border-t border-border/60 pt-8 md:grid-cols-3">
                      <div>
                        <ListLabel>Best for</ListLabel>
                        <ul className="mt-4 space-y-2.5">
                          {service.bestFor.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <ListLabel>What you get</ListLabel>
                        <ul className="mt-4 space-y-2.5">
                          {service.clientsGet.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <ListLabel>Example features</ListLabel>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {service.exampleFeatures.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {related ? (
                      <div className="mt-8 border-t border-border/60 pt-6">
                        <Link
                          href={`/work/${related.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
                        >
                          {related.status === "proof"
                            ? `See the deployed build: ${related.title}`
                            : `See the build plan: ${related.title}`}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ) : null}
                  </article>
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
              eyebrow="Deliverables"
              title="What ships with every project."
              lede="Whatever the system, these come standard — no upsells for the basics."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {commonDeliverables.map((deliverable, index) => (
              <Reveal key={deliverable.label} delay={index * 0.04}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-muted">
                    <deliverable.icon className="h-4.5 w-4.5 text-brand-bright" />
                  </span>
                  <span className="text-sm font-medium">{deliverable.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageCta
        title="Not sure which service fits?"
        body="Most real projects are a mix. Describe how the work happens today, and I’ll suggest the smallest system that removes the most manual work. The Start page shows what to include in your message."
      >
        <ButtonLink href="/start" size="lg">
          How to Start
        </ButtonLink>
        <ButtonLink href="/work" variant="secondary" size="lg">
          View Work
        </ButtonLink>
      </PageCta>
    </>
  );
}
