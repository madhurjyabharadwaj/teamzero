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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/role" element={<RoleSelection />} />
            <Route path="/founder/brief" element={<FounderBrief />} />
            <Route path="/founder/project/:projectId" element={<ProjectPreview />} />
            <Route path="/founder/project/:projectId/matches" element={<MatchResults />} />
            <Route path="/founder/project/:projectId/shortlist" element={<ShortlistInvites />} />
            <Route path="/candidate/invites" element={<CandidateInvites />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
