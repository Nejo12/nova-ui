import type { Meta, StoryObj } from '@storybook/react-vite';

import { getBottomNavigationItemClassName } from './bottom-navigation-item';

const meta = {
  title: 'Foundations/Bottom navigation item',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bottom navigation item is a router-agnostic styling helper, not a DOM component. Consumers own the Link or NavLink element, routing, localization, aria-current, and bar layout. isCurrent changes visual state only; disabled navigation is intentionally unsupported.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleHref = '#bottom-navigation-item-example';

export const Default: Story = {
  render: () => (
    <a href={exampleHref} className={getBottomNavigationItemClassName()}>
      Home
    </a>
  ),
};

export const Current: Story = {
  render: () => (
    <a
      href={exampleHref}
      aria-current="page"
      className={getBottomNavigationItemClassName({ isCurrent: true })}
    >
      Home
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
    <a href={exampleHref} className={getBottomNavigationItemClassName()}>
      Calendar
    </a>
  ),
};

export const ItemDimensions: Story = {
  render: () => (
    <a href={exampleHref} className={getBottomNavigationItemClassName()}>
      Clients
    </a>
  ),
};

export const FiveItemRow: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <a
        href={exampleHref}
        aria-current="page"
        className={getBottomNavigationItemClassName({ isCurrent: true })}
      >
        Home
      </a>
      <a href={exampleHref} className={getBottomNavigationItemClassName()}>
        Calendar
      </a>
      <a href={exampleHref} className={getBottomNavigationItemClassName()}>
        Clients
      </a>
      <a href={exampleHref} className={getBottomNavigationItemClassName()}>
        Recovery
      </a>
      <a href={exampleHref} className={getBottomNavigationItemClassName()}>
        More
      </a>
    </div>
  ),
};
