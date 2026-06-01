import { cn } from "@/lib/utils";
import { RATING_TONE } from "@/lib/estimate";
import type { ValueRating } from "@/types";

export function RatingBadge({
  rating,
  className,
}: {
  rating: ValueRating;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
        RATING_TONE[rating],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {rating}
    </span>
  );
}
