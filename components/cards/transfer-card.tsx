import { ArrowRight, Clock, Gift, Sparkles, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatINRPrecise } from "@/lib/utils";
import type { Airline, TransferBonus } from "@/types";

export interface TransferCardData {
  airline: Airline;
  ratioDisplay: string;
  transferTime: string;
  typicalValue: number;
  sweetSpots: string[];
  recommendedUse: string;
  bonuses: TransferBonus[];
}

export function TransferCard({ data }: { data: TransferCardData }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl font-semibold leading-tight">
            {data.airline.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {data.airline.program} · {data.airline.alliance}
          </p>
        </div>
        <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 font-mono text-sm font-semibold">
          {data.airline.code}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge className="gap-1.5 font-mono">
          <ArrowRight className="h-3 w-3" />
          {data.ratioDisplay}
        </Badge>
        <Badge variant="muted" className="gap-1.5">
          <Clock className="h-3 w-3" />
          {data.transferTime}
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          ~{formatINRPrecise(data.typicalValue)}/mile
        </Badge>
      </div>

      <div className="mt-5 rounded-md bg-secondary/40 p-3">
        <p className="flex items-center gap-1.5 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          Recommended
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{data.recommendedUse}</p>
      </div>

      <div className="mt-5">
        <p className="label-caps mb-2 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5" /> Sweet spots
        </p>
        <ul className="space-y-1.5">
          {data.sweetSpots.map((s) => (
            <li key={s} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {data.bonuses.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="label-caps mb-2 flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5" /> Recent transfer bonuses
          </p>
          <ul className="space-y-1.5">
            {data.bonuses.map((b, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="font-medium">{b.bonus}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {b.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
