import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Radio } from './radio';

afterEach(() => cleanup());

describe('Radio', () => {
  it('renders an accessible radio with its label', () => {
    render(<Radio label="Conversational" name="germanRequirement" value="conversational" />);

    expect(screen.getByRole('radio', { name: 'Conversational' })).not.toBeChecked();
  });

  it('forwards native radio props', () => {
    render(
      <Radio
        label="Comfortable"
        name="germanRequirement"
        value="comfortable"
        defaultChecked
        required
      />,
    );

    const radio = screen.getByRole('radio', { name: 'Comfortable' });
    expect(radio).toBeChecked();
    expect(radio).toHaveAttribute('name', 'germanRequirement');
    expect(radio).toHaveAttribute('value', 'comfortable');
    expect(radio).toBeRequired();
  });

  it('forwards change handlers when an unchecked radio becomes checked', () => {
    const onChange = vi.fn();
    render(<Radio label="Basic" name="germanRequirement" value="basic" onChange={onChange} />);

    const radio = screen.getByRole('radio', { name: 'Basic' });
    expect(radio).not.toBeChecked();

    fireEvent.click(radio);

    expect(radio).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports description content', () => {
    render(<Radio label="Basic" description="Suitable for simple workplace communication." />);

    expect(screen.getByRole('radio', { name: /Basic/ })).toBeInTheDocument();
    expect(screen.getByText('Suitable for simple workplace communication.')).toBeInTheDocument();
  });

  it('preserves native disabled semantics', () => {
    render(<Radio label="Unavailable option" disabled />);

    expect(screen.getByRole('radio', { name: 'Unavailable option' })).toBeDisabled();
  });

  it('preserves consumer class names', () => {
    render(<Radio label="Custom" className="consumer-radio" />);

    expect(screen.getByRole('radio', { name: 'Custom' })).toHaveClass('consumer-radio');
  });
});

describe('Radio public ref', () => {
  it('exposes the input DOM node and clears the object ref on unmount', () => {
    const ref = createRef<HTMLInputElement>();
    const { unmount } = render(<Radio ref={ref} label="Choice" />);
    expect(ref.current?.tagName.toLowerCase()).toBe('input');
    ref.current?.focus();
    expect(ref.current).toHaveFocus();
    unmount();
    expect(ref.current).toBeNull();
  });

  it('invokes a callback ref with the DOM node and null on unmount', () => {
    const ref = vi.fn<(node: HTMLInputElement | null) => void>();
    const { unmount } = render(<Radio ref={ref} label="Choice" />);
    expect(ref.mock.calls[0]?.[0]?.tagName.toLowerCase()).toBe('input');
    unmount();
    expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
  });
});
