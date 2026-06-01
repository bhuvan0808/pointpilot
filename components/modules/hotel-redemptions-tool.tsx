"use client";

import * as React from "react";
import { BedDouble } from "lucide-react";

import { HotelCard } from "@/components/cards/hotel-card";
import { EstimateNote } from "@/components/page-header";
import { AirportSearch } from "@/components/search/airport-search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateHotelRedemptions } from "@/lib/hotel-engine";
import { regionForCountry } from "@/lib/regions";
import { POPULAR_AIRPORTS } from "@/lib/use-airport-search";
import { formatNumber, regionLabel } from "@/lib/utils";
import type { Airport } from "@/types";

export function HotelRedemptionsTool() {
  const [points, setPoints] = React.useState("150000");
  const [dest, setDest] = React.useState<Airport | null>(
    POPULAR_AIRPORTS.find((a) => a.iata === "SIN") ?? POPULAR_AIRPORTS[0]
  );

  const pts = Math.max(0, Number(points.replace(/[^0-9]/g, "")) || 0);
  const region = dest ? regionForCountry(dest.country) : "southeast-asia";
  const results = React.useMemo(
    () => calculateHotelRedemptions(pts, region),
    [pts, region]
  );

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="points">Hotel points</Label>
            <Input
              id="points"
              inputMode="numeric"
              value={points}
              onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dest">Destination</Label>
            <AirportSearch id="dest" value={dest} onChange={setDest} placeholder="Where are you staying?" />
          </div>
        </div>
        {dest && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BedDouble className="h-4 w-4 text-primary" />
            {formatNumber(pts)} points in {dest.city} · {regionLabel(region)} nightly
            rates
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {results.map((r, i) => (
          <HotelCard key={r.program.id} redemption={r} best={i === 0} />
        ))}
      </div>

      <EstimateNote>
        Hotel point values and nightly rates are illustrative averages and vary widely
        by property, season and award availability. World of Hyatt typically delivers
        the highest value per point.
      </EstimateNote>
    </div>
  );
}
