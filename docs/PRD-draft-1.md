---
title: "TeamZero PRD Draft 1"
subtitle: "Pilot-style MVP for ESSEC founder-team matching, built with mock data and simulated workflows for rapid validation"
author: "Prepared for Madhurjya Bharadwaj"
date: "April 27, 2026"
---

# TeamZero PRD Draft 1

## Pilot-style MVP for ESSEC founder-team matching, built with mock data and simulated workflows for rapid validation

---

## 1. Product Summary

**TeamZero** is a web platform that helps ESSEC students and recent alumni find serious first teammates for early-stage startup or project ideas.

The MVP focuses on **phase-zero founders**: ESSEC students or alumni who have a startup idea, have identified a missing capability, and need to find 1-3 relevant people to speak with before the idea loses momentum.

The product is not a generic networking platform, student directory, or LinkedIn clone. It is a structured, trust-based matching experience designed to help founders move from:

> "I have an idea but no team"

To:

> "I have 3-5 relevant people worth speaking to"

To:

> "I have scheduled my first serious teammate conversation."

For the first build, TeamZero will be a **pilot-style MVP optimized for rapid Lovable development**, using mock authentication, seeded candidate data, simulated invites, and a lightweight admin dashboard.

---

## 2. Problem Statement

Many ESSEC students and recent alumni have startup, course, incubator, or side-project ideas, but they struggle to find the right first teammate.

The problem is not simply "finding people." The real problem is finding people who are:

- Complementary in skills
- Serious enough to engage
- Available at the right level
- Interested in the problem space
- Comfortable with early-stage ambiguity
- Potentially open to a co-founder, core teammate, advisor, or MVP contributor role

Current workarounds are weak:

| Current Workaround | Why It Fails |
|---|---|
| Asking friends/classmates | Limited to existing circle; often poor skill complementarity |
| WhatsApp group posts | Unstructured, vague, low-signal responses |
| LinkedIn outreach | Cold, slow, not designed for co-founder/team discovery |
| ESSEC events/clubs | Useful but chance-based and episodic |
| Incubator/program manager intros | High-quality but manual and hard to scale |
| Hackathons | Often short-term and event-based |
| Freelancers/no-code/AI tools | Help execution, but not ownership, judgment, accountability, or credibility |
| Building alone | Leads to loss of momentum, blind spots, weak credibility, and limited execution |

---

## 3. Target Users

### 3.1 Primary User: ESSEC Phase-Zero Founder

**Profile:**  
An ESSEC student or recent alumni with a serious early-stage startup idea who needs one or more complementary teammates.

**Typical situations:**

- Preparing for ESSEC Ventures, an incubator, accelerator, grant, or startup competition
- Trying to build an MVP but lacking technical, design, data, or GTM capability
- Has validated a problem but cannot move alone from concept to execution
- Needs a co-founder or core teammate, not just a casual contributor

**Core need:**

> "I need someone serious, complementary, and available enough to help make this idea real."

---

### 3.2 Secondary User: Candidate / Potential Teammate

**Profile:**  
An ESSEC student or alumni who may not have their own startup idea but wants to join a serious early-stage project.

**Possible role fits:**

- AI/data builder
- No-code builder
- UX/UI designer
- Product strategist
- Growth/GTM profile
- Sales/business development profile
- Finance/legal/operations support
- Domain expert
- Alumni advisor

**Core need:**

> "I want to discover serious startup opportunities where my skills and interests are relevant."

---

### 3.3 Admin / Operator

**Profile:**  
TeamZero operator, ESSEC Ventures stakeholder, entrepreneurship program manager, or MVP demo admin.

**Core need:**

> "I need to review projects, monitor match quality, track founder-candidate interactions, and understand ecosystem gaps."

---

## 4. Value Proposition

### For Founders

> **Find your first serious startup teammate inside the ESSEC ecosystem.**

TeamZero helps founders create a structured project brief, receive explainable teammate recommendations, and start serious conversations faster than through friends, WhatsApp, LinkedIn, or random networking.

### For Candidates

> **Get discovered by serious ESSEC founders looking for complementary early teammates.**

Candidates can signal their skills, interests, availability, and collaboration intent without needing to constantly network or search manually.

### For ESSEC / Entrepreneurship Programs

> **Improve founder readiness and team formation across the entrepreneurship ecosystem.**

