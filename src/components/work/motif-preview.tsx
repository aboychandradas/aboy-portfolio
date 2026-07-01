import type { ProjectMotif } from "@/data/projects";

/** Abstract CSS thumbnails per project — deliberately not fake screenshots. */
export function MotifPreview({ motif }: { motif: ProjectMotif }) {
  if (motif === "chart") {
    return (
      <div className="flex h-full items-end gap-2 p-6">
        {[38, 58, 44, 72, 52, 84, 66, 95].map((height, index) => (
          <div
            key={index}
            className={
              index === 7
                ? "w-full rounded-sm bg-brand"
                : "w-full rounded-sm bg-brand/25"
            }
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    );
  }

  if (motif === "pipeline") {
    return (
      <div className="grid h-full grid-cols-3 gap-2.5 p-6">
        {[
          ["h-9", "h-12", "h-7"],
          ["h-12", "h-8"],
          ["h-8", "h-10", "h-9"],
        ].map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col justify-center gap-2.5"
          >
            <div className="h-1.5 w-8 rounded-full bg-border-strong" />
            {column.map((height, cardIndex) => (
              <div
                key={cardIndex}
                className={`${height} rounded-md border ${
                  columnIndex === 1 && cardIndex === 0
                    ? "border-brand/40 bg-brand-muted"
                    : "border-border bg-surface-raised/60"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-6">
      <div className="flex gap-2.5">
        <span className="h-2 w-10 rounded-full bg-brand/50" />
        <span className="h-2 flex-1 rounded-full bg-brand/25" />
        <span className="h-2 w-14 rounded-full bg-brand/25" />
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex gap-2.5">
          <span className="h-2 w-10 rounded-full bg-border" />
          <span className="h-2 flex-1 rounded-full bg-border/70" />
          <span className="h-2 w-14 rounded-full bg-border" />
        </div>
      ))}
    </div>
  );
}
