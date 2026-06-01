"use client";

import * as React from "react";
import { BellRing, Mail, Plus, Smartphone, Timer } from "lucide-react";

import { FareAlertCard } from "@/components/cards/fare-alert-card";
import { EstimateNote } from "@/components/page-header";
import { AirportSearch } from "@/components/search/airport-search";
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
import fareHistory from "@/data/fare-history.json";
import { STORAGE_KEYS, useLocalStorage } from "@/lib/storage";
import { POPULAR_AIRPORTS } from "@/lib/use-airport-search";
import type { Airport, CabinClass, FareAlert } from "@/types";

const CABINS: CabinClass[] = ["Economy", "Premium Economy", "Business", "First"];
const ROUTES = (fareHistory as { routes: Record<string, { typicalLowINR: number }> }).routes;

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `a_${Math.random().toString(36).slice(2)}`;
}

function typicalLow(from: string, to: string): number | undefined {
  return ROUTES[`${from}-${to}`]?.typicalLowINR;
}

export function FareAlertsTool() {
  const [alerts, setAlerts, hydrated] = useLocalStorage<FareAlert[]>(
    STORAGE_KEYS.fareAlerts,
    []
  );
  const [from, setFrom] = React.useState<Airport | null>(
    POPULAR_AIRPORTS.find((a) => a.iata === "MAA") ?? POPULAR_AIRPORTS[0]
  );
  const [to, setTo] = React.useState<Airport | null>(
    POPULAR_AIRPORTS.find((a) => a.iata === "NRT") ?? POPULAR_AIRPORTS[1]
  );
  const [target, setTarget] = React.useState("25000");
  const [cabin, setCabin] = React.useState<CabinClass>("Economy");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    const alert: FareAlert = {
      id: newId(),
      fromIata: from.iata,
      fromCity: from.city,
      toIata: to.iata,
      toCity: to.city,
      targetFareINR: Math.max(0, Number(target.replace(/[^0-9]/g, "")) || 0),
      cabin,
      createdAt: new Date().toISOString(),
      active: true,
    };
    setAlerts((prev) => [alert, ...prev]);
  }

  function remove(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }
  function toggle(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={add}
        className="rounded-lg border border-border bg-card p-5 shadow-vintage-sm sm:p-6"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <AirportSearch id="from" value={from} onChange={setFrom} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <AirportSearch id="to" value={to} onChange={setTo} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Target fare (₹)</Label>
            <Input
              id="target"
              inputMode="numeric"
              value={target}
              onChange={(e) => setTarget(e.target.value.replace(/[^0-9]/g, ""))}
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
          <Plus className="h-4 w-4" />
          Create fare alert
        </Button>
      </form>

      {hydrated && alerts.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {alerts.map((a) => (
            <FareAlertCard
              key={a.id}
              alert={a}
              typicalLowINR={typicalLow(a.fromIata, a.toIata)}
              onDelete={remove}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      {hydrated && alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground">
          <BellRing className="h-7 w-7" />
          <p className="mt-3 font-serif text-lg font-semibold">No alerts yet</p>
          <p className="mt-1 max-w-xs text-sm">
            Set a target fare for a route and we&apos;ll keep it here for you.
          </p>
        </div>
      )}

      <div className="rounded-lg border border-border bg-secondary/30 p-5">
        <p className="label-caps mb-3">Coming soon (architecture ready)</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Soon icon={Timer} title="Scheduled checks" body="Vercel Cron jobs poll fares on a schedule." />
          <Soon icon={Mail} title="Email alerts" body="Get notified when your target is hit." />
          <Soon icon={Smartphone} title="Push notifications" body="Web push for instant fare drops." />
        </div>
      </div>

      <EstimateNote>
        This MVP stores alerts in your browser only — there is no backend yet. Typical-low
        context is illustrative, drawn from sample fare history.
      </EstimateNote>
    </div>
  );
}

function Soon({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <p className="flex items-center gap-1.5 text-sm font-medium">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}
