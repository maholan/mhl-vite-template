"use client";

import { type JSX } from "react";
import { useListData } from "react-stately";

import { Dot, User01 } from "@/components/ui/assets";

import { TagSelect } from "./tag-select";

import type { SelectItemType } from "../select-context";
import type { Meta, StoryObj } from "@storybook/react";

// ─── Item datasets ────────────────────────────────────────────────────────────

const plainItems: SelectItemType[] = [
  { id: "1", label: "Wade Warren" },
  { id: "2", label: "Arlene McCoy" },
  { id: "3", label: "Devon Lane" },
  { id: "4", label: "Jane Cooper" },
  { id: "5", label: "Cody Fisher" },
  { id: "6", label: "Esther Howard" },
];

const avatarItems: SelectItemType[] = [
  { id: "1", label: "Wade Warren", avatarUrl: "https://i.pravatar.cc/32?img=11" },
  { id: "2", label: "Arlene McCoy", avatarUrl: "https://i.pravatar.cc/32?img=5" },
  { id: "3", label: "Devon Lane", avatarUrl: "https://i.pravatar.cc/32?img=8" },
  { id: "4", label: "Jane Cooper", avatarUrl: "https://i.pravatar.cc/32?img=47" },
  { id: "5", label: "Cody Fisher", avatarUrl: "https://i.pravatar.cc/32?img=12" },
  { id: "6", label: "Esther Howard", avatarUrl: "https://i.pravatar.cc/32?img=9" },
];

const iconItems: SelectItemType[] = [
  { id: "1", label: "Wade Warren", icon: User01 },
  { id: "2", label: "Arlene McCoy", icon: User01 },
  { id: "3", label: "Devon Lane", icon: User01 },
  { id: "4", label: "Jane Cooper", icon: User01 },
  { id: "5", label: "Cody Fisher", icon: User01 },
  { id: "6", label: "Esther Howard", icon: User01 },
];

const dotItems: SelectItemType[] = [
  { id: "1", label: "Wade Warren", icon: <Dot size="md" className="text-success-500" /> },
  { id: "2", label: "Arlene McCoy", icon: <Dot size="md" className="text-warning-500" /> },
  { id: "3", label: "Devon Lane", icon: <Dot size="md" className="text-error-500" /> },
  { id: "4", label: "Jane Cooper", icon: <Dot size="md" className="text-success-500" /> },
  { id: "5", label: "Cody Fisher", icon: <Dot size="md" className="text-icon-quaternary" /> },
  { id: "6", label: "Esther Howard", icon: <Dot size="md" className="text-brand-500" /> },
];

const supportingTextItems: SelectItemType[] = [
  { id: "1", label: "Wade Warren", supportingText: "@wadewarren" },
  { id: "2", label: "Arlene McCoy", supportingText: "@arlenemccoy" },
  { id: "3", label: "Devon Lane", supportingText: "@devonlane" },
  { id: "4", label: "Jane Cooper", supportingText: "@janecooper" },
  { id: "5", label: "Cody Fisher", supportingText: "@codyfisher" },
  { id: "6", label: "Esther Howard", supportingText: "@estherhoward" },
];

const avatarWithTextItems: SelectItemType[] = avatarItems.map((item, i) => ({
  ...item,
  supportingText: supportingTextItems[i].supportingText,
}));

const itemsWithDisabled: SelectItemType[] = plainItems.map((item, i) => ({
  ...item,
  isDisabled: i === 2 || i === 4,
}));

// ─── Demo wrapper (owns the ListData state) ───────────────────────────────────

interface DemoProps extends Omit<Parameters<typeof TagSelect>[0], "selectedItems" | "children"> {
  items?: SelectItemType[];
  initialSelected?: SelectItemType[];
  selectionIndicator?: "checkmark" | "checkbox" | "none";
  selectionIndicatorAlign?: "left" | "right";
}

const TagSelectDemo = ({
  items = plainItems,
  initialSelected = [],
  selectionIndicator = "checkmark",
  selectionIndicatorAlign = "left",
  ...props
}: DemoProps): JSX.Element => {
  const selectedItems = useListData<SelectItemType>({ initialItems: initialSelected });
  return (
    <TagSelect {...props} items={items} selectedItems={selectedItems}>
      {(item) => (
        <TagSelect.Item
          key={item.id}
          {...item}
          selectionIndicator={selectionIndicator}
          selectionIndicatorAlign={selectionIndicatorAlign}
        />
      )}
    </TagSelect>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TagSelect> = {
  title: "Base/Selects/TagSelect",
  component: TagSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-select that renders chosen values as removable tag chips inline in the input. " +
          "Supports keyboard navigation (Arrow keys move between tags, Backspace removes). " +
          "Item variants: default text, icon leading, avatar leading, dot leading, and supporting text. " +
          "Built on React Aria ComboBox.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "sm" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    isDisabled: { control: "boolean" },
    shortcut: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual stories ────────────────────────────────────────────────────────

/** Plain text items, no pre-selection. */
export const Default: Story = {
  args: { placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} />,
};

/** Label + hint text displayed around the field. */
export const WithLabelAndHint: Story = {
  args: {
    label: "Team members",
    hint: "Type to search and add members.",
    placeholder: "Search members…",
  },
  render: (args) => <TagSelectDemo {...args} />,
};

/** Items decorated with round avatar photos (avatarUrl). */
export const WithAvatarItems: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarItems} />,
};

/** Items with a leading icon component (User01). */
export const WithIconItems: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={iconItems} />,
};

