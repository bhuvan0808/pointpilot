import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-foreground/20 bg-gradient-to-br from-primary to-stone-900 px-8 py-16 text-center text-primary-foreground shadow-vintage md:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Your next trip might already be paid for.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/80">
              Find out what your points are really worth in under a minute. No
              account, no card details — just smarter redemptions.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/finder">
                  Open the redemption finder
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
