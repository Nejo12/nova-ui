import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FormField } from '../form-field/form-field';
import { SearchInput } from './search-input';

const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  args: {
    'aria-label': 'Search clients',
    placeholder: 'Search clients',
  },
  parameters: {
    docs: {
      description: {
        component:
          'SearchInput provides a native search field. Consumers own labels, query state, debounce behavior, submissions, and search results.',
      },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'Ada Lovelace',
  },
};

export const WithClearAction: Story = {
  render: (args) => <ControlledSearchInput {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Unavailable',
  },
};

export const WithFormField: Story = {
  render: () => (
    <FormField label="Search by name" htmlFor="clients-search">
      <SearchInput id="clients-search" placeholder="Search clients" />
    </FormField>
  ),
};

export const AccessibleLabelled: Story = {
  args: {
    'aria-label': 'Search clients by name',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When an external visible label is not present, provide an accessible name with aria-label or aria-labelledby. Search landmark semantics remain consumer-owned.',
      },
    },
  },
};

function ControlledSearchInput(props: React.ComponentProps<typeof SearchInput>) {
  const [query, setQuery] = useState('Ada Lovelace');

  return (
    <SearchInput
      {...props}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      {...(query === ''
        ? {}
        : {
            clearAction: {
              label: 'Clear client search',
              onClear: () => setQuery(''),
            },
          })}
    />
  );
}
