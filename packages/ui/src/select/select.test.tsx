import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Select } from './select';

afterEach(() => cleanup());

describe('Select', () => {
  it('renders an accessible native select and forwards native props', () => {
    render(
      <Select aria-label="Job category" name="jobCategory" required defaultValue="engineering">
        <option value="">Select a category</option>
        <option value="engineering">Engineering</option>
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Job category' });
    expect(select).toHaveAttribute('name', 'jobCategory');
    expect(select).toBeRequired();
    expect(select).toHaveValue('engineering');
  });

  it('supports change handlers and option selection', () => {
    const onChange = vi.fn();
    render(
      <Select aria-label="Workplace type" defaultValue="onsite" onChange={onChange}>
        <option value="onsite">On-site</option>
        <option value="hybrid">Hybrid</option>
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Workplace type' });
    fireEvent.change(select, { target: { value: 'hybrid' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('hybrid');
  });

  it('preserves native disabled semantics', () => {
    render(
      <Select aria-label="Disabled select" disabled>
        <option>Unavailable</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Disabled select' })).toBeDisabled();
  });

  it('preserves validation and consumer class names', () => {
    render(
      <Select
        aria-label="Salary period"
        aria-invalid="true"
        aria-describedby="salary-period-error"
        className="consumer-select"
      >
        <option value="monthly">Monthly</option>
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Salary period' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'salary-period-error');
    expect(select).toHaveClass('consumer-select');
  });
});
