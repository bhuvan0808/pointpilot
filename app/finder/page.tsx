import type { Metadata } from "next";

import { FinderTool } from "@/components/finder/finder-tool";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redemption Finder",
  description:
    "Compare airline transfer partners for your Indian credit card points. Enter your card, balance and route to see the best flight redemption value, ratios and a recommendation score.",
  alternates: { canonical: "/finder" },
  openGraph: {
    title: `Redemption Finder · ${siteConfig.name}`,
    description:
      "Find the best airline transfer partner for your credit card points.",
    url: `${siteConfig.url}/finder`,
  },
};

export default function FinderPage() {
  return (
    <div className="border-b border-border">
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Redemption finder</span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Where will your points fly furthest?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter your card and route. PointPilot ranks every transfer partner by
            value-per-point and tells you whether your balance covers the trip.
          </p>
        </div>

        <div className="mt-12">
          <FinderTool />
        </div>
      </section>
    </div>
  );
}
