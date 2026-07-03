import { site } from "@/data/site";
import { Hero } from "@/components/home/hero";
import { TrustBadges } from "@/components/home/trust-badges";
import { ProblemSection } from "@/components/home/problem-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedWork } from "@/components/home/featured-work";
import { TechStack } from "@/components/home/tech-stack";
import { ProcessPreview } from "@/components/home/process-preview";
import { FinalCta } from "@/components/sections/final-cta";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.owner,
  alternateName: site.name,
  url: site.url,
  jobTitle: "Full-stack Web App Developer",
  sameAs: site.socials
    .map((social) => social.href)
    .filter((href) => href !== ""),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <TrustBadges />
      <ProblemSection />
      <ServicesPreview />
      <FeaturedWork />
      <TechStack />
      <ProcessPreview />
      <FinalCta />
    </>
  );
}
