import { Dot, User01 } from "@/components/ui/assets";

import { Select } from "./select";

import type { Meta, StoryObj } from "@storybook/react";

// ─── Item datasets ────────────────────────────────────────────────────────────

const plainItems = [
  { id: "1", label: "Wade Warren" },
  { id: "2", label: "Arlene McCoy" },
  { id: "3", label: "Devon Lane", isDisabled: true },
  { id: "4", label: "Jane Cooper" },
  { id: "5", label: "Cody Fisher" },
];

const avatarItems = [
  { id: "1", label: "Wade Warren", avatarUrl: "https://i.pravatar.cc/32?img=11" },
  { id: "2", label: "Arlene McCoy", avatarUrl: "https://i.pravatar.cc/32?img=5" },
  { id: "3", label: "Devon Lane", avatarUrl: "https://i.pravatar.cc/32?img=8" },
  { id: "4", label: "Jane Cooper", avatarUrl: "https://i.pravatar.cc/32?img=47" },
  { id: "5", label: "Cody Fisher", avatarUrl: "https://i.pravatar.cc/32?img=12" },
];

const iconItems = [
  { id: "1", label: "Wade Warren", icon: User01 },
  { id: "2", label: "Arlene McCoy", icon: User01 },
  { id: "3", label: "Devon Lane", icon: User01 },
  { id: "4", label: "Jane Cooper", icon: User01 },
  { id: "5", label: "Cody Fisher", icon: User01 },
];

const dotItems = [
  { id: "1", label: "Active", icon: <Dot size="md" className="text-success-500" /> },
  { id: "2", label: "Pending", icon: <Dot size="md" className="text-warning-500" /> },
  { id: "3", label: "Inactive", icon: <Dot size="md" className="text-error-500" /> },
  { id: "4", label: "Draft", icon: <Dot size="md" className="text-icon-quaternary" /> },
  { id: "5", label: "Review", icon: <Dot size="md" className="text-brand-500" /> },
];

const supportingTextItems = [
  { id: "1", label: "Wade Warren", supportingText: "@wadewarren" },
  { id: "2", label: "Arlene McCoy", supportingText: "@arlenemccoy" },
  { id: "3", label: "Devon Lane", supportingText: "@devonlane" },
  { id: "4", label: "Jane Cooper", supportingText: "@janecooper" },
  { id: "5", label: "Cody Fisher", supportingText: "@codyfisher" },
];

