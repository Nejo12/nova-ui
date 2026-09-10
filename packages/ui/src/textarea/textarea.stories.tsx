import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    'aria-label': 'Description',
    placeholder: 'Enter a description',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'Example long-form content.',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    'aria-describedby': 'textarea-error',
  },
  render: (args) => (
    <div>
      <Textarea {...args} />
      <p id="textarea-error">Enter a valid description.</p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Unavailable',
  },
};
