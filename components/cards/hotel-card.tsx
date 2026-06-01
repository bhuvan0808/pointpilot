import { BedDouble } from "lucide-react";

import { RatingBadge } from "@/components/cards/rating-badge";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { HotelRedemption } from "@/types";

export function HotelCard({
  redemption,
  best,
}: {
  redemption: HotelRedemption;
  best?: boolean;
}) {
  const { program } = redemption;
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border bg-card shadow-vintage-sm",
        best ? "border-primary/60 ring-1 ring-primary/30" : "border-border"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between bg-gradient-to-br p-4 text-white",
          program.tone
        )}
      >
        <div className="flex items-center gap-2">
          <BedDouble className="h-5 w-5" />
          <span className="font-serif text-lg font-semibold">{program.name}</span>
        </div>
        <span className="font-mono text-xs text-white/80">
          {(program.pointValuePaise / 100).toFixed(2)} ₹/pt
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <RatingBadge rating={redemption.rating} />
          {best && (
            <span className="text-xs font-semibold text-primary">Top pick</span>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
          <div>
            <dt className="label-caps">Nights possible</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {redemption.nightsPossible}
            </dd>
          </div>
          <div>
            <dt className="label-caps">Total value</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold text-primary">
              {formatINR(redemption.totalValueINR)}
            </dd>
          </div>
          <div>
            <dt className="label-caps">Points / night</dt>
            <dd className="mt-1 font-mono text-base font-medium">
              {formatNumber(redemption.nightlyPoints)}
            </dd>
          </div>
          <div>
            <dt className="label-caps">Cash / night</dt>
            <dd className="mt-1 text-base font-medium">
              {formatINR(redemption.nightlyCashINR)}
            </dd>
          </div>
        </dl>

        <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
          {program.highlight}
        </p>
      </div>
    </article>
  );
}
