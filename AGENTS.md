# AGENTS.md — crypt-client

Web app for **The Crypt**, a Warhammer wargaming group in Anstruther. Members
log armies, schedule and record battles (40K and Fantasy), and view rankings.
Live at https://thecryptanstruther.com/

Talks to `crypt-server` over HTTP. The two repos are deployed separately and
share no code or types.

---

## The data rule — read this first

**Source code may leave this machine. Data about people may not.**

- Never put real member names, emails or records into fixtures, test data,
  commits or PR descriptions. Test data is generated, never sampled.
- Credentials and URLs come from the environment. `.env` is gitignored and must
  stay that way. Use `.env.example` to document a new variable.
- Anything rendering user profiles or emails is sensitive by default.

If a task appears to require real data, stop and ask rather than improvising.

---

## Where work comes from

Issues on this repository labelled `agent:ready` are the queue. They carry a
file to start in and acceptance criteria you can check yourself. Issues
labelled `needs-decision` are never yours to pick up.

The issue text is versioned in `.github/agent-issues/`.

## Commands

```
pnpm install          # install dependencies
pnpm dev              # vite dev server
pnpm typecheck        # tsc --noEmit — fast, run this first
pnpm lint             # eslint .
pnpm test             # vitest, single run — must pass before any PR
pnpm test:watch       # vitest in watch mode (interactive only)
pnpm test:e2e         # playwright
pnpm build            # tsc && vite build
```

Copy `.env.example` to `.env`. `VITE_SERVER_URL` must point at a running
crypt-server and must not have a trailing slash.

**The verification gate is `pnpm typecheck && pnpm lint && pnpm test`.** All
three must pass before the work is done. Do not use `pnpm test:watch` in
automation — it never exits.

## Stack

React 19, TypeScript, Vite. Material-UI v7 as the component library with
styled-components as the style engine, SCSS partials in `src/partials/` for
bespoke styling. Zustand for state, Formik + Yup for forms, Nivo for rank
charts, Axios for HTTP, React Router 7.

## Layout

```
src/
  features/          one folder per domain feature — auth, army, battle,
                     ranking, user. Each has components/, pages/ and an
                     index.ts of public exports.
  shared/            cross-feature UI: ui/, layout/, tables/
  store/             Zustand stores (armies, battles, rankings, user), each
                     persisted to sessionStorage
  utils/             Axios request modules per resource, auth helpers,
                     Interfaces.tsx, MUI theme
  Homepage/          landing page (predates the feature-folder convention)
  App.tsx            the route table
```

## Conventions

- **All HTTP goes through `src/utils/*Requests.tsx`.** Components never call
  Axios directly. One request module per server route group.
- Import across features only through a feature's `index.ts`. Reaching into
  another feature's internals is a review comment.
- Shared types live in `src/utils/Interfaces.tsx` and `src/types`.
- Prefer explicit over implicit, and name things for what they do. Decompose
  for the reader.
- Styling: MUI components and theme first, SCSS partials for what MUI can't do.

## Testing

Vitest, with `vitest-browser-react`. Tests live beside their feature in
`src/features/**/__tests__/`. There are currently four — coverage is thin, and
adding tests alongside a change is always welcome.

## Do not touch without asking

- Token handling and `userRole` in `src/store/user.tsx`.
- The auth flows in `src/features/auth/` (login, signup, reset).
- `.env`, `vite.config.ts` build output settings, or the deploy setup.

## Known traps

- **There is no route-guard layer.** Auth gating is done ad hoc in components
  by checking `useUserStore.currentUser` or the sessionStorage token. Do not
  assume a route is protected — check.
- Stores persist to sessionStorage, so stale shapes survive a reload. Changing
  a store's shape can break a returning user until they clear the tab.
- **The API contract is hand-maintained.** If a server response shape changes,
  grep `src/utils/` and `src/utils/Interfaces.tsx` for consumers. Nothing will
  fail at build time.
- The working branch is `version-2/epic`, not `main`. CI runs on every pull
  request regardless of target.
