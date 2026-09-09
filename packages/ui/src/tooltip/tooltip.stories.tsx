import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './tooltip';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  args: {
    content: 'Helpful context',
    children: <button type="button">More information</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};

export const Bottom: Story = {
  args: {
    placement: 'bottom',
  },
};

export const Left: Story = {
  args: {
    placement: 'left',
  },
};

export const Right: Story = {
  args: {
    placement: 'right',
  },
};

export const ExistingDescription: Story = {
  args: {
    children: (
      <button type="button" aria-describedby="existing-description">
        Described target
      </button>
    ),
  },
  render: (args) => (
    <>
      <span id="existing-description">Existing context</span>
      <Tooltip {...args} />
    </>
  ),
};

export const NarrowSurface: Story = {
  args: {
    placement: 'left',
    content:
      'This intentionally longer tooltip demonstrates narrow-screen placement fallback and text wrapping.',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
