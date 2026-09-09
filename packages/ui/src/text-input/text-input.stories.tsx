import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './text-input';

const meta = {
  title: 'Forms/TextInput',
  component: TextInput,
  args: {
    'aria-label': 'Example field',
    placeholder: 'Enter a value',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    'aria-label': 'Email address',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'person@example.com',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Unavailable',
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    'aria-describedby': 'text-input-error',
    defaultValue: 'Invalid value',
  },
  render: (args) => (
    <div>
      <TextInput {...args} />
      <p id="text-input-error">Enter a valid value.</p>
    </div>
  ),
};

export const Password: Story = {
  args: {
    'aria-label': 'Password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Password',
  },
};
