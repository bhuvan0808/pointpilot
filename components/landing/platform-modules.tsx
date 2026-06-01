import Link from "next/link";

import { MODULES } from "@/lib/nav";

export function PlatformModules() {
  return (
    <section
      id="tools"
      className="scroll-mt-20 border-b border-border bg-card/40 py-20 md:py-24"
    >
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">The platform</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Ten tools for the complete points journey.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From finding award space to tracking elite status, PointPilot covers every
            step — and it all runs free, in your browser.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex flex-col rounded-lg border border-border bg-card p-5 shadow-vintage-sm transition-shadow hover:shadow-vintage"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/15 bg-secondary transition-transform group-hover:-rotate-6">
                  <m.icon className="h-5 w-5 text-primary" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.group}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold leading-tight">
                {m.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {m.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
