#!/usr/bin/env bash
set -euo pipefail

# Creates this repo's agent backlog as GitHub issues.
#
#   ./.github/seed-issues.sh --dry-run    # list what would be created
#   ./.github/seed-issues.sh              # create them
#
# Requires the GitHub CLI, authenticated (gh auth status).
# Run once. Running twice creates duplicates.

cd "$(git rev-parse --show-toplevel)"

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

if [[ "$DRY_RUN" == false ]]; then
  command -v gh >/dev/null || { echo "gh not found. Install the GitHub CLI first." >&2; exit 1; }
  gh auth status >/dev/null 2>&1 || { echo "gh is not authenticated. Run: gh auth login" >&2; exit 1; }

  gh label create "agent:ready" --color 0E8A16 \
    --description "Scoped tightly enough for an agent to pick up unattended" --force
  gh label create "needs-decision" --color D93F0B \
    --description "Blocked on a human decision - not agent-queueable" --force
fi

shopt -s nullglob
for f in .github/agent-issues/*.md; do
  [[ "$(basename "$f")" == "README.md" ]] && continue

  title=$(head -n 1 "$f" | sed 's/^# *//')
  label=$(sed -n 's/.*<!-- *label: *\([^ ]*\) *-->.*/\1/p' "$f" | head -n 1)
  label=${label:-agent:ready}
  body=$(tail -n +3 "$f")

  if [[ "$DRY_RUN" == true ]]; then
    printf '%-18s %s\n' "[$label]" "$title"
    continue
  fi

  echo "Creating [$label] $title"
  printf '%s' "$body" | gh issue create --title "$title" --label "$label" --body-file -
done
