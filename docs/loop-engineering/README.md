# Manual Agent Loop Runbook

This runbook operates the Zentrox Web manager, worker, and reviewer loop. Each
role runs in a fresh Codex chat. GitHub Issues are the shared state; labels route
work; pull requests carry implementation evidence; a human owns every approval
and merge.

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
