"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

function BrandMark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" onClick={onNavigate}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-heading text-sm font-bold text-brand-foreground">
        A
      </span>
      <span className="font-heading text-[0.95rem] font-semibold tracking-tight">
        Aboy <span className="text-muted">Systems</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <BrandMark onNavigate={closeMenu} />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={site.cta.secondary.href} size="md">
            {site.cta.secondary.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t border-border/60 bg-background lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-[15px] transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink
                href={site.cta.secondary.href}
                size="lg"
                className="mt-3 w-full"
                onClick={closeMenu}
              >
                {site.cta.secondary.label}
              </ButtonLink>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
