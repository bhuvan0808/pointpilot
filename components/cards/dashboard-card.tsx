import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function DashboardCard({
  title,
  value,
  sub,
  icon: Icon,
  href,
  accent,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  href?: string;
  accent?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-vintage-sm transition-shadow",
        href && "hover:shadow-vintage"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="label-caps">{title}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p
        className={cn(
          "mt-3 font-serif text-3xl font-semibold leading-none",
          accent && "text-primary"
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
      {href && (
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
          Open <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
