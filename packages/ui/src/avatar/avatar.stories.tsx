import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    initials: 'OG',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar is an initials-only identity primitive. It is decorative by default; supply aria-label or aria-labelledby only when its identity information needs to be announced.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const Small: Story = {
  args: {
    initials: 'MK',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    initials: 'IF',
    size: 'large',
  },
};

export const DifferentInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar initials="OG" size="small" />
      <Avatar initials="GA" size="medium" />
      <Avatar initials="IF" size="large" />
    </div>
  ),
};

export const LightAndDarkBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <Avatar initials="OG" />
      </div>
      <div data-nova-theme="dark" style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <Avatar initials="OG" />
      </div>
    </div>
  ),
};

export const Decorative: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This Avatar is intentionally hidden from assistive technology because adjacent text identifies the person.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Avatar initials="OG" />
      <span>Olaniyi Gabriel</span>
    </div>
  ),
};

export const AccessibleName: Story = {
  args: {
    initials: 'OG',
    'aria-label': 'Olaniyi Gabriel',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Providing an accessible name keeps the Avatar exposed to assistive technology instead of applying aria-hidden.',
      },
    },
  },
};
