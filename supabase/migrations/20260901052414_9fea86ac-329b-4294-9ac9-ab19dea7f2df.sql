
CREATE OR REPLACE FUNCTION public.owns_project(_project_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.projects p WHERE p.id = _project_id AND p.owner_id = auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.is_candidate(_candidate_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.candidates c WHERE c.id = _candidate_id AND c.user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.owns_project(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_candidate(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.owns_project(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_candidate(uuid) TO authenticated;
