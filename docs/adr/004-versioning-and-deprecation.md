# ADR-004 — Package versioning and deprecation

**Status:** Accepted

## Context

Consumers depend on component behavior, accessibility, types, exports, and token names as well as JavaScript implementation. Pre-1.0 releases need an explicit compatibility policy so consumers can plan migrations.

## Decision

The published packages are `@nova-component/ui` and `@nova-component/design-tokens`. Each package is versioned independently with Changesets; related changes must describe their compatibility and dependency requirements together.

While a package is below 1.0, breaking changes require a minor release. Compatible additions and fixes require a patch release. After 1.0, breaking changes require a major release, compatible additions a minor release, and compatible fixes a patch release. A bug fix is breaking when it changes the documented consumer contract, even if the new behavior is preferable.

The public contract includes:

- React exports, prop and type names, accepted values, required props, defaults, callback signatures, and public DOM ref targets;
- documented semantic behavior and accessibility, including roles, accessible names, keyboard interactions, focus management, dismissal, announcements, and controlled state behavior;
- token names, CSS custom properties, supported themes, documented meanings, and published token structures;
- package names and supported JavaScript, type, CSS, and token export paths;
- supported React peer versions and consumer runtime requirements.

Removing or renaming these contracts, narrowing accepted inputs or supported peers, making optional props required, or changing documented semantics is breaking. Token and CSS custom-property renames must first retain an alias with the existing meaning; removing that alias is breaking. A compatible token value correction that preserves documented meaning is a fix; a changed semantic meaning is breaking.

## Deprecation process

Before a planned removal or incompatible replacement, ship a compatible release that documents the deprecation in source/API documentation and release notes. Include the replacement, migration example, affected exports or tokens, and earliest removal release. Use TypeScript `@deprecated` annotations where practical; avoid adding runtime warnings merely to announce a deprecation.

While pre-1.0, retain the deprecated contract for at least 30 calendar days and one subsequent published compatible release after the announcement. Removal may happen only in a later minor release after both conditions are met. After 1.0, retain it for at least 90 days and one subsequent compatible release, then remove it in a major release. The announcement and removal PRs must link to each other and record the announcement date and release.

An urgent security or accessibility defect may require a shorter window. Its bounded PR must explain the concrete harm, why a compatible remedy is insufficient, the shortened window, and the migration. It still requires the appropriate breaking version and explicit Founder review before manual merge.

## Release evidence

Every change affecting a publishable package requires a Changeset identifying the affected packages and the version level above. Documentation-only repository maintenance does not require a package release or Changeset.

Breaking Changesets and release notes must include consumer migration notes: before/after usage, affected types and export paths, token aliases or replacements, behavior/accessibility differences, and supported peer requirements. Do not remove a deprecated contract until the PR supplies evidence that the minimum window has elapsed. Release/version PRs and publishing follow `docs/publishing.md`; the Founder performs all merges manually.

## Consequences

Compatibility decisions are reviewable before release. Consumers receive a migration window, and accessibility and token contracts receive the same protection as component props. Changes that cross both packages must account for both versions rather than assuming matching version numbers.
