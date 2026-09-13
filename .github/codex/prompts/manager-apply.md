# Manager Apply Run

Act only as the backlog manager defined in
`docs/loop-engineering/manager-policy.md`.

Repository: `JungCode/zentrox-web`

This is APPLY mode. The user has approved the classifications below from the
completed dry run:

| Issue | Risk | Type | Route | Area |
| --- | --- | --- | --- | --- |
| #19 | `risk:low` | `docs` | `agent:ready` | `area:web` |
| #20 | `risk:low` | `chore` | `agent:ready` | `area:web` |
| #21 | `risk:medium` | `bug` | `needs:human` | `area:web` |
| #22 | `risk:high` | `bug` | `needs:human` | `area:web` |

Before writing, re-read each issue and confirm that its title, body, labels,
comments, and linked pull requests have not materially changed since the dry
run. If an issue changed, skip that issue and report the difference instead of
guessing or reclassifying it.

For each unchanged issue:

1. Ensure it has exactly the approved risk label, type label, routing label,
   and `area:web`.
2. Remove only conflicting labels from the same risk, type, or routing groups.
   Preserve unrelated labels.
3. Add one assessment comment using the exact format in the manager policy.
   If an equivalent current assessment already exists, update it rather than
   posting a duplicate.
4. Read the issue back and verify its final labels and assessment comment.

Allowed changes are limited to labels and the manager assessment comments on
issues #19 through #22. Do not edit issue titles or bodies, close or reopen
issues, assign users or milestones, modify project-board state, edit files,
create branches or pull requests, approve work, merge, or deploy.

Stop immediately if permissions are insufficient, an approved label is
missing, GitHub state cannot be verified, or a requested action would exceed
this scope. End with a per-issue summary of the actual changes and the final
worker-eligible queue. Only #19 and #20 may be reported as worker-eligible.
