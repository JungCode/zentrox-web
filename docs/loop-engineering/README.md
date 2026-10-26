# Agent Loop Runbook

This runbook operates the Zentrox Web manager, worker, and reviewer loop. Each
role runs in a fresh Codex chat. GitHub Issues are the shared state; labels route
work; pull requests carry implementation evidence; a human owns every approval
and merge.

## Automated loop

The repository contains an automated implementation of the same role
boundaries:

- `agent-manager.yml` runs daily at 01:17 UTC or on manual dispatch, assesses
  trusted open issues, and applies validated labels and one assessment comment.
- `agent-worker.yml` runs when a trusted issue receives `agent:ready` (or by
  manual dispatch), rechecks eligibility, makes a bounded change, and opens a
  pull request into `dev`.
- `agent-reviewer.yml` reviews non-draft worker pull requests on every relevant
  update and posts an independent comment.

All three workflows run OpenCode with the repository Actions secret
`DEEPSEEK_API_KEY`. The default model is `deepseek/deepseek-flash`; set the
repository Actions variable `AGENT_MODEL` to select another available DeepSeek
model. OpenCode is pinned to version 1.19.0. Manager/reviewer tools are read-only;
worker tools permit edits and explicitly listed validation commands. These
tool permissions are application controls, not an operating-system sandbox.
They never approve, merge, deploy, or push directly to `dev` or `main`.

Merge this configuration into `dev`, then promote it to the default branch
`main` before enabling the daily schedule. Enable Actions permission to create
pull requests under Settings > Actions > General. Start with a manual manager
dispatch and inspect its result before relying on the daily run. API billing
is charged to DeepSeek. Cross-workflow dispatch explicitly continues the loop
because events created with `GITHUB_TOKEN` do not normally start other workflows.

The manual procedure below remains useful for dry runs, recovery, and policy
changes.

The manager excludes issues that already have an open implementation PR into
`dev` and checks again before dispatch. The worker independently returns a
successful no-op for an existing PR or an issue that is no longer eligible;
its implementation and publish steps are skipped without a model call.
OpenCode output is read from the final completed response step, excluding
earlier tool-step commentary. Invalid JSON or incomplete responses still fail
before GitHub changes. Regression checks run without API credentials:

```sh
node --test .github/codex/loop-results.test.mjs
```

## Prerequisites

- GitHub CLI is authenticated as an account with the required repository access.
- `dev` and `main` require pull requests and human approval.
- The working tree used to start a run is clean.
- All required risk, type, routing, and area labels exist.
- Issues are created with the repository bug or feature form.

## Lifecycle

| State          | Required state and action                                         | Owner                 |
| -------------- | ----------------------------------------------------------------- | --------------------- |
| New issue      | Structured issue body; no routing decision yet                    | Human                 |
| Assessed       | Dry-run report proposes risk, type, route, and area               | Manager, read-only    |
| Approved route | Human approves the proposed classifications                       | Human                 |
| Routed         | Labels and assessment comment match the approved report           | Manager, apply mode   |
| Eligible       | `risk:low`, `agent:ready`, `area:web`, no blocker or active PR    | Worker gate           |
| Implemented    | One isolated branch, validated diff, PR into `dev`, issue comment | Worker                |
| Reviewed       | Independent findings and verdict                                  | Reviewer, read-only   |
| Approved       | Required GitHub approval exists                                   | Human collaborator    |
| Integrated     | PR is merged into `dev`                                           | Human                 |
| Released       | Change reaches default branch `main`; issue may be closed         | Human/release process |

An issue can retain `agent:ready` while its PR is open. The active-PR eligibility
check prevents another worker from picking it up. Because worker PRs target
`dev` while `main` is the default branch, use `Relates to #N` rather than
`Closes #N`. Close the issue when the change reaches `main`, or according to the
human release policy.

## 1. Manager dry run

Start a fresh Codex chat and enter:

```text
Read AGENTS.md, docs/loop-engineering/manager-policy.md, and
.github/codex/prompts/manager-dry-run.md. Execute the manager dry run.
Change nothing locally or on GitHub.
```

Review every classification, reason, validation method, and human question.
Reject the report if vague, high-risk, cross-repository, or unverifiable work is
routed to `agent:ready`.

## 2. Manager apply

After a human approves the dry-run table, start a new Codex chat. Provide the
approved issue numbers and their exact risk, type, route, and area labels in
place of `APPROVED_CLASSIFICATIONS`, then enter:

```text
Read AGENTS.md, docs/loop-engineering/manager-policy.md, and
.github/codex/prompts/manager-apply.md. Execute apply mode using only the
classifications supplied below.

APPROVED_CLASSIFICATIONS:
<paste the approved table>
```

Verify the resulting labels and assessment comments on GitHub. Apply mode must
skip any issue whose content materially changed after the dry run.

## 3. Worker

Choose one eligible issue. Start a fresh Codex chat and enter:

```text
Read AGENTS.md, docs/loop-engineering/worker-policy.md, and
.github/codex/prompts/worker.md. Set ISSUE_NUMBER=<number> and execute the
worker run from the latest origin/dev in an isolated branch or worktree.
Stop after opening the pull request and commenting its link on the issue.
Do not perform the reviewer role.
```

If a required repository-wide check fails because of unrelated baseline debt,
the worker records the exact failure and asks for direction. It must not fix
unrelated files or claim the check passed.

## 4. Independent review

Start another fresh Codex chat and enter:

```text
Read AGENTS.md, docs/loop-engineering/reviewer-policy.md, and
.github/codex/prompts/reviewer.md. Set ISSUE_NUMBER=<number> and
PR_NUMBER_OR_BRANCH=<pull request>. Perform the independent read-only review.
Do not edit, push, approve, merge, or deploy.
```

If the reviewer finds defects, explicitly invoke a follow-up worker run on that
same pull request. The worker addresses only valid findings and reruns affected
checks. Repeat independent review when the fixes materially change the diff.

## 5. Human gate

A collaborator inspects the issue, diff, validation evidence, and independent
review. The collaborator requests changes or approves. Only a human merges into
`dev`. Deployment and promotion from `dev` to `main` remain outside the agent
loop.

## Stop and escalate

Stop without making further changes when permissions are insufficient, an
issue changes after approval, required labels conflict, the work crosses a
forbidden boundary, validation cannot establish the outcome, a required check
fails for an unexplained reason, or a human decision is requested. Record the
evidence and the single decision needed to continue.

## Recovery

- Wrong classification: correct or rerun the manager dry run; never let a
  worker override routing.
- Duplicate worker: stop the newer run when an active implementation PR exists.
- Bad implementation: close the PR; the protected branches remain unchanged.
- Unrelated discovery: record it as a separate structured issue.
- Stale instructions: update the policy and prompts through normal human review
  before the next run.
