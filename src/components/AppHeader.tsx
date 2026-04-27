import { Link, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, LogOut } from "lucide-react";

const roleLabel: Record<string, string> = {
  founder: "Founder",
  candidate: "Candidate",
  admin: "Admin",
};

export function AppHeader() {
  const { role, setRole, setActiveProjectId } = useRole();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setRole(null);
    setActiveProjectId(null);
    navigate("/role");
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Layers className="h-4 w-4" />
          </span>
          TeamZero
        </Link>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex font-normal">
            Demo data
          </Badge>
          {role && (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Signed in as <span className="font-medium text-foreground">{roleLabel[role]}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleSwitch}>
                <LogOut className="h-4 w-4 mr-1" /> Switch
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}