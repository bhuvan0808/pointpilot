"use client";

import * as React from "react";
import { ArrowRight, Clock, Gift, Repeat } from "lucide-react";

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
import { cards, getAirline } from "@/lib/data";
import { simulateTransfer } from "@/lib/simulator";
import { formatINR, formatINRPrecise, formatNumber } from "@/lib/utils";

export function TransferSimulatorTool() {
  const [cardId, setCardId] = React.useState(cards[0].id);
  const card = cards.find((c) => c.id === cardId)!;
  const [airlineId, setAirlineId] = React.useState(card.partners[0].airlineId);
  const [points, setPoints] = React.useState("100000");

  // Keep airline valid when card changes.
  React.useEffect(() => {
    if (!card.partners.some((p) => p.airlineId === airlineId)) {
      setAirlineId(card.partners[0].airlineId);
    }
  }, [card, airlineId]);

  const pts = Math.max(0, Number(points.replace(/[^0-9]/g, "")) || 0);
  const result = React.useMemo(
    () => simulateTransfer(cardId, airlineId, pts),
    [cardId, airlineId, pts]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold">Simulate a transfer</h2>
        </div>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="card">From card</Label>
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
          <div className="space-y-2">
            <Label htmlFor="points">Points to transfer</Label>
            <Input
              id="points"
              inputMode="numeric"
              value={points}
              onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="airline">To airline programme</Label>
            <Select value={airlineId} onValueChange={setAirlineId}>
              <SelectTrigger id="airline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {card.partners.map((p) => {
                  const a = getAirline(p.airlineId);
                  return (
                    <SelectItem key={p.airlineId} value={p.airlineId}>
                      {a?.program} ({p.display})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {result ? (
          <>
            <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-medium">{result.card.name}</span>
                <ArrowRight className="h-4 w-4 text-primary" />
                <span className="font-medium">{result.airline.program}</span>
                <span className="font-mono text-muted-foreground">
                  {result.ratioDisplay}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Big label="Miles received" value={formatNumber(result.milesReceived)} accent />
                <Big label="Est. value" value={formatINR(result.estimatedValueINR)} />
                <Big label="Value / mile" value={formatINRPrecise(result.valuePerMile)} />
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2.5 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                Typical transfer time: <strong>{result.transferTime}</strong>
              </div>
            </div>

            {result.bonuses.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
                <p className="label-caps mb-3 flex items-center gap-1.5">
                  <Gift className="h-3.5 w-3.5" /> Historical transfer bonuses
                </p>
                <ul className="divide-y divide-border">
                  {result.bonuses.map((b, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                      <div>
                        <p className="font-medium">{b.bonus}</p>
                        <p className="text-muted-foreground">{b.note}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{b.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <EstimateNote>
              With a transfer bonus, the miles received above would increase accordingly.
              Transfers are usually irreversible — confirm award availability before you
              transfer.
            </EstimateNote>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card/40 p-8 text-center text-muted-foreground">
            This card doesn&apos;t transfer to the selected programme.
          </div>
        )}
      </div>
    </div>
  );
}

function Big({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="label-caps">{label}</p>
      <p className={`mt-1 font-serif text-2xl font-semibold ${accent ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}
