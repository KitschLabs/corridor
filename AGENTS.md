# Repository Guidelines

These rules apply throughout this repository. They collect project-independent
guidance from sibling repositories; they do not select a stack or deployment provider.

## Scope And Implementation

- Keep every file under 1,000 lines (999 lines maximum). Split files by
  responsibility before they reach the limit.
- Read the affected code and its callers before editing. Follow existing
  structure, naming, formatter, and linter conventions.
- Prefer the smallest complete change. Reuse existing helpers, platform
  features, and installed dependencies before adding packages or abstractions.
- Preserve unrelated local changes. Keep work in other repositories outside
  the requested scope and in separate commits when authorized.
- Update affected callers, tests, documentation, and generated outputs together
  when a contract or behavior changes. Regenerate generated files rather than
  hand-editing them.
- Keep comments short and explain non-obvious behavior rather than restating code.

## Git, Commits, And Pull Requests

- Do not commit or push unless explicitly requested by the user. Deployment
  and release publication also require explicit intent.
- Check `git status --short` before committing; include only task-related files.
- Keep each commit scoped to one purpose. Do not bundle unrelated code,
  documentation, tooling, or generated-artifact changes.
- Use concise English commit titles unless the user requests another language.
  For non-trivial changes, include the reason, scope, and validation in the body.
- Use `codex/` for new agent-created branches unless the user specifies otherwise.
  Confirm the repository's integration branch and PR target instead of assuming
  a sibling repository's `dev`/`main` workflow applies here.
- Keep ordinary development off the production branch. Production releases
  require a reviewed PR, required checks, and explicit deployment intent.
- PR descriptions should state the reason, scope, and validation. Follow the
  user's requested language and use repository-local review instructions when present.

## Safety And Security

- Local inspection, task-scoped edits, and relevant local checks are allowed
  without extra approval.
- Obtain explicit authorization before destructive operations, remote database
  writes, provider or secret configuration changes, or billable provider calls.
- Never expose secrets, `.env` contents, private keys, tokens, credentialed URLs,
  or private customer data in commits, documentation, logs, or examples.
- Keep privileged credentials server-side. Validate untrusted inputs and enforce
  authorization at the trusted boundary; UI hiding is insufficient.
- Preserve error handling and protections against data loss. Verify the live
  target before authorized remote changes rather than relying on historical notes.

## Validation

- Run the smallest checks relevant to the changed behavior and risk. Use only
  commands supported by the repository's actual configuration.
- Check affected failure and authorization paths. Browser-check user-facing
  changes at relevant desktop and mobile sizes when applicable.
- Run `git diff --check` before handing off a change; also inspect newly created files.
- Report what was checked, what could not be checked, and any remaining risk.
  Do not present a build success as proof of the complete user flow.

## Documentation And Communication

- Respond in the user's language. Keep documentation, code comments, and commit
  messages in English unless requested otherwise; preserve an edited document's language.
- Keep guidance concise and current. Link to the owning source of truth instead
  of copying shared policy; use repo-relative links for files in this repository.
- Mark unknown facts as `Unknown / TODO`; do not invent project facts, commands,
  requirements, or deployment settings.
- Public content should explain current behavior, usage, errors, and material
  limitations. Keep internal QA results, work logs, test accounts, deployment
  progress, and unconfirmed roadmaps in engineering records or the working chat.
- Keep agent-local shell wrappers out of portable project command examples.

## Source References

Extracted and generalized from sibling `AGENTS.md` files:
[kitsch-flow-app](../kitsch-flow-app/AGENTS.md),
[kitsch-app](../kitsch-app/AGENTS.md),
[kitsch-demo](../kitsch-demo/AGENTS.md),
[kitsch-omnivoice-record](../kitsch-omnivoice-record/AGENTS.md),
[kitsch-platform](../kitsch-platform/AGENTS.md), and
[kitsch-tts-api](../kitsch-tts-api/AGENTS.md).
Project-specific stacks, locale requirements, domains, account identities,
database workflows, and deployment-provider settings are intentionally excluded.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
