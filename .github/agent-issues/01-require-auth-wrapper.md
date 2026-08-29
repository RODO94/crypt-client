# A single RequireAuth wrapper for protected routes
<!-- label: agent:ready -->

**Context.** There is no route-guard layer. Auth gating is done ad hoc inside components — there are 17 direct `sessionStorage` reads across `src/` — so a new page can silently ship unprotected. `App.tsx` already groups the routes under a `{/* User Routes */}` comment, which is the set that needs guarding: `/user`, `/user/profile`, `/battles/create`, `/armies/add`.

**Task.** Add a `RequireAuth` component that redirects to `/login` when there is no valid session, and wrap those four routes with it. Remove the now-duplicated ad-hoc checks from the pages it covers.

**Done when.**
- `pnpm typecheck && pnpm lint && pnpm test` all pass.
- Visiting each of the four routes while logged out redirects to `/login`.
- The PR description lists which routes you treated as protected and which ad-hoc checks you removed.

**Start in.** `src/App.tsx`.

**Out of scope.** Role-based gating for admin-only routes, and changing how the token itself is stored or validated.
