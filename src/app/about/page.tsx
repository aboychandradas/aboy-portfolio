import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  MonitorSmartphone,
  PencilRuler,
  Rocket,
  Target,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { Reveal } from "@/components/motion/reveal";
import { PageCta } from "@/components/sections/page-cta";

const pageDescription =
  "Aboy Chandra Das is a full-stack developer building business web apps under Aboy Systems — dashboards, CRM systems, and automation tools in Next.js, React, TypeScript, and Tailwind CSS. Honest scoping, deployed proof, no invented clients.";

export const metadata: Metadata = {
  title: "About",
  description: pageDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/about`,
    siteName: site.name,
    type: "profile",
  },
};

const stackFocus = ["Next.js", "React", "TypeScript", "Tailwind CSS"];
const problemFocus = [
  "Dashboards",
  "CRM workflows",
  "Automation tools",
  "Data-driven UI",
];

const buildPrinciples = [
  {
    icon: Target,
    title: "Business-first thinking",
    description:
      "Screens exist to answer questions and save hours. The build starts from your workflow, not from the tech.",
  },
  {
    icon: PencilRuler,
    title: "Clean, calm UI",
    description:
      "Dense where it helps, quiet everywhere else. Dashboards should read like instruments, not fireworks.",
  },
  {
    icon: Boxes,
    title: "Reusable components",
    description:
      "Design systems over one-off screens — it's why my builds stay consistent and fast to extend.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    description:
      "Built for the office laptop and the phone between site visits — not desktop-only demos.",
  },
  {
    icon: BookOpen,
    title: "Documented on GitHub",
    description:
      "Readable commits and written notes, so the project stays understandable long after handoff.",
  },
  {
    icon: Rocket,
    title: "Deployment-ready",
    description:
      "Every build ships to a real URL with deployment notes — a working product, not a zip file.",
  },
];

const currentFocus = [
  {
    number: "01",
    title: "Building portfolio-grade business systems",
    description:
      "Self-initiated products like FieldOps Analytics OS — real builds that prove the playbook end to end, plus scoped roadmaps held to the same standard.",
  },
  {
    number: "02",
    title: "Sharpening real-world full-stack workflows",
    description:
      "Going deeper on data modeling, testing with realistic edge cases, and deployment practice with every build.",
  },
  {
    number: "03",
    title: "Opening up to global freelance clients",
    description:
      "Preparing Aboy Systems for remote client work on Upwork, Fiverr, Freelancer, and LinkedIn — leading with proof instead of promises.",
  },
];

export default function AboutPage() {
  const github = site.socials.find(
    (social) => social.icon === "github" && social.href
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-subtle mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black_20%,transparent_100%)]"
        />
        <Container className="relative pb-16 pt-16 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div>
              <Reveal>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-bright">
                  About
                </p>
                <h1 className="mt-3 max-w-2xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  I’m Aboy Chandra Das. I build the systems small teams run on.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
                  <p>
                    I’m a full-stack developer working under the name{" "}
                    <span className="font-medium text-foreground">
                      Aboy Systems
                    </span>
                    . I build business web apps — dashboards, CRM systems,
                    automation tools, and the admin workflows behind them —
                    with Next.js, React, TypeScript, and Tailwind CSS.
                  </p>
                  <p>
                    I’ll be straight about where I am: I’m at the start of my
                    freelance career, and I don’t have a wall of client logos.
                    What I have instead is proof of work — self-initiated
                    systems like FieldOps Analytics OS, designed, built, and
                    deployed end to end, and build roadmaps treated with the
                    same rigor a paid project would get.
                  </p>
                  <p>
                    The bet I’m making is simple: show, don’t claim. Every
                    project on this site is labeled for exactly what it is,
                    every scope I quote is one I can deliver, and if your
                    project isn’t a good fit, I’ll say so and point you
                    somewhere better.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                        Stack
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {stackFocus.map((item) => (
                          <Badge key={item} className="font-mono text-[11px]">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                        Problem space
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {problemFocus.map((item) => (
                          <Badge
                            key={item}
                            tone="brand"
                            className="font-mono text-[11px]"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <aside>
              <Reveal delay={0.12} className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <ProfilePhoto
                    className="mb-5 aspect-square w-full rounded-xl"
                    iconClassName="h-14 w-14"
                    sizes="(min-width: 1024px) 272px, 100vw"
                  />
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-heading text-sm font-bold text-brand-foreground">
                      A
                    </span>
                    <div>
                      <p className="font-heading text-[0.95rem] font-semibold tracking-tight">
                        Aboy Systems
                      </p>
                      <p className="text-xs text-faint">{site.owner}</p>
                    </div>
                  </div>

                  <dl className="mt-6 space-y-3 border-t border-border/60 pt-5">
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-faint">Role</dt>
                      <dd className="text-right text-muted">{site.role}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-faint">Focus</dt>
                      <dd className="text-right text-muted">
                        Business web apps
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-faint">Base</dt>
                      <dd className="text-right text-muted">
                        Remote · Worldwide
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-faint">Availability</dt>
                      <dd className="flex items-center gap-1.5 text-right text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Open to new projects
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
                    <ButtonLink href="/start" className="w-full">
                      How to Start
                    </ButtonLink>
                    {github ? (
                      <ButtonLink
                        href={github.href}
                        external
                        variant="secondary"
                        className="w-full"
                      >
                        <FaGithub className="h-4 w-4" />
                        GitHub
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="How I build"
              title="Principles that show up in every project."
              lede="Not aspirations — habits you can verify in the work and the repos."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buildPrinciples.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.05}>
                <div className="h-full rounded-xl border border-border bg-surface p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                    <principle.icon className="h-5 w-5 text-brand-bright" />
                  </span>
                  <h3 className="mt-4 font-medium">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
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
              eyebrow="Current focus"
              title="What I'm working on right now."
            />
          </Reveal>
          <div className="mt-10 max-w-3xl space-y-4">
            {currentFocus.map((focus, index) => (
              <Reveal key={focus.number} delay={index * 0.06}>
                <div className="flex gap-5 rounded-xl border border-border bg-surface p-6">
                  <span className="font-mono text-sm font-medium tracking-[0.15em] text-brand-bright">
                    {focus.number}
                  </span>
                  <div>
                    <h3 className="font-medium">{focus.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {focus.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageCta
        title="The proof matters more than the pitch."
        body="See the systems I've built and scoped, or read exactly how a project with me runs from first call to handoff."
      >
        <ButtonLink href="/work" size="lg">
          View my work
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/process" variant="secondary" size="lg">
          Read my process
        </ButtonLink>
      </PageCta>
    </>
  );
}
