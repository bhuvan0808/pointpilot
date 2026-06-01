"use client";

import * as React from "react";
import { ArrowLeftRight, Search } from "lucide-react";

import { AwardCard } from "@/components/cards/award-card";
import { EstimateNote } from "@/components/page-header";
import { AirportSearch } from "@/components/search/airport-search";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchAwards } from "@/lib/award-engine";
import { POPULAR_AIRPORTS } from "@/lib/use-airport-search";
import { formatINR, formatNumber, regionLabel } from "@/lib/utils";
import type { Airport, CabinClass } from "@/types";

const CABINS: CabinClass[] = ["Economy", "Premium Economy", "Business", "First"];

function popular(iata: string): Airport {
  return POPULAR_AIRPORTS.find((a) => a.iata === iata) ?? POPULAR_AIRPORTS[0];
}

function defaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export function AwardSearchTool() {
  const [from, setFrom] = React.useState<Airport | null>(popular("MAA"));
  const [to, setTo] = React.useState<Airport | null>(popular("NRT"));
  const [cabin, setCabin] = React.useState<CabinClass>("Business");
  const [date, setDate] = React.useState(defaultDate());
  const [submitted, setSubmitted] = React.useState(true);

  const result = React.useMemo(() => {
    if (!from || !to) return null;
    return searchAwards(from, to, cabin, date);
  }, [from, to, cabin, date]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  const show = submitted && result && from && to;

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <AirportSearch id="from" value={from} onChange={setFrom} placeholder="Departure city" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="to">To</Label>
              <button
                type="button"
                onClick={swap}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ArrowLeftRight className="h-3 w-3" /> Swap
              </button>
            </div>
            <AirportSearch id="to" value={to} onChange={setTo} placeholder="Destination city" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabin">Cabin</Label>
            <Select value={cabin} onValueChange={(v) => setCabin(v as CabinClass)}>
              <SelectTrigger id="cabin">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CABINS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
          <Search className="h-4 w-4" />
          Search award flights
        </Button>
      </form>

      {show && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="label-caps">Award options</p>
              <h2 className="font-serif text-2xl font-semibold">
                {from!.city} → {to!.city}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatNumber(result!.distanceKm)} km · {regionLabel(result!.region)} ·{" "}
                {cabin} · est. cash fare {formatINR(result!.options[0]?.cashFareINR ?? 0)}
              </p>
            </div>
          </div>

          {result!.options.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
              No supported programme covers this region in our data. Try another route.
            </div>
          ) : (
            <div className="space-y-4">
              {result!.options.map((opt, i) => (
                <AwardCard key={opt.airline.id} option={opt} rank={i + 1} />
              ))}
            </div>
          )}

          <EstimateNote />
        </div>
      )}
    </div>
  );
}
