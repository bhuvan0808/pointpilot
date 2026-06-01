import { hotelNightlyCashByRegion, hotelPrograms } from "@/lib/data";
import type { HotelRedemption, RegionKey, ValueRating } from "@/types";

function rateHotelPoint(valuePerPointINR: number): ValueRating {
  if (valuePerPointINR >= 1.0) return "Excellent";
  if (valuePerPointINR >= 0.6) return "Good";
  if (valuePerPointINR >= 0.4) return "Average";
  return "Poor";
}

export function calculateHotelRedemptions(
  points: number,
  region: RegionKey
): HotelRedemption[] {
  const pts = Math.max(0, Math.floor(points || 0));
  const nightlyCashINR = hotelNightlyCashByRegion[region];

  const results = hotelPrograms.map((program) => {
    const valuePerPointINR = program.pointValuePaise / 100;
    const nightlyPoints = Math.max(
      1,
      Math.round(nightlyCashINR / valuePerPointINR)
    );
    const nightsPossible = Math.floor(pts / nightlyPoints);
    const totalValueINR = Math.round(pts * valuePerPointINR);

    return {
      program,
      pointsAvailable: pts,
      nightlyPoints,
      nightlyCashINR,
      nightsPossible,
      totalValueINR,
      centsPerPoint: program.pointValuePaise,
      rating: rateHotelPoint(valuePerPointINR),
    } satisfies HotelRedemption;
  });

  return results.sort((a, b) => b.centsPerPoint - a.centsPerPoint);
}
