import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AmbientBackground } from "@/components/AmbientBackground";
import { AppHeader } from "@/components/AppHeader";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/role";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters");
      return;
    }
    setBusy(true);
    const result =
      mode === "signup"
        ? await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: `${window.location.origin}/` },
          })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    if (mode === "signup" && !result.data.session) {
      toast.success("Check your inbox to confirm your email, then sign in.");
      setMode("signin");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AmbientBackground />
      <AppHeader />
      <main className="container-page flex-1 py-16 max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {mode === "signin" ? "Welcome " : "Join "}
          <span className="text-gradient">TeamZero</span>
        </h1>
        <p className="text-muted-foreground mt-3">
          Sign in so your projects and invites stay private to you.
        </p>
        <GlassCard hover={false} className="p-6 mt-8">
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full gradient-iridescent text-primary-foreground border-0 btn-shimmer hover:opacity-95">
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground mt-4 w-full text-center"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "No account? Create one" : "Already have an account? Sign in"}
          </button>
        </GlassCard>
      </main>
    </div>
  );
};

export default Auth;
