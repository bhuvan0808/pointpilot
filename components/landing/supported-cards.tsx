import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cards } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

export function SupportedCards() {
  return (
    <section
      id="cards"
      className="scroll-mt-20 border-b border-border bg-card/40 py-20 md:py-24"
    >
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">Supported cards</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Built around India&apos;s best points-earning cards.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Each card transfers to a curated set of airline programmes. We track
            the ratios so you don&apos;t have to.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-vintage-sm transition-shadow hover:shadow-vintage"
            >
              <div
                className={cn(
                  "mb-5 flex h-28 flex-col justify-between rounded-md border border-foreground/10 bg-gradient-to-br p-4 text-white",
                  card.tone
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                    {card.network}
                  </span>
                  <span className="h-5 w-7 rounded-sm bg-white/25" />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight">
                    {card.name}
                  </p>
                  <p className="text-xs text-white/70">{card.issuer}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.tagline}
              </p>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Currency</dt>
                  <dd className="font-medium">{card.currency}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Annual fee</dt>
                  <dd className="font-medium">{formatINR(card.annualFee)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Airline partners</dt>
                  <dd className="font-medium">{card.partners.length}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                <Badge variant="muted" className="gap-1">
                  <Check className="h-3 w-3" />
                  {card.earnRate}
                </Badge>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
