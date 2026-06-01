"use client";

import * as React from "react";

import { TransferCard, type TransferCardData } from "@/components/cards/transfer-card";
import { EstimateNote } from "@/components/page-header";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cards, getAirline, transferEnrichment } from "@/lib/data";

export function TransferAnalysisTool() {
  const [cardId, setCardId] = React.useState(cards[0].id);
  const card = cards.find((c) => c.id === cardId)!;

  const partners: TransferCardData[] = card.partners
    .map((p) => {
      const airline = getAirline(p.airlineId);
      const enr = transferEnrichment[p.airlineId];
      if (!airline || !enr) return null;
      return {
        airline,
        ratioDisplay: p.display,
        transferTime: enr.transferTime,
        typicalValue: enr.typicalValue,
        sweetSpots: enr.sweetSpots,
        recommendedUse: enr.recommendedUse,
        bonuses: enr.bonuses,
      } satisfies TransferCardData;
    })
    .filter((x): x is TransferCardData => x !== null)
    .sort((a, b) => b.typicalValue - a.typicalValue);

  return (
    <div className="space-y-8">
      <div className="max-w-sm space-y-2">
        <Label htmlFor="card">Credit card</Label>
        <Select value={cardId} onValueChange={setCardId}>
          <SelectTrigger id="card">
            <SelectValue />
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

      <div className="rounded-lg border border-border bg-secondary/30 px-5 py-4">
        <p className="text-sm">
          <span className="font-semibold">{card.name}</span> transfers{" "}
          <span className="text-muted-foreground">{card.currency}</span> to{" "}
          <span className="font-semibold">{partners.length} airline partners</span>.
          Highest typical value first.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {partners.map((p) => (
          <TransferCard key={p.airline.id} data={p} />
        ))}
      </div>

      <EstimateNote>
        Transfer ratios, bonuses and partners change frequently. Bonus dates shown are
        recent examples, not guarantees. Always confirm in your card&apos;s rewards
        portal before transferring — transfers are usually irreversible.
      </EstimateNote>
    </div>
  );
}
