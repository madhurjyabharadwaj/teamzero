# Aesthetic & futuristic redesign

Goal: dark, iridescent, fluid. Looks closer to the AI-startup references but stays true to TeamZero's product (briefs, matching, invites). Token-driven so every page picks up the new look automatically.

## Visual direction

- **Base**: near-black background `#0A0A14` with subtle noise.
- **Iridescent palette**: violet → indigo → cyan → teal gradient used in accents, glows, headings, and ambient orbs.
- **Surfaces**: glassy cards — translucent white at ~4% opacity, hairline border at ~10%, large soft shadow with a colored glow on hover.
- **Typography**: keep Inter for body, add Space Grotesk for headings (modern geometric feel). Big tracking-tight display sizes.
- **Light mode**: still supported, but dark becomes the default.

## Motion language ("flowy")

- Slow drifting gradient orbs in the background of every page.
- Section reveals: subtle fade + 8px upward translate on scroll (IntersectionObserver, no new dependency).
- Card hover: lift + colored glow + 1px gradient border sweep.
- Buttons: gradient fill with shimmer on hover, magnetic-feel scale (1.02).
- Animated gradient on the hero headline (background-clip text).
- Respect `prefers-reduced-motion` — disables orbs + reveals.

## Hero (animated abstract, no image asset)

A layered SVG/CSS composition behind the headline:
- 2–3 large blurred gradient orbs drifting on long loops.
- A faint dotted grid that fades to transparent at the edges.
- A thin animated SVG "flow line" arcing across the hero.
- Headline uses an animated iridescent gradient text fill.

## Scope — every page gets the new skin

Re-skin via tokens + shared primitives, then a per-page polish pass.

1. **Design tokens** (`src/index.css`, `tailwind.config.ts`)
   - New dark default palette, iridescent gradient tokens, glow shadows, glass surface tokens, Space Grotesk font, fade-in/float keyframes.
2. **Shared primitives** (new files)
   - `src/components/AmbientBackground.tsx` — drifting orbs + grid (used on every page).
   - `src/components/GlassCard.tsx` — wraps shadcn Card with glass styling + hover glow.
   - `src/components/GradientText.tsx` — animated iridescent text.
   - `src/components/Reveal.tsx` — IntersectionObserver wrapper for scroll fade-up.
3. **Header** (`AppHeader.tsx`) — translucent glass bar, gradient logo mark, gradient underline on links.
4. **Landing** (`Landing.tsx`) — new hero w/ ambient bg, gradient headline, glassy step cards with numbered gradient ring, CTA shimmer.
5. **Role selection** (`RoleSelection.tsx`) — three glass cards with gradient icon halos, hover lift.
6. **Founder Brief** (`FounderBrief.tsx`) — glass form panel, gradient progress bar if multi-step, refined TagInput chips.
7. **Project Preview / Match Results / Shortlist** — apply GlassCard to ProjectCard + CandidateCard, restyle ScorePill with gradient ring, animate reveal of match list.
8. **Candidate Invites + Admin Dashboard** — reskin tables/KPI tiles with glass surfaces and gradient accents.
9. **NotFound** — match the new vibe.

## What stays the same

- Routing, data, hooks, RLS, auth — untouched.
- Component APIs (CandidateCard / ProjectCard props) — untouched, only internals restyled.
- Copy stays the same unless a heading needs a small tweak to fit the new layout.

## Verification

- `tsc --noEmit` stays green.
- Visual QA each redesigned route in the preview at 947px and at desktop width.
- Confirm reduced-motion disables orbs + reveals.
- Check contrast on glass surfaces for body text (AA).

## Out of scope

- No new dependencies (no framer-motion, no three.js — pure CSS/SVG + IntersectionObserver).
- No copy rewrite, no IA changes, no new pages.
- No image generation (you chose animated abstract).
