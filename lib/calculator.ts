import {
  getAirline,
  getCard,
  getCity,
  getDestination,
  getRedemption,
} from "@/lib/data";
import { regionLabel } from "@/lib/utils";
import type {
  CardComparisonRow,
  FinderInput,
  FinderOutput,
  RedemptionResult,
} from "@/types";

/**
 * Core engine. Given a card, a points balance and a city pair, work out
 * which transfer partner unlocks the most value and rank every option.
 *
 * Scoring (0–100, transparent and deterministic):
 *   valueScore (0–70)  = how good the rupee-per-point is vs the best option
 *   routeScore (0–30)  = whether the balance actually covers the round trip
 */
export function calculateRedemptions(input: FinderInput): FinderOutput | null {
  const card = getCard(input.cardId);
  const from = getCity(input.fromCode);
  const to = getDestination(input.toCode);

  if (!card || !from || !to) return null;

  const points = Math.max(0, Math.floor(input.points || 0));

  const partial = card.partners
    .map((partner) => {
      const airline = getAirline(partner.airlineId);
      const redemption = getRedemption(partner.airlineId);
      if (!airline || !redemption) return null;

      const requiredMilesOneWay = redemption.awardChart[to.region];
      if (!requiredMilesOneWay) return null;

      const milesPerPoint = partner.ratio;
      const valuePerMile = redemption.valuePerMile;
      const valuePerPoint = milesPerPoint * valuePerMile;
      const milesReceived = Math.floor(points * milesPerPoint);
      const estimatedRedemptionValue = milesReceived * valuePerMile;
      const requiredMilesRoundTrip = requiredMilesOneWay * 2;
      const roundTripsPossible = Math.floor(
        milesReceived / requiredMilesRoundTrip
      );
      const canBookRoundTrip = roundTripsPossible >= 1;

      return {
        airline,
        ratioDisplay: partner.display,
        milesPerPoint,
        milesReceived,
        valuePerMile,
        valuePerPoint,
        estimatedRedemptionValue,
        requiredMilesOneWay,
        requiredMilesRoundTrip,
        canBookRoundTrip,
        roundTripsPossible,
        routeCashFareINR: to.cashFareINR,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (partial.length === 0) {
    return { card, from, to, results: [], best: null };
  }

  const maxValuePerPoint = Math.max(...partial.map((r) => r.valuePerPoint));

  const scored: RedemptionResult[] = partial
    .map((r) => {
      const valueScore = (r.valuePerPoint / maxValuePerPoint) * 70;
      const coverage = Math.min(
        1,
        r.milesReceived / r.requiredMilesRoundTrip
      );
      const routeScore = coverage * 30;
      const score = Math.round(
        Math.max(0, Math.min(100, valueScore + routeScore))
      );

      return {
        ...r,
        rank: 0,
        score,
        notes: buildNote(r, to.region),
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.valuePerPoint - a.valuePerPoint;
    })
    .map((r, i) => ({ ...r, rank: i + 1 }));

  return { card, from, to, results: scored, best: scored[0] ?? null };
}

function buildNote(
  r: {
    airline: { name: string; program: string };
    canBookRoundTrip: boolean;
    roundTripsPossible: number;
    requiredMilesRoundTrip: number;
    milesReceived: number;
  },
  region: string
): string {
  if (r.canBookRoundTrip) {
    const trips =
      r.roundTripsPossible > 1
        ? `${r.roundTripsPossible} round trips`
        : "a round trip";
    return `Enough for ${trips} in Economy to ${regionLabel(region)} via ${r.airline.program}.`;
  }
  const shortfall = r.requiredMilesRoundTrip - r.milesReceived;
  return `About ${shortfall.toLocaleString("en-IN")} miles short of a round trip — great for a one-way or topping up.`;
}

/**
 * Compare every card for a given points balance and destination, returning the
 * best partner each card can reach. Used by the card-comparison feature.
 */
export function compareCards(
  points: number,
  fromCode: string,
  toCode: string,
  cardIds: string[]
): CardComparisonRow[] {
  const rows: CardComparisonRow[] = [];

  for (const cardId of cardIds) {
    const output = calculateRedemptions({ cardId, points, fromCode, toCode });
    if (!output) continue;
    const best = output.best;
    rows.push({
      card: output.card,
      bestAirline: best?.airline ?? null,
      valuePerPoint: best?.valuePerPoint ?? 0,
      estimatedRedemptionValue: best?.estimatedRedemptionValue ?? 0,
      score: best?.score ?? 0,
    });
  }

  return rows.sort((a, b) => b.score - a.score);
}
