import { CheckCircle2, CircleSlash, Plane, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatINR, formatINRPrecise, formatNumber } from "@/lib/utils";
import type { RedemptionResult } from "@/types";

export function ResultCard({ result }: { result: RedemptionResult }) {
  const isBest = result.rank === 1;

  return (
    <article
      className={cn(
        "relative rounded-lg border bg-card p-5 shadow-vintage-sm transition-shadow hover:shadow-vintage sm:p-6",
        isBest ? "border-primary/60 ring-1 ring-primary/30" : "border-border"
      )}
    >
      {isBest && (
        <Badge className="absolute -top-2.5 left-5 shadow-sm">
          Best value
        </Badge>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Rank + airline */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md border text-center",
              isBest
                ? "border-primary/40 bg-primary/10"
                : "border-border bg-secondary/60"
            )}
          >
            <span className="font-mono text-[9px] uppercase text-muted-foreground">
              Rank
            </span>
            <span className="font-serif text-lg font-semibold leading-none">
              {result.rank}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold leading-tight">
                {result.airline.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {result.airline.program} · {result.airline.alliance}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="label-caps">Score</span>
          </div>
          <p className="font-serif text-3xl font-semibold leading-none">
            {result.score}
            <span className="text-base text-muted-foreground">/100</span>
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary sm:w-32">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
      </div>

      <div className="ticket-divider my-5" />

      {/* Metrics */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        <Metric label="Transfer ratio" value={result.ratioDisplay} mono />
        <Metric
          label="Miles you'd get"
          value={formatNumber(result.milesReceived)}
          mono
        />
        <Metric
          label="Est. redemption value"
          value={formatINR(result.estimatedRedemptionValue)}
          accent
        />
        <Metric
          label="Value per point"
          value={formatINRPrecise(result.valuePerPoint)}
          accent
        />
      </dl>

      <div
        className={cn(
          "mt-5 flex items-start gap-2 rounded-md px-3 py-2.5 text-sm",
          result.canBookRoundTrip
            ? "bg-secondary/60 text-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {result.canBookRoundTrip ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        ) : (
          <CircleSlash className="mt-0.5 h-4 w-4 shrink-0" />
        )}
        <span>{result.notes}</span>
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
      <dd
        className={cn(
          "mt-1 text-lg font-semibold",
          mono && "font-mono",
          accent && "text-primary"
        )}
      >
        {value}
      </dd>
    </div>
  );
}
