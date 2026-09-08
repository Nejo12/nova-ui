# Nova UI

Shared React UI primitives and design tokens for the Nova product family.

Initial consumers:

- Klinnova
- Slotnova

## Principles

- product-agnostic reusable components
- semantic design tokens
- React-runtime neutral packages
- strict TypeScript
- SCSS Modules
- Storybook colocated with the UI package
- behavior covered by tests
- accessibility designed into component APIs
- bounded PRs and manual merges

## Workspace

```text
packages/
  design-tokens/
  ui/
tooling/
  eslint/
  stylelint/
  token-build/
```

`@nova/design-tokens` has no React dependency. `@nova/ui` depends on the token contract but not on Klinnova, Slotnova, Next.js, Vite runtime APIs, or domain services.

## Status

Foundation is being established before component extraction. The first extraction candidates from Klinnova are Skeleton, InlineAlert, Tooltip, Dialog, PopoverMenu, and Toast.
