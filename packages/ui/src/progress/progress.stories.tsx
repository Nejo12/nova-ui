import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './progress';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  args: {
    value: 50,
    'aria-label': 'Progress',
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
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Low: Story = {
  args: {
    value: 20,
  },
};

export const Medium: Story = {
  args: {
    value: 60,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const CustomRange: Story = {
  args: {
    value: 75,
    min: 50,
    max: 150,
    'aria-label': 'Import progress',
  },
};

export const LabelledByText: Story = {
  args: {
    value: 70,
    'aria-label': undefined,
    'aria-labelledby': 'progress-label',
  },
  render: (args) => (
    <div>
      <div id="progress-label" style={{ marginBottom: 8 }}>
        File upload: {args.value}%
      </div>
      <Progress {...args} />
    </div>
  ),
};
