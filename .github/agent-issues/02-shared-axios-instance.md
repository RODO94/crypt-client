# Replace the hand-rolled auth headers with one Axios instance
<!-- label: agent:ready -->

**Context.** `Authorization` headers are constructed by hand 23 times across `ArmyRequests.tsx`, `BattleRequests.tsx`, `RankingRequests.tsx` and `UserRequests.tsx`. There is no `axios.create` anywhere. Every new authenticated call is another chance to forget the header or get the base URL wrong.

**Task.** Create a single configured Axios instance — base URL from `VITE_SERVER_URL`, and a request interceptor that attaches the bearer token when one exists. Migrate the four request modules onto it.

**Done when.**
- No request module builds an `Authorization` header by hand.
- `VITE_SERVER_URL` is read in exactly one place.
- `pnpm typecheck && pnpm lint && pnpm test` all pass.

**Start in.** `src/utils/` — add the instance, then migrate one module at a time.

**Out of scope.** Adding response interceptors, retry logic, or global error handling. Header and base URL only — those are separate issues if wanted.
