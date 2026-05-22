import { useState } from "react";

import { MultiSelect } from "./multi-select";

import type { Meta, StoryObj } from "@storybook/react";
import type { Selection } from "react-aria-components";

const items = [
  { id: "1", label: "Wade Warren" },
  { id: "2", label: "Arlene McCoy" },
  { id: "3", label: "Devon Lane" },
  { id: "4", label: "Jane Cooper" },
  { id: "5", label: "Cody Fisher" },
  { id: "6", label: "Esther Howard" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Base/Selects/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-selection dropdown with built-in search, select-all, and reset. Built on React Aria's DialogTrigger + Autocomplete pattern.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    isDisabled: { control: "boolean" },
    showFooter: { control: "boolean" },
    showSearch: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Select members" },
  render: (args) => (
    <MultiSelect {...args} items={items}>
      {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
    </MultiSelect>
  ),
};

export const WithLabel: Story = {
  args: { label: "Team members", placeholder: "Select members" },
  render: (args) => (
    <MultiSelect {...args} items={items}>
      {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
    </MultiSelect>
  ),
};

export const Controlled: Story = {
  args: { label: "Team members", placeholder: "Select members" },
  render: (args) => {
    const [selected, setSelected] = useState<Selection>(new Set(["1", "3"]));
    return (
      <MultiSelect
        {...args}
        items={items}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        onReset={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(items.map((i) => i.id)))}
      >
        {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
      </MultiSelect>
    );
  },
};

export const NoFooter: Story = {
  args: { label: "Team members", placeholder: "Select members", showFooter: false },
  render: (args) => (
    <MultiSelect {...args} items={items}>
      {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
    </MultiSelect>
  ),
};

export const NoSearch: Story = {
  args: { label: "Team members", placeholder: "Select members", showSearch: false },
  render: (args) => (
    <MultiSelect {...args} items={items}>
      {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
    </MultiSelect>
  ),
};

export const Disabled: Story = {
  args: { label: "Team members", placeholder: "Select members", isDisabled: true },
  render: (args) => (
    <MultiSelect {...args} items={items}>
      {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
    </MultiSelect>
  ),
};

export const AllStates: Story = {
  name: "All states",
  args: { placeholder: "" },
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      <MultiSelect placeholder="Default" items={items}>
        {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
      </MultiSelect>
      <MultiSelect label="With label" placeholder="Select members" items={items}>
        {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
      </MultiSelect>
      <MultiSelect
        label="With hint"
        hint="Select all that apply."
        placeholder="Select members"
        items={items}
      >
        {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
      </MultiSelect>
      <MultiSelect label="Disabled" placeholder="Select members" isDisabled items={items}>
        {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
      </MultiSelect>
      {(["sm", "md", "lg"] as const).map((size) => (
        <MultiSelect
          key={size}
          size={size}
          label={`Size: ${size}`}
          placeholder="Select members"
          items={items}
        >
          {(item) => <MultiSelect.Item key={item.id} {...item} selectionIndicator="checkbox" />}
        </MultiSelect>
      ))}
    </div>
  ),
};
