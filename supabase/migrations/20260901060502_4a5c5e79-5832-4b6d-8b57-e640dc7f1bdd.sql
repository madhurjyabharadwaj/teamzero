REVOKE UPDATE ON public.candidates FROM authenticated;
GRANT UPDATE (user_id) ON public.candidates TO authenticated;

DROP POLICY IF EXISTS "Users can update their own candidate profile" ON public.candidates;
CREATE POLICY "Users can claim an unclaimed candidate profile"
ON public.candidates
FOR UPDATE
TO authenticated
USING (user_id IS NULL OR user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.claim_candidate_profile(_candidate_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _claimed uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF EXISTS (SELECT 1 FROM public.candidates WHERE user_id = _uid AND id <> _candidate_id) THEN
    RAISE EXCEPTION 'You already have a candidate profile';
  END IF;

  UPDATE public.candidates
     SET user_id = _uid
   WHERE id = _candidate_id
     AND (user_id IS NULL OR user_id = _uid)
  RETURNING id INTO _claimed;

  IF _claimed IS NULL THEN
    RAISE EXCEPTION 'Profile is not available to claim';
  END IF;

  RETURN _claimed;
END;
$$;