import type { Meta, StoryObj } from '@storybook/react-vite';

import { Menu, Popover } from './popover-menu';

const meta = {
  title: 'Overlay/PopoverMenu',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const PopoverStart: Story = {
  render: () => (
    <Popover
      trigger={<button type="button">Open details</button>}
      title="Helpful details"
      action={<button type="button">Continue</button>}
    >
      This content remains consumer-owned and can contain arbitrary product-agnostic React content.
    </Popover>
  ),
};

export const PopoverEnd: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Popover
        align="end"
        trigger={<button type="button">Open details</button>}
        title="Aligned details"
      >
        The overlay is aligned to the end edge of its trigger.
      </Popover>
    </div>
  ),
};

export const MenuDefault: Story = {
  render: () => (
    <Menu
      trigger={<button type="button">Actions</button>}
      items={[
        { id: 'edit', label: 'Edit', onSelect: () => undefined },
        { id: 'duplicate', label: 'Duplicate', onSelect: () => undefined, shortcut: '⌘D' },
        { id: 'archive', label: 'Archive', onSelect: () => undefined, disabled: true },
        { id: 'delete', label: 'Delete', onSelect: () => undefined, tone: 'danger' },
      ]}
    />
  ),
};

export const MenuEndAligned: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu
        align="end"
        trigger={<button type="button">More actions</button>}
        items={[
          { id: 'rename', label: 'Rename', onSelect: () => undefined },
          { id: 'share', label: 'Share', onSelect: () => undefined },
          { id: 'remove', label: 'Remove', onSelect: () => undefined, tone: 'danger' },
        ]}
      />
    </div>
  ),
};
