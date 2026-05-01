import { GlassCard } from "@/components/GlassCard";
import type { LucideIcon } from "lucide-react";

export function KpiTile({ label, value, hint, icon: Icon }: { label: string; value: string | number; hint?: string; icon?: LucideIcon }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</p>
          <p className="text-3xl font-bold mt-2 tabular-nums text-gradient">{value}</p>
          {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
        </div>
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-xl gradient-iridescent text-primary-foreground shadow-glow">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </GlassCard>
  );
}
