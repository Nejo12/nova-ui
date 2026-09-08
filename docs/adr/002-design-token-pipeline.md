# ADR-002 — Design token pipeline

**Status:** Accepted

## Context

Klinnova already contains a substantial CSS token system and Slotnova's accepted architecture expects a deterministic Figma-variable pipeline. Copying Klinnova's CSS directly would make Klinnova-specific brand vocabulary the shared source of truth and would create manual drift.

## Decision

The canonical flow is:

```text
Figma Variables / audited product evidence
  -> normalized source JSON
  -> deterministic token build
  -> generated CSS custom properties + JSON
  -> @nova/design-tokens
  -> @nova/ui / Storybook
  -> product consumers
```

The normalized source uses product-neutral primitive and semantic names. Runtime theming is expressed with CSS custom properties under the `--nova-*` namespace.

Resolved themes use the `data-nova-theme="light|dark"` attribute. Product applications may maintain a separate user preference such as `system`; they resolve that preference to light or dark before applying the shared theme contract.

Generated artifacts must be reproducible from source and must not be edited manually.

## Rules

- Do not use literal Klinnova brand names such as `oxblood` as shared semantic API names.
- Do not use literal color values directly in reusable component styles when an appropriate semantic token exists.
- Product-specific palettes may map into the shared semantic contract in consumer-owned theme files.
- Token changes require review because they may affect every consumer.
- Figma-variable synchronization must preserve traceability between design and generated code.

## Initial scope

Foundation 01 establishes the normalized schema, namespace, light/dark semantic contract, generator, and Storybook consumption. Product-specific mappings and full Figma-variable synchronization are separate bounded work.
