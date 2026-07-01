import { FileSpreadsheet, MessagesSquare, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
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
      "Written updates and short demo videos as the build progresses — made for working across time zones.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-t border-border/60">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-8 md:grid-cols-3">
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

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {site.stack.map((tool) => (
                <Badge key={tool} className="font-mono text-[11px]">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
