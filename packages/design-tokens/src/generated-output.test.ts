import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(import.meta.dirname, '..');
const workspaceRoot = resolve(packageRoot, '../..');

describe('generated Nova token output', () => {
  it('regenerates the runtime CSS and JSON with the extraction-ready contract', () => {
    execFileSync(process.execPath, [resolve(workspaceRoot, 'tooling/token-build/build.mjs')], {
      cwd: workspaceRoot,
      stdio: 'pipe',
    });

    const css = readFileSync(resolve(packageRoot, 'dist/tokens.css'), 'utf8');
    const json = JSON.parse(readFileSync(resolve(packageRoot, 'dist/tokens.json'), 'utf8')) as {
      semantic: { light: Record<string, string>; dark: Record<string, string> };
    };

    expect(css).toContain('--nova-color-bg-inverse:');
    expect(css).toContain('--nova-color-status-info-surface:');
    expect(css).toContain('--nova-color-status-danger-text:');
    expect(css).toContain('--nova-elevation-overlay:');
    expect(css).toContain("[data-nova-theme='dark']");

    expect(Object.keys(json.semantic.light).sort()).toEqual(Object.keys(json.semantic.dark).sort());
  });
});
