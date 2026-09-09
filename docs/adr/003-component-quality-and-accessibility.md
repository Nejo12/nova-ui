# ADR-003 — Component quality and accessibility baseline

**Status:** Accepted

## Context

Nova UI is consumed by multiple products. Accessibility and behavior regressions in a shared primitive multiply across consumers, so component stories and unit tests are part of the package contract rather than optional documentation.

## Decision

Every reusable visual primitive added to `@nova/ui` must include:

- behavior tests with Vitest + Testing Library for its public interaction contract
- Storybook coverage for the states that materially affect behavior or appearance
- light and dark theme verification through the shared Storybook theme control
- keyboard behavior where the component is interactive
- explicit accessible names, roles, states, relationships, or announcement semantics where applicable
- reduced-motion behavior where animation or transition is used

The Storybook a11y addon remains enabled globally with `test: 'error'`. Storybook's static build is a required CI gate. Component PRs must additionally exercise their interaction/a11y contract in unit tests; a static Storybook build alone is not treated as automated accessibility proof.

Automated browser-level accessibility checks may be added later when there is enough interactive Storybook surface to justify the additional runner dependency. That later addition must be a bounded tooling PR.

## Extraction rule

When extracting an existing product component, preserve established accessible behavior first. Do not redesign its interaction model during the extraction PR unless the existing behavior is demonstrably incorrect and the change is explicitly scoped.

For the first Klinnova candidates:

- `SkeletonRegion` preserves `role="status"` and `aria-busy="true"`.
- `InlineAlert` preserves its opt-in polite/assertive announcement policy.
- `Tooltip` preserves trigger `aria-describedby`, focus/hover opening, and Escape dismissal.

## Consequences

- Accessibility failures are treated as component-contract failures.
- Storybook documents shared state space; unit tests enforce behavior.
- Extraction PRs stay behavior-preserving and product-neutral.
