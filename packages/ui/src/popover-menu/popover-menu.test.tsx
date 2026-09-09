import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Menu, Popover } from './popover-menu';

afterEach(() => cleanup());

describe('Popover', () => {
  it('opens from its trigger, focuses content, and closes on Escape', () => {
    render(
      <Popover
        trigger={<button type="button">Open details</button>}
        title="Details"
        action={<button type="button">Continue</button>}
      >
        Helpful context
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'Open details' });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('preserves a consumer trigger click handler and respects preventDefault', () => {
    const onClick = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault());

    render(
      <Popover trigger={<button onClick={onClick}>Open details</button>} title="Details">
        Helpful context
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when pointer interaction occurs outside the overlay root', () => {
    render(
      <>
        <Popover trigger={<button type="button">Open details</button>} title="Details">
          Helpful context
        </Popover>
        <button type="button">Outside</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Menu', () => {
  const createItems = () => [
    { id: 'edit', label: 'Edit', onSelect: vi.fn() },
    { id: 'duplicate', label: 'Duplicate', onSelect: vi.fn(), disabled: true },
    { id: 'delete', label: 'Delete', onSelect: vi.fn(), tone: 'danger' as const },
  ];

  it('opens with ArrowDown and focuses the first enabled item', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('opens with ArrowUp and focuses the last enabled item', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key: 'ArrowUp' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('skips disabled items during arrow navigation and wraps', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    const menu = screen.getByRole('menu');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('supports Home and End navigation', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    const menu = screen.getByRole('menu');

    fireEvent.keyDown(menu, { key: 'End' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('selects an item, closes the menu, and restores trigger focus', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));

    expect(items[2]?.onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes with Escape and restores focus to the trigger', () => {
    const items = createItems();
    render(<Menu trigger={<button type="button">Actions</button>} items={items} />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
