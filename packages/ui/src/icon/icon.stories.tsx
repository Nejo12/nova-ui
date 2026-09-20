import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, type IconName, type IconSize, type IconTone } from './icon';

const iconNames: IconName[] = [
  'search',
  'notifications',
  'chevron-down',
  'chevron-right',
  'add',
  'close',
  'check',
  'info',
  'warning',
  'more',
  'calendar',
  'user',
];

const iconSizes: IconSize[] = [16, 20, 24, 32];
const iconTones: IconTone[] = ['default', 'muted', 'info', 'success', 'warning', 'danger'];

const meta = {
  title: 'Foundations/Icon',
  component: Icon,
  args: {
    name: 'search',
    size: 24,
    tone: 'default',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon provides Nova semantic names over a deliberately small Lucide-backed set. Icons are decorative by default; an icon-only interactive control must provide its accessible name on the containing control.',
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(8rem, 1fr))',
        gap: 16,
      }}
    >
      {iconNames.map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name={name} />
          <code>{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {iconSizes.map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Icon name="notifications" size={size} />
          <code>{size}</code>
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {iconTones.map((tone) => (
        <div key={tone} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="info" tone={tone} />
          <code>{tone}</code>
        </div>
      ))}
    </div>
  ),
};

export const LightAndDarkBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <Icon name="notifications" />
      </div>
      <div data-nova-theme="dark" style={{ padding: 16, background: 'var(--nova-color-bg-page)' }}>
        <Icon name="notifications" />
      </div>
    </div>
  ),
};

export const AccessibleIconOnlyControl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Icon remains decorative. The native button, rather than the SVG, receives the accessible name.',
      },
    },
  },
  render: () => (
    <button type="button" aria-label="Search">
      <Icon name="search" />
    </button>
  ),
};
