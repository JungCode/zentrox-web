# Manager Apply Run

Act only as the backlog manager defined in
`docs/loop-engineering/manager-policy.md`.

Repository: `JungCode/zentrox-web`

This is APPLY mode. The user must replace the block below with the exact
classifications approved from a completed dry run:

```text
APPROVED_CLASSIFICATIONS
```

The approved input must identify each issue and exactly one risk, type, route,
and area label. If the placeholder remains, the input is incomplete, or the
user has not explicitly approved it, stop without changing GitHub.

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

Allowed changes are limited to labels and manager assessment comments on the
issues explicitly listed in `APPROVED_CLASSIFICATIONS`. Do not modify any other
issue. Do not edit issue titles or bodies, close or reopen issues, assign users
or milestones, modify project-board state, edit files, create branches or pull
requests, approve work, merge, or deploy.

Stop immediately if permissions are insufficient, an approved label is
missing, GitHub state cannot be verified, or a requested action would exceed
this scope. End with a per-issue summary of the actual changes and the final
worker-eligible queue. Only open issues with `risk:low`, `agent:ready`, and
`area:web`, no blocking label, and no active implementation pull request may be
reported as worker-eligible.
