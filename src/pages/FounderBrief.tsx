import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { TagInput } from "@/components/TagInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useRole } from "@/contexts/RoleContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  COLLABORATION_OPTIONS,
  COMMITMENT_OPTIONS,
  INDUSTRY_OPTIONS,
  ROLE_OPTIONS,
  SKILL_SUGGESTIONS,
  STAGE_OPTIONS,
  WORKING_STYLE_OPTIONS,
} from "@/lib/constants";
import { ArrowRight } from "lucide-react";

type FormState = {
  founder_name: string;
  title: string;
  pitch: string;
  problem: string;
  target_users: string;
  industry: string;
  stage: string;
  progress: string;
  roles_needed: string[];
  skills_needed: string[];
  expected_commitment: string;
  expected_hours: number;
  timeline: string;
  founder_brings: string;
  ideal_teammate: string;
  not_fit_if: string;
  collaboration_type: string;
  working_style: string[];
};

const initial: FormState = {
  founder_name: "",
  title: "",
  pitch: "",
  problem: "",
  target_users: "",
  industry: "",
  stage: "",
  progress: "",
  roles_needed: [],
  skills_needed: [],
  expected_commitment: "",
  expected_hours: 15,
  timeline: "",
  founder_brings: "",
  ideal_teammate: "",
  not_fit_if: "",
  collaboration_type: "co-founder",
  working_style: [],
};

const required: Array<keyof FormState> = [
  "founder_name",
  "title",
  "pitch",
  "problem",
  "industry",
  "stage",
  "expected_commitment",
];

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <Card className="p-6 shadow-soft space-y-5">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {hint && <p className="text-sm text-muted-foreground mt-0.5">{hint}</p>}
    </div>
    {children}
  </Card>
);

