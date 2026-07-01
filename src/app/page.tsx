import { Hero } from "@/components/home/hero";
import { TrustBadges } from "@/components/home/trust-badges";
import { ProblemSection } from "@/components/home/problem-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedWork } from "@/components/home/featured-work";
import { ProcessPreview } from "@/components/home/process-preview";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProblemSection />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessPreview />
      <FinalCta />
    </>
  );
}
