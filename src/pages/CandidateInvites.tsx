import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { ScorePill } from "@/components/ScorePill";
import { useAllInvites, useCandidates, useProjects } from "@/hooks/useTeamZeroData";
import { ProjectCard } from "@/components/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InviteStatus, MatchLabel } from "@/lib/types";

const CandidateInvites = () => {
  const { data: invites = [] } = useAllInvites();
  const { data: candidates = [] } = useCandidates();
  const { data: projects = [] } = useProjects();
  const qc = useQueryClient();

  const [activeCandidateId, setActiveCandidateId] = useState<string>("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!activeCandidateId && candidates.length > 0) setActiveCandidateId(candidates[0].id);
  }, [candidates, activeCandidateId]);

  const projectMap = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);
  const myInvites = useMemo(
    () => invites.filter((i) => i.candidate_id === activeCandidateId && i.status !== "shortlisted"),
    [invites, activeCandidateId],
  );

  const respond = async (inviteId: string, status: InviteStatus) => {
    const note = notes[inviteId] ?? null;
    const { error } = await supabase.from("invites").update({ status, candidate_note: note }).eq("id", inviteId);
    if (error) { toast.error(error.message); return; }
    toast.success("Response sent");
    qc.invalidateQueries({ queryKey: ["invites"] });
  };

  const activeCandidate = candidates.find((c) => c.id === activeCandidateId);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="container-page py-10 flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight">Your invites</h1>
        <p className="text-muted-foreground mt-2">For the demo, choose which seeded candidate you want to play. Founders' invites for that profile show up below.</p>

        <Card className="p-4 mt-6 shadow-soft">
          <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">View as candidate</label>
          <Select value={activeCandidateId} onValueChange={setActiveCandidateId}>
            <SelectTrigger className="mt-1.5 max-w-md"><SelectValue placeholder="Choose a profile" /></SelectTrigger>
            <SelectContent>
              {candidates.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name} — {c.headline}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {activeCandidate && (
            <p className="text-xs text-muted-foreground mt-2">
              Playing: <strong className="text-foreground">{activeCandidate.name}</strong> · {activeCandidate.commitment_level} · {activeCandidate.availability_hours}h/week
            </p>
          )}
        </Card>

        {myInvites.length === 0 ? (
          <Card className="p-6 mt-8 text-center">
            <p className="text-sm text-muted-foreground">No invites yet for this candidate. Switch role to Founder, build a brief that fits this profile, and send an invite.</p>
          </Card>
        ) : (
          <div className="grid gap-4 mt-8">
            {myInvites.map((inv) => {
              const project = projectMap.get(inv.project_id);
              if (!project) return null;
              return (
                <Card key={inv.id} className="shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Invite from {project.founder_name}</p>
                        <h3 className="font-semibold text-lg mt-0.5">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {inv.match_score && inv.match_label && (
                          <ScorePill score={inv.match_score} label={inv.match_label as MatchLabel} />
                        )}
                        <StatusBadge status={inv.status as InviteStatus} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ProjectCard project={project} compact />

                    {inv.match_reasons && inv.match_reasons.length > 0 && (
                      <div className="bg-primary-soft/60 rounded-md p-3">
                        <p className="text-xs uppercase tracking-wider font-medium text-primary mb-1.5">Why you were matched</p>
                        <ul className="text-sm space-y-1 list-disc list-inside text-foreground/85">
                          {inv.match_reasons.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    )}

                    {inv.message && (
                      <div className="text-sm bg-secondary/60 rounded-md p-3 border border-border">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Message from founder</p>
                        {inv.message}
                      </div>
                    )}

                    {inv.status === "invited" ? (
                      <>
                        <Textarea
                          rows={2}
                          placeholder="Optional note back to the founder…"
                          value={notes[inv.id] ?? ""}
                          onChange={(e) => setNotes((n) => ({ ...n, [inv.id]: e.target.value }))}
                        />
                        <div className="flex flex-wrap gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => respond(inv.id, "not_a_fit")}>Not a fit</Button>
                          <Button variant="outline" size="sm" onClick={() => respond(inv.id, "maybe_later")}>Maybe later</Button>
                          <Button size="sm" onClick={() => respond(inv.id, "interested")}>Interested</Button>
                        </div>
                      </>
                    ) : (
                      inv.candidate_note && (
                        <div className="text-sm bg-primary-soft rounded-md p-3">
                          <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">Your note</p>
                          {inv.candidate_note}
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateInvites;
