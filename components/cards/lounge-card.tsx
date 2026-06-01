import { Clock, DoorOpen, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCard } from "@/lib/data";
import type { Lounge } from "@/types";

export function LoungeCard({ lounge }: { lounge: Lounge }) {
  const cardNames = lounge.cards
    .map((id) => getCard(id)?.name)
    .filter(Boolean) as string[];

  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-vintage-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold leading-tight">
            {lounge.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {lounge.airportName} ({lounge.airport})
          </p>
        </div>
        <Badge variant={lounge.type === "Domestic" ? "muted" : "secondary"}>
          {lounge.type}
        </Badge>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <DoorOpen className="h-4 w-4" />
          <span>{lounge.terminal}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{lounge.hours}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{lounge.guestAccess}</span>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lounge.priorityPass && <Badge variant="outline">Priority Pass</Badge>}
        {lounge.network.map((n) => (
          <Badge key={n} variant="muted">
            {n}
          </Badge>
        ))}
      </div>

      {cardNames.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="label-caps mb-1.5">Access with</p>
          <p className="text-sm text-muted-foreground">{cardNames.join(" · ")}</p>
        </div>
      )}
    </article>
  );
}
