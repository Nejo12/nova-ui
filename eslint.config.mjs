import globals from 'globals';
import { base } from '@nova/eslint-config/base';

export default [
  ...base,
  {
    // Check generator cycles inside the repository, not the compiler/formatter vendor graphs.
    files: ['tooling/component-index/*.mjs'],
    rules: { 'import-x/no-cycle': ['error', { ignoreExternal: true }] },
  },
  {
    name: 'nova/browser-files',
    files: ['packages/ui/**/*.{ts,tsx}', 'tooling/browser-a11y/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
];
