import { cardsForAirline, getAirline, getRedemption } from "@/lib/data";
import {
  distanceBetween,
  estimateCashFareINR,
  estimateTaxesINR,
  milesMultiplier,
  rateValuePerMile,
} from "@/lib/estimate";
import { regionForTrip } from "@/lib/regions";
import type {
  Airport,
  AwardOption,
  AwardSearchResult,
  CabinClass,
} from "@/types";

/** Airline programmes supported by the award search, with fuel-surcharge factor. */
const SUPPORTED: { airlineId: string; fuelFactor: number }[] = [
  { airlineId: "krisflyer", fuelFactor: 1 },
  { airlineId: "flyingblue", fuelFactor: 1 },
  { airlineId: "avios-qr", fuelFactor: 1.2 },
  { airlineId: "avios-ba", fuelFactor: 1.8 },
  { airlineId: "flyingreturns", fuelFactor: 1.1 },
  { airlineId: "skywards", fuelFactor: 1.3 },
];

export function searchAwards(
  from: Airport,
  to: Airport,
  cabin: CabinClass,
  date: string
): AwardSearchResult {
  const region = regionForTrip(from.country, to.country);
  const distanceKm = distanceBetween(from, to);
  const cashFareINR = estimateCashFareINR(distanceKm, cabin);
  const cabinMilesMult = milesMultiplier(cabin);

  const options: AwardOption[] = [];

  for (const { airlineId, fuelFactor } of SUPPORTED) {
    const airline = getAirline(airlineId);
    const redemption = getRedemption(airlineId);
    if (!airline || !redemption) continue;

    const baseEconomyMiles = redemption.awardChart[region];
    if (!baseEconomyMiles) continue;

    const milesRequiredOneWay = Math.round(baseEconomyMiles * cabinMilesMult);
    const milesRequiredRoundTrip = milesRequiredOneWay * 2;
    const taxesINR = estimateTaxesINR(region, cabin, fuelFactor);
    const netValueINR = Math.max(0, cashFareINR - taxesINR);
    const valuePerMile =
      milesRequiredRoundTrip > 0 ? netValueINR / milesRequiredRoundTrip : 0;

    options.push({
      airline,
      cabin,
      milesRequiredOneWay,
      milesRequiredRoundTrip,
      taxesINR,
      cashFareINR,
      valuePerMile,
      netValueINR,
      rating: rateValuePerMile(valuePerMile),
      transferCards: cardsForAirline(airlineId),
    });
  }

  options.sort((a, b) => b.valuePerMile - a.valuePerMile);

  return { from, to, region, distanceKm, cabin, date, options };
}
