import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { argv, stdout } from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { format, resolveConfig } from 'prettier';
import ts from 'typescript';

const root = fileURLToPath(new URL('../../', import.meta.url));
const entryPath = join(root, 'packages/ui/src/index.ts');
const outputPath = join(root, 'docs/components.md');
const readSource = (path) =>
  ts.createSourceFile(
    path,
    readFileSync(path, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
const hasExport = (node) =>
  node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
const pathLink = (path) => `../${relative(root, path).replaceAll('\\', '/')}`;
const modules = new Map();
const additional = [];

for (const node of readSource(entryPath).statements) {
  if (
    ts.isExportDeclaration(node) &&
    node.moduleSpecifier &&
    ts.isStringLiteral(node.moduleSpecifier) &&
    node.exportClause &&
    ts.isNamedExports(node.exportClause)
  ) {
    const moduleName = node.moduleSpecifier.text;
    if (!moduleName.startsWith('.')) {
      for (const item of node.exportClause.elements)
        additional.push(`\`${item.name.text}\` — type re-export from \`${moduleName}\``);
      continue;
    }
    const stem = join(dirname(entryPath), moduleName);
    const sourcePath = ['.tsx', '.ts'].map((extension) => stem + extension).find(existsSync);
    if (!sourcePath) throw new Error(`Missing exported source: ${moduleName}`);
    const entry = modules.get(sourcePath) ?? { values: [], types: [] };
    for (const item of node.exportClause.elements) {
      const symbol = { name: item.name.text, sourceName: (item.propertyName ?? item.name).text };
      (node.isTypeOnly || item.isTypeOnly ? entry.types : entry.values).push(symbol);
    }
    modules.set(sourcePath, entry);
  } else if (ts.isVariableStatement(node) && hasExport(node)) {
    for (const declaration of node.declarationList.declarations)
      additional.push(`\`${declaration.name.getText()}\` — package constant`);
  }
}

const entries = [];
for (const [sourcePath, exports] of modules) {
  const source = readSource(sourcePath);
  const declarations = new Map();
  const typeNodes = new Map();
  for (const node of source.statements) {
    if ((ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && node.name)
      typeNodes.set(node.name.text, node);
    if (ts.isFunctionDeclaration(node) && node.name) declarations.set(node.name.text, node);
    if (ts.isVariableStatement(node))
      for (const declaration of node.declarationList.declarations)
        declarations.set(declaration.name.getText(), declaration);
  }
  const types = new Map();
  function includeType(name) {
    const node = typeNodes.get(name);
    if (!node || types.has(name)) return;
    types.set(name, node.getText(source));
    function visit(child) {
      if (ts.isIdentifier(child) && child.text !== name) includeType(child.text);
      ts.forEachChild(child, visit);
    }
    ts.forEachChild(node, visit);
  }
  for (const type of exports.types) includeType(type.sourceName);

  const storyPath = sourcePath.replace(/\.tsx?$/, '.stories.tsx');
  const states = [];
  let title = '';
  let description = '';
  if (existsSync(storyPath)) {
    const story = readSource(storyPath);
    for (const node of story.statements) {
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (hasExport(node) && declaration.type?.getText(story).includes('Story'))
            states.push(declaration.name.getText(story));
          if (declaration.name.getText(story) === 'meta') {
            function visit(child) {
              if (ts.isPropertyAssignment(child) && ts.isStringLiteralLike(child.initializer)) {
                if (child.name.getText(story) === 'title' && !title) title = child.initializer.text;
                if (child.name.getText(story) === 'component') description = child.initializer.text;
              }
              ts.forEachChild(child, visit);
            }
            ts.forEachChild(declaration, visit);
          }
        }
      }
    }
  }

  for (const symbol of exports.values) {
    const declaration = declarations.get(symbol.sourceName);
    if (!declaration) throw new Error(`Missing public value declaration: ${symbol.sourceName}`);
    const elements = new Set();
    const semantics = new Set();
    function visit(child) {
      if (ts.isPropertyAssignment(child)) {
        const name = ts.isStringLiteralLike(child.name)
          ? child.name.text
          : child.name.getText(source);
        if (
          name.startsWith('aria-') ||
          ['role', 'tabIndex', 'disabled', 'required', 'focusable'].includes(name)
        )
          semantics.add(child.getText(source));
      }
      if (ts.isJsxOpeningElement(child) || ts.isJsxSelfClosingElement(child)) {
        const tag = child.tagName.getText(source);
        if (/^[a-z]/.test(tag)) elements.add(tag);
        for (const attribute of child.attributes.properties) {
          if (!ts.isJsxAttribute(attribute)) continue;
          const name = attribute.name.getText(source);
          if (
            name.startsWith('aria-') ||
            ['role', 'type', 'tabIndex', 'disabled', 'required', 'focusable'].includes(name)
          )
            semantics.add(attribute.getText(source));
        }
      }
      ts.forEachChild(child, visit);
    }
    visit(declaration);
    entries.push({
      name: symbol.name,
      sourcePath,
      storyPath,
      title,
      states,
      description,
      types,
      publicTypes: exports.types.map((type) => type.name),
      elements: [...elements].sort(),
      semantics: [...semantics].sort(),
    });
  }
}

let markdown = '# Shipped component API and accessibility index\n\n';
markdown +=
  'Generated from [the public entrypoint](../packages/ui/src/index.ts), its exported source modules and colocated Storybook stories. Run `pnpm docs:generate` to refresh; `pnpm docs:verify` checks deterministic output in the quality gate. Only actual public exports appear here; Figma-only/deferred concepts are excluded.\n\n';
markdown +=
  'Props and supporting local types below are source declarations, not a second API definition. Imported native React HTML/SVG attribute types retain their React meaning. Accessibility cues show the component markup; interaction behavior and consumer naming requirements are documented in the linked stories and enforced by component tests. Supporting unexported type aliases clarify unions but are not additional public exports.\n\n';
markdown += '| Export | Kind | Storybook | Public types |\n| --- | --- | --- | --- |\n';
for (const entry of entries)
  markdown += `| [${entry.name}](#${entry.name.toLowerCase()}) | ${/^[A-Z]/.test(entry.name) ? 'Component' : 'Class-name helper'} | ${entry.title ? `[${entry.title}](${pathLink(entry.storyPath)})` : '—'} | ${entry.publicTypes.map((name) => `\`${name}\``).join(', ')} |\n`;

for (const entry of entries) {
  markdown += `\n## ${entry.name}\n\n[Implementation](${pathLink(entry.sourcePath)})`;
  if (entry.title) markdown += ` · [${entry.title} stories](${pathLink(entry.storyPath)})`;
  markdown += '\n\n';
  if (entry.description) markdown += `${entry.description}\n\n`;
  if (entry.states.length)
    markdown += `**Story states:** ${entry.states.map((name) => `\`${name}\``).join(', ')}.\n\n`;
  if (entry.elements.length)
    markdown += `**Native elements:** ${entry.elements.map((name) => `\`<${name}>\``).join(', ')}.\n\n`;
  if (entry.semantics.length)
    markdown += `**Accessibility/semantic cues from source:**\n\n${entry.semantics.map((cue) => `- \`${cue.replaceAll('`', '\\`').replaceAll(/\s+/g, ' ')}\``).join('\n')}\n\n`;
  else if (/^get/.test(entry.name))
    markdown +=
      'The helper supplies classes; consumers own element choice, accessible names, roles and keyboard behavior.\n\n';
  if (entry.types.size)
    markdown += `**Props and related types:**\n\n\`\`\`tsx\n${[...entry.types.values()].join('\n\n')}\n\`\`\`\n`;
}
markdown += `\n## Additional public exports\n\n${additional.map((item) => `- ${item}`).join('\n')}\n`;
const formatted = await format(markdown, {
  ...(await resolveConfig(outputPath)),
  parser: 'markdown',
});
if (argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== formatted)
    throw new Error(
      'Component index is stale. Run pnpm docs:generate and commit docs/components.md.',
    );
} else writeFileSync(outputPath, formatted);
stdout.write(
  `Component index ${argv.includes('--check') ? 'verified' : 'generated'}: ${entries.length} shipped components/helpers\n`,
);
