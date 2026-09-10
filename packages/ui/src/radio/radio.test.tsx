import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Radio } from './radio';

afterEach(() => cleanup());

describe('Radio', () => {
  it('renders an accessible radio with its label', () => {
    render(<Radio label="Conversational" name="germanRequirement" value="conversational" />);

    expect(screen.getByRole('radio', { name: 'Conversational' })).not.toBeChecked();
  });

  it('forwards native radio props and change handlers', () => {
    const onChange = vi.fn();
    render(
      <Radio
        label="Comfortable"
        name="germanRequirement"
        value="comfortable"
        defaultChecked
        required
        onChange={onChange}
      />,
    );

    const radio = screen.getByRole('radio', { name: 'Comfortable' });
    expect(radio).toBeChecked();
    expect(radio).toHaveAttribute('name', 'germanRequirement');
    expect(radio).toHaveAttribute('value', 'comfortable');
    expect(radio).toBeRequired();

    fireEvent.click(radio);
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