TeamZero can eventually provide visibility into active founders, missing roles, skill gaps, match outcomes, and project progression.

---

## 5. MVP Objective

The MVP should validate whether TeamZero can create meaningful founder-teammate discovery and action.

The goal is not to build a full production marketplace. The goal is to simulate the real pilot experience and prove the core product loop:

> Founder creates project brief -> receives relevant matches -> shortlists/invites candidates -> candidate expresses interest -> admin tracks outcomes.

---

## 6. MVP Scope

### MVP Type

**Pilot-style classroom-buildable MVP**

Built quickly in Lovable with:

- Mock authentication / role selection
- Seeded candidate database
- Founder project brief creation
- Rules-based explainable matching
- Shortlist and simulated invite flow
- Candidate invite response screen
- Admin dashboard
- Simulated statuses and outcome tracking

---

## 7. User Roles

### 7.1 Founder

Can:

- Enter app as founder
- Create project brief
- View explainable teammate matches
- Shortlist candidates
- Send simulated invites
- Track candidate status
- Mark outcomes such as interested, call scheduled, not a fit

---

### 7.2 Candidate

Can:

- Enter app as candidate
- View received project invites
- See why they were matched
- Review project summary
- Accept or decline interest
- View expected role and commitment

For the MVP, candidate profiles may be preloaded rather than created by real users.

---

### 7.3 Admin

Can:

- View all submitted projects
- View seeded candidate pool
- View generated matches
- Review invite statuses
- Track outcomes
- See basic ecosystem analytics
- Identify role gaps, such as many founders needing technical profiles

---

## 8. Core User Journeys

### 8.1 Founder Journey

#### Step 1: Landing Page

Founder sees the promise:

> **Find your first serious startup teammate inside the ESSEC ecosystem.**

Primary CTA:

> **Post your project**

Secondary CTA:

> **Explore as candidate**

---

#### Step 2: Mock Login / Role Selection

User chooses:

- Continue as Founder
- Continue as Candidate
- Continue as Admin

For MVP, this replaces full authentication.

---

#### Step 3: Create Project Brief

Founder completes a structured form.

Required fields:

- Project title
- One-line pitch
- Problem being solved
- Target users/customers
- Industry/domain
- Current stage
- What has already been done
- Roles needed
- Skills needed
- Expected commitment
- Timeline / urgency
- What founder brings
- Ideal teammate
- Not a good fit if...
- Open to co-founder/core teammate/contributor discussion

---

#### Step 4: View Project Preview

Founder sees how the project card will appear.

Project card includes:

- Project name
- One-line pitch
- Industry
- Stage
- Roles needed
- Commitment expected
- Founder contribution
- Next milestone
- Seriousness signals

---

#### Step 5: Receive Recommended Matches

Founder sees 5-10 candidate cards ranked by match strength.

Each card shows:

- Match score / label
- Role fit
- Top skills
- Availability
- Commitment intent
- Startup interests
- Proof of work
- Working style
- "Strong match because..." explanation

---

#### Step 6: Shortlist and Invite

Founder can:

- Save candidate to shortlist
- Send simulated invite
- View suggested intro message
- Update status

Example invite message:

> Hi, I'm building [project]. I saw your profile because you're interested in [domain] and have experience in [skill]. I'm looking for someone who could help with [role]. Would you be open to a 20-minute intro call this week?

---

#### Step 7: Track Outcome

Founder can mark:

- Invited
- Candidate interested
- Call scheduled
- Trial sprint started
- Joined project
- Not a fit

---

### 8.2 Candidate Journey

#### Step 1: Candidate Enters App

Candidate enters through role selection.

---

#### Step 2: Candidate Views Project Invites

Candidate sees projects they have been matched with.

Each invite shows:

- Project title
- One-line pitch
- Industry
- Stage
- Role requested
- Commitment expected
- Why they were matched
- Founder background summary
- Next milestone

---

#### Step 3: Candidate Responds

Candidate can choose:

- Interested
- Maybe later
- Not a fit

Optional note:

> I'm interested because I've worked on a similar AI prototype and I'm open to exploring a core teammate role.

---

### 8.3 Admin Journey

#### Step 1: Admin Dashboard

Admin sees overview metrics:

- Projects submitted
- Candidate profiles available
- Matches generated
- Invites sent
- Candidates interested
- Calls scheduled
- Trial sprints started
- Joined projects

