export type RegionKey =
  | "domestic"
  | "south-asia"
  | "middle-east"
  | "southeast-asia"
  | "east-asia"
  | "europe"
  | "north-america"
  | "oceania";

export interface Airline {
  id: string;
  name: string;
  program: string;
  alliance: string;
  region: string;
  code: string;
  highlight: string;
  tone: string;
}

export interface TransferPartner {
  airlineId: string;
  /** Airline miles received for every 1 card point. 1 = 1:1, 0.5 = 2:1. */
  ratio: number;
  display: string;
}

export interface Card {
  id: string;
  name: string;
  issuer: string;
  currency: string;
  network: string;
  annualFee: number;
  earnRate: string;
  /** Rupee value of 1 card point when redeemed via the bank portal (baseline). */
  baseValuePerPoint: number;
  tone: string;
  tagline: string;
  partners: TransferPartner[];
}

export interface City {
  code: string;
  name: string;
}

export interface Destination {
  code: string;
  name: string;
  country: string;
  region: RegionKey;
  cashFareINR: number;
  sweetSpotCabin: string;
}

export interface Redemption {
  airlineId: string;
  /** Rupee value of one airline mile when redeemed well. */
  valuePerMile: number;
  awardChart: Record<RegionKey, number>;
}

export interface FinderInput {
  cardId: string;
  points: number;
  fromCode: string;
  toCode: string;
}

export interface RedemptionResult {
  rank: number;
  airline: Airline;
  ratioDisplay: string;
  milesPerPoint: number;
  milesReceived: number;
  valuePerMile: number;
  /** Rupee value per card point unlocked via this airline. */
  valuePerPoint: number;
  estimatedRedemptionValue: number;
  requiredMilesOneWay: number;
  requiredMilesRoundTrip: number;
  canBookRoundTrip: boolean;
  roundTripsPossible: number;
  routeCashFareINR: number;
  score: number;
  notes: string;
}

export interface FinderOutput {
  card: Card;
  from: City;
  to: Destination;
  results: RedemptionResult[];
  best: RedemptionResult | null;
}

export interface CardComparisonRow {
  card: Card;
  bestAirline: Airline | null;
  valuePerPoint: number;
  estimatedRedemptionValue: number;
  score: number;
}
