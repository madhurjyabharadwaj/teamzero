
# TeamZero MVP — Build Plan

A lightweight web app that helps ESSEC founders find their first 1–3 teammates through structured project briefs and explainable, rules-based matching. Three roles: Founder, Candidate, Admin.

## What we'll build

All must-have screens, end-to-end, persisted on Lovable Cloud (Supabase):

1. **Landing** — promise, how it works (3 steps), CTAs into Founder / Candidate / Admin entry.
2. **Role Selection** — mock login: pick Founder, Candidate, or Admin (no real auth in MVP; simulated session).
3. **Founder Brief Form** — multi-section structured intake with validation, examples, and progress.
4. **Project Preview** — read-only card preview before generating matches.
5. **Match Results** — ranked candidate cards with score, label (Strong / Good / Exploratory), and ≥2 specific reasons.
6. **Shortlist & Invites** — shortlist candidates, send simulated invites with a message, track status.
7. **Candidate Invite View** — list of received invites with project details, match explanation, and Interested / Maybe Later / Not a Fit response.
8. **Admin Dashboard** — KPIs, project list, candidate pool, invite statuses, ecosystem gaps (which roles/skills are under-supplied).

## Visual direction

Modern startup minimal:
- Neutral palette (off-white background, near-black ink) with one calm accent (deep indigo/teal — chosen during build).
- Sans-serif (Inter), generous whitespace, soft shadows, rounded-lg cards.
- Status badges, score chips, and reason pills as the main visual language.
- Clear "Demo data" tag visible in admin and on candidate cards so nothing feels misleading.
- Responsive: laptop-first, works down to mobile.

## Architecture

- **Frontend**: React + Vite + Tailwind + shadcn/ui (already in project). React Router for the 8 screens.
- **State**: React Query for server data; lightweight context for current mock role.
- **Matching engine**: pure function `scoreCandidate(project, candidate)` in `src/logic/matchScoring.ts`. Runs client-side. Easy to unit-test and later move server-side.
- **Backend**: Lovable Cloud (Supabase) for persistence of projects, invites, statuses, and the seeded candidate pool. No real auth — a `mock_session` row identifies the active role/user for the demo.

### Folder structure
```text
src/
  data/          seed candidates + sample projects
  logic/         matchScoring.ts, statusRules.ts
  components/    CandidateCard, ProjectCard, MatchReasonList,
                 StatusBadge, ScorePill, BriefFormSection, KpiTile
  pages/         Landing, RoleSelection, FounderBrief,
                 ProjectPreview, MatchResults, ShortlistInvites,
                 CandidateInvites, AdminDashboard
  hooks/         useMockRole, useProjects, useMatches, useInvites
```

### Data model (Lovable Cloud tables)

| Table | Key fields |
|---|---|
| `candidates` | id, name, essec_status, program_year, role_fits[], skills[], interests[], proof_of_work, availability, commitment_level, open_to[], working_style[], motivation |
| `projects` | id, founder_name, title, pitch, problem, target_users, industry, stage, progress, roles_needed[], skills_needed[], expected_commitment, timeline, founder_brings, ideal_teammate, not_fit_if, collaboration_type |
| `invites` | id, project_id, candidate_id, message, status (shortlisted / invited / interested / maybe_later / not_a_fit / call_scheduled), candidate_note, created_at |

RLS will be enabled and permissive for the MVP (mock auth means we cannot scope by real user). A note will document this so it's replaced before any real pilot.

### Matching logic (rules-based, explainable)

Weights: role 30, commitment 25, skill 20, industry 15, working style 10.
Hard filters: hide candidates with no role overlap; downgrade if availability is far below founder need or if intent (e.g. short task vs co-founder) clashes.
Labels: 85+ Strong, 70–84 Good, 55–69 Exploratory, <55 hidden.
Each match returns ≥2 specific reason strings (e.g. "Has shipped 2 React side-projects", "Available 15h/week — matches your ask").

### Seed data

20–25 hand-crafted candidates spanning AI/data, no-code, design/UX, product, GTM, sales, ops, and advisor archetypes — enough variety so demo briefs always surface meaningful matches and the admin "ecosystem gaps" view is honest.
2 sample founder projects pre-loaded so Candidate and Admin views have content immediately.

### Edge cases handled

- No strong matches → show exploratory band + "what's missing" hint.
- Incomplete brief → block submit, highlight required fields.
- Candidate declines → status updates, founder can move on.
- Founder picks too many roles → prompt to prioritize top 1–2.
- Thin candidate pool → admin shows supply gaps explicitly.

## Build order

1. Set up Lovable Cloud + tables + seed candidates + sample projects.
2. Design system tokens (colors, typography) and shared components (cards, badges, pills).
3. Landing + Role Selection + mock-role context.
4. Founder Brief form + Project Preview.
5. Matching engine + Match Results page.
6. Shortlist & simulated invite flow.
7. Candidate Invite view + response actions.
8. Admin Dashboard with KPIs and ecosystem gaps.
9. Polish, responsive pass, demo-data labeling.

## Out of scope (explicitly)

Real auth, email notifications, in-app chat, payments, AI matching, public directory, LinkedIn integration, mobile native app. These are listed for Phase 2.
