export type RegionKey =
  | "domestic"
  | "south-asia"
  | "central-asia"
  | "middle-east"
  | "southeast-asia"
  | "east-asia"
  | "europe"
  | "africa"
  | "north-america"
  | "south-america"
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

/* ----------------------------- Global search ---------------------------- */

export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string; // ISO-2
  lat: number;
  lon: number;
  large?: boolean;
}

export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

export type ValueRating = "Excellent" | "Good" | "Average" | "Poor";

/* --------------------------- Award flight search ------------------------- */

export interface AwardTransferCard {
  cardId: string;
  cardName: string;
  ratio: number;
  display: string;
}

export interface AwardOption {
  airline: Airline;
  cabin: CabinClass;
  milesRequiredOneWay: number;
  milesRequiredRoundTrip: number;
  taxesINR: number;
  cashFareINR: number;
  valuePerMile: number;
  netValueINR: number;
  rating: ValueRating;
  transferCards: AwardTransferCard[];
}

export interface AwardSearchResult {
  from: Airport;
  to: Airport;
  region: RegionKey;
  distanceKm: number;
  cabin: CabinClass;
  date: string;
  options: AwardOption[];
}

/* --------------------------- Card optimizer ------------------------------ */

export type SpendCategory = "flights" | "hotels" | "dining" | "general";

export interface SpendInput {
  flights: number;
  hotels: number;
  dining: number;
  general: number;
}

export interface CategoryWinner {
  category: SpendCategory;
  spend: number;
  bestCard: Card;
  bestRewardINR: number;
  worstRewardINR: number;
  lostINR: number;
}

export interface CardOptimizerResult {
  winners: CategoryWinner[];
  totalRewardINR: number;
  perCardTotals: { card: Card; rewardINR: number }[];
  totalLostINR: number;
}

/* --------------------------- Hotels -------------------------------------- */

export interface HotelProgram {
  id: string;
  name: string;
  pointValuePaise: number; // value of one point in paise
  tone: string;
  partners: string[];
  transferableFrom: string[]; // card ids
  highlight: string;
}

export interface HotelRedemption {
  program: HotelProgram;
  pointsAvailable: number;
  nightlyPoints: number;
  nightlyCashINR: number;
  nightsPossible: number;
  totalValueINR: number;
  centsPerPoint: number;
  rating: ValueRating;
}

/* --------------------------- Lounges ------------------------------------- */

export interface Lounge {
  id: string;
  name: string;
  airport: string; // IATA
  airportName: string;
  city: string;
  terminal: string;
  type: "Domestic" | "International" | "Both";
  hours: string;
  guestAccess: string;
  priorityPass: boolean;
  cards: string[]; // card ids granting access
  network: string[]; // e.g. ["Priority Pass", "Dreamfolks"]
}

/* --------------------------- Status tracker ------------------------------ */

export interface StatusTier {
  name: string;
  threshold: number; // miles/points needed to reach this tier
}

export interface StatusProgram {
  id: string;
  airlineId?: string;
  name: string;
  unit: string; // "miles" | "PQP" etc
  tiers: StatusTier[];
}

export interface SavedStatus {
  id: string;
  programId: string;
  programName: string;
  currentTier: string;
  currentValue: number;
  renewalDate: string;
}

/* --------------------------- Fare alerts --------------------------------- */

export interface FareAlert {
  id: string;
  fromIata: string;
  fromCity: string;
  toIata: string;
  toCity: string;
  targetFareINR: number;
  cabin: CabinClass;
  createdAt: string;
  active: boolean;
}

/* --------------------------- Transfer simulator -------------------------- */

export interface TransferSimResult {
  card: Card;
  airline: Airline;
  pointsTransferred: number;
  ratioDisplay: string;
  milesReceived: number;
  transferTime: string;
  valuePerMile: number;
  estimatedValueINR: number;
  bonuses: TransferBonus[];
}

export interface TransferBonus {
  date: string;
  bonus: string;
  note: string;
}
