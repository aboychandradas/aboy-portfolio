import { getTechByName } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

/**
 * Small icon + name chip for project stacks. Falls back to a plain text chip
 * when the name has no icon entry, so unknown tools never break a card.
 */
export function TechBadge({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const tech = getTechByName(name);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[10px] text-muted",
        className
      )}
    >
      {tech ? <tech.icon className="h-3.5 w-3.5 shrink-0" /> : null}
      {name}
    </span>
  );
}
