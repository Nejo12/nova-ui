import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Dialog } from './dialog';

afterEach(() => cleanup());

beforeEach(() => {
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      writable: true,
      value: vi.fn(function showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      }),
    },
    close: {
      configurable: true,
      writable: true,
      value: vi.fn(function close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      }),
    },
  });
  document.body.style.removeProperty('overflow');
});

describe('Dialog', () => {
  it('opens an accessible info dialog and focuses its action', () => {
    render(
      <Dialog
        open
        title="Important information"
        description="Review this information before continuing."
        action={{ label: 'Got it', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', { name: 'Important information' });
    expect(dialog).toHaveAccessibleDescription('Review this information before continuing.');
    expect(screen.getByRole('button', { name: 'Got it' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('focuses cancel first for confirmation dialogs and keeps action explicit', () => {
    const action = vi.fn();
    render(
      <Dialog
        open
        type="confirmation"
        title="Confirm action"
        cancelLabel="Cancel"
        action={{ label: 'Confirm', onAction: action }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(action).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog')).toHaveAttribute('open');
  });

  it('exposes destructive context and a working cancel action', () => {
    const onClose = vi.fn();
    render(
      <Dialog
        open
        type="destructive"
        size="medium"
        title="Delete item?"
        description="This cannot be undone."
        destructiveContext="Permanent action"
        cancelLabel="Keep item"
        action={{ label: 'Delete', onAction: vi.fn() }}
        onClose={onClose}
      />,
    );

    const dialog = screen.getByRole('dialog', { name: 'Delete item?' });
    expect(dialog).toHaveAttribute('data-type', 'destructive');
    expect(dialog).toHaveAttribute('data-size', 'medium');
    expect(screen.getByText('Permanent action')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Keep item' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('wraps focus within modal actions', () => {
    render(
      <Dialog
        open
        type="confirmation"
        title="Confirm action"
        cancelLabel="Cancel"
        action={{ label: 'Confirm', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog');
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    cancel.focus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(confirm).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(cancel).toHaveFocus();
  });

  it('moves focus back inside when tabbing from outside the dialog', () => {
    render(
      <Dialog
        open
        type="confirmation"
        title="Confirm action"
        cancelLabel="Cancel"
        action={{ label: 'Confirm', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog');
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    document.body.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(cancel).toHaveFocus();
  });

  it('ignores non-Tab key presses', () => {
    render(
      <Dialog
        open
        title="Information"
        action={{ label: 'Continue', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    const action = screen.getByRole('button', { name: 'Continue' });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowDown' });
    expect(action).toHaveFocus();
  });

  it('closes when open becomes false and restores body overflow and focus', () => {
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();
    document.body.style.overflow = 'auto';

    const { rerender } = render(
      <Dialog
        open
        title="Information"
        action={{ label: 'Continue', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Dialog
        open={false}
        title="Information"
        action={{ label: 'Continue', onAction: vi.fn() }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('open');
    expect(document.body.style.overflow).toBe('auto');
    expect(opener).toHaveFocus();
    opener.remove();
  });

  it('closes cancellable dialogs through Escape', () => {
    const onClose = vi.fn();
    render(
      <Dialog
        open
        title="Dismissible information"
        action={{ label: 'Continue', onAction: vi.fn() }}
        onClose={onClose}
      />,
    );

    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respects a mandatory acknowledgement that cannot close through Escape', () => {
    const onClose = vi.fn();
    render(
      <Dialog
        open
        title="Required acknowledgement"
        cancellable={false}
        action={{ label: 'Acknowledge', onAction: vi.fn() }}
        onClose={onClose}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(onClose).not.toHaveBeenCalled();
    expect(dialog).toHaveAttribute('open');
  });
});
