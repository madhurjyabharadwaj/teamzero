import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { CandidateCard } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCandidates, useInvites, useProject } from "@/hooks/useTeamZeroData";
import { rankCandidates, visibleMatches } from "@/logic/matchScoring";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, ListChecks } from "lucide-react";

const MatchResults = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project } = useProject(projectId);
  const { data: candidates = [] } = useCandidates();
  const { data: invites = [] } = useInvites(projectId);
  const qc = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const ranked = useMemo(() => {
    if (!project) return [];
    return visibleMatches(rankCandidates(project, candidates));
  }, [project, candidates]);

  const inviteByCandidate = useMemo(() => {
    const m = new Map<string, (typeof invites)[number]>();
    invites.forEach((i) => m.set(i.candidate_id, i));
    return m;
  }, [invites]);

  const shortlist = async (matchId: string, score: number, label: string, reasons: string[]) => {
    if (!project) return;
    setPendingId(matchId);
    if (inviteByCandidate.get(matchId)) {
      setPendingId(null);
      navigate(`/founder/project/${project.id}/shortlist`);
      return;
    }
    const { error } = await supabase.from("invites").insert({
      project_id: project.id,
      candidate_id: matchId,
      status: "shortlisted",
      match_score: score,
      match_label: label,
      match_reasons: reasons,
    });
    setPendingId(null);
    if (error) { toast.error("Could not shortlist", { description: error.message }); return; }
    toast.success("Shortlisted");
    qc.invalidateQueries({ queryKey: ["invites"] });
  };

  if (!project) {
    return <div className="min-h-screen"><AppHeader /><main className="container-page py-10"><p className="text-muted-foreground">Loading…</p></main></div>;
  }

  const strongCount = ranked.filter((m) => m.label === "Strong Match").length;

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="container-page py-10 flex-1 max-w-4xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/founder/project/${project.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to preview
        </Button>
        <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Matches for {project.title}</h1>
            <p className="text-muted-foreground mt-2">
              {ranked.length} candidate{ranked.length === 1 ? "" : "s"} above the threshold · {strongCount} strong match{strongCount === 1 ? "" : "es"}
            </p>
          </div>
          <Button onClick={() => navigate(`/founder/project/${project.id}/shortlist`)} variant="outline">
            <ListChecks className="h-4 w-4 mr-1.5" /> View shortlist ({invites.length})
          </Button>
        </div>

        {strongCount === 0 && ranked.length > 0 && (
          <Card className="mt-6 p-4 border-warning/40 bg-warning/10">
            <p className="text-sm">No strong matches yet. These are <strong>exploratory</strong> profiles. Consider broadening the role you need or relaxing the working-style preferences.</p>
          </Card>
        )}

        {ranked.length === 0 && (
          <Card className="mt-6 p-6 text-center">
            <p className="text-sm text-muted-foreground">No candidates match this brief yet. The candidate pool is intentionally small in this MVP — try a different role or broaden the skills.</p>
          </Card>
        )}

        <div className="grid gap-4 mt-6">
          {ranked.map((m) => {
            const existing = inviteByCandidate.get(m.candidate.id);
            return (
              <CandidateCard
                key={m.candidate.id}
                match={m}
                action={{
                  label: existing ? "On shortlist" : "Add to shortlist",
                  onClick: () => shortlist(m.candidate.id, m.score, m.label, m.reasons),
                  disabled: pendingId === m.candidate.id || !!existing,
                  variant: existing ? "outline" : "default",
                }}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MatchResults;
