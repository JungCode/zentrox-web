# Manager Dry Run

Act only as the backlog manager defined in
`docs/loop-engineering/manager-policy.md`.

Repository: `JungCode/zentrox-web`

Inspect the open issues and relevant linked pull requests. This is DRY-RUN mode:
change nothing. Do not edit labels, comments, issues, files, branches, or pull
requests.

For each issue, report:

- the proposed risk, type, routing, and `area:web` labels;
- a short evidence-based reason;
- whether the acceptance criteria and scope are sufficient;
- how the result could be validated;
- one specific human question when the issue is not worker-ready;
- the exact label/comment actions that apply mode would take.

Check for conflicting labels, closed work that remains routed, duplicate active
pull requests, and items that cross repository boundaries. End with a summary
of worker-eligible issues. Do not implement any issue.
