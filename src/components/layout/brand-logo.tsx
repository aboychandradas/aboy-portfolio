"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  showText?: boolean;
  className?: string;
  onClick?: () => void;
};

export function BrandLogo({
  showText = true,
  className,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Aboy Systems home"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-surface shadow-sm">
        <Image
          src="/icon-192.png"
          alt=""
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </span>
      {showText ? (
        <span className="font-heading text-[0.95rem] font-semibold tracking-tight">
          Aboy <span className="text-muted">Systems</span>
        </span>
      ) : null}
    </Link>
  );
}