---

#### Step 2: Review Projects

Admin can inspect:

- Project completeness
- Seriousness signals
- Roles requested
- Timeline
- Founder contribution
- Match readiness

---

#### Step 3: Review Candidate Pool

Admin can inspect:

- Role distribution
- Skills
- Availability
- Commitment levels
- Startup interests
- Proof-of-work signals

---

#### Step 4: Review Matches

Admin can see:

- Project
- Candidate
- Match score
- Match reasons
- Invite status
- Outcome status

---

#### Step 5: Ecosystem Gap View

Admin sees insights such as:

- Most requested roles
- Scarce candidate roles
- Most common industries
- Founder demand vs candidate supply
- Example: "7 projects need AI/data profiles, but only 3 available candidates match."

---

## 9. MVP Features

### 9.1 Must-Have Features

| Feature | Description | Priority |
|---|---|---|
| Landing page | Communicates TeamZero promise and role entry | P0 |
| Mock role selection | Founder / Candidate / Admin entry | P0 |
| Founder project brief form | Structured intake for project and teammate needs | P0 |
| Seeded candidate database | Preloaded realistic ESSEC-style candidate profiles | P0 |
| Rules-based match scoring | Calculates candidate fit based on structured criteria | P0 |
| Explainable match cards | Shows score and reasons for recommendation | P0 |
| Shortlist flow | Founder saves candidates | P0 |
| Simulated invite flow | Founder sends invite / candidate responds | P0 |
| Candidate invite view | Candidate sees matched project and accepts/declines | P1 |
| Admin dashboard | Tracks projects, candidates, matches, statuses, KPIs | P0 |

---

### 9.2 Explicitly Postponed Features

| Feature | Reason to Postpone |
|---|---|
| Full in-app chat | Not needed to validate matching; simulated invites are enough |
| Payments/subscriptions | Too early; adoption and liquidity matter first |
| Advanced AI matching | Rules-based + explainable matching is sufficient for MVP |
| Public feed/open directory | Risks becoming generic networking platform |
| Endorsements/reputation | Requires usage history and network maturity |
| Legal/equity templates | Sensitive and not core to MVP validation |
| Real ESSEC authentication | Important later, but mock login is enough for classroom MVP |
| Real email notifications | Can be simulated |
| LinkedIn integration | Use placeholder links |
| Mobile app | Web MVP is enough |

---

## 10. Matching Logic

### 10.1 Matching Philosophy

TeamZero should not match people based on general similarity. It should match based on complementarity, seriousness, capability, interest, and collaboration fit.

Core principle:

> **The best match is not the most similar person. It is the most complementary and serious person.**

---

### 10.2 Match Score Weighting

| Criterion | Weight | Description |
|---|---:|---|
| Role fit | 30% | Does the candidate fill the founder's missing role? |
| Commitment / intent fit | 25% | Are both sides aligned on seriousness, availability, and role type? |
| Skill + proof-of-work fit | 20% | Does the candidate have relevant skills and evidence of execution? |
| Industry / problem interest fit | 15% | Does the candidate care about the domain/problem space? |
| Working style fit | 10% | Are collaboration preferences compatible? |

Formula:

> **Match Score = 30% role fit + 25% commitment fit + 20% skill/proof fit + 15% industry interest fit + 10% working style fit**

---

### 10.3 Match Labels

| Score | Label |
|---:|---|
| 85-100% | Strong match |
| 70-84% | Good match |
| 55-69% | Exploratory match |
| Below 55% | Do not recommend by default |

---

### 10.4 Hard Filters

A candidate should not be strongly recommended if:

- Candidate is not open to the type of role the founder needs
- Candidate availability is far below founder expectation
- Founder wants co-founder but candidate only wants short-term task contribution
- Candidate has no relevant or adjacent skill
- Candidate profile lacks any trust signal
- Candidate intent is unclear

---

### 10.5 Example Match Card

> **91% match - Strong match**  
> Strong match because this candidate fills your AI/Data builder need, has proof of work in LLM prototyping, is available 5-10 hours/week, is open to a core teammate or co-founder discussion, and is interested in B2B SaaS.

---

## 11. Data Model for MVP

### 11.1 Users

