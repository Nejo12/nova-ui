import type { Meta, StoryObj } from '@storybook/react-vite';

import { DelayedReveal, Skeleton, SkeletonRegion } from './skeleton';

const meta = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  args: {
    height: '1rem',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WidthAndRadii: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '24rem' }}>
      <Skeleton height="1rem" />
      <Skeleton width="75%" height="1.5rem" radius="md" />
      <Skeleton width="8rem" height="2rem" radius="pill" />
    </div>
  ),
};

export const BusyRegion: Story = {
  render: () => (
    <SkeletonRegion label="Loading account overview">
      <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '24rem' }}>
        <Skeleton height="2rem" radius="md" />
        <Skeleton height="1rem" />
        <Skeleton width="65%" height="1rem" />
      </div>
    </SkeletonRegion>
  ),
};

export const Delayed: Story = {
  render: () => (
    <DelayedReveal>
      <Skeleton width="16rem" height="3rem" radius="md" />
    </DelayedReveal>
  ),
};
