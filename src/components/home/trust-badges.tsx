import { FileSpreadsheet, MessagesSquare, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { Reveal } from "@/components/motion/reveal";

const promises = [
  {
    icon: ShieldCheck,
    title: "Type-safe, production-minded code",
    description:
      "TypeScript end to end with validated inputs — no mystery scripts holding the business together.",
  },
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet-friendly by design",
    description:
      "CSV import and export are first-class features, so your data never gets trapped inside the app.",
  },
  {
    icon: MessagesSquare,
    title: "Clear, async communication",
    description:
      "Short written updates and demo videos as the build progresses — made for working across time zones.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-t border-border/60">
      <Container className="py-14 sm:py-16">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <ProfilePhoto
              className="h-20 w-20 shrink-0 rounded-xl"
              iconClassName="h-8 w-8"
              sizes="80px"
            />
            <div>
              <p className="font-medium">
                {site.owner} <span className="text-faint">·</span>{" "}
                <span className="text-muted">{site.name}</span>
              </p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                One developer, end to end — the person you message is the
                person who designs, builds, and ships your system.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 border-t border-border/60 pt-10 md:grid-cols-3">
          {promises.map((promise, index) => (
            <Reveal key={promise.title} delay={index * 0.08}>
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted">
                  <promise.icon className="h-5 w-5 text-brand-bright" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{promise.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {promise.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
