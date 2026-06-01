"use client";

import * as React from "react";
import { Coins, Plane } from "lucide-react";

import { EstimateNote } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rateValuePerMile, RATING_TONE } from "@/lib/estimate";
import { cn, formatINR, formatINRPrecise } from "@/lib/utils";

function num(v: string): number {
  return Math.max(0, Number(v.replace(/[^0-9.]/g, "")) || 0);
}

export function ValueCalculatorTool() {
  const [cashFare, setCashFare] = React.useState("280000");
  const [miles, setMiles] = React.useState("100000");
  const [taxes, setTaxes] = React.useState("22000");

  const cash = num(cashFare);
  const m = num(miles);
  const tax = num(taxes);

  const net = Math.max(0, cash - tax);
  const cpp = m > 0 ? net / m : 0; // rupee value per mile/point
  const rating = rateValuePerMile(cpp);
  const redeem = cpp >= 0.6;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <form className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold">Inputs</h2>
        </div>
        <div className="mt-6 space-y-5">
          <Field label="Cash fare (₹)" value={cashFare} onChange={setCashFare} />
          <Field label="Miles / points required" value={miles} onChange={setMiles} />
          <Field label="Taxes & fees on award (₹)" value={taxes} onChange={setTaxes} />
        </div>
      </form>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Stat label="Value per point" value={formatINRPrecise(cpp)} accent />
          <Stat label="Net cash value" value={formatINR(net)} />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm">
          <div className="flex items-center justify-between">
            <span className="label-caps">Verdict</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
                RATING_TONE[rating]
              )}
            >
              {rating} value
            </span>
          </div>
          <p
            className={cn(
              "mt-3 font-serif text-3xl font-semibold",
              redeem ? "text-primary" : "text-foreground"
            )}
          >
            {redeem ? "Redeem your points" : "Pay with cash"}
          </p>
          <p className="mt-2 text-muted-foreground">
            {redeem
              ? `You'd extract ${formatINRPrecise(cpp)} per point — above the ~₹0.60 baseline, so points are the smart choice here.`
              : `At ${formatINRPrecise(cpp)} per point you're below the ~₹0.60 baseline. Save your points for a higher-value redemption and pay cash.`}
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2.5 text-sm text-muted-foreground">
            <Plane className="h-4 w-4 text-primary" />
            CPP (cents-per-point) = (Cash fare − Taxes) ÷ Miles required.
          </div>
        </div>

        <EstimateNote>
          A good redemption in India typically returns ₹0.50–₹1.20 per point. Premium
          cabins on long-haul routes deliver the highest value-per-point.
        </EstimateNote>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm">
      <p className="label-caps">{label}</p>
      <p className={cn("mt-2 font-serif text-3xl font-semibold", accent && "text-primary")}>
        {value}
      </p>
    </div>
  );
}