| Field | Type |
|---|---|
| user_id | string |
| name | string |
| email | string |
| role | founder / candidate / admin |
| ESSEC status | student / alumni |
| program_year | string |
| created_at | date |

For MVP, this can be mocked.

---

### 11.2 Candidate Profiles

| Field | Type |
|---|---|
| candidate_id | string |
| name | string |
| ESSEC status | string |
| program_year | string |
| role_fit | array |
| top_skills | array |
| startup_interests | array |
| proof_of_work | string |
| linkedin_or_portfolio | string |
| availability | string |
| commitment_level | string |
| open_to | co-founder / core teammate / contributor / advisor |
| working_style_tags | array |
| motivation_statement | string |
| visibility_status | mock / active |

---

### 11.3 Projects

| Field | Type |
|---|---|
| project_id | string |
| founder_id | string |
| title | string |
| one_line_pitch | string |
| problem | text |
| target_users | string |
| industry | string |
| stage | string |
| progress_so_far | text |
| roles_needed | array |
| skills_needed | array |
| expected_commitment | string |
| timeline | string |
| founder_brings | text |
| ideal_teammate | text |
| not_good_fit_if | text |
| collaboration_type | co-founder / core teammate / contributor / advisor |
| privacy_level | public summary / private details |
| created_at | date |

---

### 11.4 Matches

| Field | Type |
|---|---|
| match_id | string |
| project_id | string |
| candidate_id | string |
| match_score | number |
| match_label | strong / good / exploratory |
| role_fit_score | number |
| commitment_score | number |
| skill_score | number |
| industry_score | number |
| working_style_score | number |
| match_reasons | array |
| admin_approved | boolean |
| status | recommended / shortlisted / invited / interested / declined / call scheduled / trial sprint / joined / rejected |

---

### 11.5 Invites

| Field | Type |
|---|---|
| invite_id | string |
| project_id | string |
| founder_id | string |
| candidate_id | string |
| message | text |
| status | sent / interested / maybe later / declined |
| candidate_note | text |
| created_at | date |

---

## 12. UX / Screen Requirements

### Screen 1: Landing Page

Must include:

- TeamZero logo/name
- Core promise
- Short explanation
- Founder CTA
- Candidate CTA
- Example match card preview

---

### Screen 2: Role Selection

Options:

- Continue as Founder
- Continue as Candidate
- Continue as Admin

---

### Screen 3: Founder Project Brief Form

Guided multi-step or single-page form.

Should feel like a startup brief, not an application.

---

### Screen 4: Project Preview

Displays generated project card.

Founder can confirm and proceed to matches.

---

### Screen 5: Match Results

Displays ranked candidate cards.

Each card includes:

- Match score
- Match label
- Role fit
- Skills
- Availability
- Commitment
- Proof of work
- Working style
- Match reasons
- Buttons: Shortlist / Invite

---

### Screen 6: Founder Shortlist

Shows selected candidates and invite statuses.

---

### Screen 7: Candidate Invite View

Candidate sees:

- Project summary
- Requested role
- Expected commitment
- Why they were matched
- Founder summary
- Buttons: Interested / Maybe later / Not a fit

---

### Screen 8: Admin Dashboard

Sections:

- Overview KPIs
- Projects table
- Candidate pool table
- Matches table
- Invite/outcome statuses
- Ecosystem gaps

---

## 13. Privacy and Trust Model

For the MVP, privacy is simulated but should be represented clearly.

### Public Visitor

Can see:

- Landing page
- Example fake cards
- Product explanation

Cannot see:

- Real project details
- Candidate profiles
- Contact details

---

### Founder

Can see:

- Recommended candidate profiles
- Full match explanations
- Candidate proof-of-work links
- Candidate availability range
- Candidate intent

---

### Candidate

Can see:

- Project invites
- Project public summary
- Founder background summary
- Why they were matched
- Role and commitment expected

---

### Admin

Can see:

- All projects
- All candidates
- All matches
- All invite statuses
- Outcome metrics

---

### Future Privacy Extension

A real pilot should include:

- ESSEC email verification
- Role-based access control
- Two-layer project brief: public summary + private detailed brief
- Candidate visibility controls
- Contact sharing only after mutual interest
- Admin permissions by cohort/program

---

## 14. KPIs

### North Star Metric

> **Number of serious founder-teammate conversations created through TeamZero.**

---

### MVP KPI Funnel

