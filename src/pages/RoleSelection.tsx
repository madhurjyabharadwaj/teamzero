import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { AmbientBackground } from "@/components/AmbientBackground";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { useRole } from "@/contexts/RoleContext";
import { Briefcase, Search, ShieldCheck } from "lucide-react";
import type { AppRole } from "@/lib/types";

const roles: Array<{ key: AppRole; title: string; desc: string; cta: string; icon: typeof Briefcase; to: string }> = [
  { key: "founder", title: "Founder", desc: "I have an early-stage project and need 1–3 first teammates.", cta: "Continue as Founder", icon: Briefcase, to: "/founder/brief" },
  { key: "candidate", title: "Candidate", desc: "I want to join a serious early-stage project that fits my skills.", cta: "Continue as Candidate", icon: Search, to: "/candidate/invites" },
  { key: "admin", title: "Admin", desc: "I track projects, matches, invites, and ecosystem gaps.", cta: "Open admin dashboard", icon: ShieldCheck, to: "/admin" },
];

const RoleSelection = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const choose = (key: AppRole, to: string) => { setRole(key); navigate(to); };
  return (
    <div className="min-h-screen flex flex-col">
      <AmbientBackground />
      <AppHeader />
      <main className="container-page py-16 md:py-20 flex-1">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Pick a role to <span className="text-gradient">demo</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            This MVP uses mock authentication. Choose how you want to experience TeamZero — switch any time from the header.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 mt-12">
          {roles.map((r, i) => (
            <Reveal key={r.key} delay={i * 100}>
              <GlassCard className="p-6 flex flex-col h-full">
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-iridescent text-primary-foreground mb-5 shadow-glow">
                  <r.icon className="h-6 w-6" />
                </span>
                <h2 className="text-xl font-semibold">{r.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1 leading-relaxed">{r.desc}</p>
                <Button
                  className="mt-6 w-full gradient-iridescent text-primary-foreground border-0 btn-shimmer hover:opacity-95"
                  onClick={() => choose(r.key, r.to)}
                >
                  {r.cta}
                </Button>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;
