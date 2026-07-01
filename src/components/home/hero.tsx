import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { DashboardMock } from "@/components/home/dashboard-mock";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-12rem] h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]"
      />

      <Container className="relative">
        <div className="flex flex-col items-center pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {site.availability}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              I turn spreadsheets and manual workflows into{" "}
              <span className="text-brand-bright">clean business web apps</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              I build dashboards, CRM systems, automation tools, and admin
              workflows using Next.js, React, TypeScript, and Tailwind — with
              database integration, CSV exports, and clean user experiences.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.cta.primary.href} size="lg">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={site.cta.secondary.href}
                variant="secondary"
                size="lg"
              >
                {site.cta.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.34} className="mt-16 w-full sm:mt-20">
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
