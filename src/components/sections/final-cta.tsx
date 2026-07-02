import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <Section id="start-here">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-14 text-center sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Have a spreadsheet that deserves to be an app?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Found this portfolio on Upwork, Fiverr, or Freelancer? Message me
              there — the Start page shows exactly what to include so scoping
              goes fast, and everything stays protected on the platform.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={site.cta.secondary.href} size="lg">
                {site.cta.secondary.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                See Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
