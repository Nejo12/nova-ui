import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tooltip, type TooltipPlacement } from './tooltip';

afterEach(() => cleanup());

describe('Tooltip', () => {
  it('opens on pointer hover and remains associated with the trigger', () => {
    render(
      <Tooltip content="Helpful context">
        <button type="button">More information</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'More information' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.pointerEnter(trigger);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Helpful context');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);

    fireEvent.pointerLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on keyboard focus and closes when focus leaves', () => {
    render(
      <>
        <Tooltip content="Keyboard context" placement="bottom">
          <button type="button">Focus target</button>
        </Tooltip>
        <button type="button">Next control</button>
      </>,
    );

    const trigger = screen.getByRole('button', { name: 'Focus target' });
    const next = screen.getByRole('button', { name: 'Next control' });

    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toHaveAttribute(
      'data-placement',
      'bottom',
    );

    fireEvent.blur(trigger, { relatedTarget: next });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('keeps a focused tooltip open after the pointer leaves', () => {
    render(
      <Tooltip content="Persistent while focused">
        <button type="button">Combined target</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Combined target' });
    fireEvent.focus(trigger);
    fireEvent.pointerEnter(trigger);
    fireEvent.pointerLeave(trigger);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('dismisses on Escape without changing the trigger contract', () => {
    render(
      <Tooltip content="Dismissible context">
        <button type="button">Escape target</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Escape target' });
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('preserves an existing trigger description and event handler', () => {
    const onClick = vi.fn();
    render(
      <>
        <span id="existing-description">Existing context</span>
        <Tooltip content="Additional context">
          <button
            type="button"
            aria-describedby="existing-description"
            onClick={onClick}
          >
            Described target
          </button>
        </Tooltip>
      </>,
    );

    const trigger = screen.getByRole('button', { name: 'Described target' });
    expect(trigger).toHaveAttribute('aria-describedby', 'existing-description');

    fireEvent.pointerEnter(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(trigger.getAttribute('aria-describedby')?.split(' ')).toEqual([
      'existing-description',
      tooltip.id,
    ]);

    fireEvent.click(trigger);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each<TooltipPlacement>(['top', 'bottom', 'left', 'right'])(
    'supports the %s placement',
    (placement) => {
      render(
        <Tooltip content="Placement context" placement={placement}>
          <button type="button">Placement target</button>
        </Tooltip>,
      );

      fireEvent.pointerEnter(
        screen.getByRole('button', { name: 'Placement target' }),
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute(
        'data-placement',
        placement,
      );
    },
  );

  it('renders consumer-provided content unchanged', () => {
    render(
      <Tooltip content="Zusätzlicher hilfreicher Kontext">
        <button type="button">Weitere Informationen</button>
      </Tooltip>,
    );

    fireEvent.pointerEnter(
      screen.getByRole('button', { name: 'Weitere Informationen' }),
    );
    expect(
      screen.getByText('Zusätzlicher hilfreicher Kontext'),
    ).toBeInTheDocument();
  });
});
