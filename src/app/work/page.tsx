import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { FinalCta } from "@/components/sections/final-cta";

const pageTitle = "Work — Case Studies & Build Roadmaps";
const pageDescription =
  "Dashboards, CRM systems, and operations tools designed and built end to end by Aboy Chandra Das. Self-initiated products and client-grade build roadmaps — each labeled for exactly what it is.";

export const metadata: Metadata = {
  title: "Work",
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    url: `${site.url}/work`,
    siteName: site.name,
    type: "website",
  },
};

export default function WorkPage() {
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
              eyebrow="Work"
              title="Systems built end to end — and labeled honestly."
              lede="Every project here is either a deployed, self-initiated product or a clearly labeled build roadmap. No invented clients, no borrowed screenshots — you can check everything yourself."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
