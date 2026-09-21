import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SearchInput } from './search-input';

afterEach(() => cleanup());

describe('SearchInput', () => {
  it('renders a native search input and forwards native attributes', () => {
    render(
      <SearchInput
        aria-label="Search clients"
        autoComplete="off"
        data-testid="search-input"
        id="clients-search"
        name="query"
        placeholder="Search clients"
        required
      />,
    );

    const input = screen.getByRole('searchbox', { name: 'Search clients' });
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('id', 'clients-search');
    expect(input).toHaveAttribute('name', 'query');
    expect(input).toHaveAttribute('placeholder', 'Search clients');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(input).toHaveAttribute('data-testid', 'search-input');
    expect(input).toBeRequired();
  });

  it('forwards aria-labelledby without adding search landmark semantics', () => {
    render(
      <>
        <span id="search-label">Find a client</span>
        <SearchInput aria-labelledby="search-label" />
      </>,
    );

    const input = screen.getByRole('searchbox', { name: 'Find a client' });
    expect(input).toHaveAttribute('aria-labelledby', 'search-label');
    expect(input).not.toHaveAttribute('role');
  });

  it('supports controlled values and change handlers', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SearchInput aria-label="Search" value="Ada" onChange={onChange} />,
    );

    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toHaveValue('Ada');

    fireEvent.change(input, { target: { value: 'Grace' } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(<SearchInput aria-label="Search" value="Grace" onChange={onChange} />);
    expect(input).toHaveValue('Grace');
  });

  it('supports an uncontrolled default value', () => {
    render(<SearchInput aria-label="Search" defaultValue="Ada" />);

    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('Ada');
  });

  it('uses medium size by default and supports both sizes', () => {
    const { rerender } = render(<SearchInput aria-label="Search" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveAttribute(
      'data-size',
      'medium',
    );

    rerender(<SearchInput aria-label="Search" size="small" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveAttribute('data-size', 'small');

    rerender(<SearchInput aria-label="Search" size="medium" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveAttribute(
      'data-size',
      'medium',
    );
  });

  it('forwards className and disabled semantics', () => {
    render(<SearchInput aria-label="Search" className="consumer-search" disabled />);

    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toHaveClass('consumer-search');
    expect(input).toBeDisabled();
  });

  it('does not render a clear action when one is not supplied', () => {
    render(<SearchInput aria-label="Search" />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders an accessible clear button and invokes its action on click', () => {
    const onClear = vi.fn();
    render(
      <SearchInput
        aria-label="Search"
        clearAction={{ label: 'Clear client search', onClear }}
        value="Ada"
        onChange={() => undefined}
      />,
    );

    const clearButton = screen.getByRole('button', { name: 'Clear client search' });
    expect(clearButton).toHaveAttribute('type', 'button');
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('keeps decorative glyphs out of the accessible name calculation', () => {
    render(
      <SearchInput
        aria-label="Search clients"
        clearAction={{ label: 'Clear client search', onClear: () => undefined }}
      />,
    );

    expect(screen.getByRole('searchbox', { name: 'Search clients' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear client search' })).toBeInTheDocument();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('disables the clear button with the input', () => {
    const onClear = vi.fn();
    render(
      <SearchInput aria-label="Search" clearAction={{ label: 'Clear search', onClear }} disabled />,
    );

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(clearButton).toBeDisabled();
    fireEvent.click(clearButton);
    expect(onClear).not.toHaveBeenCalled();
  });
});
