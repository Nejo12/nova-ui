import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { InlineAlert, type InlineAlertTone } from './inline-alert';

describe('InlineAlert', () => {
  it.each<InlineAlertTone>(['info', 'success', 'warning', 'error'])(
    'renders the %s tone as persistent in-flow content',
    (tone) => {
      render(
        <InlineAlert tone={tone} title={`${tone} title`}>
          Feedback for {tone}
        </InlineAlert>,
      );

      const alert = screen.getByText(`${tone} title`).parentElement?.parentElement;
      expect(alert).toHaveAttribute('data-tone', tone);
      expect(alert).not.toHaveAttribute('role');
      expect(alert).not.toHaveAttribute('aria-live');
      expect(alert).not.toHaveAttribute('aria-atomic');
      expect(alert).toHaveTextContent(`Feedback for ${tone}`);
    },
  );

  it.each<['polite' | 'assertive', 'status' | 'alert']>([
    ['polite', 'status'],
    ['assertive', 'alert'],
  ])('exposes an explicitly requested %s announcement', (announcement, role) => {
    render(
      <InlineAlert title="Account update" announcement={announcement}>
        Review the new information.
      </InlineAlert>,
    );

    const alert = screen.getByRole(role);
    expect(alert).toHaveAttribute('aria-live', announcement);
    expect(alert).toHaveAttribute('aria-atomic', 'true');
  });

  it('keeps visual tone separate from announcement urgency', () => {
    const { rerender } = render(
      <InlineAlert tone="error" title="Persistent error">
        This existing message is not announced again.
      </InlineAlert>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    rerender(
      <InlineAlert tone="info" title="Urgent information" announcement="assertive">
        This newly inserted information needs immediate announcement.
      </InlineAlert>,
    );

    expect(screen.getByRole('alert')).toHaveAttribute('data-tone', 'info');
  });

  it('renders a consumer-provided action without invoking it', () => {
    const onAction = vi.fn();

    render(
      <InlineAlert
        tone="warning"
        title="Check this"
        action={
          <button type="button" onClick={onAction}>
            Review details
          </button>
        }
      >
        Review the highlighted condition before continuing.
      </InlineAlert>,
    );

    expect(onAction).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Review details' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders consumer-provided content unchanged', () => {
    render(
      <InlineAlert title="Aktion erforderlich" tone="error">
        Behebe dieses Problem, bevor du es erneut versuchst.
      </InlineAlert>,
    );

    expect(screen.getByText('Aktion erforderlich')).toBeInTheDocument();
    expect(
      screen.getByText('Behebe dieses Problem, bevor du es erneut versuchst.'),
    ).toBeInTheDocument();
  });
});
