import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  args: {
    'aria-label': 'Workplace type',
    defaultValue: '',
    children: (
      <>
        <option value="">Select an option</option>
        <option value="onsite">On-site</option>
        <option value="hybrid">Hybrid</option>
        <option value="remote">Remote</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultValue: 'hybrid',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    'aria-describedby': 'select-error',
  },
  render: (args) => (
    <div>
      <Select {...args} />
      <p id="select-error">Choose a valid option.</p>
    </div>
  ),
};
