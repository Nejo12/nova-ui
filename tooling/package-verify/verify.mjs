import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const repoRoot = new URL('../../', import.meta.url);
const uiManifest = JSON.parse(
  readFileSync(new URL('../../packages/ui/package.json', import.meta.url), 'utf8'),
);
const tokensManifest = JSON.parse(
  readFileSync(new URL('../../packages/design-tokens/package.json', import.meta.url), 'utf8'),
);

const packages = [
  {
    filter: '@nova-component/design-tokens',
    manifest: tokensManifest,
    requiredFiles: [
      'package/LICENSE',
      'package/package.json',
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/tokens.css',
      'package/dist/tokens.json',
    ],
  },
  {
    filter: '@nova-component/ui',
    manifest: uiManifest,
    requiredFiles: [
      'package/LICENSE',
      'package/package.json',
      'package/dist/nova-ui.js',
      'package/dist/nova-ui.css',
      'package/dist/types/index.d.ts',
    ],
  },
];

const outputDir = mkdtempSync(join(tmpdir(), 'nova-ui-pack-'));

try {
  for (const pkg of packages) {
    execFileSync(
      'pnpm',
      ['--filter', pkg.filter, 'pack', '--pack-destination', outputDir],
      { cwd: repoRoot, stdio: 'inherit' },
    );

    const prefix = pkg.manifest.name.replace('@', '').replace('/', '-');
    const tarball = readdirSync(outputDir).find(
      (file) =>
        file.startsWith(`${prefix}-${pkg.manifest.version}`) &&
        file.endsWith('.tgz'),
    );

    if (!tarball) {
      throw new Error(
        `Could not find packed tarball for ${pkg.manifest.name}@${pkg.manifest.version}`,
      );
    }

    const tarballPath = join(outputDir, tarball);
    const fileList = execFileSync('tar', ['-tzf', tarballPath], {
      encoding: 'utf8',
    })
      .trim()
      .split('\n');

    for (const requiredFile of pkg.requiredFiles) {
      if (!fileList.includes(requiredFile)) {
        throw new Error(
          `${pkg.manifest.name} tarball is missing ${requiredFile}`,
        );
      }
    }

    const packedManifest = JSON.parse(
      execFileSync('tar', ['-xOf', tarballPath, 'package/package.json'], {
        encoding: 'utf8',
      }),
    );

    if (
      packedManifest.name !== pkg.manifest.name ||
      packedManifest.version !== pkg.manifest.version
    ) {
      throw new Error(
        `Packed manifest identity mismatch for ${pkg.manifest.name}`,
      );
    }

    if (packedManifest.license !== 'MIT') {
      throw new Error(
        `${pkg.manifest.name} packed manifest must declare MIT`,
      );
    }

    if (JSON.stringify(packedManifest).includes('workspace:')) {
      throw new Error(
        `${pkg.manifest.name} packed manifest still contains a workspace protocol`,
      );
    }

    if (pkg.manifest.name === '@nova-component/ui') {
      const packedTokensVersion =
        packedManifest.dependencies?.['@nova-component/design-tokens'];

      if (packedTokensVersion !== tokensManifest.version) {
        throw new Error(
          `UI tarball must depend on @nova-component/design-tokens@${tokensManifest.version}; received ${packedTokensVersion}`,
        );
      }
    }

    console.log(`Verified ${pkg.manifest.name}@${pkg.manifest.version}`);
  }
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
