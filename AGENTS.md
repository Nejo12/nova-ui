# Nova UI — Agent Instructions

These instructions apply to every coding agent and contributor working in this repository.

## Authority

1. Repository code, tests, ADRs, issue scope, and the requested starting SHA are authoritative.
2. Agent-specific skills may improve execution but may not override repository architecture, acceptance criteria, or scope.
3. When instructions conflict, prefer the narrowest repository-specific instruction.

## Workflow

- Never push directly to `main`.
- Never merge, auto-merge, or enable auto-merge.
- Use one fresh isolated worktree per implementation batch.
- Use bounded branches and pull requests.
- Before editing, verify the requested starting SHA and a clean working tree.
- If the requested starting SHA is wrong or the working tree is dirty, stop and report instead of guessing.
- Read only the current branch and files relevant to the bounded task.
- Do not silently broaden an issue or PR.
- Stop when the requested scope is complete.
- The repository owner performs all merges manually.

## Execution Efficiency / Usage Discipline

Work should avoid unnecessary repeated actions and broad exploratory work.

- Read only files directly relevant to the task unless a required convention cannot otherwise be determined.
- Do not perform broad repository scans or audits unless explicitly required.
- Do not inspect Klinnova or Slotnova unless the task explicitly requires consumer evidence.
- Reuse already-installed dependencies when they are valid; do not repeatedly run `pnpm install`.
- During implementation, prefer targeted tests and targeted checks for the changed area.
- Do not repeatedly run the full test suite, full build, Storybook build, screenshots, or repository-wide searches while iterating.
- Run the full quality gate once when the implementation is stable.
- If a final-gate command fails, fix the genuine issue, rerun the affected command, then run `pnpm check` once as final confirmation. Do not restart the entire gate unnecessarily.
- Do not repeatedly retry failed Git pushes when authentication or remote access is unavailable. Report the blocker and stop.
- Do not repeat investigation already settled by the task specification, an approved Figma contract, or repository evidence unless a contradiction appears.
- Keep final reports concise and include only the information requested by the task.

## Architecture

- `@nova-component/design-tokens` contains framework-agnostic design tokens and generated outputs.
- `@nova-component/ui` contains reusable React UI primitives only.
- Shared packages must not import Klinnova, Slotnova, Next.js runtime APIs, Vite runtime APIs, or product/domain services.
- Prefer semantic tokens over literal product brand values in component APIs.
- Do not create generic dumping-ground packages such as `common`, `shared`, `core`, or `utils`.
- Do not add dependencies to avoid small, maintainable implementations without a concrete need.
- No Tailwind.

## Quality

- TypeScript must remain strict.
- Do not use `any`.
- Behavior changes require focused tests.
- Accessibility is part of component API design, not a later add-on.
- Generated token outputs must never be edited by hand.
- Preserve package boundaries and explicit exports.
- Avoid barrel re-export layers that hide dependency direction or cycles.
- Prefer semantic Nova design tokens and existing primitives over duplicated styling or behavior.

## Implementation Check Strategy

During implementation:

1. Implement the bounded change.
2. Run the smallest relevant tests/checks for that change.
3. Fix local issues until the bounded work is stable.
4. Review the diff for unrelated changes.
5. Run the full quality gate once.
6. Commit only while green.
7. Push the bounded branch.
8. Open the PR.
9. Verify exact-head CI.
10. Stop before merge.

## Full Quality Gate

Run near completion, not repeatedly during implementation:

```sh
corepack enable

# Run only when dependencies are not already valid:
pnpm install --frozen-lockfile

pnpm format
pnpm format:check
pnpm lint
pnpm lint:styles
pnpm typecheck
pnpm test
pnpm build
pnpm tokens:verify
pnpm package:verify
pnpm storybook:build
git diff --check
git status --short
pnpm check
```

If one command fails:

1. determine whether the failure is caused by the current batch;
2. fix the genuine batch failure;
3. rerun the affected command;
4. run `pnpm check` once as final confirmation.

Do not commit while red.

## Review

Before marking work complete, verify:

- scope remained bounded;
- no unrelated formatting or refactors were introduced;
- accessibility behavior matches the component contract;
- public exports are explicit;
- changesets are correct when the public package API changes;
- exact-head CI is green when remote access is available.

Do not merge the PR. The repository owner merges manually.
