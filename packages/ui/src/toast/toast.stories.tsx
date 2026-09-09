import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    children: 'Your changes have been saved.',
    dismissLabel: 'Dismiss notification',
    onDismiss: () => undefined,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    tone: 'success',
    children: 'Profile updated successfully.',
  },
};

export const WarningWithAction: Story = {
  args: {
    tone: 'warning',
    children: 'The item was removed.',
    action: { label: 'Undo', onAction: () => undefined },
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    children: 'We could not save your changes.',
    dismissLabel: 'Dismiss error',
  },
};

export const DisabledAction: Story = {
  args: {
    children: 'Retry is temporarily unavailable.',
    action: { label: 'Retry', onAction: () => undefined, disabled: true },
  },
};
