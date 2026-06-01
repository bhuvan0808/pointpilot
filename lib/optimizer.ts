import { getCard } from "@/lib/data";
import type {
  CardOptimizerResult,
  CategoryWinner,
  SpendCategory,
  SpendInput,
} from "@/types";

/**
 * Effective reward rate (rupee value returned per rupee spent) per card, per
 * spend category. Captures category accelerators and best-use redemption value.
 * Illustrative — reviewed May 2026.
 */
const REWARD_MODEL: Record<string, Record<SpendCategory, number>> = {
  "hsbc-travelone": { flights: 0.03, hotels: 0.03, dining: 0.015, general: 0.015 },
  "axis-atlas": { flights: 0.05, hotels: 0.05, dining: 0.02, general: 0.02 },
  "hdfc-infinia": { flights: 0.033, hotels: 0.05, dining: 0.033, general: 0.033 },
  "amex-mr": { flights: 0.02, hotels: 0.02, dining: 0.04, general: 0.02 },
  "icici-emeralde": { flights: 0.03, hotels: 0.06, dining: 0.03, general: 0.03 },
};

export const CATEGORY_LABELS: Record<SpendCategory, string> = {
  flights: "Flights",
  hotels: "Hotels",
  dining: "Dining",
  general: "General",
};

export const CATEGORIES: SpendCategory[] = [
  "flights",
  "hotels",
  "dining",
  "general",
];

export function rewardRate(cardId: string, category: SpendCategory): number {
  return REWARD_MODEL[cardId]?.[category] ?? 0;
}

export function optimizeCards(
  selectedCardIds: string[],
  spend: SpendInput
): CardOptimizerResult {
  const cardsSel = selectedCardIds
    .map(getCard)
    .filter((c): c is NonNullable<typeof c> => !!c);

  const winners: CategoryWinner[] = CATEGORIES.map((category) => {
    const spendAmt = spend[category] || 0;
    const ranked = cardsSel
      .map((card) => ({
        card,
        reward: spendAmt * rewardRate(card.id, category),
      }))
      .sort((a, b) => b.reward - a.reward);

    const best = ranked[0];
    const worst = ranked[ranked.length - 1];
    return {
      category,
      spend: spendAmt,
      bestCard: best.card,
      bestRewardINR: Math.round(best.reward),
      worstRewardINR: Math.round(worst.reward),
      lostINR: Math.round(best.reward - worst.reward),
    };
  });

  const totalRewardINR = winners.reduce((s, w) => s + w.bestRewardINR, 0);
  const totalLostINR = winners.reduce((s, w) => s + w.lostINR, 0);

  const perCardTotals = cardsSel
    .map((card) => ({
      card,
      rewardINR: Math.round(
        CATEGORIES.reduce(
          (s, cat) => s + (spend[cat] || 0) * rewardRate(card.id, cat),
          0
        )
      ),
    }))
    .sort((a, b) => b.rewardINR - a.rewardINR);

  return { winners, totalRewardINR, perCardTotals, totalLostINR };
}
