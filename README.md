# TeamZero

A founder-teammate matching MVP for the ESSEC entrepreneurship ecosystem. Founders write a structured project brief, get ranked and explained candidate recommendations, shortlist and invite people, and track whether a real conversation happened.

**Live demo:** https://teamzero.lovable.app

Built as the product deliverable for Advanced Steps in Entrepreneurship at ESSEC Business School. This is a demo MVP with seeded data and mock authentication, not a production system. The point was to test whether structured, explainable matching changes founder behaviour, so the data model was written to survive a migration to a real pilot rather than to be thrown away.

---

## The problem

ESSEC students with early-stage ideas usually have a gap in the founding team and no good way to close it. They ask friends, post in WhatsApp groups, message people on LinkedIn, or wait for the next event. Each of these fails for a different reason: the friend circle is too small and too similar, group posts carry no signal about seriousness, LinkedIn outreach is cold and slow, and events are episodic.

The pain is more specific than "I cannot find people". It is:

> I cannot quickly find people who are complementary, serious, available, interested in my problem space, and open to the kind of collaboration I need.

TeamZero optimises for one outcome only: creating serious founder-teammate conversations. It is deliberately not a networking app, a student directory, or a job board.

## Who it is for

| Persona | What they want | Success moment |
|---|---|---|
| Phase-zero founder | One to three serious people worth talking to | "I found 3 relevant profiles and booked an intro call" |
| Candidate / potential teammate | Relevant projects where their skills matter, with clear expectations | "I know exactly why I was invited" |
| Admin / programme operator | Visibility into pipeline, match quality, and role gaps | "I can see which projects are blocked by a missing role" |

## How the matching works

The core design decision is that the best match is the most complementary and serious person, not the most similar one. Similarity-based matching would surface other founders with the same skills, which is exactly the wrong answer.

Scoring is rules-based and weighted:

| Criterion | Weight |
|---|---:|
| Role fit (does the candidate fill the missing role) | 30% |
| Commitment and intent fit | 25% |
| Skill and proof-of-work fit | 20% |
| Industry / problem interest fit | 15% |
| Working style fit | 10% |

Scores map to four bands: strong match at 85 and above, good match from 70, exploratory from 55, and nothing below 55 is recommended by default.

Hard filters sit on top of the score. A candidate is not strongly recommended if they are closed to the role type the founder needs, if their availability is far below what the founder expects, if the founder wants a co-founder and the candidate only wants short-term task work, if there is no relevant or adjacent skill, or if there is no trust signal at all.

Every match card carries its reasons, generated from the criteria that actually fired. Not marketing copy. A real card reads:

> **91% match, strong match.** Fills your AI/Data builder need, has proof of work in LLM prototyping, available 5 to 10 hours per week, open to a core teammate or co-founder discussion, interested in B2B SaaS.

The choice of rules over an ML or embedding model is recorded as ADR-001 in the PRD. At demo scale there is no training data, and an unexplainable score would have defeated the purpose of the product.

## The core loop

```
Founder brief  →  ranked matches with reasons  →  shortlist  →  invite
                                                                  ↓
                                          Admin view  ←  candidate response
```

Eight routes cover it: landing, role selection, project brief, project preview, match results, founder shortlist, candidate invites, and a four-page admin section for projects, candidates and matches.

## What is real and what is mocked

Being honest about this matters more than pretending the demo is a product.

Real: the matching engine, the scoring weights and hard filters, the reason generation, the data model, the state transitions across brief, match, invite, response and outcome.

Mocked: authentication is role selection with no password. The candidate pool is 12 to 20 seeded profiles covering AI/data, no-code, UX/UI, product, GTM, sales, ops, domain expert and alumni advisor. Invites are simulated rather than emailed. Persistence is client state, with the schema written so that a Supabase migration is a swap of the persistence layer rather than a rewrite.

Out of scope on purpose: in-app chat, real email infrastructure, equity or legal agreements, payments, public profile pages, and any ML-based matching.

## How success was defined

North star: serious founder-teammate conversations created, where "serious" means both sides agree to a 20 minute or longer discussion about a specific project and role.

The funnel targets set before building:

| Stage | Target |
|---|---:|
| Founder brief completion rate | 60 to 70% |
| Founders rating 3 or more matches as relevant | 70% |
| Founders sending at least one invite | 50% |
| Positive candidate response rate | 30 to 50% |
| Founders scheduling at least one call | 30 to 40% |
| Candidates who understand why they were matched | 80% |
| Median brief to first invite | under 5 minutes |

The MVP fails, by its own definition, if people browse cards without acting, if matches feel generic, or if it reads as a static directory instead of a guided workflow.

## Documentation

The product thinking is the substance here, not the code.

- [`docs/PRD.md`](docs/PRD.md) covers vision, personas, scope and prioritisation, user stories and flows, business rules, edge cases, the data model, UX specifications, risks, roadmap, and four architecture decision records.
- [`docs/technical-architecture.md`](docs/technical-architecture.md) covers the C4 diagrams, folder structure, state management, routing, the Postgres and Supabase schema with RLS examples, deployment, and the scaling path from demo to pilot.
- [`docs/PRD-draft-1.md`](docs/PRD-draft-1.md) is the earlier draft, kept because it holds the matching logic derivation, the privacy and trust model by role, and the business model direction that the rewrite dropped.

## Tech

React, TypeScript and Vite, with Tailwind and shadcn/ui. Scaffolded and iterated in Lovable, which syncs two-way with this repository. Postgres via Supabase is specified for the pilot mode and is not wired into the demo.

Running locally needs Node 18 or newer:

```bash
git clone https://github.com/madhurjyabharadwaj/teamzero.git
cd teamzero
npm install
npm run dev
```

## What I would change

The seeded candidate pool is the weakest part. Twenty profiles is enough to make the scoring visible but not enough to stress the hard filters, and a few of the seeded candidates are close enough to each other that the ranking between them is not meaningful. A real pilot would need the intake form for candidates that Phase 2 defers.

The other open question is whether founders trust a score at all. The reason bullets were added because an early read of the design suggested a bare percentage would feel arbitrary, but that assumption was never tested against founders who had not seen the PRD.

## Licence

MIT. See [LICENSE](LICENSE).
