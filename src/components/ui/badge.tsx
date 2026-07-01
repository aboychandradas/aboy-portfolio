import { cn } from "@/lib/utils";

const toneStyles = {
  neutral: "border-border bg-background/60 text-muted",
  brand: "border-brand/30 bg-brand-muted/60 text-brand-bright",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: keyof typeof toneStyles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
