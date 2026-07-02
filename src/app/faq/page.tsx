import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageCta } from "@/components/sections/page-cta";

const pageDescription =
  "Straight answers about working with Aboy Systems: project types, CSV and Excel dashboards, CRM builds, tech stack, scope management, and how marketplace clients should get in touch.";

export const metadata: Metadata = {
  title: "FAQ",
  description: pageDescription,
  openGraph: {
    title: `FAQ — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/faq`,
    siteName: site.name,
    type: "website",
  },
};

/** FAQPage structured data, kept in sync with src/data/faq.ts. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-subtle mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black_20%,transparent_100%)]"
        />
        <Container className="relative pb-4 pt-16 sm:pt-24">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="FAQ"
              title="Straight answers, before you ask."
              lede="The questions clients usually ask before the first message — answered the same way I'd answer them in a call."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {faqItems.map((item, index) => (
              <Reveal key={item.question} delay={Math.min(index * 0.04, 0.2)}>
                <details className="group rounded-xl border border-border bg-surface transition-colors open:border-border-strong hover:border-border-strong">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageCta
        title="Question not covered?"
        body="Ask it in your first message on the platform where you found this portfolio — the How to Start page shows what else to include."
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
