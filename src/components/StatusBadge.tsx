import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS } from "@/lib/constants";
import type { InviteStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<InviteStatus, string> = {
  shortlisted: "bg-secondary text-secondary-foreground border-transparent",
  invited: "bg-primary/10 text-primary border-primary/20",
  interested: "bg-success/15 text-success border-success/30",
  maybe_later: "bg-warning/20 text-warning-foreground border-warning/30",
  not_a_fit: "bg-destructive/10 text-destructive border-destructive/30",
  call_scheduled: "bg-success text-success-foreground border-transparent",
};

export function StatusBadge({ status }: { status: InviteStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}