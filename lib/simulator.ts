import { getAirline, getCard, transferEnrichment } from "@/lib/data";
import type { TransferSimResult } from "@/types";

export function simulateTransfer(
  cardId: string,
  airlineId: string,
  points: number
): TransferSimResult | null {
  const card = getCard(cardId);
  const airline = getAirline(airlineId);
  if (!card || !airline) return null;

  const partner = card.partners.find((p) => p.airlineId === airlineId);
  if (!partner) return null;

  const enrichment = transferEnrichment[airlineId];
  const pts = Math.max(0, Math.floor(points || 0));
  const milesReceived = Math.floor(pts * partner.ratio);
  const valuePerMile = enrichment?.typicalValue ?? 0.7;

  return {
    card,
    airline,
    pointsTransferred: pts,
    ratioDisplay: partner.display,
    milesReceived,
    transferTime: enrichment?.transferTime ?? "Up to 72 hours",
    valuePerMile,
    estimatedValueINR: Math.round(milesReceived * valuePerMile),
    bonuses: enrichment?.bonuses ?? [],
  };
}
