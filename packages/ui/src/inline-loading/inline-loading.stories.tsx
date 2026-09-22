import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineLoading, type InlineLoadingState } from './inline-loading';

const meta = {
  title: 'Feedback/InlineLoading',
  component: InlineLoading,
  args: {
    state: 'loading',
    size: 'small',
    text: 'Saving changes',
  },
  parameters: {
    docs: {
      description: {
        component:
          'InlineLoading is an announced inline async status. Spinner is decorative activity; Skeleton is a content placeholder; Progress is measurable completion; Toast is detached transient feedback; Result State is a stable resolved outcome.',
      },
    },
  },
} satisfies Meta<typeof InlineLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingSmall: Story = {
  args: { size: 'small', text: 'Saving changes' },
};

export const LoadingMedium: Story = {
  args: { size: 'medium', text: 'Saving changes' },
};

export const SuccessSmall: Story = {
  args: { state: 'success', size: 'small', text: 'Changes saved' },
};

export const SuccessMedium: Story = {
  args: { state: 'success', size: 'medium', text: 'Changes saved' },
};

export const ErrorSmall: Story = {
  args: { state: 'error', size: 'small', text: 'Could not save changes' },
};

export const ErrorMedium: Story = {
  args: { state: 'error', size: 'medium', text: 'Could not save changes' },
};

export const StateTransitionExample: Story = {
  render: () => <StateTransitionExampleContent />,
};

export const LightAndDarkBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ padding: 24, background: 'var(--nova-color-bg-page)' }}>
        <InlineLoading text="Saving changes" />
      </div>
      <div data-nova-theme="dark" style={{ padding: 24, background: 'var(--nova-color-bg-page)' }}>
        <InlineLoading text="Saving changes" />
      </div>
    </div>
  ),
};

function StateTransitionExampleContent() {
  const [state, setState] = useState<InlineLoadingState>('loading');
  const textByState: Record<InlineLoadingState, string> = {
    loading: 'Saving changes',
    success: 'Changes saved',
    error: 'Could not save changes',
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <InlineLoading state={state} text={textByState[state]} />
      <div style={{ display: 'flex', gap: 8 }}>
        {(['loading', 'success', 'error'] as const).map((nextState) => (
          <button key={nextState} type="button" onClick={() => setState(nextState)}>
            Show {nextState}
          </button>
        ))}
      </div>
    </div>
  );
}
