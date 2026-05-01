import { cn } from "@/lib/utils";
import type { MatchLabel } from "@/lib/types";

const labelStyles: Record<MatchLabel, string> = {
  "Strong Match": "bg-success/15 text-success ring-success/40 shadow-[0_0_20px_-4px_hsl(var(--success)/0.5)]",
  "Good Match": "bg-primary/15 text-primary ring-primary/40 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]",
  "Exploratory Match": "bg-warning/15 text-warning ring-warning/30",
  "Hidden": "bg-white/5 text-muted-foreground ring-white/10",
};

export function ScorePill({ score, label }: { score: number; label: MatchLabel }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset", labelStyles[label])}>
      <span className="tabular-nums text-sm">{score}</span>
      <span className="opacity-70">·</span>
      <span>{label.replace(" Match", "")}</span>
    </div>
  );
}
