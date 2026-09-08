import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export const base = tseslint.config(
  {
    name: 'nova/ignores',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/storybook-static/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'nova/base',
    plugins: { 'import-x': importX },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      'import-x/no-cycle': ['error', { maxDepth: Number.POSITIVE_INFINITY }],
      'import-x/no-relative-packages': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  prettier,
);

export default base;
