import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio } from './radio';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  args: {
    label: 'Conversational',
    name: 'germanRequirement',
    value: 'conversational',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Basic',
    value: 'basic',
    description: 'Suitable for simple workplace communication.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
