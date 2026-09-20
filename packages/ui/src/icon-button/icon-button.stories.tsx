import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from './icon-button';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: 'search',
    'aria-label': 'Search',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'IconButton is a compact icon-only action control. Every instance needs an accessible name through aria-label or aria-labelledby; the nested Nova Icon remains decorative.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
    icon: 'chevron-down',
    'aria-label': 'Open options',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    icon: 'notifications',
    'aria-label': 'Notifications',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    icon: 'add',
    'aria-label': 'Add item',
  },
};

export const RepresentativeIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton icon="search" aria-label="Search" />
      <IconButton icon="calendar" aria-label="Open calendar" />
      <IconButton icon="more" aria-label="More options" />
      <IconButton icon="close" aria-label="Close panel" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: 'close',
    'aria-label': 'Close panel',
    disabled: true,
  },
};

export const LightAndDarkBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <IconButton icon="notifications" aria-label="Notifications" />
      </div>
      <div data-nova-theme="dark" style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <IconButton icon="notifications" aria-label="Notifications" />
      </div>
    </div>
  ),
};

export const InteractionStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Hovering shows the subtle semantic surface; keyboard focus shows the 3px focus-ring outline. Disabled uses native button semantics.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton icon="search" aria-label="Search" />
      <IconButton icon="search" aria-label="Search unavailable" disabled />
    </div>
  ),
};
