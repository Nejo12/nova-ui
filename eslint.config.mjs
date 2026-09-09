import globals from 'globals';
import { base } from '@nova/eslint-config/base';

export default [
  ...base,
  {
    name: 'nova/browser-files',
    files: ['packages/ui/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
];
