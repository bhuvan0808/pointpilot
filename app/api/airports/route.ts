import { NextResponse } from "next/server";

import airportsData from "@/data/airports.json";
import { countryName } from "@/lib/regions";
import type { Airport } from "@/types";

const AIRPORTS = airportsData as Airport[];

// Pre-compute a lightweight search index once per server instance.
const INDEX = AIRPORTS.map((a) => ({
  a,
  iata: a.iata.toLowerCase(),
  city: a.city.toLowerCase(),
  name: a.name.toLowerCase(),
  country: countryName(a.country).toLowerCase(),
}));

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function score(
  q: string,
  entry: (typeof INDEX)[number]
): number {
  let s = 0;
  if (entry.iata === q) s += 1000;
  else if (entry.iata.startsWith(q)) s += 500;
  if (entry.city === q) s += 400;
  else if (entry.city.startsWith(q)) s += 300;
  else if (entry.city.includes(q)) s += 150;
  if (entry.name.includes(q)) s += 100;
  if (entry.country.startsWith(q)) s += 120;
  else if (entry.country.includes(q)) s += 40;
  if (s > 0 && entry.a.large) s += 25;
  return s;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const limit = Math.min(20, Number(searchParams.get("limit")) || 10);

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const ranked = INDEX.map((entry) => ({ entry, s: score(q, entry) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => ({
      ...r.entry.a,
      countryName: countryName(r.entry.a.country),
    }));

  return NextResponse.json({ results: ranked });
}
