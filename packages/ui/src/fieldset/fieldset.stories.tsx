import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../checkbox/checkbox';
import { Radio } from '../radio/radio';
import { Fieldset } from './fieldset';

const meta = {
  title: 'Forms/Fieldset',
  component: Fieldset,
  args: {
    legend: 'Contact preferences',
    description: 'Choose how you would like to receive updates.',
    children: <p style={{ margin: 0 }}>Grouped form content belongs here.</p>,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(32rem, calc(100vw - 2rem))' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const GroupedCheckboxes: Story = {
  args: {
    legend: 'Notification channels',
    description: 'Select every channel you want to use.',
    children: (
      <>
        <Checkbox label="Email" name="notifications" value="email" defaultChecked />
        <Checkbox label="Text message" name="notifications" value="sms" />
        <Checkbox label="Push notification" name="notifications" value="push" />
      </>
    ),
  },
};

export const GroupedRadios: Story = {
  args: {
    legend: 'Contact frequency',
    children: (
      <>
        <Radio label="Daily" name="frequency" value="daily" />
        <Radio label="Weekly" name="frequency" value="weekly" defaultChecked />
        <Radio label="Monthly" name="frequency" value="monthly" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    legend: 'Unavailable preferences',
    description: 'These options cannot currently be changed.',
    disabled: true,
    children: (
      <>
        <Checkbox label="Email" defaultChecked />
        <Checkbox label="Text message" />
      </>
    ),
  },
};
