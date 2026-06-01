import { haversineKm } from "@/lib/regions";
import type { Airport, CabinClass, RegionKey, ValueRating } from "@/types";

/** Cabin multipliers applied to the economy baseline. */
const CASH_MULT: Record<CabinClass, number> = {
  Economy: 1,
  "Premium Economy": 1.8,
  Business: 3.2,
  First: 5.5,
};

const MILES_MULT: Record<CabinClass, number> = {
  Economy: 1,
  "Premium Economy": 1.5,
  Business: 2,
  First: 3,
};

/** Round-trip taxes & fees baseline (INR) by region, Economy. */
const TAX_BASE: Record<RegionKey, number> = {
  domestic: 1500,
  "south-asia": 5000,
  "central-asia": 7000,
  "middle-east": 6000,
  "southeast-asia": 7000,
  "east-asia": 9000,
  europe: 12000,
  africa: 11000,
  "north-america": 14000,
  "south-america": 16000,
  oceania: 12000,
};

export function distanceBetween(from: Airport, to: Airport): number {
  return haversineKm(from.lat, from.lon, to.lat, to.lon);
}

/**
 * Estimated round-trip cash fare (INR) for a given distance and cabin.
 * Anchored loosely to real market fares; clearly an estimate.
 */
export function estimateCashFareINR(
  distanceKm: number,
  cabin: CabinClass
): number {
  const oneWayEconomy = distanceKm * 4 + 4000;
  const roundTrip = oneWayEconomy * 2;
  return Math.round((roundTrip * CASH_MULT[cabin]) / 100) * 100;
}

export function estimateTaxesINR(
  region: RegionKey,
  cabin: CabinClass,
  fuelSurchargeFactor = 1
): number {
  const cabinFactor = cabin === "Economy" ? 1 : cabin === "Premium Economy" ? 1.2 : 1.4;
  return Math.round(
    (TAX_BASE[region] * cabinFactor * fuelSurchargeFactor) / 100
  ) * 100;
}

export function milesMultiplier(cabin: CabinClass): number {
  return MILES_MULT[cabin];
}

/** Rate value-per-mile (INR per mile) into a friendly band. */
export function rateValuePerMile(valuePerMile: number): ValueRating {
  if (valuePerMile >= 1.2) return "Excellent";
  if (valuePerMile >= 0.9) return "Good";
  if (valuePerMile >= 0.6) return "Average";
  return "Poor";
}

export const RATING_TONE: Record<ValueRating, string> = {
  Excellent: "bg-emerald-700",
  Good: "bg-primary",
  Average: "bg-amber-600",
  Poor: "bg-stone-500",
};
