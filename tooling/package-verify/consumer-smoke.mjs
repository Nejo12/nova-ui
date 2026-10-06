import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { env, stdout } from 'node:process';
import { URL } from 'node:url';

function cssContents(directory) {
  return readdirSync(directory, { recursive: true })
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(join(directory, file), 'utf8'))
    .join('\n');
}

export function verifyConsumers(outputDir, tarballs) {
  // Outside the repository: no workspace aliases, source imports or linked UI packages.
  const consumer = join(outputDir, 'consumer');
  cpSync(new URL('./consumers/', import.meta.url), consumer, { recursive: true });
  const options = {
    cwd: consumer,
    stdio: 'inherit',
    env: { ...env, NEXT_TELEMETRY_DISABLED: '1' },
  };

  execFileSync('npm', ['ci', '--no-audit', '--no-fund'], options);
  // Both direct tarballs are installed together. The preinstalled, locked runtime
  // dependencies satisfy the packed UI manifest without fetching a published Nova package.
  execFileSync(
    'npm',
    ['install', '--no-save', '--package-lock=false', '--no-audit', '--no-fund', ...tarballs],
    options,
  );

  for (const name of ['ui', 'design-tokens']) {
    const installed = join(consumer, 'node_modules', '@nova-component', name);
    assert.equal(realpathSync(installed), installed, `${name} must be an installed tarball`);
  }

  execFileSync(
    'node',
    [
      '--input-type=module',
      '--eval',
      `import assert from 'node:assert/strict';
       import { createElement } from 'react';
       import { renderToStaticMarkup } from 'react-dom/server';
       import { Button } from '@nova-component/ui';
       import { NOVA_THEME_ATTRIBUTE } from '@nova-component/design-tokens';
       assert.equal(NOVA_THEME_ATTRIBUTE, 'data-nova-theme');
       assert.ok(renderToStaticMarkup(createElement(Button, null, 'Packed runtime button')).includes('>Packed runtime button</button>'));
       for (const path of ['@nova-component/ui/styles.css', '@nova-component/design-tokens/tokens.css']) {
         assert.ok(import.meta.resolve(path).startsWith('file:'));
       }`,
    ],
    options,
  );

  execFileSync('npm', ['run', 'vite:build'], options);
  assert.ok(existsSync(join(consumer, 'vite/dist/index.html')));
  const viteCss = cssContents(join(consumer, 'vite/dist'));
  assert.ok(viteCss.includes('--nova-color-bg-page') && viteCss.includes('button'));
  stdout.write('Packed Vite consumer: JS, declarations and both CSS exports passed\n');

  execFileSync('npm', ['run', 'next:build'], options);
  const nextOutput = join(consumer, 'next/out');
  assert.match(readFileSync(join(nextOutput, 'index.html'), 'utf8'), /Packed Next button/);
  const nextCss = cssContents(nextOutput);
  assert.ok(nextCss.includes('--nova-color-bg-page') && nextCss.includes('button'));
  stdout.write('Packed Next consumer: JS, declarations, prerender and both CSS exports passed\n');
}
