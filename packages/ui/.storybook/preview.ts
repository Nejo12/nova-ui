import type { Preview } from '@storybook/react-vite';
import '@nova/design-tokens/tokens.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Resolved Nova theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute('data-nova-theme', String(context.globals.theme));
      document.body.style.background = 'var(--nova-color-bg-page)';
      document.body.style.color = 'var(--nova-color-text-primary)';
      return Story();
    },
  ],
  parameters: {
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
