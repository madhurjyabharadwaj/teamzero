# Fix: Project preview stuck on "Loading…"

## What's happening

After submitting the brief, you land on `/founder/project/<id>` and the page just shows "Loading…" with no project preview and no "Generate matches" button.

## Root cause

The routes in `src/App.tsx` declare the URL parameter as `:projectId`:

```
/founder/project/:projectId
/founder/project/:projectId/matches
/founder/project/:projectId/shortlist
```

But the page components read it as `id`:

```ts
const { id } = useParams(); // id is undefined
const { data: project } = useProject(id); // query disabled → never loads
```

Because `id` is `undefined`, the React Query hook stays disabled, so no fetch ever happens and the UI is permanently stuck on "Loading…".

This affects three pages:
- `src/pages/ProjectPreview.tsx`
- `src/pages/MatchResults.tsx`
- `src/pages/ShortlistInvites.tsx`

## Fix (recommended)

Change the three pages to destructure `projectId` instead of `id`, matching the route definition. Minimal, single-word rename per file. No route changes, no data changes.

```ts
const { projectId } = useParams();
const { data: project } = useProject(projectId);
// ...navigate(`/founder/project/${projectId}/matches`) etc.
```

## Verification

1. Run `tsc --noEmit` — should stay green.
2. Submit a new brief → preview page should now render the project card and the "Generate matches" button.
3. Click "Generate matches" → matches list loads.
4. Shortlist a candidate → shortlist page loads.

## Out of scope

- No DB changes, no RLS changes, no styling changes.
- Not renaming routes (would touch more files for no benefit).
