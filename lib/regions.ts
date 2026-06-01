import type { RegionKey } from "@/types";

/**
 * Maps an ISO-3166 alpha-2 country code to an award "region" relative to India.
 * India itself is treated as `domestic`. Regions feed the award/value engine.
 */
const GROUPS: Record<RegionKey, string[]> = {
  domestic: ["IN"],
  "south-asia": ["LK", "MV", "NP", "BD", "BT", "PK", "AF"],
  "central-asia": ["KZ", "UZ", "TM", "KG", "TJ", "AZ", "AM", "GE"],
  "middle-east": [
    "AE", "QA", "SA", "KW", "BH", "OM", "IR", "IQ", "JO", "IL", "PS",
    "LB", "SY", "YE",
  ],
  "southeast-asia": [
    "SG", "TH", "MY", "ID", "PH", "VN", "KH", "LA", "MM", "BN", "TL",
  ],
  "east-asia": ["CN", "HK", "MO", "TW", "JP", "KR", "KP", "MN"],
  europe: [
    "GB", "IE", "FR", "DE", "NL", "BE", "LU", "CH", "AT", "IT", "ES",
    "PT", "GR", "SE", "NO", "DK", "FI", "IS", "PL", "CZ", "SK", "HU",
    "RO", "BG", "HR", "SI", "RS", "BA", "ME", "MK", "AL", "EE", "LV",
    "LT", "UA", "BY", "RU", "MD", "MT", "CY", "TR", "LI", "MC", "AD",
    "SM", "VA", "XK", "GI",
  ],
  africa: [
    "ZA", "KE", "NG", "ET", "EG", "MA", "TN", "DZ", "GH", "TZ", "UG",
    "RW", "MU", "SC", "SN", "CI", "CM", "AO", "MZ", "ZW", "ZM", "BW",
    "NA", "MG", "LY", "SD", "DJ", "GA", "CD", "CG", "ML", "BF", "BJ",
    "TG", "GN", "GM", "SL", "LR", "MR", "MW", "RE", "CV", "SS",
  ],
  "north-america": [
    "US", "CA", "MX", "GT", "CR", "PA", "CU", "DO", "JM", "BS", "BZ",
    "SV", "HN", "NI", "PR", "TT", "BB", "HT", "AW", "KY", "BM", "AG",
    "LC", "GD", "VC", "DM", "KN",
  ],
  "south-america": [
    "BR", "AR", "CL", "PE", "CO", "EC", "BO", "PY", "UY", "VE", "GY",
    "SR", "GF",
  ],
  oceania: [
    "AU", "NZ", "FJ", "PG", "NC", "PF", "WS", "TO", "VU", "GU", "SB",
    "KI", "FM", "MH", "PW", "CK",
  ],
};

const COUNTRY_REGION = new Map<string, RegionKey>();
for (const region of Object.keys(GROUPS) as RegionKey[]) {
  for (const cc of GROUPS[region]) COUNTRY_REGION.set(cc, region);
}

export function regionForCountry(iso2: string): RegionKey {
  return COUNTRY_REGION.get(iso2.toUpperCase()) ?? "europe";
}

/**
 * The award region for a trip. If both endpoints are in India it's domestic;
 * otherwise it is the region of the destination country relative to India.
 */
export function regionForTrip(fromCountry: string, toCountry: string): RegionKey {
  const to = toCountry.toUpperCase();
  const from = fromCountry.toUpperCase();
  if (to === "IN" && from === "IN") return "domestic";
  if (to === "IN") return "south-asia"; // inbound to India from abroad
  return regionForCountry(to);
}

let displayNames: Intl.DisplayNames | null = null;
export function countryName(iso2: string): string {
  if (!iso2) return "";
  try {
    if (!displayNames) {
      displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    }
    return displayNames.of(iso2.toUpperCase()) ?? iso2;
  } catch {
    return iso2;
  }
}

const R = 6371; // km
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}
