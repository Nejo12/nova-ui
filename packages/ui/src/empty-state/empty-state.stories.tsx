import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { EmptyState } from './empty-state';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  args: {
    heading: 'No vacancies yet',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(40rem, calc(100vw - 2rem))' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingOnly: Story = {};

export const WithDescription: Story = {
  args: {
    heading: 'No applications yet',
    description: 'Applications will appear here as soon as candidates apply.',
  },
};

export const WithAction: Story = {
  args: {
    heading: 'No vacancies yet',
    description: 'Create your first vacancy to start receiving applications.',
    action: <Button>Create vacancy</Button>,
  },
};

export const WithLinkAction: Story = {
  args: {
    heading: 'No saved candidates',
    description: 'Browse candidates and save the people you want to revisit.',
    action: <a href="/candidates">Browse candidates</a>,
  },
};
