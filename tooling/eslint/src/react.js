import globals from 'globals';
import { base } from './base.js';

export const react = [
  ...base,
  {
    name: 'nova/react',
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
];

export default react;
