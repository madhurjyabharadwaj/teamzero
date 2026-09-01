import type { Candidate, Match, MatchLabel, Project } from "@/lib/types";

const norm = (s: string) => s.trim().toLowerCase();

function overlap(a: string[], b: string[]): { count: number; matched: string[] } {
  const setB = new Set(b.map(norm));
  const matched = a.filter((x) => setB.has(norm(x)));
  return { count: matched.length, matched };
}

function fraction(a: string[], b: string[]): number {
  if (a.length === 0) return 0;
  return overlap(a, b).count / a.length;
}

function commitmentScore(project: Project, candidate: Candidate): number {
  // Hard-ish rule: if founder wants co-founder and candidate is "Side project"/"Advisor", penalize.
  const want = norm(project.expected_commitment);
  const have = norm(candidate.commitment_level);
  if (want === have) return 1;
  if (want === "co-founder" && have === "core teammate") return 0.7;
  if (want === "core teammate" && have === "co-founder") return 0.85;
  if (want === "co-founder" && (have === "side project" || have === "advisor")) return 0.1;
  if (want === "core teammate" && have === "advisor") return 0.3;
  return 0.5;
}

function hoursScore(project: Project, candidate: Candidate): number {
  if (project.expected_hours <= 0) return 0.7;
  const ratio = candidate.availability_hours / project.expected_hours;
  if (ratio >= 1) return 1;
  if (ratio >= 0.7) return 0.85;
  if (ratio >= 0.5) return 0.6;
  if (ratio >= 0.3) return 0.35;
  return 0.1;
}

function labelFromScore(score: number): MatchLabel {
  if (score >= 85) return "Strong Match";
  if (score >= 70) return "Good Match";
  if (score >= 55) return "Exploratory Match";
  return "Hidden";
}

function buildReasons(
  project: Project,
  candidate: Candidate,
  parts: { roleMatched: string[]; skillMatched: string[]; industryMatched: string[]; styleMatched: string[] },
  hoursPct: number,
): string[] {
  const reasons: string[] = [];

  if (parts.roleMatched.length > 0) {
    reasons.push(`Fits the role you need: ${parts.roleMatched.slice(0, 2).join(", ")}`);
  }
  if (parts.skillMatched.length > 0) {
    reasons.push(
      `Has ${parts.skillMatched.length} of the skills you listed (${parts.skillMatched.slice(0, 3).join(", ")})`,
    );
  }
  if (parts.industryMatched.length > 0) {
    reasons.push(`Cares about ${parts.industryMatched[0]}`);
  }
  if (hoursPct >= 0.85) {
    reasons.push(`Available ${candidate.availability_hours}h/week — covers your ask of ${project.expected_hours}h`);
  }
  if (norm(candidate.commitment_level) === norm(project.expected_commitment)) {
    reasons.push(`Looking for a ${candidate.commitment_level.toLowerCase()} role — matches your intent`);
  }
  if (candidate.proof_of_work.length >= 2) {
    reasons.push(`Proof of work: ${candidate.proof_of_work[0]}`);
  }
  if (parts.styleMatched.length > 0) {
    reasons.push(`Working style overlaps: ${parts.styleMatched.slice(0, 2).join(", ")}`);
  }

  // ensure at least 2 reasons
  if (reasons.length < 2) {
    if (candidate.professional_background) {
      reasons.push(`${candidate.professional_background}${candidate.experience_level ? ` · ${candidate.experience_level}` : ""}`);
    }
  }
  return reasons.slice(0, 4);
}

export function scoreCandidate(project: Project, candidate: Candidate): Match {
  const role = overlap(project.roles_needed, candidate.role_fits);
  const skill = overlap(project.skills_needed, candidate.skills);
  const industry = overlap([project.industry], candidate.interests);
  const style = overlap(project.working_style, candidate.working_style);

  const roleFit = project.roles_needed.length === 0 ? 0 : role.count / project.roles_needed.length;
  const skillFit = project.skills_needed.length === 0 ? 0.5 : skill.count / project.skills_needed.length;
  const industryFit = industry.count > 0 ? 1 : 0;
  const styleFit = project.working_style.length === 0 ? 0.5 : style.count / project.working_style.length;

  const commitFit = commitmentScore(project, candidate);
  const hoursFit = hoursScore(project, candidate);
  const commitmentCombined = (commitFit + hoursFit) / 2;

  const breakdown = {
    role: roleFit * 30,
    commitment: commitmentCombined * 25,
    skill: skillFit * 20,
    industry: industryFit * 15,
    style: styleFit * 10,
  };

  let total =
    breakdown.role +
    breakdown.commitment +
    breakdown.skill +
    breakdown.industry +
    breakdown.style;

  // Hard filters: zero role overlap → cap as Hidden
  if (project.roles_needed.length > 0 && role.count === 0) {
    total = Math.min(total, 40);
  }

  // Strong-mismatch downgrade for co-founder vs short-task intent
  if (
    norm(project.expected_commitment) === "co-founder" &&
    (norm(candidate.commitment_level) === "side project" || norm(candidate.commitment_level) === "advisor")
  ) {
    total = Math.min(total, 50);
  }

  const score = Math.round(total);
  const label = labelFromScore(score);
  const reasons = buildReasons(
    project,
    candidate,
    {
      roleMatched: role.matched,
      skillMatched: skill.matched,
      industryMatched: industry.matched,
      styleMatched: style.matched,
    },
    hoursFit,
  );

  return { candidate, score, label, reasons, breakdown };
}

export function rankCandidates(project: Project, candidates: Candidate[]): Match[] {
  return candidates
    .map((c) => scoreCandidate(project, c))
    .sort((a, b) => b.score - a.score);
}

export function visibleMatches(matches: Match[]): Match[] {
  return matches.filter((m) => m.label !== "Hidden");
}