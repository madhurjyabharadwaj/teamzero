-- Candidates table (seeded demo profiles)
CREATE TABLE public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  essec_status TEXT NOT NULL,
  program_year TEXT,
  role_fits TEXT[] NOT NULL DEFAULT '{}',
  skills TEXT[] NOT NULL DEFAULT '{}',
  interests TEXT[] NOT NULL DEFAULT '{}',
  proof_of_work TEXT[] NOT NULL DEFAULT '{}',
  availability_hours INT NOT NULL DEFAULT 0,
  commitment_level TEXT NOT NULL,
  open_to TEXT[] NOT NULL DEFAULT '{}',
  working_style TEXT[] NOT NULL DEFAULT '{}',
  motivation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects table (founder briefs)
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_name TEXT NOT NULL,
  title TEXT NOT NULL,
  pitch TEXT NOT NULL,
  problem TEXT NOT NULL,
  target_users TEXT,
  industry TEXT NOT NULL,
  stage TEXT NOT NULL,
  progress TEXT,
  roles_needed TEXT[] NOT NULL DEFAULT '{}',
  skills_needed TEXT[] NOT NULL DEFAULT '{}',
  expected_commitment TEXT NOT NULL,
  expected_hours INT NOT NULL DEFAULT 10,
  timeline TEXT,
  founder_brings TEXT,
  ideal_teammate TEXT,
  not_fit_if TEXT,
  collaboration_type TEXT NOT NULL DEFAULT 'co-founder',
  working_style TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Invites table (shortlist + responses)
CREATE TABLE public.invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'shortlisted',
  candidate_note TEXT,
  match_score INT,
  match_label TEXT,
  match_reasons TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invites_project ON public.invites(project_id);
CREATE INDEX idx_invites_candidate ON public.invites(candidate_id);

-- Enable RLS
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- MVP policies: open access (mock auth, demo data only)
CREATE POLICY "Public can read candidates" ON public.candidates FOR SELECT USING (true);

CREATE POLICY "Public can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can create projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update projects" ON public.projects FOR UPDATE USING (true);

CREATE POLICY "Public can read invites" ON public.invites FOR SELECT USING (true);
CREATE POLICY "Public can create invites" ON public.invites FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update invites" ON public.invites FOR UPDATE USING (true);
CREATE POLICY "Public can delete invites" ON public.invites FOR DELETE USING (true);

-- updated_at trigger for invites
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER invites_touch_updated_at
BEFORE UPDATE ON public.invites
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();