| Stage | KPI | MVP Target |
|---|---|---|
| Founder intake | Founder brief completion rate | 60-70% |
| Matching quality | Founders who find at least 3 matches relevant | 70% |
| Founder action | Founders who send at least 1 invite | 50% |
| Candidate response | Invite acceptance / positive response rate | 30-50% |
| Core outcome | Founders who schedule at least 1 serious call | 30-40% |

---

### Secondary KPIs

- Candidate profile completion rate
- Number of projects posted
- Number of candidates in pool
- Candidate role distribution
- Most requested roles
- Time from project posting to first invite
- Time from invite to candidate response
- Trial sprints started
- Candidates joining projects
- Program manager time saved
- Percentage of solo founders becoming teams

---

## 15. Validation Plan

### Concierge MVP Before Full Product

Before or alongside the Lovable MVP, TeamZero can be validated through:

- 10 serious ESSEC founders
- 50 curated candidate profiles
- Typeform / Airtable intake
- Manual matching
- 3-5 recommendations per founder
- Warm intro support
- Post-match feedback

---

### Key Assumptions to Validate

| Assumption | Validation Method |
|---|---|
| Serious founders are actively looking for teammates | Interview 10-15 founders |
| High-quality candidates are willing to be discoverable | Recruit 50 candidate profiles |
| ESSEC has enough skill diversity | Map candidate role distribution |
| Users trust the platform enough to share useful information | Test privacy and profile visibility model |
| Curated matches lead to real conversations | Track invites, acceptances, and calls |

---

## 16. Risks and Mitigations

| Risk | Description | Mitigation |
|---|---|---|
| Weak candidate supply | Too few technical/data/design profiles | Curated supply-first beta cohort |
| Low founder demand | Not enough serious founders looking for teammates | Start with ESSEC Ventures applicants, startup clubs, competitions |
| Poor match quality | Matches feel generic or irrelevant | Use hard filters + explainable scoring + admin review |
| Trust concerns | Founders fear idea theft; candidates fear exposure | Closed ESSEC environment + layered visibility |
| Overbuilding | Product becomes too complex too early | Focus only on brief -> match -> invite -> conversation |
| Becoming generic directory | Users browse without action | Avoid public feed; optimize for serious conversations |
| Self-reported data quality | Candidates overstate skills/availability | Require proof-of-work and admin review |
| Too much manual work | Admin curation may not scale | Accept manual layer in MVP; automate later after validation |

---

## 17. Technical Architecture

### 17.1 MVP Architecture for Lovable Build

For the classroom-buildable pilot MVP:

**Frontend / App Layer**

- Built in Lovable
- Browser-based responsive web app
- Role selection instead of full authentication
- Mock data stored in app state or lightweight backend
- Simulated candidate database
- Simulated invite statuses

**Core Modules**

1. Landing page
2. Mock login / role selector
3. Founder project brief form
4. Candidate database
5. Matching engine
6. Match results page
7. Shortlist/invite flow
8. Candidate invite response page
9. Admin dashboard

---

### 17.2 Matching Engine Logic

Input:

- Project roles needed
- Project skills needed
- Industry/domain
- Expected commitment
- Collaboration type
- Working style preferences

Candidate data:

- Role fit
- Skills
- Interests
- Availability
- Commitment level
- Open-to type
- Working style tags
- Proof of work

Output:

- Match score
- Match label
- Match reasons
- Candidate ranking

---

### 17.3 Real Pilot Extension Architecture

For a real ESSEC pilot, migrate to:

**Frontend**

- React / Next.js or Lovable-generated React app

**Backend**

- Supabase

**Supabase Capabilities**

- Authentication
- Database
- Row-level security
- Role-based access
- Storage
- Real-time status updates if needed

**Database Tables**

- users
- candidate_profiles
- founder_profiles
- projects
- matches
- invites
- admin_notes
- status_history

**Notifications**

- Email notifications through Supabase Edge Functions, Resend, SendGrid, or similar

**Security**

- ESSEC email verification
- LinkedIn verification optional
- Role-based access control
- Candidate visibility controls
- Project privacy layers

---

## 18. Business Model Direction

TeamZero should be free for founders and candidates during the MVP and early pilot stage.

The likely long-term payer is not the individual student, but the ecosystem owner.

### Primary Future Payer

**ESSEC Ventures / entrepreneurship programs**

