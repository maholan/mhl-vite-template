import React from "react";

import { TextArea, TextAreaBase } from "./textarea";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible textarea with label, hint, and validation support. " +
          "Built on React Aria's TextField + TextArea primitives. " +
          "Supports two sizes and all interactive states (default, focus, invalid, disabled).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    rows: { control: "number" },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { placeholder: "Write a message…" },
};

export const WithLabel: Story = {
  name: "With label",
  args: { label: "Message", placeholder: "Write a message…" },
};

export const WithHint: Story = {
  name: "With hint",
  args: {
    label: "Description",
    hint: "Describe your request in detail.",
    placeholder: "Write something…",
    rows: 4,
  },
};

export const SizeSm: Story = {
  name: "Size: sm",
  args: { label: "Notes", size: "sm", placeholder: "Add a note…" },
};

export const Required: Story = {
  args: { label: "Bio", isRequired: true, placeholder: "Tell us about yourself…" },
};

export const Disabled: Story = {
  args: { label: "Message", isDisabled: true, value: "This field is disabled." },
};

export const Invalid: Story = {
  args: {
    label: "Description",
    isInvalid: true,
    hint: "This field is required.",
    placeholder: "Write something…",
  },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: 400 }}>
      <section>
        <p style={labelStyle}>default — md</p>
        <TextArea label="Message" placeholder="Write a message…" />
      </section>

      <section>
        <p style={labelStyle}>with hint — md</p>
        <TextArea
          label="Description"
          hint="Describe your request in detail."
          placeholder="Write something…"
          rows={4}
        />
      </section>

      <section>
        <p style={labelStyle}>size: sm</p>
        <TextArea label="Notes" size="sm" placeholder="Add a note…" />
      </section>

      <section>
        <p style={labelStyle}>required</p>
        <TextArea label="Bio" isRequired placeholder="Tell us about yourself…" />
      </section>

      <section>
        <p style={labelStyle}>invalid</p>
        <TextArea
          label="Description"
          isInvalid
          hint="This field is required."
          placeholder="Write something…"
        />
      </section>

      <section>
        <p style={labelStyle}>disabled</p>
        <TextArea label="Message" isDisabled value="This textarea is disabled." />
      </section>

      <section>
        <p style={labelStyle}>TextAreaBase standalone</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <TextAreaBase placeholder="Default (md)" aria-label="Default textarea" />
          <TextAreaBase size="sm" placeholder="Size sm" aria-label="Small textarea" />
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
