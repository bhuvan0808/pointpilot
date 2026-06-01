"use client";

import * as React from "react";
import { Clock, Loader2, MapPin, Plane, Search, WifiOff } from "lucide-react";

import {
  AirportHit,
  POPULAR_AIRPORTS,
  useAirportSearch,
} from "@/lib/use-airport-search";
import { countryName } from "@/lib/regions";
import { addRecentAirport, getRecentAirports } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Airport } from "@/types";

interface AirportSearchProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  placeholder?: string;
  id?: string;
}

function toHit(a: Airport): AirportHit {
  return { ...a, countryName: countryName(a.country) };
}

export function AirportSearch({
  value,
  onChange,
  placeholder = "Search city or airport…",
  id,
}: AirportSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [recent, setRecent] = React.useState<Airport[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { results, loading, offline } = useAirportSearch(query);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  React.useEffect(() => {
    if (open) {
      setRecent(getRecentAirports());
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  function select(a: Airport) {
    const clean: Airport = {
      iata: a.iata,
      name: a.name,
      city: a.city,
      country: a.country,
      lat: a.lat,
      lon: a.lon,
      large: a.large,
    };
    onChange(clean);
    addRecentAirport(clean);
    setOpen(false);
  }

  const showRecent = query.trim().length < 2;
  const list: AirportHit[] = showRecent
    ? (recent.length ? recent : POPULAR_AIRPORTS.slice(0, 6)).map(toHit)
    : results;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Plane className="h-4 w-4 shrink-0 text-primary" />
          {value ? (
            <span className="truncate">
              <span className="font-mono font-semibold">{value.iata}</span>
              <span className="text-muted-foreground"> · {value.city}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
        <Search className="h-4 w-4 shrink-0 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-card shadow-vintage">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a city, airport or IATA code…"
              className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {offline && (
            <div className="flex items-center gap-2 bg-amber-100/60 px-3 py-1.5 text-xs text-amber-900">
              <WifiOff className="h-3.5 w-3.5" />
              Offline — showing popular airports only.
            </div>
          )}

          <div className="max-h-72 overflow-y-auto p-1">
            {showRecent && (
              <p className="flex items-center gap-1.5 px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {recent.length ? (
                  <>
                    <Clock className="h-3 w-3" /> Recent
                  </>
                ) : (
                  "Popular"
                )}
              </p>
            )}
            {!showRecent && !loading && list.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No airports match &ldquo;{query}&rdquo;.
              </p>
            )}
            {list.map((a) => (
              <button
                type="button"
                key={a.iata}
                onClick={() => select(a)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-foreground/5",
                  value?.iata === a.iata && "bg-foreground/5"
                )}
              >
                <span className="flex h-8 w-10 shrink-0 items-center justify-center rounded border border-border bg-secondary/60 font-mono text-xs font-semibold">
                  {a.iata}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{a.city}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {a.name}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {a.countryName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
