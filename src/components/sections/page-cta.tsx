import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/** Compact end-of-page CTA — pass ButtonLink elements as children. */
export function PageCta({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60">
      <Container className="py-16 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {children}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
