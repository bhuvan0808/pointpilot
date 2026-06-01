"use client";

import * as React from "react";
import { Check, ChevronDown, MapPin, Search } from "lucide-react";

import { cn, regionLabel } from "@/lib/utils";
import type { Destination } from "@/types";

interface DestinationPickerProps {
  destinations: Destination[];
  value: string;
  onChange: (code: string) => void;
  id?: string;
}

export function DestinationPicker({
  destinations,
  value,
  onChange,
  id,
}: DestinationPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selected = destinations.find((d) => d.code === value);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? destinations.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.country.toLowerCase().includes(q) ||
            d.code.toLowerCase().includes(q) ||
            regionLabel(d.region).toLowerCase().includes(q)
        )
      : destinations;

    const groups = new Map<string, Destination[]>();
    for (const d of list) {
      const key = regionLabel(d.region);
      const arr = groups.get(key) ?? [];
      arr.push(d);
      groups.set(key, arr);
    }
    return Array.from(groups.entries());
  }, [destinations, query]);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      // focus the search field once the panel opens
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  function select(code: string) {
    onChange(code);
    setOpen(false);
  }

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
        <span className="flex items-center gap-2 truncate">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          {selected ? (
            <span className="truncate">
              {selected.name}
              <span className="text-muted-foreground">
                {" "}
                · {selected.country}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Search a destination…</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-card shadow-vintage">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a city, country or code…"
              className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-72 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No destinations match &ldquo;{query}&rdquo;.
              </p>
            )}
            {filtered.map(([group, items]) => (
              <div key={group} className="mb-1">
                <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {group}
                </p>
                {items.map((d) => (
                  <button
                    type="button"
                    key={d.code}
                    onClick={() => select(d.code)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-foreground/5",
                      d.code === value && "bg-foreground/5"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {d.code}
                      </span>
                      <span>{d.name}</span>
                      <span className="text-muted-foreground">
                        · {d.country}
                      </span>
                    </span>
                    {d.code === value && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
