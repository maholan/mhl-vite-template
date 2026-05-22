import React from "react";

import { Toggle, ToggleBase } from "./toggle";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible toggle (switch) built on React Aria. " +
          "Supports two sizes, a slim track variant, and optional label + hint text. " +
          "Full keyboard navigation and screen-reader support.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "sm" } },
    },
    slim: { control: "boolean" },
    isDisabled: { control: "boolean" },
    label: { control: "text" },
    hint: { control: "text" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: "Email notifications" },
};

export const DefaultSelected: Story = {
  name: "Default (selected)",
  args: { label: "Email notifications", defaultSelected: true },
};

export const WithHint: Story = {
  name: "With hint",
  args: {
    label: "Email notifications",
    hint: "You will receive emails for activity in your account.",
    defaultSelected: true,
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: { label: "Dark mode", size: "md" },
};

export const Slim: Story = {
  name: "Slim track",
  args: { label: "Compact mode", slim: true },
};

export const SlimSelected: Story = {
  name: "Slim track (selected)",
  args: { label: "Compact mode", slim: true, defaultSelected: true },
};

export const Disabled: Story = {
  args: { label: "Disabled toggle", isDisabled: true },
};

export const DisabledSelected: Story = {
  name: "Disabled (selected)",
  args: { label: "Disabled toggle", isDisabled: true, defaultSelected: true },
};

export const NoLabel: Story = {
  name: "No label (indicator only)",
  args: { "aria-label": "Toggle feature" },
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", minWidth: 360 }}>
      <section>
        <p style={labelStyle}>sm — unchecked / checked</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Toggle label="Notifications" />
          <Toggle label="Notifications" defaultSelected />
        </div>
      </section>

      <section>
        <p style={labelStyle}>md — unchecked / checked</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Toggle label="Notifications" size="md" />
          <Toggle label="Notifications" size="md" defaultSelected />
        </div>
      </section>

      <section>
        <p style={labelStyle}>with hint</p>
        <Toggle
          label="Marketing emails"
          hint="Receive emails about new products and features."
          defaultSelected
        />
      </section>

      <section>
        <p style={labelStyle}>slim — unchecked / checked</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Toggle label="Compact mode" slim />
          <Toggle label="Compact mode" slim defaultSelected />
        </div>
      </section>

      <section>
        <p style={labelStyle}>disabled</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Toggle label="Disabled" isDisabled />
          <Toggle label="Disabled (on)" isDisabled defaultSelected />
        </div>
      </section>

      <section>
        <p style={labelStyle}>ToggleBase standalone</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <ToggleBase />
          <ToggleBase isSelected />
          <ToggleBase isDisabled />
          <ToggleBase isDisabled isSelected />
          <ToggleBase size="md" />
          <ToggleBase size="md" isSelected />
          <ToggleBase slim />
          <ToggleBase slim isSelected />
        </div>
      </section>
    </div>
  ),
};

const labelStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#9CA3AF",
};
