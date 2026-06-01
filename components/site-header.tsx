import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="PointPilot home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-foreground/20 bg-primary text-primary-foreground shadow-vintage-sm transition-transform group-hover:-rotate-6">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            PointPilot
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#how-it-works"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            How it works
          </Link>
          <Link
            href="/#cards"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Supported cards
          </Link>
          <Button asChild size="sm">
            <Link href="/finder">Open the finder</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
