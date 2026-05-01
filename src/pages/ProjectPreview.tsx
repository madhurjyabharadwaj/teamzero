import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useTeamZeroData";
import { ArrowLeft, Sparkles } from "lucide-react";

const ProjectPreview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(projectId);
  return (
    <div className="min-h-screen flex flex-col">
      <AmbientBackground />
      <AppHeader />
      <main className="container-page py-10 md:py-14 flex-1 max-w-3xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/founder/brief`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Edit brief
        </Button>
        <div className="mt-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Here's how candidates will see your <span className="text-gradient">project</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">This is a preview of your structured brief. Generate matches when it looks right.</p>
        </div>
        <div className="mt-8">
          {isLoading || !project ? <p className="text-muted-foreground">Loading…</p> : (
            <>
              <ProjectCard project={project} />
              <div className="mt-8 flex justify-end">
                <Button
                  size="lg"
                  onClick={() => navigate(`/founder/project/${project.id}/matches`)}
                  className="h-12 px-7 gradient-iridescent text-primary-foreground border-0 shadow-glow btn-shimmer hover:opacity-95 transition-transform hover:scale-[1.02]"
                >
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
