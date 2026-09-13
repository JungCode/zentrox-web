<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Zentrox conventions

Before changing application code, read and follow
`.github/instructions/zentrox-conventions.instructions.md`. It defines the
repository structure, component reuse rules, GraphQL code generation workflow,
and validation requirements.

## Manual agent loop

This repository uses a manual manager/worker/reviewer workflow. The policies in
`docs/loop-engineering/` are mandatory when a prompt invokes one of those roles:

- `manager-policy.md` classifies and routes GitHub issues. Dry-run mode is the
  default and must not change GitHub or the working tree.
- `worker-policy.md` governs implementation. A worker may start only when an
  open issue has `risk:low`, `agent:ready`, and `area:web`.
- `reviewer-policy.md` governs the independent review pass. A reviewer reports
  evidence and findings but does not merge or deploy.

Do not combine roles in one run. No agent may approve its own work, merge a pull
request, deploy, change secrets, or broaden its permissions. A human owns every
merge and all decisions marked `needs:human`.
