import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatINR, formatINRPrecise } from "@/lib/utils";
import type { CardComparisonRow } from "@/types";

export function CardComparison({
  rows,
  activeCardId,
}: {
  rows: CardComparisonRow[];
  activeCardId: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-vintage-sm">
      {/* header */}
      <div className="hidden grid-cols-12 gap-3 border-b border-border bg-secondary/40 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid">
        <span className="col-span-4">Card</span>
        <span className="col-span-3">Best partner</span>
        <span className="col-span-2 text-right">Value / point</span>
        <span className="col-span-2 text-right">Est. value</span>
        <span className="col-span-1 text-right">Score</span>
      </div>

      <ul className="divide-y divide-border">
        {rows.map((row) => {
          const active = row.card.id === activeCardId;
          return (
            <li
              key={row.card.id}
              className={cn(
                "grid grid-cols-2 gap-3 px-5 py-4 text-sm sm:grid-cols-12 sm:items-center",
                active && "bg-primary/5"
              )}
            >
              <div className="col-span-2 flex items-center gap-2 sm:col-span-4">
                <span className="font-medium">{row.card.name}</span>
                {active && (
                  <Badge variant="outline" className="text-[10px]">
                    Your card
                  </Badge>
                )}
              </div>

              <div className="text-muted-foreground sm:col-span-3">
                <span className="sm:hidden label-caps">Best partner: </span>
                {row.bestAirline ? row.bestAirline.program : "—"}
              </div>

              <div className="font-mono sm:col-span-2 sm:text-right">
                <span className="sm:hidden label-caps">Value/pt: </span>
                {formatINRPrecise(row.valuePerPoint)}
              </div>

              <div className="font-medium sm:col-span-2 sm:text-right">
                <span className="sm:hidden label-caps">Est. value: </span>
                {formatINR(row.estimatedRedemptionValue)}
              </div>

              <div className="flex items-center gap-1 font-serif text-lg font-semibold sm:col-span-1 sm:justify-end">
                {row.score}
                {row.score === Math.max(...rows.map((r) => r.score)) &&
                  row.score > 0 && (
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
