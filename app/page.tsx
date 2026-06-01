import type { Metadata } from "next";

import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SupportedCards } from "@/components/landing/supported-cards";
import { PartnerAirlines } from "@/components/landing/partner-airlines";
import { CallToAction } from "@/components/landing/cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SupportedCards />
      <PartnerAirlines />
      <CallToAction />
    </>
  );
}
