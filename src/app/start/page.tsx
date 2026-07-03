import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  CircleCheck,
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { bestFitProjects } from "@/data/process";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageCta } from "@/components/sections/page-cta";

const pageDescription =
  "Found this portfolio through Upwork, Fiverr, or Freelancer? Message me on that same platform. This page explains what to include in your first message and what happens next.";

export const metadata: Metadata = {
  title: "How to Start",
  description: pageDescription,
  alternates: { canonical: "/start" },
  openGraph: {
    title: `How to Start — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/start`,
    siteName: site.name,
    type: "website",
  },
};

const platformReasons = [
  {
    icon: MessagesSquare,
    title: "One conversation, on record",
    description:
      "Scope, decisions, and files stay in a single thread we can both point back to.",
  },
  {
    icon: ShieldCheck,
    title: "Payment protection",
    description:
      "Milestones and escrow protect your money and my work. Nobody has to rely on trust alone.",
  },
  {
    icon: ClipboardList,
    title: "Clear terms",
    description:
      "The platform's dispute process and reviews keep both sides accountable to what was agreed.",
  },
];

const beforeYouMessage = [
  {
    title: "Skim the work",
    description: "Two minutes on the work page shows you what I build and how it's labeled.",
    href: "/work",
    linkLabel: "View Work",
  },
  {
    title: "Check the fit",
    description: "The best-fit list below tells you quickly whether your project is my lane.",
    href: null,
    linkLabel: null,
  },
  {
    title: "Glance at the process",
    description: "Six steps, each ending with something in your hands — so you know what you're agreeing to.",
    href: "/process",
    linkLabel: "Read Process",
  },
  {
    title: "Have a rough range in mind",
    description: "A ballpark timeline and budget range helps me scope honestly from the first reply.",
    href: null,
    linkLabel: null,
  },
];

const messageChecklist = [
  "How the work happens today — the spreadsheet, the tools, the copy-paste steps.",
  "Who will use the system, and roughly how many people.",
  "What must exist in version one, and what can wait.",
  "Your rough timeline and budget range.",
  "Whether you can share sample data, like an anonymized CSV.",
  "Anything already tried — a template, a tool, a previous build.",
];

const afterYouMessage = [
  {
    number: "01",
    title: "I reply with clarifying questions",
    description:
      "A few specific questions in plain language — usually about the workflow, not the tech.",
  },
  {
    number: "02",
    title: "You get an honest fit answer",
    description:
      "If it's my lane, I say so. If it isn't, I say that too and point you toward a better option.",
  },
  {
    number: "03",
    title: "You get a written scope",
    description:
      "Phases, screens, and deliverables in writing — so we agree on the same project before it starts.",
  },
  {
    number: "04",
    title: "The project runs inside the platform",
    description:
      "Milestones, files, communication, and payment all stay where they're protected — from kickoff to handoff.",
  },
];

export default function StartPage() {
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
              eyebrow="How to start"
              title="Found me on Upwork, Fiverr, or Freelancer? Start there."
              lede="Message me on the same platform where you found this portfolio. That keeps communication, scope, payment, and protection in one place — for you and for me. This page makes your first message easy to write."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {platformReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <reason.icon className="h-5 w-5 text-brand-bright" />
                  <h2 className="mt-3 text-sm font-semibold">{reason.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Step 1"
              title="Before you message me."
              lede="Five minutes of homework that makes the whole project start faster."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {beforeYouMessage.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="card-interactive h-full rounded-xl border border-border bg-surface p-6">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  {item.href && item.linkLabel ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
                    >
                      {item.linkLabel} →
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Step 2"
              title="What to include in your project message."
              lede="Two or three plain sentences per point is plenty. No template needed — this is just what helps me scope honestly on the first pass."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 max-w-2xl space-y-3">
              {messageChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Fit"
              title="Best-fit project types."
              lede="If your project looks like one of these, we'll probably work well together."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {bestFitProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
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
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Step 3"
              title="What happens after you message me."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {afterYouMessage.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <div className="h-full rounded-xl border border-border bg-surface p-6">
                  <p className="font-mono text-xs font-medium tracking-[0.2em] text-brand-bright">
                    {step.number}
                  </p>
                  <h3 className="mt-3 font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
              {site.marketplaceNote} This site deliberately has no contact form
              — that isn’t an oversight, it’s how marketplace projects should
              work.
            </p>
          </Reveal>
        </Container>
      </section>

      <PageCta
        title="Get a feel for the work first."
        body="The proof, the services, and the process — everything you need to decide whether to send that first message."
      >
        <ButtonLink href="/work" size="lg">
          View Work
        </ButtonLink>
        <ButtonLink href="/services" variant="secondary" size="lg">
          See Services
        </ButtonLink>
        <ButtonLink href="/process" variant="secondary" size="lg">
          Read Process
        </ButtonLink>
      </PageCta>
    </>
  );
}
