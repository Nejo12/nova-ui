import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Card } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'A simple content surface for related information.',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(36rem, calc(100vw - 2rem))' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleContent: Story = {};

export const HeadingAndBody: Story = {
  args: {
    'aria-labelledby': 'design-review-heading',
    children: (
      <>
        <h2 id="design-review-heading" style={{ marginTop: 0 }}>
          Design review
        </h2>
        <p style={{ marginBottom: 0 }}>
          Review the latest proposal and leave feedback for the team.
        </p>
      </>
    ),
  },
};

export const ComposedContent: Story = {
  args: {
    'aria-labelledby': 'report-heading',
    children: (
      <>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <h2 id="report-heading" style={{ margin: 0 }}>
            Quarterly report
          </h2>
          <Badge tone="success">Ready</Badge>
        </header>
        <p>Performance results and supporting notes are ready to review.</p>
        <footer style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button>Open report</Button>
          <Button variant="secondary">Download</Button>
        </footer>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'The elevated variant uses the existing surface elevation token.',
  },
};
