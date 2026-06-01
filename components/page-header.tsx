export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}

export function ModuleShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <section className="container py-12 md:py-16">
        <PageHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10">{children}</div>
      </section>
    </div>
  );
}

/** Small reusable disclaimer used across modules. */
export function EstimateNote({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-md border border-border bg-secondary/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      {children ??
        "Estimates only. Award pricing, ratios and point values change frequently and vary by date, availability and cabin. Always confirm with the airline, hotel or bank before transferring or booking."}
    </div>
  );
}