They benefit because TeamZero can improve:

- Founder readiness
- Team formation
- Incubator application quality
- Student entrepreneurial outcomes
- Ecosystem visibility
- Manual matchmaking efficiency

---

### Secondary Future Payers

- Entrepreneurship clubs
- Startup competitions
- Incubator cohorts
- Hackathons
- University entrepreneurship centers
- Alumni entrepreneurship communities

Possible model:

> Pay per cohort/event for branded intake, matching dashboard, curated recommendations, and outcome tracking.

---

## 19. Product Positioning

### One-Line Positioning

> **TeamZero helps ESSEC phase-zero founders find serious, complementary first teammates faster through structured, explainable matching.**

### Longer Positioning

> TeamZero is a trusted founder-team matching layer for the ESSEC entrepreneurship ecosystem. It helps early founders create clear project briefs, discover relevant teammate candidates, and start serious conversations based on role fit, skills, commitment, interests, and working style.

### What TeamZero Is Not

- Not a LinkedIn clone
- Not a public student directory
- Not a job board
- Not a social feed
- Not a freelancer marketplace
- Not a legal co-founder agreement tool
- Not a general networking app

---

## 20. Recommended Lovable Build Prompt

You can use this as the foundation prompt for Lovable:

> Build a pilot-style web MVP called TeamZero. TeamZero helps ESSEC students and alumni find serious first teammates for early-stage startup projects. The app should have three user roles: Founder, Candidate, and Admin. Use mock authentication with a role selection screen.
>
> The founder journey should allow a founder to create a structured project brief with fields for project title, one-line pitch, problem, target users, industry, stage, progress so far, roles needed, skills needed, expected commitment, timeline, what the founder brings, ideal teammate, not a good fit if, and collaboration type.
>
> After submitting the project, show ranked candidate match cards from a seeded mock candidate database. Each candidate card should show match score, match label, role fit, skills, availability, commitment intent, startup interests, proof of work, working style, and a "Strong match because..." explanation.
>
> Use rules-based matching with these weights: role fit 30%, commitment/intent fit 25%, skill/proof-of-work fit 20%, industry interest fit 15%, working style fit 10%.
>
> Allow the founder to shortlist candidates and send simulated invites.
>
> The candidate view should show project invites, why the candidate was matched, the project summary, expected role, expected commitment, and buttons to respond: Interested, Maybe Later, or Not a Fit.
>
> The admin dashboard should show submitted projects, candidate pool, match results, invite statuses, calls scheduled, trial sprints started, and ecosystem gaps such as most requested roles versus available candidates.
>
> The design should feel clean, modern, trustworthy, and startup-oriented. Avoid making it look like a generic social network. Optimize the experience around helping a founder move from project brief to serious teammate conversation.

---

## 21. Next Steps

### Step 1: Build Lovable MVP

Create:

- Landing page
- Role selection
- Founder brief form
- Seeded candidate data
- Match results page
- Shortlist/invite flow
- Candidate invite response page
- Admin dashboard

---

### Step 2: Prepare Seed Data

Create 12-20 realistic candidate profiles across:

- AI/data
- No-code
- UX/UI
- Product
- GTM/growth
- Sales
- Finance/legal/ops
- Domain expertise
- Alumni advisor

---

### Step 3: Create 2-3 Sample Founder Projects

Use realistic examples:

1. AI SaaS for small retailers
2. ClimateTech / food waste project
3. EdTech or student-support platform

---

### Step 4: Test the Core Demo Flow

Demo script:

1. Founder enters app
2. Founder creates project
3. App recommends candidates
4. Founder shortlists and invites
5. Candidate accepts interest
6. Admin sees outcome tracking

---

### Step 5: Run Concierge Validation

After demo build:

- Recruit 10 founders
- Recruit 50 candidates
- Manually match
- Track serious conversations
- Collect feedback
- Decide whether to build real Supabase pilot

---

## 22. Final MVP Definition

> **TeamZero MVP is a pilot-style web application that simulates a real ESSEC founder-team matching platform. It allows a founder to create a structured project brief, receive explainable teammate recommendations from seeded candidate data, shortlist and invite candidates, simulate candidate responses, and track match outcomes through an admin dashboard. The MVP is optimized for rapid Lovable development while preserving the logic of a real future ESSEC pilot.**
