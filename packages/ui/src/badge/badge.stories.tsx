import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Open',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Info: Story = {
  args: {
    tone: 'info',
    children: 'New',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    children: 'Published',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    children: 'Paused',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    children: 'Rejected',
  },
};
