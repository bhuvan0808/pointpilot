import Link from "next/link";
import { ArrowRight, Plane, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cards } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            For Indian travellers
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Fly further on the points you{" "}
            <span className="text-primary">already have.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            PointPilot turns your credit card reward points into the most
            valuable flight redemptions. Pick your card, your route, and we&apos;ll
            rank the best airline transfer partners — instantly and for free.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/finder">
                Find my best redemption
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#how-it-works">See how it works</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {cards.length} premium cards
            </span>{" "}
            · 8 airline programmes · no sign-up, no fees
          </p>
        </div>

        {/* Decorative boarding pass */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <BoardingPass />
        </div>
      </div>
    </section>
  );
}

function BoardingPass() {
  return (
    <div className="relative mx-auto w-full max-w-md rotate-1 rounded-xl border border-foreground/20 bg-card p-6 shadow-vintage transition-transform hover:rotate-0">
      <div className="flex items-center justify-between">
        <span className="label-caps">Boarding Pass</span>
        <span className="font-mono text-xs text-muted-foreground">
          POINT · PILOT
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs text-muted-foreground">FROM</p>
          <p className="font-serif text-4xl font-semibold leading-none">DEL</p>
          <p className="mt-1 text-sm text-muted-foreground">Delhi</p>
        </div>
        <div className="flex flex-1 flex-col items-center px-3">
          <Plane className="h-5 w-5 -rotate-12 text-primary" />
          <div className="mt-2 w-full border-t border-dashed border-foreground/30" />
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-muted-foreground">TO</p>
          <p className="font-serif text-4xl font-semibold leading-none">SIN</p>
          <p className="mt-1 text-sm text-muted-foreground">Singapore</p>
        </div>
      </div>

      <div className="ticket-divider my-6" />

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            Card
          </p>
          <p className="mt-1 text-sm font-medium">Axis Atlas</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            Partner
          </p>
          <p className="mt-1 text-sm font-medium">KrisFlyer</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            Value/pt
          </p>
          <p className="mt-1 text-sm font-medium text-primary">₹1.05</p>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-secondary/70 px-4 py-3 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Recommendation score
        </p>
        <p className="font-serif text-3xl font-semibold text-foreground">96</p>
      </div>
    </div>
  );
}
