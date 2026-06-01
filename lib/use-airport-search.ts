"use client";

import * as React from "react";

import popularData from "@/data/popular-airports.json";
import { idbGet, idbSet } from "@/lib/idb";
import { countryName } from "@/lib/regions";
import type { Airport } from "@/types";

export interface AirportHit extends Airport {
  countryName: string;
}

const POPULAR: AirportHit[] = (popularData as Airport[]).map((a) => ({
  ...a,
  countryName: countryName(a.country),
}));

export const POPULAR_AIRPORTS = POPULAR;

function offlineFilter(q: string): AirportHit[] {
  const s = q.toLowerCase();
  return POPULAR.filter(
    (a) =>
      a.iata.toLowerCase().startsWith(s) ||
      a.city.toLowerCase().includes(s) ||
      a.countryName.toLowerCase().includes(s)
  ).slice(0, 10);
}

/**
 * Debounced airport search backed by /api/airports, with an IndexedDB cache
 * layer and an offline fallback to the bundled popular-airports list.
 */
export function useAirportSearch(query: string, delay = 250) {
  const [results, setResults] = React.useState<AirportHit[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      const cacheKey = `air:${q.toLowerCase()}`;

      const cached = await idbGet<AirportHit[]>(cacheKey);
      if (cached && !cancelled) {
        setResults(cached);
        setLoading(false);
        setOffline(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/airports?q=${encodeURIComponent(q)}&limit=10`
        );
        if (!res.ok) throw new Error("search failed");
        const json = (await res.json()) as { results: AirportHit[] };
        if (cancelled) return;
        setResults(json.results);
        setOffline(false);
        void idbSet(cacheKey, json.results);
      } catch {
        if (cancelled) return;
        setResults(offlineFilter(q));
        setOffline(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, delay]);

  return { results, loading, offline };
}
