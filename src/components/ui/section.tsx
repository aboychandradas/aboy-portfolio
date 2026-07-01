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
  as: HeadingTag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  /** Use "h1" when this heading opens a page instead of a section. */
  as?: "h1" | "h2";
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
      <HeadingTag
        className={cn(
          "mt-3 font-heading font-semibold tracking-tight text-balance",
          HeadingTag === "h1"
            ? "text-4xl sm:text-5xl"
            : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </HeadingTag>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
