import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-md border border-foreground/20 bg-primary text-primary-foreground shadow-vintage-sm">
        <Compass className="h-7 w-7" />
      </span>
      <p className="mt-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        This route is off the map.
      </h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back on course.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/finder">Open the finder</Link>
        </Button>
      </div>
    </div>
  );
}
