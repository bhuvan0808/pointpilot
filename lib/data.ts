import airlinesData from "@/data/airlines.json";
import cardsData from "@/data/cards.json";
import routesData from "@/data/routes.json";
import redemptionsData from "@/data/redemptions.json";
import type {
  Airline,
  Card,
  City,
  Destination,
  Redemption,
} from "@/types";

export const airlines: Airline[] = airlinesData.airlines as Airline[];
export const cards: Card[] = cardsData.cards as Card[];
export const cities: City[] = routesData.cities as City[];
export const destinations: Destination[] = routesData.destinations as Destination[];
export const redemptions: Redemption[] = redemptionsData.redemptions as Redemption[];

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
