import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { AmbientBackground } from "@/components/AmbientBackground";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { ScorePill } from "@/components/ScorePill";
import { useCandidates, useInvites, useProject } from "@/hooks/useTeamZeroData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import type { InviteStatus, MatchLabel } from "@/lib/types";

const ShortlistInvites = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project } = useProject(projectId);
  const { data: candidates = [] } = useCandidates();
  const { data: invites = [] } = useInvites(projectId);
  const qc = useQueryClient();
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const candidateMap = useMemo(() => new Map(candidates.map((c) => [c.id, c])), [candidates]);

  const sendInvite = async (inviteId: string) => {
    const msg = messages[inviteId] ?? "";
    if (!msg.trim()) { toast.error("Add a short message first"); return; }
    setBusy(inviteId);
    const { error } = await supabase.from("invites").update({ status: "invited", message: msg }).eq("id", inviteId);
    setBusy(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Invite sent (simulated)");
    qc.invalidateQueries({ queryKey: ["invites"] });
  };

  const updateStatus = async (inviteId: string, status: InviteStatus) => {
    const { error } = await supabase.from("invites").update({ status }).eq("id", inviteId);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["invites"] });
  };

  const remove = async (inviteId: string) => {
    const { error } = await supabase.from("invites").delete().eq("id", inviteId);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["invites"] });
  };

  if (!project) {
    return <div className="min-h-screen"><AmbientBackground /><AppHeader /><main className="container-page py-10"><p>Loading…</p></main></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AmbientBackground />
      <AppHeader />
      <main className="container-page py-10 md:py-14 flex-1 max-w-4xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/founder/project/${project.id}/matches`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to matches
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
          Shortlist & <span className="text-gradient">invites</span>
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">{project.title}</p>

        {invites.length === 0 ? (
          <GlassCard hover={false} className="mt-8 p-6 text-center">
            <p className="text-sm text-muted-foreground">Nothing on your shortlist yet. Add candidates from the matches page.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-4 mt-8">
            {invites.map((inv) => {
              const c = candidateMap.get(inv.candidate_id);
              if (!c) return null;
              return (
                <GlassCard key={inv.id} hover={false}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-lg">{c.name}</h3>
                        <p className="text-sm text-muted-foreground">{c.headline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {inv.match_score && inv.match_label && (
                          <ScorePill score={inv.match_score} label={inv.match_label as MatchLabel} />
                        )}
                        <StatusBadge status={inv.status as InviteStatus} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {inv.status === "shortlisted" ? (
                      <>
                        <Textarea
                          rows={3}
                          placeholder={`Hi ${c.name.split(" ")[0]}, I'm building ${project.title}. Your work on ${c.proof_of_work[0] ?? "your projects"} caught my eye…`}
                          value={messages[inv.id] ?? ""}
                          onChange={(e) => setMessages((m) => ({ ...m, [inv.id]: e.target.value }))}
                        />
                        <div className="flex justify-between gap-2">
                          <Button variant="ghost" size="sm" onClick={() => remove(inv.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        <Button size="sm" onClick={() => sendInvite(inv.id)} disabled={busy === inv.id} className="gradient-iridescent text-primary-foreground border-0 btn-shimmer hover:opacity-95">
                            <Send className="h-4 w-4 mr-1.5" /> Send invite
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        {inv.message && (
                          <div className="text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Your message</p>
                            {inv.message}
                          </div>
                        )}
                        {inv.candidate_note && (
                          <div className="text-sm bg-primary/10 border border-primary/20 rounded-lg p-3">
                            <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">Candidate replied</p>
                            {inv.candidate_note}
                          </div>
                        )}
                        {inv.status === "interested" && (
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline" onClick={() => updateStatus(inv.id, "call_scheduled")} className="border-white/15 bg-white/5">
                              Mark call scheduled
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </GlassCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShortlistInvites;
