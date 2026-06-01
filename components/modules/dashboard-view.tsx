"use client";

import * as React from "react";
import Link from "next/link";
import { BellRing, Clock, Plane, TrendingUp } from "lucide-react";

import { DashboardCard } from "@/components/cards/dashboard-card";
import { FareAlertCard } from "@/components/cards/fare-alert-card";
import { StatusCard } from "@/components/cards/status-card";
import { statusPrograms } from "@/lib/data";
import { MODULES } from "@/lib/nav";
import { STORAGE_KEYS, getRecentAirports, useLocalStorage } from "@/lib/storage";
import type { Airport, FareAlert, SavedStatus } from "@/types";

export function DashboardView() {
  const [statuses, , sHydrated] = useLocalStorage<SavedStatus[]>(
    STORAGE_KEYS.statuses,
    []
  );
  const [alerts, , aHydrated] = useLocalStorage<FareAlert[]>(
    STORAGE_KEYS.fareAlerts,
    []
  );
  const [recent, setRecent] = React.useState<Airport[]>([]);
  React.useEffect(() => setRecent(getRecentAirports()), []);

  const activeAlerts = alerts.filter((a) => a.active).length;
  const hydrated = sHydrated && aHydrated;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Programmes tracked"
          value={hydrated ? String(statuses.length) : "—"}
          icon={TrendingUp}
          sub="Elite status across airlines"
          href="/status-tracker"
        />
        <DashboardCard
          title="Active fare alerts"
          value={hydrated ? String(activeAlerts) : "—"}
          icon={BellRing}
          sub={`${alerts.length} total`}
          href="/fare-alerts"
          accent
        />
        <DashboardCard
          title="Recent searches"
          value={String(recent.length)}
          icon={Clock}
          sub="Airports you've looked up"
        />
        <DashboardCard
          title="Award search"
          value="Plan"
          icon={Plane}
          sub="Find your next redemption"
          href="/award-search"
        />
      </div>

      {hydrated && statuses.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold">Status progress</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {statuses.map((s) => (
              <StatusCard
                key={s.id}
                status={s}
                program={statusPrograms.find((p) => p.id === s.programId)}
              />
            ))}
          </div>
        </section>
      )}

      {hydrated && alerts.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold">Saved fare alerts</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alerts.map((a) => (
              <FareAlertCard key={a.id} alert={a} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold">Recent searches</h2>
          <div className="flex flex-wrap gap-2">
            {recent.map((a) => (
              <span
                key={a.iata}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-vintage-sm"
              >
                <span className="font-mono font-semibold">{a.iata}</span>
                <span className="text-muted-foreground">{a.city}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-serif text-2xl font-semibold">All tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-vintage-sm transition-shadow hover:shadow-vintage"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-foreground/15 bg-secondary">
                <m.icon className="h-4 w-4 text-primary" />
              </span>
              <span>
                <span className="block font-medium leading-tight">{m.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {m.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-md border border-border bg-secondary/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Your dashboard data (status, alerts, recent searches) lives only in this browser
        via localStorage and IndexedDB — nothing is sent to a server.
      </div>
    </div>
  );
}
