import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import Landing from "./pages/Landing.tsx";
import RoleSelection from "./pages/RoleSelection.tsx";
import FounderBrief from "./pages/FounderBrief.tsx";
import ProjectPreview from "./pages/ProjectPreview.tsx";
import MatchResults from "./pages/MatchResults.tsx";
import ShortlistInvites from "./pages/ShortlistInvites.tsx";
import CandidateInvites from "./pages/CandidateInvites.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import { RoleProvider } from "./contexts/RoleContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./components/RequireAuth";
import Auth from "./pages/Auth.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <RoleProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/role" element={<RequireAuth><RoleSelection /></RequireAuth>} />
            <Route path="/founder/brief" element={<RequireAuth><FounderBrief /></RequireAuth>} />
            <Route path="/founder/project/:projectId" element={<RequireAuth><ProjectPreview /></RequireAuth>} />
            <Route path="/founder/project/:projectId/matches" element={<RequireAuth><MatchResults /></RequireAuth>} />
            <Route path="/founder/project/:projectId/shortlist" element={<RequireAuth><ShortlistInvites /></RequireAuth>} />
            <Route path="/candidate/invites" element={<RequireAuth><CandidateInvites /></RequireAuth>} />
            <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
