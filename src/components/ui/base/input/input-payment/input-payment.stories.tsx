
import { PaymentInput } from "./input-payment";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Inputs/PaymentInput",
  component: PaymentInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible payment card number input that auto-detects the card brand",
          "and renders the matching icon inside the field.",
          "",
          "Supports Visa, Mastercard, American Express, Discover, and UnionPay.",
          "Falls back to a generic card icon until the prefix is recognized (≥ 6 digits).",
          "",
          "Handles **4-4-4-4** formatting for standard cards and **4-6-5** for Amex.",
          "`onChange` always receives the **raw numeric** value (no spaces).",
          "",
          '`"use client"` is handled internally — safe to import in Next.js Server Components.',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isDisabled: { control: "boolean" },
    hideRequiredIndicator: { control: "boolean" },
    maxLength: { control: "number" },
  },
} satisfies Meta<typeof PaymentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Card number",
    hint: "Enter your 16-digit card number.",
    placeholder: "1234 5678 9012 3456",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Pre-filled card number (Visa detected) ────────────────────────────────────

export const VisaDetected: Story = {
  name: "Visa detected",
  args: {
    label: "Card number",
    hint: "We detected a Visa card.",
    size: "md",
    defaultValue: "4111111111111111",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Pre-filled Mastercard ─────────────────────────────────────────────────────

export const MastercardDetected: Story = {
  name: "Mastercard detected",
  args: {
    label: "Card number",
    size: "md",
    defaultValue: "5105105105105100",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Pre-filled Amex (4-6-5 format) ───────────────────────────────────────────

export const AmexDetected: Story = {
  name: "Amex detected (4-6-5 format)",
  args: {
    label: "Card number",
    hint: "American Express uses a 15-digit number.",
    size: "md",
    maxLength: 17,
    defaultValue: "378282246310005",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Required ──────────────────────────────────────────────────────────────────

export const Required: Story = {
  args: {
    label: "Card number",
    isRequired: true,
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Invalid ───────────────────────────────────────────────────────────────────

export const Invalid: Story = {
  args: {
    label: "Card number",
    isInvalid: true,
    hint: "Card number is invalid. Please check and try again.",
    size: "md",
    defaultValue: "4111",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: "Card number",
    isDisabled: true,
    size: "md",
    defaultValue: "4111111111111111",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── Large size ────────────────────────────────────────────────────────────────

export const SizeLg: Story = {
  name: "Size lg",
  args: {
    label: "Card number",
    hint: "Enter your 16-digit card number.",
    size: "lg",
  },
  render: (args) => (
    <div className="w-80">
      <PaymentInput {...args} />
    </div>
  ),
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { label: "" },
  render: () => (
    <div className="flex w-[380px] flex-col gap-6">
      {/* Default — no input yet */}
      <PaymentInput label="Default" hint="Enter your card number." size="md" />

      {/* Visa detected */}
      <PaymentInput label="Visa detected" size="md" defaultValue="4111111111111111" />

      {/* Mastercard detected */}
      <PaymentInput label="Mastercard detected" size="md" defaultValue="5105105105105100" />

      {/* Amex detected */}
      <PaymentInput
        label="Amex (4-6-5 format)"
        size="md"
        maxLength={17}
        defaultValue="378282246310005"
      />

      {/* Discover detected */}
      <PaymentInput label="Discover detected" size="md" defaultValue="6011111111111117" />

      {/* Required */}
      <PaymentInput label="Required" isRequired size="md" />

      {/* Invalid */}
      <PaymentInput
        label="Invalid"
        isInvalid
        hint="Card number is not valid."
        size="md"
        defaultValue="4111"
      />

      {/* Disabled */}
      <PaymentInput label="Disabled" isDisabled size="md" defaultValue="4111111111111111" />

      {/* Large */}
      <PaymentInput label="Large (lg)" hint="Size lg variant." size="lg" />
    </div>
  ),
};
