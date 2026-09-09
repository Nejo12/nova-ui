# ADR-001 — Nova UI package architecture

**Status:** Accepted

## Context

Klinnova and Slotnova are separate applications with different runtime stacks. Future Nova products are expected to reuse the same UI primitives and token language without inheriting product-specific services or framework runtime APIs.

## Decision

Nova UI is an independent pnpm/Turborepo workspace with two production packages:

- `@nova/design-tokens` — framework-agnostic token source and generated artifacts; no React dependency.
- `@nova/ui` — reusable React primitives; depends on the token contract and exposes product-neutral component APIs.

Storybook is colocated with `packages/ui/.storybook` so component documentation remains next to the package it describes.

Shared packages must not import:

- Klinnova or Slotnova source code
- Next.js runtime APIs
- Vite runtime APIs
- product/domain services, routing, data fetching, or product copy

Vite may be used as a **build-time tool** for `@nova/ui`; that does not make Vite a runtime dependency of consumers.

## Consequences

- Klinnova and Slotnova remain consumers rather than owners of the shared system.
- React is a peer dependency of `@nova/ui`.
- Product branding is supplied through semantic token overrides rather than component forks.
- Component extraction is incremental; no big-bang Klinnova migration.
- Package exports remain explicit and shallow.
