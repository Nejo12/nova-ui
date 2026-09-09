# Nova UI

Shared React UI primitives and design tokens for the Nova product family.

Initial consumers:

- Klinnova
- Slotnova

## Packages

```bash
pnpm add @nova-component/ui @nova-component/design-tokens
```

```ts
import { Button } from '@nova-component/ui';
import '@nova-component/design-tokens/tokens.css';
import '@nova-component/ui/styles.css';
```

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

`@nova-component/design-tokens` has no React dependency. `@nova-component/ui` depends on the token contract but not on Klinnova, Slotnova, Next.js, Vite runtime APIs, or domain services.
