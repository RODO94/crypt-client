# Tests for the rank-progression data shaping
<!-- label: agent:ready -->

**Context.** The Nivo rank graphs are fed by reshaping code in the ranking feature. That reshaping is untested and is the thing most likely to break silently when a server response changes, because the API contract between the two repos is hand-maintained.

**Task.** Identify the pure shaping functions behind the 40K and Fantasy rank charts, extract any that aren't already standalone, and cover them: empty history, a single entry, and a normal multi-entry series.

**Done when.**
- All three cases are covered by passing tests.
- `pnpm typecheck && pnpm lint && pnpm test` all pass.
- No change to what the charts render.

**Start in.** `src/features/ranking/`.

**Out of scope.** Changing the chart components or the Nivo configuration.
