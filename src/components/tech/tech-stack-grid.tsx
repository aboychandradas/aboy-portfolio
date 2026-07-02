import { techCategories, techStack } from "@/data/tech-stack";
import { Reveal } from "@/components/motion/reveal";

export function TechStackGrid() {
  return (
    <div className="space-y-12">
      {techCategories.map((category, categoryIndex) => {
        const items = techStack.filter((tech) => tech.category === category);
        return (
          <Reveal key={category} delay={categoryIndex * 0.05}>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                {category}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-start gap-3.5 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                  >
                    <tech.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-brand-bright" />
                    <div>
                      <h3 className="text-sm font-semibold">{tech.name}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
