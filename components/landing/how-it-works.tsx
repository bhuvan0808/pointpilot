import { CreditCard, Route, Trophy } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Tell us your card & balance",
    body: "Choose from five of India's top travel cards and enter how many reward points or miles you're sitting on.",
  },
  {
    icon: Route,
    title: "Pick where you want to fly",
    body: "Select a departure city and destination. We map it to the right award region for every airline programme.",
  },
  {
    icon: Trophy,
    title: "Get a ranked shortlist",
    body: "PointPilot scores each transfer partner on value-per-point and whether your balance actually covers the trip.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-border py-20 md:py-24"
    >
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps from points to a printed boarding pass.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No spreadsheets, no forum-trawling. Just a clear, ranked answer to
            the only question that matters: where will my points go furthest?
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-foreground/20 bg-card shadow-vintage-sm">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
