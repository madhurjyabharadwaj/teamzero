import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useTeamZeroData";
import { ArrowLeft, Sparkles } from "lucide-react";

const ProjectPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id);
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="container-page py-10 flex-1 max-w-3xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/founder/brief`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Edit brief
        </Button>
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight">Here's how candidates will see your project</h1>
          <p className="text-muted-foreground mt-2">This is a preview of your structured brief. Generate matches when it looks right.</p>
        </div>
        <div className="mt-8">
          {isLoading || !project ? <p className="text-muted-foreground">Loading…</p> : (
            <>
              <ProjectCard project={project} />
              <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={() => navigate(`/founder/matches/${project.id}`)} className="shadow-lift">
                  <Sparkles className="h-4 w-4 mr-2" /> Generate matches
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectPreview;
