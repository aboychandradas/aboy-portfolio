import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaUpwork } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import { site, type SocialLink } from "@/data/site";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";

const socialIcons: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  upwork: FaUpwork,
  fiverr: SiFiverr,
};

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

export function Footer() {
  const visibleSocials = site.socials.filter((social) => social.href);

  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-heading text-sm font-bold text-brand-foreground">
                A
              </span>
              <span className="font-heading text-[0.95rem] font-semibold tracking-tight">
                Aboy <span className="text-muted">Systems</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Full-stack web apps for dashboards, CRM systems, automation, and
              business operations.
            </p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-faint">
              {site.marketplaceNote}
            </p>
          </div>

          <FooterColumn title="Pages">
            {[...site.nav, { label: "How to Start", href: "/start" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {visibleSocials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <li key={social.icon}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.owner} · {site.name}
          </p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
