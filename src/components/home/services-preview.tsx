import Link from "next/link";
import {
  ArrowRight,
  Check,
  LayoutDashboard,
  Users,
  Workflow,
} from "lucide-react";
import { services, type ServiceIcon } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const serviceIcons: Record<ServiceIcon, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  crm: Users,
  automation: Workflow,
};

export function ServicesPreview() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Web apps built around operations, not just pages."
          lede="Three ways I help businesses replace manual work with software they own."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Reveal key={service.slug} delay={index * 0.06}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                  <Icon className="h-5 w-5 text-brand-bright" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.clientsGet.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
                  >
                    See service details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <Link
          href="/services"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-foreground"
        >
          Explore all services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
