"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Compass, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  MODULE_GROUPS,
  MODULES,
  QUICK_FINDER,
  modulesByGroup,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toolsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="PointPilot home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-foreground/20 bg-primary text-primary-foreground shadow-vintage-sm transition-transform group-hover:-rotate-6">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            PointPilot
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen((o) => !o)}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={toolsOpen}
            >
              All tools
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", toolsOpen && "rotate-180")}
              />
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-2 w-[640px] rounded-lg border border-border bg-card p-4 shadow-vintage">
                <div className="grid grid-cols-3 gap-4">
                  {MODULE_GROUPS.map((group) => (
                    <div key={group}>
                      <p className="label-caps mb-2">{group}</p>
                      <ul className="space-y-1">
                        {modulesByGroup(group).map((m) => (
                          <li key={m.href}>
                            <Link
                              href={m.href}
                              className="flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-foreground/5"
                            >
                              <m.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-sm font-medium leading-tight">
                                {m.short}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink href="/award-search" pathname={pathname}>
            Award Search
          </NavLink>
          <NavLink href="/card-optimizer" pathname={pathname}>
            Card Optimizer
          </NavLink>
          <NavLink href="/dashboard" pathname={pathname}>
            Dashboard
          </NavLink>
          <Button asChild size="sm" className="ml-2">
            <Link href={QUICK_FINDER.href}>Quick Finder</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container max-h-[70vh] overflow-y-auto py-4">
            {MODULE_GROUPS.map((group) => (
              <div key={group} className="mb-4">
                <p className="label-caps mb-2">{group}</p>
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {modulesByGroup(group).map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className="flex items-center gap-2.5 rounded-md p-2.5 transition-colors hover:bg-foreground/5"
                      >
                        <m.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm font-medium">{m.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link href={QUICK_FINDER.href}>Open Quick Finder</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string | null;
  children: React.ReactNode;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
