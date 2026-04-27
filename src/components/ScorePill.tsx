import { cn } from "@/lib/utils";
import type { MatchLabel } from "@/lib/types";

const labelStyles: Record<MatchLabel, string> = {
  "Strong Match": "bg-success/15 text-success ring-success/30",
  "Good Match": "bg-primary/10 text-primary ring-primary/20",
  "Exploratory Match": "bg-warning/20 text-warning-foreground ring-warning/30",
  "Hidden": "bg-muted text-muted-foreground ring-border",
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
