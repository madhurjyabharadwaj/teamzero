import { CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScorePill } from "@/components/ScorePill";
import { MatchReasonList } from "@/components/MatchReasonList";
import type { Match } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Clock, GraduationCap } from "lucide-react";

type Props = {
  match: Match;
  action?: { label: string; onClick: () => void; disabled?: boolean; variant?: "default" | "secondary" | "outline" };
  secondaryAction?: { label: string; onClick: () => void };
};

export function CandidateCard({ match, action, secondaryAction }: Props) {
  const c = match.candidate;
  return (
    <GlassCard className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{c.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{c.headline}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" /> {c.essec_status}
                {c.program_year ? ` · ${c.program_year}` : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {c.availability_hours}h/week · {c.commitment_level}
              </span>
            </div>
          </div>
          <ScorePill score={match.score} label={match.label} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <MatchReasonList reasons={match.reasons} />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {c.role_fits.slice(0, 3).map((r) => <Badge key={r} variant="outline" className="font-normal text-xs border-primary/30 bg-primary/10 text-primary">{r}</Badge>)}
          {c.skills.slice(0, 4).map((s) => <Badge key={s} variant="secondary" className="font-normal text-xs bg-white/5 border border-white/10">{s}</Badge>)}
        </div>
        {(action || secondaryAction) && (
          <div className="flex gap-2 pt-3 border-t border-white/5">
            {secondaryAction && <Button variant="ghost" size="sm" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
            {action && (
              <Button
                size="sm"
                variant={action.variant ?? "default"}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`ml-auto ${action.variant === "outline" ? "border-white/15 bg-white/5" : "gradient-iridescent text-primary-foreground border-0 btn-shimmer hover:opacity-95"}`}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </GlassCard>
  );
}