/** Items with a leading colored status dot (ReactNode icon). */
export const WithDotItems: Story = {
  args: { label: "Status", placeholder: "Search status…" },
  render: (args) => <TagSelectDemo {...args} items={dotItems} />,
};

/** Items with secondary supporting text (e.g. @username). */
export const WithSupportingText: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={supportingTextItems} />,
};

/** Avatar + supporting text combined — the richest item variant. */
export const WithAvatarAndSupportingText: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarWithTextItems} />,
};

/** Checkbox as the selection indicator instead of a checkmark. */
export const WithCheckboxIndicator: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarItems} selectionIndicator="checkbox" />,
};

/** Checkbox aligned to the right side — contrast to the default left alignment. */
export const WithRightCheckboxIndicator: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => (
    <TagSelectDemo
      {...args}
      items={avatarItems}
      selectionIndicator="checkbox"
      selectionIndicatorAlign="right"
    />
  ),
};

/** Some list items are individually disabled. */
export const WithDisabledItems: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={itemsWithDisabled} />,
};

/** Tags pre-populated on mount. */
export const WithPreselected: Story = {
  args: { label: "Team members", placeholder: "Search members…" },
  render: (args) => (
    <TagSelectDemo
      {...args}
      items={avatarItems}
      initialSelected={[avatarItems[0], avatarItems[2]]}
    />
  ),
};

/** The entire field is disabled — tags are visible but not interactive. */
export const Disabled: Story = {
  args: { label: "Team members", placeholder: "Search members…", isDisabled: true },
  render: (args) => (
    <TagSelectDemo
      {...args}
      items={avatarItems}
      initialSelected={[avatarItems[0], avatarItems[1]]}
    />
  ),
};

/** Keyboard shortcut badge displayed inside the trailing area. */
export const WithShortcut: Story = {
  args: { label: "Team members", placeholder: "Search members…", shortcut: true },
  render: (args) => <TagSelectDemo {...args} />,
};

// ─── Size comparison ─────────────────────────────────────────────────────────

export const SizeSm: Story = {
  args: { size: "sm", label: "Size sm", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarItems} />,
};

export const SizeMd: Story = {
  args: { size: "md", label: "Size md", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarItems} />,
};

export const SizeLg: Story = {
  args: { size: "lg", label: "Size lg", placeholder: "Search members…" },
  render: (args) => <TagSelectDemo {...args} items={avatarItems} />,
};

// ─── Showcase ────────────────────────────────────────────────────────────────

/** Full showcase — all item variants, sizes, and states. */
export const AllStates: Story = {
  name: "All states",
  args: { placeholder: "" },
  render: (): JSX.Element => (
    <div className="flex flex-col gap-10 w-96">
      {/* Item variants */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Item variants</p>
        <TagSelectDemo
          label="Default (text only)"
          placeholder="Search members…"
          items={plainItems}
        />
        <TagSelectDemo label="Icon leading" placeholder="Search members…" items={iconItems} />
        <TagSelectDemo label="Avatar leading" placeholder="Search members…" items={avatarItems} />
        <TagSelectDemo label="Dot leading (status)" placeholder="Search status…" items={dotItems} />
        <TagSelectDemo
          label="Supporting text"
          placeholder="Search members…"
          items={supportingTextItems}
        />
        <TagSelectDemo
          label="Avatar + supporting text"
          placeholder="Search members…"
          items={avatarWithTextItems}
        />
      </section>

      {/* Size scale */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Sizes</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <TagSelectDemo
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder="Search members…"
            items={avatarItems}
            initialSelected={[avatarItems[0]]}
          />
        ))}
      </section>

      {/* Pre-selected tags */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Pre-selected</p>
        <TagSelectDemo
          label="Multiple tags"
          placeholder="Search members…"
          items={avatarItems}
          initialSelected={[avatarItems[0], avatarItems[1], avatarItems[3]]}
        />
        <TagSelectDemo
          label="Checkbox indicator (left — default)"
          placeholder="Search members…"
          items={avatarItems}
          initialSelected={[avatarItems[0], avatarItems[2]]}
          selectionIndicator="checkbox"
        />
        <TagSelectDemo
          label="Checkbox indicator (right)"
          placeholder="Search members…"
          items={avatarItems}
          initialSelected={[avatarItems[0], avatarItems[2]]}
          selectionIndicator="checkbox"
          selectionIndicatorAlign="right"
        />
      </section>

      {/* Functional states */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">States</p>
        <TagSelectDemo
          label="Disabled items in list"
          placeholder="Search members…"
          items={itemsWithDisabled}
        />
        <TagSelectDemo
          label="Field disabled"
          placeholder="Search members…"
          isDisabled
          items={avatarItems}
          initialSelected={[avatarItems[0], avatarItems[1]]}
        />
        <TagSelectDemo
          label="With hint"
          hint="Type to search and add members."
          placeholder="Search members…"
          items={avatarItems}
        />
        <TagSelectDemo
          label="With shortcut badge"
          placeholder="Search members…"
          shortcut
          items={plainItems}
        />
      </section>
    </div>
  ),
};
