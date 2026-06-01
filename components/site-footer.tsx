import Link from "next/link";
import { Compass } from "lucide-react";

import { dataReviewedOn } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-foreground/20 bg-primary text-primary-foreground">
                <Compass className="h-4 w-4" />
              </span>
              <span className="font-serif text-lg font-semibold">
                PointPilot
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              An independent, free tool to help Indian travellers get more from
              their credit card reward points. Not affiliated with any bank or
              airline.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="space-y-2.5">
              <p className="label-caps">Explore</p>
              <Link
                href="/finder"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                Redemption finder
              </Link>
              <Link
                href="/#how-it-works"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                How it works
              </Link>
              <Link
                href="/#cards"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                Supported cards
              </Link>
            </div>
            <div className="space-y-2.5">
              <p className="label-caps">Good to know</p>
              <p className="text-muted-foreground">
                Data reviewed {dataReviewedOn}
              </p>
              <p className="text-muted-foreground">Built with Next.js</p>
            </div>
          </div>
        </div>

        <div className="ticket-divider my-8" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {`2024–${new Date().getFullYear()}`} PointPilot. For information
            only — verify all values before transferring points.
          </p>
          <p className="font-mono">Made for the points-curious traveller.</p>
        </div>
      </div>
    </footer>
  );
}
