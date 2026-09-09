import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './toast';

afterEach(() => cleanup());

describe('Toast', () => {
  it('uses polite status semantics for non-error tones', () => {
    render(
      <Toast dismissLabel="Dismiss notification" onDismiss={vi.fn()}>
        Saved successfully.
      </Toast>,
    );

    const toast = screen.getByRole('status');
    expect(toast).toHaveTextContent('Saved successfully.');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
    expect(toast).toHaveAttribute('data-tone', 'info');
  });

  it('uses assertive alert semantics for errors', () => {
    render(
      <Toast tone="error" dismissLabel="Dismiss error" onDismiss={vi.fn()}>
        Something went wrong.
      </Toast>,
    );

    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('data-tone', 'error');
  });

  it('invokes the optional action without implicitly dismissing', () => {
    const onAction = vi.fn();
    const onDismiss = vi.fn();

    render(
      <Toast
        tone="warning"
        dismissLabel="Dismiss warning"
        onDismiss={onDismiss}
        action={{ label: 'Undo', onAction }}
      >
        Item removed.
      </Toast>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('supports a disabled action', () => {
    render(
      <Toast
        dismissLabel="Dismiss notification"
        onDismiss={vi.fn()}
        action={{ label: 'Retry', onAction: vi.fn(), disabled: true }}
      >
        Retry unavailable.
      </Toast>,
    );

    expect(screen.getByRole('button', { name: 'Retry' })).toBeDisabled();
  });

  it('invokes dismiss from the labelled dismiss button', () => {
    const onDismiss = vi.fn();

    render(
      <Toast tone="success" dismissLabel="Dismiss success" onDismiss={onDismiss}>
        Changes saved.
      </Toast>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss success' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
