# Fix broken navigation to project preview

## Problem

After submitting the Founder Brief, the app navigates to `/founder/preview/:id`, but the route is registered as `/founder/project/:id`. This lands users on the NotFound page (which is what you're seeing right now at `/founder/preview/32e71994-...`).

Two files use the wrong path:
- `src/pages/FounderBrief.tsx:142` — after creating a project
- `src/pages/MatchResults.tsx:66` — back button to the preview

## Change

Replace `/founder/preview/${id}` with `/founder/project/${id}` in both files. This aligns with the already-registered routes:
- `/founder/project/:projectId` (preview)
- `/founder/project/:projectId/matches`
- `/founder/project/:projectId/shortlist`

## Verify

1. Run `tsc --noEmit` — should be clean.
2. Walk the founder flow: Landing → Role → Founder Brief → submit → lands on Project Preview (not 404) → Matches → Shortlist.
3. From Matches, the back button returns to Project Preview.

No schema, business logic, or design changes — pure routing fix.
