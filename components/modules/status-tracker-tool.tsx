"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { StatusCard } from "@/components/cards/status-card";
import { EstimateNote } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusPrograms } from "@/lib/data";
import { STORAGE_KEYS, useLocalStorage } from "@/lib/storage";
import type { SavedStatus, StatusProgram } from "@/types";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Math.random().toString(36).slice(2)}`;
}

function tierFor(program: StatusProgram, value: number): string {
  let name = program.tiers[0]?.name ?? "";
  for (const t of program.tiers) if (value >= t.threshold) name = t.name;
  return name;
}

export function StatusTrackerTool() {
  const [statuses, setStatuses, hydrated] = useLocalStorage<SavedStatus[]>(
    STORAGE_KEYS.statuses,
    []
  );
  const [programId, setProgramId] = React.useState(statusPrograms[0].id);
  const [value, setValue] = React.useState("");
  const [renewal, setRenewal] = React.useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    const program = statusPrograms.find((p) => p.id === programId);
    if (!program) return;
    const v = Math.max(0, Number(value.replace(/[^0-9]/g, "")) || 0);
    const entry: SavedStatus = {
      id: newId(),
      programId: program.id,
      programName: program.name,
      currentTier: tierFor(program, v),
      currentValue: v,
      renewalDate: renewal,
    };
    setStatuses((prev) => [entry, ...prev]);
    setValue("");
    setRenewal("");
  }

  function remove(id: string) {
    setStatuses((prev) => prev.filter((s) => s.id !== id));
  }

  const program = statusPrograms.find((p) => p.id === programId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <form
        onSubmit={add}
        className="rounded-lg border border-border bg-card p-6 shadow-vintage-sm lg:sticky lg:top-24 lg:self-start"
      >
        <h2 className="font-serif text-xl font-semibold">Add a programme</h2>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="program">Programme</Label>
            <Select value={programId} onValueChange={setProgramId}>
              <SelectTrigger id="program">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusPrograms.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Current {program.unit}</Label>
            <Input
              id="value"
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 18000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="renewal">Renewal date</Label>
            <input
              id="renewal"
              type="date"
              value={renewal}
              onChange={(e) => setRenewal(e.target.value)}
              className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4" />
            Track this status
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Saved only in this browser (localStorage). No account needed.
        </p>
      </form>

      <div>
        {!hydrated ? null : statuses.length === 0 ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 p-8 text-center text-muted-foreground">
            <p className="font-serif text-lg font-semibold">No programmes tracked yet</p>
            <p className="mt-1 max-w-xs text-sm">
              Add an airline programme to see your progress toward the next elite tier.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {statuses.map((s) => (
              <StatusCard
                key={s.id}
                status={s}
                program={statusPrograms.find((p) => p.id === s.programId)}
                onDelete={remove}
              />
            ))}
          </div>
        )}
        <EstimateNote>
          Tier thresholds are illustrative and use simplified qualifying units. Check
          your programme&apos;s exact earning and renewal rules.
        </EstimateNote>
      </div>
    </div>
  );
}
