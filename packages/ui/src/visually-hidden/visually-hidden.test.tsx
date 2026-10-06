import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { VisuallyHidden } from './visually-hidden';

afterEach(() => cleanup());

describe('VisuallyHidden', () => {
  it('renders children in a span by default', () => {
    render(<VisuallyHidden>Additional context</VisuallyHidden>);

    const content = screen.getByText('Additional context');
    expect(content.tagName).toBe('SPAN');
  });

  it('preserves consumer class names', () => {
    render(<VisuallyHidden className="consumer-hidden">Hidden details</VisuallyHidden>);

    expect(screen.getByText('Hidden details')).toHaveClass('consumer-hidden');
  });

  it('forwards native and ARIA attributes', () => {
    render(
      <VisuallyHidden id="status-context" aria-live="polite" data-testid="status-context">
        Status updated
      </VisuallyHidden>,
    );

    const content = screen.getByTestId('status-context');
    expect(content).toHaveAttribute('id', 'status-context');
    expect(content).toHaveAttribute('aria-live', 'polite');
  });

  it('remains in the DOM and contributes to an accessible name', () => {
    render(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Close panel</VisuallyHidden>
      </button>,
    );

    const hiddenContent = screen.getByText('Close panel');
    expect(hiddenContent).toBeInTheDocument();
    expect(hiddenContent).not.toHaveAttribute('aria-hidden');
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument();
  });
});

describe('VisuallyHidden public ref', () => {
  it('exposes the span DOM node and clears the object ref on unmount', () => {
    const ref = createRef<HTMLSpanElement>();
    const { unmount } = render(<VisuallyHidden ref={ref}>Label</VisuallyHidden>);
    expect(ref.current?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.current).toBeNull();
  });

  it('invokes a callback ref with the DOM node and null on unmount', () => {
    const ref = vi.fn<(node: HTMLSpanElement | null) => void>();
    const { unmount } = render(<VisuallyHidden ref={ref}>Label</VisuallyHidden>);
    expect(ref.mock.calls[0]?.[0]?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
  });
});
