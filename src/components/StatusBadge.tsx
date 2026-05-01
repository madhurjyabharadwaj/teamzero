import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS } from "@/lib/constants";
import type { InviteStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<InviteStatus, string> = {
  shortlisted: "bg-white/5 text-foreground/80 border-white/10",
  invited: "bg-primary/15 text-primary border-primary/30",
  interested: "bg-success/15 text-success border-success/40",
  maybe_later: "bg-warning/15 text-warning border-warning/30",
  not_a_fit: "bg-destructive/10 text-destructive border-destructive/30",
  call_scheduled: "bg-success/30 text-success border-success/50",
};

export function StatusBadge({ status }: { status: InviteStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}