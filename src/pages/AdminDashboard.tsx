import { useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { KpiTile } from "@/components/KpiTile";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useAllInvites, useCandidates, useProjects } from "@/hooks/useTeamZeroData";
import { Briefcase, MessageSquare, Send, Sparkles, TrendingDown, Users } from "lucide-react";
import type { InviteStatus } from "@/lib/types";

const AdminDashboard = () => {
  const { data: projects = [] } = useProjects();
  const { data: candidates = [] } = useCandidates();
  const { data: invites = [] } = useAllInvites();

  const stats = useMemo(() => {
    const sent = invites.filter((i) => i.status !== "shortlisted").length;
    const interested = invites.filter((i) => i.status === "interested" || i.status === "call_scheduled").length;
    const calls = invites.filter((i) => i.status === "call_scheduled").length;
    const responseRate = sent === 0 ? 0 : Math.round((interested / sent) * 100);
    return { sent, interested, calls, responseRate };
  }, [invites]);

  const candidateMap = useMemo(() => new Map(candidates.map((c) => [c.id, c])), [candidates]);
  const projectMap = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);

  const gaps = useMemo(() => {
    const demand = new Map<string, number>();
    projects.forEach((p) => p.roles_needed.forEach((r) => demand.set(r, (demand.get(r) ?? 0) + 1)));
    const supply = new Map<string, number>();
    candidates.forEach((c) => c.role_fits.forEach((r) => supply.set(r, (supply.get(r) ?? 0) + 1)));
    const all = new Set([...demand.keys(), ...supply.keys()]);
    return Array.from(all)
      .map((role) => ({ role, demand: demand.get(role) ?? 0, supply: supply.get(role) ?? 0, gap: (demand.get(role) ?? 0) - (supply.get(role) ?? 0) }))
      .sort((a, b) => b.gap - a.gap || b.demand - a.demand)
      .slice(0, 8);
  }, [projects, candidates]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="container-page py-10 flex-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin dashboard</h1>
        <p className="text-muted-foreground mt-2">Track activity, outcomes, and where the ecosystem is short on supply.</p>

        <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <KpiTile label="Projects" value={projects.length} icon={Briefcase} hint="Founder briefs created" />
          <KpiTile label="Candidate pool" value={candidates.length} icon={Users} hint="Seeded demo profiles" />
          <KpiTile label="Invites sent" value={stats.sent} icon={Send} hint={`${invites.length - stats.sent} on shortlists`} />
          <KpiTile label="Positive response" value={`${stats.responseRate}%`} icon={Sparkles} hint={`${stats.calls} calls scheduled`} />
        </div>

        <div className="grid gap-6 mt-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Recent activity</h2>
            {invites.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">No invites yet. Switch to Founder and create a brief.</p>
              </Card>
            )}
            {invites.slice(0, 8).map((inv) => {
              const c = candidateMap.get(inv.candidate_id);
              const p = projectMap.get(inv.project_id);
              if (!c || !p) return null;
              return (
                <Card key={inv.id} className="p-4 shadow-soft flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{p.founder_name}</span>{" "}
                      <span className="text-muted-foreground">→</span>{" "}
                      <span className="font-semibold">{c.name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{p.title} · score {inv.match_score ?? "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {inv.candidate_note && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                    <StatusBadge status={inv.status as InviteStatus} />
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning" /> Ecosystem gaps
            </h2>
            <Card className="p-4 shadow-soft">
              <p className="text-xs text-muted-foreground mb-3">Roles founders ask for vs roles candidates can fill.</p>
              <ul className="space-y-2.5">
                {gaps.map((g) => (
                  <li key={g.role} className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate">{g.role}</span>
                    <span className="tabular-nums text-xs text-muted-foreground shrink-0">
                      <span className={g.gap > 0 ? "text-destructive font-semibold" : "text-success font-semibold"}>{g.demand}</span>
                      {" / "}{g.supply}
                    </span>
                  </li>
                ))}
                {gaps.length === 0 && <li className="text-sm text-muted-foreground">No data yet.</li>}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                <strong>demand</strong> / <strong>supply</strong>. Red means more founders need this role than candidates can fill.
              </p>
            </Card>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-4">All projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.id} project={p} compact />)}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
