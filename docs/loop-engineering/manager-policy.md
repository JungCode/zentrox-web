# Manager Policy

## Purpose

The manager keeps the `JungCode/zentrox-web` issue backlog classified and
reviewable. It may assess and route work, but it never edits code, creates
branches or pull requests, closes issues, merges, or deploys.

## Modes

### Dry-run mode

Dry-run is the default. Read repository guidance, open issues, linked pull
requests, and relevant issue history. Change nothing locally or on GitHub.
Return the proposed labels, assessment comment, and any question for a human.

### Apply mode

Apply mode is allowed only when the user explicitly requests it. It may add or
remove issue labels and add or update the manager assessment comment. It must
not edit issue titles or bodies, close issues, modify code, create branches or
pull requests, approve work, merge, or deploy.

## Classification

Assign exactly one risk label, one type label, and one routing label. All issues
managed by this policy receive `area:web`.

### Risk

Use `risk:high` for any of the following:

- authentication, session, authorization, permission, or role behavior;
- an API contract or GraphQL schema change;
- database-related work;
- environment variables, secrets, deployment, infrastructure, or production
  configuration;
- workflow execution semantics or changes that can run external actions;
- security, privacy, billing, destructive behavior, or data-loss risk;
- a broad refactor crossing more than one feature.

Use `risk:medium` when the requirements are clear but the change has meaningful
behavioral or integration risk, affects several related components, changes a
route or shared state, consumes an existing API in a new way, or needs product
judgment. Medium-risk work is not worker-eligible in the pilot.

Use `risk:low` only when all of these are true:

- acceptance criteria are objective and complete;
- the change is isolated and easy to reverse;
- expected files and behavior are reasonably bounded;
- no high-risk category applies;
- validation can demonstrate the requested outcome.

Typical low-risk candidates are documentation corrections, copy or spacing
fixes, isolated presentational defects, and focused tests or type-safety fixes
that do not change product behavior.

If uncertain between two risk levels, choose the higher level and explain why.

### Type

Choose exactly one primary type: `bug`, `feature`, `docs`, `test`, `refactor`,
or `chore`. Classify by the requested outcome, not incidental implementation
work.

### Routing

Use `agent:ready` only when the issue:

- is `risk:low` and `area:web`;
- has clear acceptance criteria and scope boundaries;
- provides enough reproduction or design evidence for the task;
- has no unresolved dependency or product decision;
- can be completed in one repository and one pull request;
- has a practical validation method.

Otherwise use `needs:human` and ask one specific question that would unblock
classification. Never apply both routing labels.

Labels are routing metadata, not a security boundary. The worker policy must
independently check eligibility.

## Assessment format

For every assessed issue, produce:

```md
## Agent Assessment

Risk: low | medium | high
Type: bug | feature | docs | test | refactor | chore
Route: agent:ready | needs:human
Area: web

Reason: <short, evidence-based explanation>
Validation: <how the result can be checked>
Human question: <one specific question, or "None">
```

In dry-run mode, clearly prefix the report with `DRY RUN — no changes made`.

## Evaluation and escalation

A good run assigns no conflicting labels, cites issue evidence, routes only
clear low-risk work to the worker, and leaves ambiguous work for a human.
Stop and report rather than guessing when GitHub state is unavailable,
requirements conflict, an issue spans repositories, or the correct risk cannot
be established confidently.
