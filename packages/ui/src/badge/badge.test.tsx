import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Badge } from './badge';

afterEach(() => cleanup());

describe('Badge', () => {
  it('renders neutral tone by default', () => {
    render(<Badge>Open</Badge>);

    expect(screen.getByText('Open')).toHaveAttribute('data-tone', 'neutral');
  });

  it('supports semantic status tones', () => {
    const { rerender } = render(<Badge tone="info">Info</Badge>);
    expect(screen.getByText('Info')).toHaveAttribute('data-tone', 'info');

    rerender(<Badge tone="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveAttribute('data-tone', 'success');

    rerender(<Badge tone="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveAttribute('data-tone', 'warning');

    rerender(<Badge tone="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveAttribute('data-tone', 'danger');
  });

  it('forwards span attributes and consumer class names', () => {
    render(
      <Badge className="consumer-badge" aria-label="Application status">
        Reviewed
      </Badge>,
    );

    const badge = screen.getByLabelText('Application status');
    expect(badge).toHaveClass('consumer-badge');
    expect(badge).toHaveTextContent('Reviewed');
  });
});

describe('Badge public ref', () => {
  it('exposes the span DOM node and clears the object ref on unmount', () => {
    const ref = createRef<HTMLSpanElement>();
    const { unmount } = render(<Badge ref={ref}>Ready</Badge>);
    expect(ref.current?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.current).toBeNull();
  });

  it('invokes a callback ref with the DOM node and null on unmount', () => {
    const ref = vi.fn<(node: HTMLSpanElement | null) => void>();
    const { unmount } = render(<Badge ref={ref}>Ready</Badge>);
    expect(ref.mock.calls[0]?.[0]?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
  });
});
