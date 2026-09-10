import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Textarea } from './textarea';

afterEach(() => cleanup());

describe('Textarea', () => {
  it('forwards native textarea props', () => {
    render(
      <Textarea
        aria-label="Description"
        name="description"
        maxLength={5000}
        required
        placeholder="Describe the role"
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Description' });
    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toHaveAttribute('maxlength', '5000');
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute('placeholder', 'Describe the role');
  });

  it('supports change handlers and values', () => {
    const onChange = vi.fn();
    render(<Textarea aria-label="Notes" onChange={onChange} />);

    const textarea = screen.getByRole('textbox', { name: 'Notes' });
    fireEvent.change(textarea, { target: { value: 'Updated notes' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue('Updated notes');
  });

  it('preserves validation and description attributes', () => {
    render(
      <Textarea
        aria-label="Experience notes"
        aria-invalid="true"
        aria-describedby="experience-error"
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Experience notes' });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'experience-error');
  });

  it('preserves native disabled semantics and consumer class names', () => {
    render(<Textarea aria-label="Unavailable" disabled className="consumer-textarea" />);

    const textarea = screen.getByRole('textbox', { name: 'Unavailable' });
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('consumer-textarea');
  });
});
