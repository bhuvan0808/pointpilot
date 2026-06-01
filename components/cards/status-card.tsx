"use client";

import { CalendarClock, Trash2, TrendingUp } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/utils";
import type { SavedStatus, StatusProgram } from "@/types";

export function StatusCard({
  status,
  program,
  onDelete,
}: {
  status: SavedStatus;
  program?: StatusProgram;
  onDelete?: (id: string) => void;
}) {
  const tiers = program?.tiers ?? [];
  // Determine current and next tier from the stored value.
  let currentIdx = 0;
  for (let i = 0; i < tiers.length; i++) {
    if (status.currentValue >= tiers[i].threshold) currentIdx = i;
  }
  const current = tiers[currentIdx];
  const next = tiers[currentIdx + 1];
  const unit = program?.unit ?? "miles";

  let pct = 100;
  let toGo = 0;
  if (next && current) {
    const span = next.threshold - current.threshold;
    pct = Math.round(((status.currentValue - current.threshold) / span) * 100);
    pct = Math.max(0, Math.min(100, pct));
    toGo = Math.max(0, next.threshold - status.currentValue);
  }

  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold leading-tight">
            {status.programName}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            {current?.name ?? status.currentTier}
          </p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(status.id)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-destructive"
            aria-label="Remove status"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between text-sm">
          <span className="font-mono font-semibold">
            {formatNumber(status.currentValue)} {unit}
          </span>
          <span className="text-muted-foreground">
            {next ? `${pct}% to ${next.name}` : "Top tier reached"}
          </span>
        </div>
        <Progress value={pct} indicatorClassName={next ? "" : "bg-emerald-700"} />
        {next && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {formatNumber(toGo)} {unit} to {next.name}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
        <CalendarClock className="h-4 w-4" />
        Renews {status.renewalDate || "—"}
      </div>
    </article>
  );
}
