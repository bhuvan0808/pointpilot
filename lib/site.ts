export const siteConfig = {
  name: "PointPilot",
  tagline: "Fly further on the points you already have.",
  description:
    "PointPilot helps Indian travellers turn credit card reward points into the most valuable flight redemptions — compare transfer partners, ratios and estimated award value in seconds.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pointpilot.vercel.app",
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
