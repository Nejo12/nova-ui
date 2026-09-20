import type { Meta, StoryObj } from '@storybook/react-vite';

import { getNavigationItemClassName } from './navigation-item';

const meta = {
  title: 'Foundations/Navigation item',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Navigation item is a router-agnostic styling helper, not a DOM component. Consumers own the Link or NavLink element, routing, localization, and aria-current. isCurrent changes visual state only; disabled navigation is intentionally unsupported.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleHref = '#navigation-item-example';

export const Default: Story = {
  render: () => (
    <a href={exampleHref} className={getNavigationItemClassName()}>
      Dashboard
    </a>
  ),
};

export const Hover: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover the consumer-owned anchor to view the hover state.',
      },
    },
  },
  render: () => (
    <a href={exampleHref} className={getNavigationItemClassName()}>
      Dashboard
    </a>
  ),
};

export const Current: Story = {
  render: () => (
    <a
      href={exampleHref}
      aria-current="page"
      className={getNavigationItemClassName({ isCurrent: true })}
    >
      Dashboard
    </a>
  ),
};

export const FocusVisibleGuidance: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use keyboard Tab to focus the actual anchor. The focus-visible ring is intentionally attached to that consumer-owned interactive element.',
      },
    },
  },
  render: () => (
    <a href={exampleHref} className={getNavigationItemClassName()}>
      Dashboard
    </a>
  ),
};

export const LongLabel: Story = {
  render: () => (
    <a href={exampleHref} className={getNavigationItemClassName()}>
      Marketing and customer retention
    </a>
  ),
};

export const ConstrainedAndFullWidth: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 320 }}>
      <div style={{ width: 180 }}>
        <a href={exampleHref} className={getNavigationItemClassName()}>
          Constrained width
        </a>
      </div>
      <a
        href={exampleHref}
        className={getNavigationItemClassName({ className: 'full-width-example' })}
      >
        Full-width consumer layout
      </a>
    </div>
  ),
};
