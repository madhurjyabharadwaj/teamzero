import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
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
      <AppHeader />
      <main className="container-page py-16 flex-1">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">Pick a role to demo</h1>
          <p className="mt-3 text-muted-foreground">This MVP uses mock authentication. Choose how you want to experience TeamZero — switch any time from the header.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 mt-10">
          {roles.map((r) => (
            <Card key={r.key} className="p-6 shadow-soft hover:shadow-lift transition-shadow flex flex-col">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary-soft text-primary mb-4">
                <r.icon className="h-6 w-6" />
              </span>
              <h2 className="text-xl font-semibold">{r.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{r.desc}</p>
              <Button className="mt-6 w-full" onClick={() => choose(r.key, r.to)}>{r.cta}</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;
