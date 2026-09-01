export type Candidate = {
  id: string;
  user_id?: string | null;
  name: string;
  headline: string;
  professional_background: string;
  experience_level: string | null;
  role_fits: string[];
  skills: string[];
  interests: string[];
  proof_of_work: string[];
  availability_hours: number;
  commitment_level: string;
  open_to: string[];
  working_style: string[];
  motivation: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  owner_id?: string | null;
  founder_name: string;
  title: string;
  pitch: string;
  problem: string;
  target_users: string | null;
  industry: string;
  stage: string;
  progress: string | null;
  roles_needed: string[];
  skills_needed: string[];
  expected_commitment: string;
  expected_hours: number;
  timeline: string | null;
  founder_brings: string | null;
  ideal_teammate: string | null;
  not_fit_if: string | null;
  collaboration_type: string;
  working_style: string[];
  created_at: string;
};

export type InviteStatus =
  | "shortlisted"
  | "invited"
  | "interested"
  | "maybe_later"
  | "not_a_fit"
  | "call_scheduled";

export type Invite = {
  id: string;
  project_id: string;
  candidate_id: string;
  message: string | null;
  status: InviteStatus;
  candidate_note: string | null;
  match_score: number | null;
  match_label: string | null;
  match_reasons: string[] | null;
  created_at: string;
  updated_at: string;
};

export type MatchLabel = "Strong Match" | "Good Match" | "Exploratory Match" | "Hidden";

export type Match = {
  candidate: Candidate;
  score: number;
  label: MatchLabel;
  reasons: string[];
  breakdown: {
    role: number;
    commitment: number;
    skill: number;
    industry: number;
    style: number;
  };
};

export type AppRole = "founder" | "candidate" | "admin";