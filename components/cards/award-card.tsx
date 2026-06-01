import { Plane } from "lucide-react";

import { RatingBadge } from "@/components/cards/rating-badge";
import { Badge } from "@/components/ui/badge";
import { cn, formatINR, formatINRPrecise, formatNumber } from "@/lib/utils";
import type { AwardOption } from "@/types";

export function AwardCard({
  option,
  rank,
}: {
  option: AwardOption;
  rank: number;
}) {
  const best = rank === 1;
  return (
    <article
      className={cn(
        "relative rounded-lg border bg-card p-5 shadow-vintage-sm transition-shadow hover:shadow-vintage sm:p-6",
        best ? "border-primary/60 ring-1 ring-primary/30" : "border-border"
      )}
    >
      {best && (
        <Badge className="absolute -top-2.5 left-5 shadow-sm">Best value</Badge>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 font-mono text-sm font-semibold">
            {option.airline.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold leading-tight">
                {option.airline.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {option.airline.program} · {option.cabin}
            </p>
          </div>
        </div>
        <RatingBadge rating={option.rating} className="self-start sm:self-auto" />
      </div>

      <div className="ticket-divider my-5" />

      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        <Metric label="Miles (round trip)" value={formatNumber(option.milesRequiredRoundTrip)} mono />
        <Metric label="Taxes & fees" value={formatINR(option.taxesINR)} />
        <Metric label="Cash fare" value={formatINR(option.cashFareINR)} />
        <Metric label="Value / mile" value={formatINRPrecise(option.valuePerMile)} accent />
      </dl>

      <div className="mt-5">
        <p className="label-caps mb-2">Transfer from</p>
        {option.transferCards.length ? (
          <div className="flex flex-wrap gap-1.5">
            {option.transferCards.map((c) => (
              <Badge key={c.cardId} variant="muted" className="gap-1">
                {c.cardName}
                <span className="font-mono text-[10px] opacity-70">{c.display}</span>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No direct transfer partner among supported cards — earn miles directly.
          </p>
        )}
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="label-caps">{label}</dt>
      <dd className={cn("mt-1 text-base font-semibold", mono && "font-mono", accent && "text-primary")}>
        {value}
      </dd>
    </div>
  );
}
