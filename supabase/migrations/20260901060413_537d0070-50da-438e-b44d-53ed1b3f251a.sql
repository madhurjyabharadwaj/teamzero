ALTER TABLE public.candidates RENAME COLUMN essec_status TO professional_background;
ALTER TABLE public.candidates RENAME COLUMN program_year TO experience_level;

UPDATE public.candidates
SET
  professional_background = CASE professional_background
    WHEN 'ESSEC BBA' THEN 'Business & Entrepreneurship'
    WHEN 'ESSEC GE' THEN 'Business & Management'
    WHEN 'ESSEC MiM' THEN 'Business & Management'
    ELSE 'Independent Builder'
  END,
  experience_level = CASE
    WHEN experience_level IN ('1st year', '2nd year') THEN 'Early career'
    WHEN experience_level IN ('3rd year', '4th year') THEN 'Emerging professional'
    WHEN experience_level LIKE 'Alumni %' THEN 'Experienced professional'
    ELSE 'Open experience level'
  END;