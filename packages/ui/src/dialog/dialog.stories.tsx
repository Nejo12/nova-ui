import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dialog } from './dialog';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  args: {
    open: true,
    title: 'Important information',
    description: 'Review this information before continuing.',
    action: { label: 'Got it', onAction: () => undefined },
    onClose: () => undefined,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Confirmation: Story = {
  args: {
    type: 'confirmation',
    title: 'Confirm action',
    description: 'Nothing happens until you confirm.',
    cancelLabel: 'Cancel',
    action: { label: 'Confirm', onAction: () => undefined },
  },
};

export const Destructive: Story = {
  args: {
    type: 'destructive',
    size: 'medium',
    title: 'Delete this item?',
    description: 'This action cannot be undone.',
    destructiveContext: 'This change is permanent.',
    cancelLabel: 'Keep item',
    action: { label: 'Delete', onAction: () => undefined },
  },
};

export const LongContent: Story = {
  args: {
    size: 'medium',
    title: 'Review the details',
    description:
      'This intentionally long dialog demonstrates wrapping and scrolling behavior on constrained viewports without changing the component contract.',
    children: (
      <p>
        Additional content remains consumer-owned and can contain any non-product-specific React
        content.
      </p>
    ),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
