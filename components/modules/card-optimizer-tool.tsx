"use client";

import * as React from "react";
import { Check, TrendingDown, Wallet } from "lucide-react";

import { EstimateNote } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cards } from "@/lib/data";
import { CATEGORIES, CATEGORY_LABELS, optimizeCards } from "@/lib/optimizer";
import { cn, formatINR } from "@/lib/utils";
import type { SpendCategory, SpendInput } from "@/types";

const DEFAULT_SPEND: SpendInput = {
  flights: 200000,
  hotels: 100000,
  dining: 80000,
  general: 400000,
};

export function CardOptimizerTool() {
  const [selected, setSelected] = React.useState<string[]>(cards.map((c) => c.id));
  const [spend, setSpend] = React.useState<SpendInput>(DEFAULT_SPEND);

  const result = React.useMemo(
    () => optimizeCards(selected, spend),
    [selected, spend]
  );

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function setCat(cat: SpendCategory, v: string) {
    setSpend((p) => ({ ...p, [cat]: Math.max(0, Number(v.replace(/[^0-9]/g, "")) || 0) }));
  }

  const maxCardTotal = Math.max(1, ...result.perCardTotals.map((p) => p.rewardINR));

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6">
        <p className="label-caps mb-3">Cards in your wallet</p>
        <div className="flex flex-wrap gap-2">
          {cards.map((c) => {
            const on = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  on
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {on && <Check className="h-3.5 w-3.5 text-primary" />}
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="ticket-divider my-6" />

        <p className="label-caps mb-3">Annual spend by category</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="space-y-2">
              <Label>{CATEGORY_LABELS[cat]} (₹)</Label>
              <Input
                inputMode="numeric"
                value={String(spend[cat])}
                onChange={(e) => setCat(cat, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/40 p-8 text-center text-muted-foreground">
          Select at least one card to see recommendations.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-primary/50 bg-primary/5 p-6 shadow-vintage-sm">
              <p className="label-caps flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" /> Projected annual rewards
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold text-primary">
                {formatINR(result.totalRewardINR)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Using the best card for every category.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
              <p className="label-caps flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5" /> Lost if you always pick the worst card
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold">
                {formatINR(result.totalLostINR)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The cost of swiping the wrong card.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-vintage-sm">
            <div className="border-b border-border bg-secondary/40 px-5 py-3">
              <h2 className="font-serif text-lg font-semibold">
                Best card per category
              </h2>
            </div>
            <ul className="divide-y divide-border">
              {result.winners.map((w) => (
                <li key={w.category} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-medium">{CATEGORY_LABELS[w.category]}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatINR(w.spend)} spend
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-1">{w.bestCard.name}</Badge>
                    <p className="font-mono text-sm font-semibold text-primary">
                      +{formatINR(w.bestRewardINR)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6">
            <h2 className="font-serif text-lg font-semibold">
              If you used just one card for everything
            </h2>
            <div className="mt-4 space-y-3">
              {result.perCardTotals.map((p) => (
                <div key={p.card.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{p.card.name}</span>
                    <span className="font-mono">{formatINR(p.rewardINR)}</span>
                  </div>
                  <Progress value={(p.rewardINR / maxCardTotal) * 100} />
                </div>
              ))}
            </div>
          </div>

          <EstimateNote>
            Reward rates reflect best-use point values and category accelerators, and
            are illustrative. Actual earning depends on caps, exclusions and how you
            redeem. Reviewed May 2026.
          </EstimateNote>
        </>
      )}
    </div>
  );
}
