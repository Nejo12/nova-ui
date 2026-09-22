import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { InlineLoading, type InlineLoadingSize, type InlineLoadingState } from './inline-loading';

afterEach(() => cleanup());

describe('InlineLoading', () => {
  it('renders loading medium by default', () => {
    render(<InlineLoading text="Saving changes" data-testid="inline-loading" />);

    const inlineLoading = screen.getByTestId('inline-loading');
    expect(inlineLoading).toHaveAttribute('data-state', 'loading');
    expect(inlineLoading).toHaveAttribute('data-size', 'medium');
    expect(screen.getByText('Saving changes')).toBeVisible();
    expect(inlineLoading.querySelector('[aria-hidden="true"]')).toHaveAttribute(
      'data-size',
      'medium',
    );
  });

  it.each<InlineLoadingSize>(['small', 'medium'])('renders the %s size', (size) => {
    render(<InlineLoading size={size} text="Uploading" data-testid="inline-loading" />);

    const inlineLoading = screen.getByTestId('inline-loading');
    expect(inlineLoading).toHaveAttribute('data-size', size);
    expect(inlineLoading.querySelector('[aria-hidden="true"]')).toHaveAttribute('data-size', size);
  });

  it.each<Exclude<InlineLoadingState, 'loading'>>(['success', 'error'])(
    'renders the %s state with a decorative glyph',
    (state) => {
      render(<InlineLoading state={state} text="Request complete" data-testid="inline-loading" />);

      const inlineLoading = screen.getByTestId('inline-loading');
      const indicator = inlineLoading.querySelector('[aria-hidden="true"]');
      expect(inlineLoading).toHaveAttribute('data-state', state);
      expect(indicator).toHaveTextContent(state === 'success' ? '✓' : '!');
      expect(indicator).toHaveAttribute('aria-hidden', 'true');
    },
  );

  it('is always a polite, atomic status region', () => {
    render(<InlineLoading text="Updating profile" data-testid="inline-loading" />);

    const inlineLoading = screen.getByRole('status');
    expect(inlineLoading).toHaveAttribute('aria-live', 'polite');
    expect(inlineLoading).toHaveAttribute('aria-atomic', 'true');
    expect(inlineLoading).not.toHaveAttribute('role', 'alert');
  });

  it('forwards safe span attributes and composes consumer class names', () => {
    render(
      <InlineLoading
        className="consumer-inline-loading"
        data-testid="inline-loading"
        text="Sending message"
        title="Sending"
      />,
    );

    const inlineLoading = screen.getByTestId('inline-loading');
    expect(inlineLoading).toHaveClass('consumer-inline-loading');
    expect(inlineLoading).toHaveAttribute('title', 'Sending');
  });

  it('blocks runtime semantic overrides and children injection', () => {
    const unsafeProps = {
      'aria-atomic': 'false',
      'aria-live': 'assertive',
      children: 'Unsafe child',
      role: 'alert',
    } as unknown as Parameters<typeof InlineLoading>[0];

    render(<InlineLoading {...unsafeProps} data-testid="inline-loading" text="Safe status" />);

    const inlineLoading = screen.getByRole('status');
    expect(inlineLoading).toHaveAttribute('aria-live', 'polite');
    expect(inlineLoading).toHaveAttribute('aria-atomic', 'true');
    expect(inlineLoading).not.toHaveAttribute('role', 'alert');
    expect(screen.queryByText('Unsafe child')).not.toBeInTheDocument();
    expect(screen.getByText('Safe status')).toBeVisible();
  });
});
