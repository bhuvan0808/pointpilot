import { Plane } from "lucide-react";

import { airlines } from "@/lib/data";

export function PartnerAirlines() {
  return (
    <section className="border-b border-border py-20 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">Transfer partners</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Eight frequent-flyer programmes, one comparison.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From KrisFlyer to Avios, PointPilot knows the sweet spots — and tells
            you which programme stretches your points the furthest for each route.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {airlines.map((airline) => (
            <div
              key={airline.id}
              className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-vintage-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-foreground/15 bg-secondary">
                  <Plane className="h-4 w-4 text-primary" />
                </span>
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  {airline.code}
                </span>
              </div>
              <p className="mt-4 font-serif text-lg font-semibold leading-tight">
                {airline.name}
              </p>
              <p className="text-sm text-muted-foreground">{airline.program}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-primary">
                {airline.alliance}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {airline.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
