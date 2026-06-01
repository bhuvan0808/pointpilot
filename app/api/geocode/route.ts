import { NextResponse } from "next/server";

import airportsData from "@/data/airports.json";
import { countryName, haversineKm } from "@/lib/regions";
import type { Airport } from "@/types";

const AIRPORTS = airportsData as Airport[];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Small in-memory cache to be polite to Nominatim (free, rate-limited).
const cache = new Map<string, { at: number; data: unknown }>();
const TTL = 1000 * 60 * 60; // 1 hour

function nearestAirport(lat: number, lon: number): Airport | null {
  let best: Airport | null = null;
  let bestD = Infinity;
  for (const a of AIRPORTS) {
    const d = haversineKm(lat, lon, a.lat, a.lon);
    // Prefer large airports slightly by discounting their distance.
    const adj = a.large ? d * 0.85 : d;
    if (adj < bestD) {
      bestD = adj;
      best = a;
    }
  }
  return best;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  if (q.length < 3) return NextResponse.json({ results: [] });

  const key = q.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) {
    return NextResponse.json(hit.data);
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", q);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "6");
    url.searchParams.set("accept-language", "en");

    const res = await fetch(url, {
      headers: {
        "User-Agent": "PointPilot/1.0 (travel rewards tool; +https://pointpilot-sigma.vercel.app)",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("geocode failed");
    const raw = (await res.json()) as Array<{
      lat: string;
      lon: string;
      name?: string;
      display_name: string;
      addresstype?: string;
      type?: string;
      address?: { country_code?: string; city?: string; town?: string; state?: string };
    }>;

    const allowed = new Set(["city", "town", "village", "municipality", "administrative"]);
    const results = raw
      .filter(
        (r) =>
          allowed.has(r.addresstype || "") ||
          allowed.has(r.type || "") ||
          r.address?.city ||
          r.address?.town
      )
      .slice(0, 6)
      .map((r) => {
        const lat = Number(r.lat);
        const lon = Number(r.lon);
        const cc = (r.address?.country_code || "").toUpperCase();
        const cityName =
          r.name || r.address?.city || r.address?.town || r.display_name.split(",")[0];
        const near = nearestAirport(lat, lon);
        return {
          city: cityName,
          country: cc,
          countryName: countryName(cc),
          lat,
          lon,
          displayName: r.display_name,
          nearestAirport: near
            ? { ...near, countryName: countryName(near.country) }
            : null,
        };
      });

    const data = { results };
    cache.set(key, { at: Date.now(), data });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [], error: "geocode_unavailable" });
  }
}
