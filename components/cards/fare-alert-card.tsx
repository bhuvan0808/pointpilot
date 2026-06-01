"use client";

import { ArrowRight, BellRing, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";
import type { FareAlert } from "@/types";

export function FareAlertCard({
  alert,
  typicalLowINR,
  onDelete,
  onToggle,
}: {
  alert: FareAlert;
  typicalLowINR?: number;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}) {
  const verdict =
    typicalLowINR != null
      ? alert.targetFareINR >= typicalLowINR
        ? { label: "Realistic target", tone: "bg-emerald-700" }
        : { label: "Ambitious target", tone: "bg-amber-600" }
      : null;

  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold">{alert.fromIata}</span>
          <ArrowRight className="h-4 w-4 text-primary" />
          <span className="font-mono text-lg font-semibold">{alert.toIata}</span>
        </div>
        <div className="flex items-center gap-1">
          {onToggle && (
            <button
              onClick={() => onToggle(alert.id)}
              className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/5"
            >
              {alert.active ? "Pause" : "Resume"}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(alert.id)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-destructive"
              aria-label="Delete alert"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {alert.fromCity} → {alert.toCity} · {alert.cabin}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="label-caps flex items-center gap-1">
            <BellRing className="h-3 w-3" /> Target fare
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold text-primary">
            {formatINR(alert.targetFareINR)}
          </p>
        </div>
        <div className="text-right">
          {typicalLowINR != null && (
            <p className="text-xs text-muted-foreground">
              Typical low {formatINR(typicalLowINR)}
            </p>
          )}
          <div className="mt-1 flex items-center justify-end gap-1.5">
            {verdict && (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${verdict.tone}`}
              >
                {verdict.label}
              </span>
            )}
            <Badge variant={alert.active ? "secondary" : "muted"}>
              {alert.active ? "Active" : "Paused"}
            </Badge>
          </div>
        </div>
      </div>
    </article>
  );
}
