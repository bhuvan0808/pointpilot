export const siteConfig = {
  name: "PointPilot",
  tagline: "The travel rewards platform for Indian travellers.",
  description:
    "PointPilot is the complete travel-rewards platform for Indian travellers: award flight search, credit card optimisation, transfer partner analysis, hotel redemptions, lounge access, airline status tracking and fare alerts — free, no login.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pointpilot-sigma.vercel.app",
  ogImage: "/og.png",
  keywords: [
    "credit card points India",
    "flight redemption",
    "transfer partners",
    "HDFC Infinia",
    "Axis Atlas",
    "Amex Membership Rewards",
    "HSBC TravelOne",
    "ICICI Emeralde",
    "KrisFlyer",
    "Avios",
    "maximise reward points",
  ],
};

export type SiteConfig = typeof siteConfig;
