import { CircleCheck } from "lucide-react";

const kpis = [
  { label: "Revenue (30d)", value: "$12,480", delta: "+8.2%", tone: "up" },
  { label: "Active jobs", value: "37", delta: "+4", tone: "up" },
  { label: "On-time rate", value: "94%", delta: "+1.5%", tone: "up" },
  { label: "Open invoices", value: "8", delta: "−3", tone: "neutral" },
] as const;

const bars = [34, 52, 41, 63, 48, 70, 58, 77, 64, 86, 72, 95];

/**
 * A purely illustrative product mock built from divs — deliberately labeled
 * as a preview so it never reads as a real client's data.
 */
export function DashboardMock() {
  return (
    <div
      aria-hidden
      className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-2xl shadow-black/50"
    >
      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Ops dashboard · Preview
        </span>
      </div>

      <div className="grid sm:grid-cols-[160px_1fr]">
        <div className="hidden flex-col gap-1 border-r border-border p-3 sm:flex">
          <div className="flex h-8 items-center rounded-md bg-brand-muted px-2.5">
            <span className="font-mono text-[10px] font-medium tracking-[0.15em] text-brand-bright">
              FIELDOPS
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-md bg-surface-raised px-2.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="h-2 w-16 rounded-full bg-border-strong" />
          </div>
          {[14, 12, 16, 10].map((width, index) => (
            <div key={index} className="flex items-center gap-2 px-2.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span
                className="h-2 rounded-full bg-border"
                style={{ width: `${width * 4}px` }}
              />
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-border bg-background/60 p-3"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint">
                  {kpi.label}
                </p>
                <p className="mt-1.5 font-heading text-lg font-semibold tracking-tight">
                  {kpi.value}
                </p>
                <p
                  className={
                    kpi.tone === "up"
                      ? "mt-0.5 text-[10px] text-emerald-400/80"
                      : "mt-0.5 text-[10px] text-faint"
                  }
                >
                  {kpi.delta} vs last month
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-lg border border-border bg-background/60 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint">
                  Jobs completed / week
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  2026
                </span>
              </div>
              <div className="mt-4 flex h-28 items-end gap-1.5">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className={
                      index === bars.length - 1
                        ? "w-full rounded-sm bg-brand"
                        : "w-full rounded-sm bg-brand/25"
                    }
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/60 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint">
                Recent activity
              </p>
              <div className="mt-2">
                {[20, 16, 24, 14].map((width, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 border-b border-border/50 py-2.5 last:border-0"
                  >
                    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400/70" />
                    <span
                      className="h-2 rounded-full bg-border"
                      style={{ width: `${width * 4}px` }}
                    />
                    <span className="ml-auto font-mono text-[9px] text-faint">
                      {index * 4 + 2}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
