import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDir, '../..');
const sourcePath = resolve(workspaceRoot, 'packages/design-tokens/src/source.json');
const outputDir = resolve(workspaceRoot, 'packages/design-tokens/dist');

const source = JSON.parse(await readFile(sourcePath, 'utf8'));

function getByPath(object, path) {
  return path.split('.').reduce((value, segment) => value?.[segment], object);
}

function resolveValue(value) {
  if (typeof value !== 'string') return value;

  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;

  const resolved = getByPath(source, match[1]);
  if (resolved === undefined) {
    throw new Error(`Unknown token reference: ${value}`);
  }

  return resolveValue(resolved);
}

function flatten(object, prefix = []) {
  const entries = [];

  for (const [key, value] of Object.entries(object)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flatten(value, [...prefix, key]));
      continue;
    }

    entries.push([[...prefix, key], resolveValue(value)]);
  }

  return entries;
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

function cssVar(path) {
  return `--nova-${path.map(kebab).join('-')}`;
}

const primitiveEntries = flatten(source.primitive);
const lightEntries = flatten(source.semantic.light);
const darkEntries = flatten(source.semantic.dark);

const primitiveCss = primitiveEntries
  .map(([path, value]) => `  ${cssVar(path)}: ${value};`)
  .join('\n');
const lightCss = lightEntries.map(([path, value]) => `  ${cssVar(path)}: ${value};`).join('\n');
const darkCss = darkEntries.map(([path, value]) => `  ${cssVar(path)}: ${value};`).join('\n');

const css = `/* GENERATED FILE. DO NOT EDIT DIRECTLY. */\n:root {\n${primitiveCss}\n${lightCss}\n}\n\n[data-nova-theme='light'] {\n${lightCss}\n}\n\n[data-nova-theme='dark'] {\n${darkCss}\n}\n`;

const resolved = {
  schemaVersion: source.$schemaVersion,
  primitive: Object.fromEntries(primitiveEntries.map(([path, value]) => [path.join('.'), value])),
  semantic: {
    light: Object.fromEntries(lightEntries.map(([path, value]) => [path.join('.'), value])),
    dark: Object.fromEntries(darkEntries.map(([path, value]) => [path.join('.'), value])),
  },
};

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'tokens.css'), css, 'utf8');
await writeFile(
  resolve(outputDir, 'tokens.json'),
  `${JSON.stringify(resolved, null, 2)}\n`,
  'utf8',
);
