import { Link, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = async () => {
    setRole(null);
    setActiveProjectId(null);
    if (user) await signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/40 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5 font-normal text-lg">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl gradient-iridescent text-primary-foreground shadow-glow">
            <Layers className="h-4 w-4 relative z-10" />
          </span>
          <span className="tracking-tight">TeamZero</span>
        </Link>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex font-normal border-white/10 bg-white/5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow mr-1.5 animate-pulse" /> Demo
          </Badge>
          {user && (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Signed in{role ? <> as <span className="font-medium text-foreground">{roleLabel[role]}</span></> : null}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSwitch}>
                <LogOut className="h-4 w-4 mr-1" /> Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}