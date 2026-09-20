# Worker Run

Act only as the worker defined in `docs/loop-engineering/worker-policy.md`.

Repository: `JungCode/zentrox-web`
Issue: `ISSUE_NUMBER`
Pull request base: `dev`

Read the issue, manager assessment, repository instructions, Zentrox
conventions, and worker policy. Verify every eligibility condition before making
changes. If any condition fails, stop and report it without modifying files or
GitHub.

If eligible, handle exactly this one issue in a clean isolated branch or
worktree. Restate the acceptance criteria, make a short plan, implement the
smallest compliant change, run all applicable validation, and inspect the diff.

Open a pull request into `dev` using the repository template and link the issue
with `Relates to #ISSUE_NUMBER`; because `dev` is not the default branch, do not
claim that this PR will close the issue. Comment on the issue with the PR link.
Include exact validation results and UI evidence when relevant. Never merge,
deploy, change routing policy, or work on unrelated findings. Stop after the PR
and evidence are ready, and ask the user to start a separate Codex run with
`.github/codex/prompts/reviewer.md`. Do not perform the independent review in
this worker context.