const avatarWithTextItems = avatarItems.map((item, i) => ({
  ...item,
  supportingText: supportingTextItems[i].supportingText,
}));

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Select> = {
  title: "Base/Selects/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible dropdown select built on React Aria. Supports single selection with label, hint, " +
          "placeholder, and rich item variants: plain text, avatar leading, icon leading, dot leading " +
          "(status), and supporting text. Use `Select.Search` for a searchable combobox variant.",
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
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
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

// ─── Field-level stories ───────────────────────────────────────────────────────

export const Default: Story = {
  args: { children: "", placeholder: "Select an option" },
  render: ({ placeholder, size, isDisabled, isInvalid, isRequired }) => (
    <Select
      placeholder={placeholder}
      size={size}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

export const WithLabel: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size, isDisabled }) => (
    <Select label={label} placeholder={placeholder} size={size} isDisabled={isDisabled}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

export const WithHint: Story = {
  args: {
    children: "",
    label: "Team member",
    hint: "Select a member to assign this task.",
    placeholder: "Select member",
  },
  render: ({ label, hint, placeholder, size }) => (
    <Select label={label} hint={hint} placeholder={placeholder} size={size}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

export const Invalid: Story = {
  args: {
    children: "",
    label: "Team member",
    hint: "This field is required.",
    placeholder: "Select member",
    isInvalid: true,
  },
  render: ({ label, hint, placeholder, isInvalid }) => (
    <Select label={label} hint={hint} placeholder={placeholder} isInvalid={isInvalid}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

export const Disabled: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member", isDisabled: true },
  render: ({ label, placeholder, isDisabled }) => (
    <Select label={label} placeholder={placeholder} isDisabled={isDisabled}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

// ─── Item variant stories ──────────────────────────────────────────────────────

/** Round avatar photo as a leading element — pass `avatarUrl` on each item. */
export const WithAvatarItems: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {avatarItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

/** Leading icon component (FC) — pass `icon: IconComponent` on each item. */
export const WithIconItems: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {iconItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

/** Colored status dot as a leading ReactNode — useful for status or category selects. */
export const WithDotItems: Story = {
  args: { children: "", label: "Status", placeholder: "Select status" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {dotItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

/** Secondary supporting text alongside the label — useful for @handles or metadata. */
export const WithSupportingText: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {supportingTextItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

/** Avatar photo combined with @handle supporting text — the richest item variant. */
export const WithAvatarAndSupportingText: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {avatarWithTextItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

/** Checkbox selection indicator instead of a checkmark. */
export const WithCheckboxIndicator: Story = {
  args: { children: "", label: "Team member", placeholder: "Select member" },
  render: ({ label, placeholder, size }) => (
    <Select label={label} placeholder={placeholder} size={size}>
      {avatarItems.map((item) => (
        <Select.Item key={item.id} {...item} selectionIndicator="checkbox" />
      ))}
    </Select>
  ),
};

// ─── Select.Search (ComboBox) ──────────────────────────────────────────────────

export const SearchVariant: Story = {
  name: "Select.Search (ComboBox)",
  args: { children: "", label: "Search member", placeholder: "Search…" },
  render: ({ label, placeholder, size, isDisabled, hint }) => (
    <Select.Search
      label={label}
      placeholder={placeholder}
      size={size}
      isDisabled={isDisabled}
      hint={hint}
      items={plainItems}
    >
      {(item) => <Select.Item key={item.id} {...item} />}
    </Select.Search>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  args: { children: "", size: "sm", placeholder: "Select option" },
  render: ({ size, placeholder }) => (
    <Select size={size} placeholder={placeholder}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

export const SizeLg: Story = {
  args: { children: "", size: "lg", placeholder: "Select option" },
  render: ({ size, placeholder }) => (
    <Select size={size} placeholder={placeholder}>
      {plainItems.map((item) => (
        <Select.Item key={item.id} {...item} />
      ))}
    </Select>
  ),
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: "", placeholder: "" },
  render: () => (
    <div className="flex flex-col gap-10 w-72">
      {/* Field states */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Field states</p>
        <Select placeholder="Default">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="With label" placeholder="Select option">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="With hint" hint="Helpful hint text." placeholder="Select option">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Invalid" hint="Required field." isInvalid placeholder="Select option">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Disabled" isDisabled placeholder="Select option">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
      </section>

      {/* Item variants */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Item variants</p>
        <Select label="Plain text" placeholder="Select member">
          {plainItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Avatar leading" placeholder="Select member">
          {avatarItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Icon leading" placeholder="Select member">
          {iconItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Dot leading (status)" placeholder="Select status">
          {dotItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Supporting text" placeholder="Select member">
          {supportingTextItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Avatar + supporting text" placeholder="Select member">
          {avatarWithTextItems.map((item) => (
            <Select.Item key={item.id} {...item} />
          ))}
        </Select>
        <Select label="Checkbox indicator" placeholder="Select member">
          {avatarItems.map((item) => (
            <Select.Item key={item.id} {...item} selectionIndicator="checkbox" />
          ))}
        </Select>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-tertiary uppercase tracking-wide">Sizes</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Select key={size} size={size} label={`Size: ${size}`} placeholder="Select member">
            {avatarItems.map((item) => (
              <Select.Item key={item.id} {...item} />
            ))}
          </Select>
        ))}
      </section>
    </div>
  ),
};
