import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../badge/badge';
import { VisuallyHidden } from './visually-hidden';

const meta = {
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
  args: {
    children: 'Additional context for assistive technology',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'VisuallyHidden keeps content in the document and accessibility tree while intentionally removing it from the visual layout.',
      },
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScreenReaderContext: Story = {
  args: {
    children: ' unread notifications',
  },
  parameters: {
    docs: {
      description: {
        story: 'The Badge is visible; the explanatory notification text is intentionally hidden.',
      },
    },
  },
  render: (args) => (
    <span>
      <Badge tone="info">3</Badge>
      <VisuallyHidden {...args} />
    </span>
  ),
};

export const ButtonAccessibleName: Story = {
  args: {
    children: 'Close panel',
  },
  parameters: {
    docs: {
      description: {
        story: 'The visible symbol is decorative; the intentionally hidden text names the button.',
      },
    },
  },
  render: (args) => (
    <button type="button">
      <span aria-hidden="true">×</span>
      <VisuallyHidden {...args} />
    </button>
  ),
};
