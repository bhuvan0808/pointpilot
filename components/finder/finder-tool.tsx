"use client";

import * as React from "react";
import { Calculator, Info, Layers, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardComparison } from "@/components/finder/card-comparison";
import { DestinationPicker } from "@/components/finder/destination-picker";
import { ResultCard } from "@/components/finder/result-card";
import { calculateRedemptions, compareCards } from "@/lib/calculator";
import { cards, cities, destinations, getCity, getDestination } from "@/lib/data";
import { formatNumber, regionLabel } from "@/lib/utils";

const POINT_PRESETS = [50000, 100000, 200000, 500000];

export function FinderTool() {
  const [cardId, setCardId] = React.useState(cards[0].id);
  const [points, setPoints] = React.useState("150000");
  const [fromCode, setFromCode] = React.useState("DEL");
  const [toCode, setToCode] = React.useState("SIN");
  const [hasSearched, setHasSearched] = React.useState(true);
  const [showCompare, setShowCompare] = React.useState(false);

  const pointsNum = Math.max(0, Math.floor(Number(points) || 0));

  const output = React.useMemo(
    () =>
      calculateRedemptions({
        cardId,
        points: pointsNum,
        fromCode,
        toCode,
      }),
    [cardId, pointsNum, fromCode, toCode]
  );

  const comparison = React.useMemo(
    () =>
      compareCards(
        pointsNum,
        fromCode,
        toCode,
        cards.map((c) => c.id)
      ),
    [pointsNum, fromCode, toCode]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHasSearched(true);
  }

  const fromCity = getCity(fromCode);
  const toDest = getDestination(toCode);
  const showResults = hasSearched && pointsNum > 0 && output;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">
              Your details
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything stays in your browser. Nothing is stored.
          </p>

          <div className="mt-6 space-y-5">
            {/* Card */}
            <div className="space-y-2">
              <Label htmlFor="card">Credit card</Label>
              <Select value={cardId} onValueChange={setCardId}>
                <SelectTrigger id="card">
                  <SelectValue placeholder="Choose your card" />
                </SelectTrigger>
                <SelectContent>
                  {cards.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Points */}
            <div className="space-y-2">
              <Label htmlFor="points">Points balance</Label>
              <Input
                id="points"
                inputMode="numeric"
                value={points}
                onChange={(e) =>
                  setPoints(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="e.g. 150000"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {POINT_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPoints(String(p))}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {formatNumber(p)}
                  </button>
                ))}
              </div>
            </div>

            {/* From */}
            <div className="space-y-2">
              <Label htmlFor="from">Departure city</Label>
              <Select value={fromCode} onValueChange={setFromCode}>
                <SelectTrigger id="from">
                  <SelectValue placeholder="Where from?" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="to">Destination</Label>
              <DestinationPicker
                id="to"
                destinations={destinations}
                value={toCode}
                onChange={setToCode}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Sparkles className="h-4 w-4" />
              Find best redemptions
            </Button>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="min-w-0">
        {!showResults ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label-caps">Results for</p>
                <h2 className="font-serif text-2xl font-semibold tracking-tight">
                  {fromCity?.name} → {toDest?.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatNumber(pointsNum)} {output.card.currency} on{" "}
                  {output.card.name} ·{" "}
                  {toDest && regionLabel(toDest.region)} route
                </p>
              </div>
            </div>

            {output.results.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
                {output.card.name} doesn&apos;t have an airline partner that
                covers this region in our data. Try another card or destination.
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {output.results.map((r) => (
                    <ResultCard key={r.airline.id} result={r} />
                  ))}
                </div>

                {/* Card comparison */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCompare((s) => !s)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Layers className="h-4 w-4" />
                    {showCompare ? "Hide" : "Compare"} this trip across all{" "}
                    {cards.length} cards
                  </button>
                  {showCompare && (
                    <div className="mt-4">
                      <CardComparison
                        rows={comparison}
                        activeCardId={cardId}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <Disclaimer />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 p-10 text-center">
      <Calculator className="h-8 w-8 text-muted-foreground" />
      <p className="mt-4 font-serif text-lg font-semibold">
        Enter a points balance to begin
      </p>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Add how many points you have and we&apos;ll rank every transfer partner
        for your route.
      </p>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-border bg-secondary/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        Estimates only. Transfer ratios, award charts and point values change
        frequently and vary by date, availability and cabin. Always confirm live
        pricing in your card&apos;s rewards portal and on the airline&apos;s
        website before transferring — transfers are usually irreversible.
      </p>
    </div>
  );
}
