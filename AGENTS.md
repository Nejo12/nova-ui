# Nova UI — Agent Instructions

These instructions apply to every coding agent and contributor working in this repository.

## Authority

1. Repository code, tests, ADRs, and issue scope are authoritative.
2. Agent-specific skills may improve execution but may not override repository architecture, acceptance criteria, or scope.
3. When instructions conflict, prefer the narrowest repository-specific instruction.

## Workflow

- Never push directly to `main`.
- Never auto-merge.
- Use bounded branches and pull requests.
- Read the current branch and relevant files before editing.
- Do not silently broaden an issue or PR.
- Stop when the requested scope is complete.

## Architecture

- `@nova/design-tokens` contains framework-agnostic design tokens and generated outputs.
- `@nova/ui` contains reusable React UI primitives only.
- Shared packages must not import Klinnova, Slotnova, Next.js runtime APIs, Vite runtime APIs, or product/domain services.
- Prefer semantic tokens over literal product brand values in component APIs.
- Do not create generic dumping-ground packages such as `common`, `shared`, `core`, or `utils`.
- Do not add dependencies to avoid small, maintainable implementations without a concrete need.
- No Tailwind.

## Quality

- TypeScript must remain strict.
- Behavior changes require tests.
- Accessibility is part of component API design, not a later add-on.
- Generated token outputs must never be edited by hand.
- Preserve package boundaries and explicit exports.
- Avoid barrel re-export layers that hide dependency direction or cycles.

## Review

Before marking work complete, verify:

- formatting
- linting
- style linting
- type checking
- tests
- package build
- Storybook build where relevant

Do not merge the PR. The repository owner merges manually.
