import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";
import { Briefcase, Clock } from "lucide-react";

export function ProjectCard({ project, compact }: { project: Project; compact?: boolean }) {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{project.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">by {project.founder_name}</p>
          </div>
          <Badge variant="secondary">{project.stage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground/85">{project.pitch}</p>
        {!compact && (
          <>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Problem</p>
              <p className="text-sm">{project.problem}</p>
            </div>
            {project.target_users && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Target users</p>
                <p className="text-sm">{project.target_users}</p>
              </div>
            )}
          </>
        )}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="outline" className="gap-1 font-normal"><Briefcase className="h-3 w-3" /> {project.industry}</Badge>
          <Badge variant="outline" className="gap-1 font-normal"><Clock className="h-3 w-3" /> {project.expected_hours}h/week · {project.expected_commitment}</Badge>
          {project.roles_needed.map((r) => <Badge key={r} variant="outline" className="font-normal">{r}</Badge>)}
        </div>
        {!compact && project.skills_needed.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.skills_needed.map((s) => <Badge key={s} variant="secondary" className="font-normal text-xs">{s}</Badge>)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
