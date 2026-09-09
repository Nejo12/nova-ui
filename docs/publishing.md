# Publishing Nova Component packages

Nova Component uses Changesets for versioning and npm Trusted Publishing for releases.

## Packages

- `@nova-component/design-tokens`
- `@nova-component/ui`

## Release flow

1. Add a Changeset for changes that affect a publishable package.
2. Merge the product/change PR.
3. Review and merge the generated version PR.
4. Verify CI, Dependency Review, and CodeQL are green on `main`.
5. Run the `Publish packages` workflow manually from `main` with the `publish` input enabled.
6. Approve the `npm-publish` GitHub Environment when required.

The workflow packs both packages first, publishes design tokens first, then publishes UI.

## Trusted publishing setup

Trusted publishing is configured separately for each npm package after the package exists on npm.

For both packages, configure npm Trusted Publishing with:

- Provider: GitHub Actions
- GitHub owner: `Nejo12`
- Repository: `nova-ui`
- Workflow filename: `publish.yml`
- Environment: `npm-publish`
- Allowed action: direct `npm publish`

The workflow grants `id-token: write` and uses GitHub-hosted runners. No long-lived npm publish token should be stored in GitHub.

Trusted publishing automatically creates npm provenance for public packages published from this public repository.

## Bootstrap requirement

npm requires a package to exist before its Trusted Publisher can be configured. Therefore the first version of each package must be created once through an authenticated npm publish performed by the package owner. After that bootstrap publish, configure the Trusted Publisher above and use the GitHub workflow for subsequent releases.

Do not run the GitHub publish workflow until both package Trusted Publishers are configured.
