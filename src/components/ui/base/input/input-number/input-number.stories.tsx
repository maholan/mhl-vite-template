"use client";

import { InputNumber } from "./input-number";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputNumber> = {
  title: "Base/Inputs/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible number input built on React Aria NumberField. Supports keyboard " +
          "increment/decrement, min/max/step constraints, and full screen-reader support. " +
          "Two stepper orientations: vertical (default stacked ▲/▼) and horizontal (− / + buttons).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      table: { defaultValue: { summary: "vertical" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    isDisabled: { control: "boolean" },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    minValue: { control: "number" },
    maxValue: { control: "number" },
    step: { control: "number" },
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

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default with vertical steppers. */
export const Default: Story = {
  args: { label: "Quantity", placeholder: "0" },
};

/** Horizontal − / + button layout. */
export const Horizontal: Story = {
  args: { label: "Amount", orientation: "horizontal", placeholder: "0" },
};

/** With hint text below. */
export const WithHint: Story = {
  args: {
    label: "Quantity",
    hint: "Min 1, max 99.",
    placeholder: "1",
    minValue: 1,
    maxValue: 99,
  },
};

/** Required field with indicator. */
export const Required: Story = {
  args: { label: "Quantity", isRequired: true, placeholder: "0" },
};

/** Invalid / error state. */
export const Invalid: Story = {
  args: {
    label: "Quantity",
    isInvalid: true,
    hint: "Value must be between 1 and 10.",
    placeholder: "0",
    minValue: 1,
    maxValue: 10,
  },
};

/** Disabled — not interactive. */
export const Disabled: Story = {
  args: { label: "Quantity", isDisabled: true, defaultValue: 5 },
};

/** With min, max, and step constraints. */
export const WithConstraints: Story = {
  args: {
    label: "Step by 5",
    hint: "Range: 0 – 100, step 5.",
    defaultValue: 0,
    minValue: 0,
    maxValue: 100,
    step: 5,
  },
};

// ─── Size comparison ──────────────────────────────────────────────────────────

export const SizeSm: Story = {
  args: { size: "sm", label: "Size sm", placeholder: "0" },
};

export const SizeMd: Story = {
  args: { size: "md", label: "Size md", placeholder: "0" },
};

export const SizeLg: Story = {
  args: { size: "lg", label: "Size lg", placeholder: "0" },
};

// ─── All states showcase ──────────────────────────────────────────────────────

/** Full showcase — all states and orientations. */
export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <InputNumber label="Default" placeholder="0" />
      <InputNumber label="With hint" hint="Enter a quantity." placeholder="0" />
      <InputNumber label="Required" isRequired placeholder="0" />
      <InputNumber
        label="Invalid"
        isInvalid
        hint="Value out of range."
        placeholder="0"
        minValue={1}
        maxValue={10}
      />
      <InputNumber label="Disabled" isDisabled defaultValue={5} />
      <InputNumber label="Horizontal" orientation="horizontal" placeholder="0" />
      <InputNumber
        label="With constraints"
        hint="Range 0–100, step 10."
        defaultValue={0}
        minValue={0}
        maxValue={100}
        step={10}
      />
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Sizes</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputNumber key={size} size={size} label={`Size: ${size}`} placeholder="0" />
        ))}
      </div>
    </div>
  ),
};
