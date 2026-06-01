import airlinesData from "@/data/airlines.json";
import cardsData from "@/data/cards.json";
import routesData from "@/data/routes.json";
import redemptionsData from "@/data/redemptions.json";
import hotelsData from "@/data/hotels.json";
import loungesData from "@/data/lounges.json";
import statusData from "@/data/status-programs.json";
import transferData from "@/data/transfer-partners.json";
import type {
  Airline,
  Card,
  City,
  Destination,
  HotelProgram,
  Lounge,
  Redemption,
  RegionKey,
  StatusProgram,
} from "@/types";

export const airlines: Airline[] = airlinesData.airlines as Airline[];
export const cards: Card[] = cardsData.cards as Card[];
export const cities: City[] = routesData.cities as City[];
export const destinations: Destination[] = routesData.destinations as Destination[];
export const redemptions: Redemption[] = redemptionsData.redemptions as Redemption[];
export const hotelPrograms: HotelProgram[] = hotelsData.programs as HotelProgram[];
export const lounges: Lounge[] = loungesData.lounges as Lounge[];
export const statusPrograms: StatusProgram[] = statusData.programs as StatusProgram[];

export const hotelNightlyCashByRegion = hotelsData._meta
  .nightlyCashByRegion as Record<RegionKey, number>;

type TransferEnrichment = {
  transferTime: string;
  typicalValue: number;
  sweetSpots: string[];
  recommendedUse: string;
  bonuses: { date: string; bonus: string; note: string }[];
};
export const transferEnrichment = transferData.airlines as Record<
  string,
  TransferEnrichment
>;

export const dataReviewedOn: string = cardsData._meta.lastReviewed;

export function getCard(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}

export function getAirline(id: string): Airline | undefined {
  return airlines.find((a) => a.id === id);
}

export function getCity(code: string): City | undefined {
  return cities.find((c) => c.code === code);
}

export function getDestination(code: string): Destination | undefined {
  return destinations.find((d) => d.code === code);
}

export function getRedemption(airlineId: string): Redemption | undefined {
  return redemptions.find((r) => r.airlineId === airlineId);
}

export function getHotelProgram(id: string): HotelProgram | undefined {
  return hotelPrograms.find((h) => h.id === id);
}

/** Cards that can transfer points to a given airline programme. */
export function cardsForAirline(airlineId: string) {
  return cards
    .map((card) => {
      const partner = card.partners.find((p) => p.airlineId === airlineId);
      if (!partner) return null;
      return {
        cardId: card.id,
        cardName: card.name,
        ratio: partner.ratio,
        display: partner.display,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
