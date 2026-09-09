import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '../text-input/text-input';
import { FormField } from './form-field';

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  args: {
    label: 'Email',
    htmlFor: 'email',
    children: <TextInput id="email" placeholder="person@example.com" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Use the email address associated with your account.',
  },
};

export const Required: Story = {
  args: {
    required: true,
    children: <TextInput id="email" required placeholder="person@example.com" />,
  },
};

export const Invalid: Story = {
  args: {
    error: 'Enter a valid email address.',
    children: <TextInput id="email" aria-invalid="true" defaultValue="not-an-email" />,
  },
};
