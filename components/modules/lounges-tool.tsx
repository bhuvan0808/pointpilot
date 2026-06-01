"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { LoungeCard } from "@/components/cards/lounge-card";
import { EstimateNote } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cards, lounges } from "@/lib/data";

export function LoungesTool() {
  const [query, setQuery] = React.useState("");
  const [cardId, setCardId] = React.useState("all");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return lounges.filter((l) => {
      const matchesQuery =
        !q ||
        l.airport.toLowerCase().includes(q) ||
        l.airportName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q);
      const matchesCard = cardId === "all" || l.cards.includes(cardId);
      return matchesQuery && matchesCard;
    });
  }, [query, cardId]);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="q">Search airport or city</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Delhi, BLR, Dubai…"
                className="pl-9"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card">Filter by card</Label>
            <Select value={cardId} onValueChange={setCardId}>
              <SelectTrigger id="card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cards</SelectItem>
                {cards.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} lounge{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/40 p-8 text-center text-muted-foreground">
          No lounges match your filters. Try a different airport or card.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <LoungeCard key={l.id} lounge={l} />
          ))}
        </div>
      )}

      <EstimateNote>
        Lounge access depends on your specific card variant, network (Priority Pass /
        Dreamfolks), visit limits and the lounge operator. Always confirm eligibility on
        arrival.
      </EstimateNote>
    </div>
  );
}
