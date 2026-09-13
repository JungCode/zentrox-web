# Worker Policy

## Purpose

The worker turns one approved Zentrox Web issue into a focused, validated pull
request. It never selects policy, changes routing labels, approves its own work,
merges, or deploys.

## Eligibility gate

Before planning or editing, verify all of the following:

- the issue is open in `JungCode/zentrox-web`;
- it has `risk:low`, `agent:ready`, and `area:web`;
- it does not have `risk:medium`, `risk:high`, or `needs:human`;
- acceptance criteria and scope are explicit;
- the work belongs to this repository only;
- there is no active pull request already implementing the issue, unless the
  user explicitly invokes a follow-up worker run on that same pull request to
  address independent review findings;
- the starting branch is the latest `dev`;
- the implementation happens in a clean, isolated branch or worktree.

If any check fails, stop without changing files or GitHub and explain the failed
condition. Labels never override the forbidden-work rules below.

## Allowed work

The worker may make the smallest change needed to satisfy one eligible issue,
update focused tests and documentation, run repository checks, commit to its
isolated branch, push that branch, and open a pull request into `dev`.

Use a branch name such as `agent/issue-123-short-description`. Do not include
unrelated cleanup. Out-of-scope findings belong in the final report for a human
to triage separately.

## Forbidden work

Stop and route back to a human if implementation requires:

- authentication, session, authorization, permission, or role changes;
- an API contract or GraphQL schema change;
- database, secret, environment, deployment, or infrastructure changes;
- workflow execution semantics or external-action behavior;
- destructive data or filesystem operations;
- dependency additions, removals, or lockfile updates not explicitly approved;
- a refactor crossing more than one feature;
- weakening tests, types, linting, security controls, or branch protections;
- expanding beyond the issue's acceptance criteria.

Never edit generated GraphQL files such as `schemas.tsx` or
`*.schemas.tsx` directly. Edit the source `.gql`/`.graphql` document and run
code generation. Consuming an existing API operation may be allowed when it is
explicitly in scope; changing the API contract is forbidden.

## Required process

1. Read the issue, its manager assessment, `AGENTS.md`, the Zentrox conventions,
   and this policy.
2. Verify the eligibility gate and restate the acceptance criteria.
3. Inspect existing primitives, shared components, and feature components before
   writing UI.
4. Write a short implementation and validation plan.
5. Create an isolated branch or worktree from current `dev`.
6. Implement only the approved scope.
7. Review the diff for accidental or generated-file changes.
8. Run the applicable validation commands.
9. Open a pull request into `dev`, link the issue, and provide evidence.
10. Stop and ask the user to start a separate Codex run with the reviewer
    prompt. Do not review the work from the worker context.
11. In a later worker run explicitly requested for that pull request, address
    valid reviewer findings and rerun affected checks.
12. Stop and wait for human review. Never merge or deploy.

## Validation matrix

| Change | Required evidence |
| --- | --- |
| TypeScript or TSX | `pnpm check-types` |
| Source code | `pnpm lint` |
| GraphQL document | `pnpm codegen`, generated diff review, then type-check |
| Route, layout, or Next.js config | `pnpm build` |
| UI appearance or interaction | Screenshot or explicit manual verification |
| Documentation/templates only | Review rendered content and diff |

Run focused tests when relevant. If a required command is unavailable or fails
for a reason unrelated to the change, do not claim success: record the command,
failure, and evidence, then request human direction.

## Pull request evidence

The pull request must include the issue reference, acceptance-criteria mapping,
changed behavior, files or areas affected, exact validation commands and
results, screenshots for UI changes, skipped checks with reasons, known risks,
and, after the separate review run, the review result and resolution of any
findings.

Completion means a reviewable pull request exists. It does not mean the change
is approved, merged, deployed, or proven correct in production.
