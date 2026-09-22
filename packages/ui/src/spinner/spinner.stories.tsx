import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner, type SpinnerSize } from './spinner';

const sizes: SpinnerSize[] = ['small', 'medium', 'large'];

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: {
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Spinner is a decorative indeterminate loading primitive. It does not announce loading state; use InlineLoading or another appropriate status region when loading must be communicated to assistive technology.',
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {};

export const Large: Story = {
  args: { size: 'large' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Spinner size={size} />
          <code>{size}</code>
        </div>
      ))}
    </div>
  ),
};

export const LightAndDarkBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ padding: 24, background: 'var(--nova-color-bg-page)' }}>
        <Spinner />
      </div>
      <div data-nova-theme="dark" style={{ padding: 24, background: 'var(--nova-color-bg-page)' }}>
        <Spinner />
      </div>
    </div>
  ),
};
