import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 motion-safe:active:translate-y-px";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-foreground shadow-sm shadow-black/30 hover:bg-brand-bright",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-raised",
  ghost: "text-muted hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function ButtonLink({
  href,
  variant,
  size,
  external = false,
  className,
  onClick,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a plain anchor (for off-site links like GitHub). */
  external?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
