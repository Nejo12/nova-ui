# Changesets

Every publishable change to `@nova-component/ui` or `@nova-component/design-tokens` should include a changeset.

Create one with:

```bash
pnpm changeset
```

Use semantic versioning:

- `patch` for compatible fixes and refinements
- `minor` for backwards-compatible features
- `major` for breaking changes

The release workflow turns accumulated changesets into a version PR. Publishing remains a separate, manually controlled step.
