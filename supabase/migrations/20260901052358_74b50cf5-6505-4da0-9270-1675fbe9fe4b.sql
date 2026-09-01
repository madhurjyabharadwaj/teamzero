
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT SELECT ON public.projects TO anon;
GRANT ALL ON public.projects TO service_role;
GRANT SELECT, UPDATE ON public.candidates TO authenticated;
GRANT SELECT ON public.candidates TO anon;
GRANT ALL ON public.candidates TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invites TO authenticated;
GRANT ALL ON public.invites TO service_role;

-- projects
DROP POLICY IF EXISTS "Public can update projects" ON public.projects;
DROP POLICY IF EXISTS "Public can create projects" ON public.projects;
CREATE POLICY "Owners can update their projects" ON public.projects
  FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Owners can delete their projects" ON public.projects
  FOR DELETE TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Authenticated users can create own projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());

-- candidates: allow claiming an unclaimed profile / updating own
CREATE POLICY "Users can claim or update their candidate profile" ON public.candidates
  FOR UPDATE TO authenticated USING (user_id IS NULL OR user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- invites
DROP POLICY IF EXISTS "Public can read invites" ON public.invites;
DROP POLICY IF EXISTS "Public can create invites" ON public.invites;
DROP POLICY IF EXISTS "Public can update invites" ON public.invites;
DROP POLICY IF EXISTS "Public can delete invites" ON public.invites;

CREATE OR REPLACE FUNCTION public.owns_project(_project_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.projects p WHERE p.id = _project_id AND p.owner_id = auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.is_candidate(_candidate_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.candidates c WHERE c.id = _candidate_id AND c.user_id = auth.uid());
$$;

CREATE POLICY "Founders and invited candidates can read invites" ON public.invites
  FOR SELECT TO authenticated USING (public.owns_project(project_id) OR public.is_candidate(candidate_id));
CREATE POLICY "Founders can create invites" ON public.invites
  FOR INSERT TO authenticated WITH CHECK (public.owns_project(project_id));
CREATE POLICY "Founders and invited candidates can update invites" ON public.invites
  FOR UPDATE TO authenticated USING (public.owns_project(project_id) OR public.is_candidate(candidate_id))
  WITH CHECK (public.owns_project(project_id) OR public.is_candidate(candidate_id));
CREATE POLICY "Founders can delete invites" ON public.invites
  FOR DELETE TO authenticated USING (public.owns_project(project_id));
