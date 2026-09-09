# Contributing to Nova UI

Nova UI is a shared design-system foundation for multiple products. Changes should be small, explicit, and reviewable.

## Branching

Create a bounded branch from current `main`. Do not push directly to `main`.

Recommended prefixes:

- `foundation/`
- `feat/`
- `fix/`
- `refactor/`
- `docs/`

## Pull requests

Each PR should:

- solve one bounded concern
- explain why the change belongs in Nova UI
- list affected packages
- include tests for behavior
- include Storybook coverage for reusable visual states
- call out accessibility implications
- avoid unrelated cleanup

The repository owner merges manually. Do not enable auto-merge.

## Shared-component threshold

A component belongs in `@nova/ui` when it is product-agnostic and either:

- already repeated across products, or
- clearly a foundational primitive required across product surfaces.

Keep product-specific workflows, copy, data fetching, routing, and business rules in product repositories.

## Design tokens

Token source must be normalized and generated deterministically. Generated files are checked in and reviewed but are never hand-edited.

Prefer semantic names such as `color.action.primary` over literal brand names.

## Validation

Before requesting review, run the repository quality gates exposed by the root scripts.