const FounderBrief = () => {
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { setActiveProjectId } = useRole();
  const qc = useQueryClient();

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const validate = (): boolean => {
    const e = new Set<string>();
    for (const k of required) {
      const v = state[k];
      if (typeof v === "string" && !v.trim()) e.add(k);
    }
    if (state.roles_needed.length === 0) e.add("roles_needed");
    if (state.roles_needed.length > 3) {
      toast.warning("Pick the top 1–2 roles for MVP matching", {
        description: "Founders who target too many roles get weaker first conversations.",
      });
    }
    setErrors(e);
    return e.size === 0;
  };

  const onSubmit = async () => {
    if (!validate()) {
      toast.error("A few required fields are missing");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("projects")
      .insert({
        ...state,
        target_users: state.target_users || null,
        progress: state.progress || null,
        timeline: state.timeline || null,
        founder_brings: state.founder_brings || null,
        ideal_teammate: state.ideal_teammate || null,
        not_fit_if: state.not_fit_if || null,
      })
      .select()
      .single();
    setSaving(false);
    if (error || !data) {
      toast.error("Could not save project", { description: error?.message });
      return;
    }
    setActiveProjectId(data.id);
    qc.invalidateQueries({ queryKey: ["projects"] });
    navigate(`/founder/preview/${data.id}`);
  };

  const errCls = (k: string) => (errors.has(k) ? "border-destructive" : "");

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="container-page py-10 flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">New project brief</h1>
        <p className="text-muted-foreground mt-2">
          The clearer your brief, the better the matches. This takes about 5 minutes.
        </p>

        <div className="space-y-5 mt-8">
          <Section title="About you & the project">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="founder_name">Your name *</Label>
                <Input
                  id="founder_name"
                  value={state.founder_name}
                  onChange={(e) => set("founder_name", e.target.value)}
                  className={errCls("founder_name")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="title">Project title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Carbon-aware procurement for SMBs"
                  value={state.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={errCls("title")}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pitch">One-sentence pitch *</Label>
              <Textarea
                id="pitch"
                rows={2}
                placeholder="A simple tool that scores supplier quotes by embedded carbon."
                value={state.pitch}
                onChange={(e) => set("pitch", e.target.value)}
                className={errCls("pitch")}
              />
            </div>
          </Section>

          <Section title="The problem & users">
            <div className="space-y-1.5">
              <Label htmlFor="problem">What problem are you solving? *</Label>
              <Textarea
                id="problem"
                rows={3}
                value={state.problem}
                onChange={(e) => set("problem", e.target.value)}
                className={errCls("problem")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="target_users">Who is it for?</Label>
              <Input
                id="target_users"
                placeholder="e.g. Procurement leads at 10–200 person European companies"
                value={state.target_users}
                onChange={(e) => set("target_users", e.target.value)}
              />
            </div>
          </Section>

          <Section title="Where you are">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Industry *</Label>
                <Select value={state.industry} onValueChange={(v) => set("industry", v)}>
                  <SelectTrigger className={errCls("industry")}>
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Stage *</Label>
                <Select value={state.stage} onValueChange={(v) => set("stage", v)}>
                  <SelectTrigger className={errCls("stage")}>
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGE_OPTIONS.map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="progress">Progress so far</Label>
              <Textarea
                id="progress"
                rows={2}
                placeholder="e.g. Talked to 18 procurement leads; 12 said they would pilot."
                value={state.progress}
                onChange={(e) => set("progress", e.target.value)}
              />
            </div>
          </Section>

          <Section
            title="Who you need"
            hint="Pick 1–2 roles for the strongest matches. More than 3 dilutes results."
          >
            <div className="space-y-1.5">
              <Label>Roles needed *</Label>
              <TagInput
                value={state.roles_needed}
                onChange={(v) => set("roles_needed", v)}
                placeholder="Add a role and press Enter"
                suggestions={ROLE_OPTIONS}
              />
              {errors.has("roles_needed") && (
                <p className="text-xs text-destructive">Add at least one role.</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Skills they should bring</Label>
              <TagInput
                value={state.skills_needed}
                onChange={(v) => set("skills_needed", v)}
                placeholder="e.g. React, Stripe, Outbound"
                suggestions={SKILL_SUGGESTIONS}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Expected commitment *</Label>
                <Select
                  value={state.expected_commitment}
                  onValueChange={(v) => set("expected_commitment", v)}
                >
                  <SelectTrigger className={errCls("expected_commitment")}>
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMITMENT_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Collaboration type</Label>
                <Select
                  value={state.collaboration_type}
                  onValueChange={(v) => set("collaboration_type", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLLABORATION_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Hours per week expected</Label>
                <span className="text-sm font-medium tabular-nums">{state.expected_hours}h</span>
              </div>
              <Slider
                value={[state.expected_hours]}
                min={2}
                max={40}
                step={1}
                onValueChange={([v]) => set("expected_hours", v)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Working style preferences</Label>
              <TagInput
                value={state.working_style}
                onChange={(v) => set("working_style", v)}
                placeholder="e.g. Async, Weekly sync, Customer-obsessed"
                suggestions={WORKING_STYLE_OPTIONS}
              />
            </div>
          </Section>

          <Section title="Trust signals">
            <div className="space-y-1.5">
              <Label htmlFor="founder_brings">What you bring</Label>
              <Textarea
                id="founder_brings"
                rows={2}
                placeholder="Domain expertise, network, deck, customer interviews, etc."
                value={state.founder_brings}
                onChange={(e) => set("founder_brings", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ideal_teammate">Ideal teammate (in one line)</Label>
              <Input
                id="ideal_teammate"
                value={state.ideal_teammate}
                onChange={(e) => set("ideal_teammate", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="not_fit_if">Not a good fit if…</Label>
              <Input
                id="not_fit_if"
                placeholder="e.g. you need a fully specced PRD before writing code"
                value={state.not_fit_if}
                onChange={(e) => set("not_fit_if", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g. 3–6 months to launch"
                value={state.timeline}
                onChange={(e) => set("timeline", e.target.value)}
              />
            </div>
          </Section>
        </div>

        <div className="mt-8 flex justify-end gap-3 sticky bottom-4">
          <Button size="lg" onClick={onSubmit} disabled={saving} className="shadow-lift">
            {saving ? "Saving…" : "Preview & generate matches"} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FounderBrief;