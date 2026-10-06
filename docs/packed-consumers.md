# Packed consumer verification

Run `pnpm consumers:verify` to perform ordinary tarball checks and build minimal Vite and Next consumers from those exact tarballs. CI runs this as a separate job to keep the ordinary quality gate free of additional framework installs.

The fixture's npm lockfile pins its framework/runtime environment. It is copied into a temporary directory outside the workspace, installed with `npm ci`, then receives both locally packed Nova packages together. No aliases or workspace dependencies are available. Installed package realpaths must remain inside the temporary consumer. JavaScript imports and a server render are checked directly; Vite's TypeScript check and Next's build check public declarations. Both builds must emit Nova UI and token CSS, and Next must prerender the representative Button.

The fixture intentionally has a client boundary for the React UI import in Next's App Router. This check proves client-component consumption and prerendering; it does not claim every hook-using primitive can be imported directly into a Server Component.

Keep this fixture tooling-only. Refresh its locked environment in bounded compatibility batches. The Nova tarball contents are rebuilt on every run, so their changing integrity hashes are not stored in the external dependency lockfile. Temporary installs and build output are removed even on failure.
