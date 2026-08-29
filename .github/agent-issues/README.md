# Agent issues

One file per backlog issue, written to be created as GitHub issues by
`../seed-issues.sh`. GitHub Issues is the queue the agent picks from; these
files are the reviewable source the issues were written from.

**Format.** Line 1 is the issue title. Line 2 carries the label. Everything
after is the body.

```
# The issue title
<!-- label: agent:ready -->

**Context.** ...
```

**Labels.**

- `agent:ready` — context, a named file to start in, and acceptance criteria
  an agent can check for itself. Safe to pick up unattended.
- `needs-decision` — real work, but it turns on a judgement only a person can
  make. Never picked up by the queue.

The distinction is the point. An issue that can't state what "done" looks like
isn't ready, however obvious the work seems.
