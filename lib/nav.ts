import {
  ArrowLeftRight,
  BedDouble,
  BellRing,
  Calculator,
  CreditCard,
  LayoutDashboard,
  type LucideIcon,
  PlaneTakeoff,
  Repeat,
  Sofa,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export interface ModuleLink {
  href: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  group: "Plan" | "Optimize" | "Track";
}

export const MODULES: ModuleLink[] = [
  {
    href: "/award-search",
    title: "Award Flight Search",
    short: "Award Search",
    description: "Find the cheapest miles for any route, ranked by value.",
    icon: PlaneTakeoff,
    group: "Plan",
  },
  {
    href: "/value-calculator",
    title: "Value Calculator",
    short: "Value Calc",
    description: "Cents-per-point math: should you redeem or pay cash?",
    icon: Calculator,
    group: "Plan",
  },
  {
    href: "/fare-alerts",
    title: "Fare Alerts",
    short: "Fare Alerts",
    description: "Set a target fare for a route and track it locally.",
    icon: BellRing,
    group: "Plan",
  },
  {
    href: "/card-optimizer",
    title: "Credit Card Optimizer",
    short: "Card Optimizer",
    description: "Which card to swipe for every spend category.",
    icon: CreditCard,
    group: "Optimize",
  },
  {
    href: "/transfer-analysis",
    title: "Transfer Partner Analyzer",
    short: "Transfer Analysis",
    description: "Ratios, bonuses and sweet spots for each card.",
    icon: ArrowLeftRight,
    group: "Optimize",
  },
  {
    href: "/transfer-simulator",
    title: "Point Transfer Simulator",
    short: "Transfer Sim",
    description: "Exact miles received, timing and bonus history.",
    icon: Repeat,
    group: "Optimize",
  },
  {
    href: "/hotel-redemptions",
    title: "Hotel Points Redemption",
    short: "Hotels",
    description: "Turn hotel points into the best nightly value.",
    icon: BedDouble,
    group: "Optimize",
  },
  {
    href: "/lounges",
    title: "Lounge Access Finder",
    short: "Lounges",
    description: "Which lounges your cards unlock, by airport.",
    icon: Sofa,
    group: "Track",
  },
  {
    href: "/status-tracker",
    title: "Airline Status Tracker",
    short: "Status",
    description: "Track elite progress across loyalty programmes.",
    icon: TrendingUp,
    group: "Track",
  },
  {
    href: "/dashboard",
    title: "Travel Dashboard",
    short: "Dashboard",
    description: "All your points, status and alerts in one place.",
    icon: LayoutDashboard,
    group: "Track",
  },
];

export const QUICK_FINDER: ModuleLink = {
  href: "/finder",
  title: "Quick Redemption Finder",
  short: "Quick Finder",
  description: "The original card-to-airline value finder.",
  icon: Sparkles,
  group: "Plan",
};

export const MODULE_GROUPS: ModuleLink["group"][] = ["Plan", "Optimize", "Track"];

export function modulesByGroup(group: ModuleLink["group"]): ModuleLink[] {
  return MODULES.filter((m) => m.group === group);
}
