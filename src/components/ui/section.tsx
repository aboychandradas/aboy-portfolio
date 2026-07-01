import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  bordered = true,
  className,
  children,
}: {
  id?: string;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        bordered && "border-t border-border/60",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-bright">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
