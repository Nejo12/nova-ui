# Dependency hardening batches

Tracking issue: [#73](https://github.com/Nejo12/nova-ui/issues/73).

These batches were evaluated independently from GitHub main
`bd2d6da4dd8449fd54ae6c4e2512d5fae5374c27` on 2026-10-06. The Founder performs
all merges manually. PR descriptions record the tested tree, full quality gate
and exact-head CI; an open PR does not mean its changes are on main.

| Family                   | Review boundary                                                                                                                           | PR                                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Storybook                | Storybook, React/Vite adapter and accessibility addon together, 9 → 10.6                                                                  | [#79](https://github.com/Nejo12/nova-ui/pull/79), superseding #45, #46 and #49                        |
| Vite + React plugin      | Vite 7 → 8 with plugin-react 5 → 6; deferred on current main                                                                              | [#51](https://github.com/Nejo12/nova-ui/pull/51) and [#47](https://github.com/Nejo12/nova-ui/pull/47) |
| jsdom                    | Test environment 26 → 30; refreshed, then blocked by exact-head matcher types                                                             | [#50](https://github.com/Nejo12/nova-ui/pull/50)                                                      |
| Testing Library matchers | jest-dom 6 → 7 with its required DOM peer; align the stale private development Node floor                                                 | [#48](https://github.com/Nejo12/nova-ui/pull/48)                                                      |
| Development minor/patch  | Existing grouped tooling and React development runtime/types updates; includes typescript-eslint patch, excludes Vitest/coverage and Sass | [#64](https://github.com/Nejo12/nova-ui/pull/64), superseding #67                                     |
| Lucide runtime minor     | Separate published dependency update, with a UI patch Changeset                                                                           | [#66](https://github.com/Nejo12/nova-ui/pull/66)                                                      |
| Release workflow actions | Checkout/setup-node aligned with the already-upgraded CI actions; Changesets action patch                                                 | [#43](https://github.com/Nejo12/nova-ui/pull/43), superseding #41 and #42                             |

## Vite batch blocker

A single isolated trial of Vite 8 and plugin-react 6 passed the UI library build
and strict typecheck. However, `pnpm peers check` identified unsupported Vite 8
peers in current main's Storybook 9.1.20 adapter/builder, its docgen plugin and
its Vitest mocker dependency. The existing esbuild 0.25 also falls outside Vite
8's optional esbuild peer range. A successful library build alone does not prove
that the Storybook toolchain is supported.

Do not combine Storybook and Vite majors into one PR or repeatedly retry this
unsupported combination. After #79 is merged, start a fresh worktree from the
then-current main and reevaluate Vite + plugin-react as their own batch. Storybook
10.6.1 explicitly supports Vite 8 and updates its docgen dependency. Recheck all
peer ranges, preserve the library's existing browser target contract, and run
package verification plus Storybook before the full quality gate.

## Matcher graph blocker and development Node support

The isolated jsdom 30 refresh passed its local focused tests and quality gate,
but exact-head CI exposed incompatible `Assertion<void, T>` / jest-dom matcher
declarations. #50 is a blocked draft. The first development-update trial also
failed strict types when Vitest and coverage were upgraded to 5.0.2. These are
concrete blockers, not upgrade candidates to repeatedly retry.

Vitest/coverage are therefore excluded from #64. Sass stays unchanged in that
batch to avoid changing the Vite/Vitest peer graph while the matcher blocker is
unresolved. After the separate Testing Library batch is merged, reevaluate
jsdom and the excluded Vitest/coverage/Sass updates in fresh worktrees from
then-current main. If the matcher incompatibility remains, record it rather
than folding the major upgrades together.

jest-dom 7.0.1 requires Node `>=22` and a DOM 10 peer. Existing Vitest 5 already
requires Node `^22.12.0 || ^24.0.0 || >=26.0.0`, so the private workspace's
`>=20.19.0` engine declaration was stale before this upgrade. #48 aligns that
private declaration to `>=22.12.0`, documents the development requirement and
adds the DOM peer explicitly. CI uses Node 24. Published package engine and
React peer contracts remain unchanged.
