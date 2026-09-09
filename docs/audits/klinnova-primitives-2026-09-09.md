# Klinnova primitive audit — 2026-09-09

## Scope

Read-only audit of the first extraction candidates from current `Nejo12/klinnova` main:

- `src/components/shared/skeleton.*`
- `src/components/inline-alert/inline-alert.*`
- `src/components/tooltip/tooltip.*`

No Klinnova files are modified by this work.

## Skeleton

### Reusable contract

- `Skeleton`: width, required height, radius, className.
- `SkeletonRegion`: accessible loading-region announcement with `role="status"` and `aria-busy="true"`.
- `DelayedReveal`: CSS-only delayed reveal using shared duration/easing roles.

### Extraction notes

The React API is product-neutral. The implementation currently consumes Klinnova token names and its local visually-hidden class. Nova extraction should preserve the accessibility behavior while remapping styles to `--nova-*` roles.

Do not copy Klinnova comments that refer to product-specific global constraints into the shared package.

## InlineAlert

### Reusable contract

- tones: `info | success | warning | error`
- title and body as React nodes
- optional action
- announcement policy: `off | polite | assertive`
- assertive maps to `role="alert"`; polite maps to `role="status"`

### Extraction notes

The API is product-neutral. The styles require explicit semantic status surface, border, foreground, inverse-text, spacing and radius roles. Foundation 02 adds those roles before component code is moved.

The textual tone marks (`i`, `✓`, `!`, `×`) are presentation, not domain behavior; they may be retained initially to preserve behavior and revisited in a later visual-design PR.

## Tooltip

### Reusable contract

- content as React node
- exactly one React element trigger
- placement: `top | bottom | left | right`
- preserves an existing trigger `aria-describedby`
- opens on pointer hover or focus
- Escape dismisses the currently open tooltip
- blur within the wrapper does not close it

### Extraction notes

The React behavior is product-neutral. Klinnova's source begins with `"use client"`; that is a Next.js consumer boundary marker and must not be copied into Nova UI. Nova UI remains React-runtime neutral.

The styles require inverse surface/text, dropdown z-index, spacing, radius and surface elevation. Responsive left/right fallback behavior should be preserved in the first extraction rather than redesigned.

## Decision

These three components are valid Nova UI candidates. Extraction may begin only after the shared token, lint, generated-output and accessibility baseline on this branch is green.
