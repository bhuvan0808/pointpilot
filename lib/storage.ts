"use client";

import * as React from "react";

import type { Airport } from "@/types";

/** Namespaced localStorage keys used across the app. */
export const STORAGE_KEYS = {
  recentAirports: "pp:recent-airports",
  statuses: "pp:statuses",
  fareAlerts: "pp:fare-alerts",
  cardWallet: "pp:card-wallet",
  airlineBalances: "pp:airline-balances",
  hotelBalances: "pp:hotel-balances",
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / disabled — ignore */
  }
}

/**
 * useLocalStorage — persisted state hook with SSR-safe hydration. Reads from
 * localStorage after mount to avoid hydration mismatches.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (v: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = React.useState<T>(initial);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setValue(readJSON<T>(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = React.useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        writeJSON(key, next);
        return next;
      });
    },
    [key]
  );

  return [value, set, hydrated];
}

const MAX_RECENT = 6;

export function addRecentAirport(airport: Airport): Airport[] {
  const list = readJSON<Airport[]>(STORAGE_KEYS.recentAirports, []);
  const next = [airport, ...list.filter((a) => a.iata !== airport.iata)].slice(
    0,
    MAX_RECENT
  );
  writeJSON(STORAGE_KEYS.recentAirports, next);
  return next;
}

export function getRecentAirports(): Airport[] {
  return readJSON<Airport[]>(STORAGE_KEYS.recentAirports, []);
}
