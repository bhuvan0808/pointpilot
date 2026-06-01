import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrFormatterPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-IN");

/** Format a whole-rupee amount, e.g. ₹1,24,500 */
export function formatINR(value: number): string {
  return inrFormatter.format(Math.round(value));
}

/** Format a small rupee amount with paise, e.g. ₹1.05 */
export function formatINRPrecise(value: number): string {
  return inrFormatterPaise.format(value);
}

/** Format a number with Indian grouping, e.g. 1,20,000 */
export function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export const REGION_LABELS: Record<string, string> = {
  domestic: "Domestic India",
  "south-asia": "South Asia",
  "middle-east": "Middle East",
  "southeast-asia": "Southeast Asia",
  "east-asia": "East Asia",
  europe: "Europe",
  "north-america": "North America",
  oceania: "Oceania",
};

export function regionLabel(region: string): string {
  return REGION_LABELS[region] ?? region;
}
