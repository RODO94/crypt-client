# Add a catch-all 404 route
<!-- label: agent:ready -->

**Context.** `App.tsx` declares 15 routes and no `path="*"` fallback, so an unknown URL renders the layout with an empty body and no explanation.

**Task.** Add a `NotFound` page in keeping with the existing look, and a catch-all route as the last entry in the `Routes` block. Give it a link back to the homepage.

**Done when.**
- An unknown path renders the NotFound page inside the normal layout.
- `pnpm typecheck && pnpm lint && pnpm test` all pass.

**Start in.** `src/App.tsx` and `src/shared/`.

**Out of scope.** Redesigning the layout, or handling API 404s — this is routing only.
