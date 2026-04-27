import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function KpiTile({ label, value, hint, icon: Icon }: { label: string; value: string | number; hint?: string; icon?: LucideIcon }) {
  return (
    <Card className="p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2 tabular-nums">{value}</p>
          {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
        </div>
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </Card>
  );
}
