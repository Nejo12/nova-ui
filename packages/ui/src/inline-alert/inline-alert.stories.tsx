import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineAlert } from './inline-alert';

const meta = {
  title: 'Feedback/InlineAlert',
  component: InlineAlert,
  args: {
    title: 'Account update',
    children: 'Review the new information before continuing.',
  },
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Saved successfully',
    children: 'Your changes are now available.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Check this first',
    children: 'Review the highlighted condition before continuing.',
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Action required',
    children: 'Resolve this issue before trying again.',
  },
};

export const WithAction: Story = {
  args: {
    tone: 'warning',
    title: 'Review required',
    action: <button type="button">Review details</button>,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Information',
    children:
      'This intentionally long alert demonstrates wrapping behavior for narrow surfaces and long product copy without changing the component contract.',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
