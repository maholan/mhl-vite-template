
import { CheckboxBase, Checkbox } from "./checkbox";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible checkbox built on React Aria. Supports checked, indeterminate, " +
          "disabled, and invalid states with optional label and hint text. " +
          "Two sizes: `sm` (16 px) and `md` (20 px).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "sm" } },
    },
    isSelected: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isIndeterminate: { control: "boolean" },
    isInvalid: { control: "boolean" },
    label: { control: "text" },
    hint: { control: "text" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  args: { label: "Accept terms and conditions", defaultSelected: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", isIndeterminate: true },
};

export const WithHint: Story = {
  args: {
    label: "Accept terms",
    hint: "By checking this you agree to our terms of service.",
  },
};

export const Invalid: Story = {
  args: { label: "Accept terms", isInvalid: true },
};

export const InvalidChecked: Story = {
  name: "Invalid + Checked",
  args: { label: "Accept terms", isInvalid: true, defaultSelected: true },
};

export const Disabled: Story = {
  args: { label: "Accept terms", isDisabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled + Checked",
  args: { label: "Accept terms", isDisabled: true, defaultSelected: true },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    label: "Accept terms",
    hint: "Larger checkbox for touch-friendly UIs.",
    size: "md",
  },
};

export const NoLabel: Story = {
  name: "No label (box only via Checkbox)",
  args: {},
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        minWidth: 380,
      }}
    >
      {/* Size: sm */}
      <section>
        <p
          style={{
            marginBottom: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#9CA3AF",
          }}
        >
          Size: sm
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Checkbox size="sm" label="Unchecked" />
          <Checkbox size="sm" label="Checked" defaultSelected />
          <Checkbox size="sm" label="Indeterminate" isIndeterminate />
          <Checkbox size="sm" label="With hint" hint="Supplementary hint text." />
          <Checkbox size="sm" label="Invalid" isInvalid />
          <Checkbox size="sm" label="Invalid + checked" isInvalid defaultSelected />
          <Checkbox size="sm" label="Disabled" isDisabled />
          <Checkbox size="sm" label="Disabled + checked" isDisabled defaultSelected />
        </div>
      </section>

      {/* Size: md */}
      <section>
        <p
          style={{
            marginBottom: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#9CA3AF",
          }}
        >
          Size: md
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Checkbox size="md" label="Unchecked" />
          <Checkbox size="md" label="Checked" defaultSelected />
          <Checkbox size="md" label="Indeterminate" isIndeterminate />
          <Checkbox size="md" label="With hint" hint="Supplementary hint text." />
          <Checkbox size="md" label="Invalid" isInvalid />
          <Checkbox size="md" label="Disabled" isDisabled />
          <Checkbox size="md" label="Disabled + checked" isDisabled defaultSelected />
        </div>
      </section>

      {/* CheckboxBase — box only */}
      <section>
        <p
          style={{
            marginBottom: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#9CA3AF",
          }}
        >
          CheckboxBase (box only)
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <CheckboxBase />
          <CheckboxBase isSelected />
          <CheckboxBase isIndeterminate />
          <CheckboxBase isInvalid />
          <CheckboxBase isDisabled />
          <CheckboxBase isDisabled isSelected />
          <CheckboxBase size="md" />
          <CheckboxBase size="md" isSelected />
          <CheckboxBase size="md" isIndeterminate />
        </div>
      </section>
    </div>
  ),
};
