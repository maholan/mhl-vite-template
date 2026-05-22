
import { PinInput } from "./pin-input";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Inputs/PinInput",
  component: PinInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible OTP / PIN input built on `input-otp`. " +
          "Composes Label and HintText automatically. " +
          "Supports 6 sizes, 4 or 6 digit modes, invalid state, and a separator slot.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xxxs", "xxs", "xs", "sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helpers ───────────────────────────────────────────────────────────────────

const FourSlots = () => (
  <>
    <PinInput.Slot index={0} />
    <PinInput.Slot index={1} />
    <PinInput.Slot index={2} />
    <PinInput.Slot index={3} />
  </>
);

const SixSlots = () => (
  <>
    <PinInput.Slot index={0} />
    <PinInput.Slot index={1} />
    <PinInput.Slot index={2} />
    <PinInput.Separator />
    <PinInput.Slot index={3} />
    <PinInput.Slot index={4} />
    <PinInput.Slot index={5} />
  </>
);

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { size: "md" },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        <FourSlots />
      </PinInput.Group>
      <PinInput.Description>This is a hint text to help user.</PinInput.Description>
    </PinInput>
  ),
};

export const SixDigits: Story = {
  args: { size: "md" },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={6}>
        <SixSlots />
      </PinInput.Group>
      <PinInput.Description>This is a hint text to help user.</PinInput.Description>
    </PinInput>
  ),
};

export const SizeSm: Story = {
  args: { size: "sm" },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        <FourSlots />
      </PinInput.Group>
      <PinInput.Description>This is a hint text to help user.</PinInput.Description>
    </PinInput>
  ),
};

export const SizeLg: Story = {
  args: { size: "lg" },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        <FourSlots />
      </PinInput.Group>
      <PinInput.Description>This is a hint text to help user.</PinInput.Description>
    </PinInput>
  ),
};

export const Invalid: Story = {
  args: { size: "md", isInvalid: true },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        <FourSlots />
      </PinInput.Group>
      <PinInput.Description isInvalid>Invalid code — please try again.</PinInput.Description>
    </PinInput>
  ),
};

export const Disabled: Story = {
  args: { size: "md", isDisabled: true },
  render: (args) => (
    <PinInput {...args}>
      <PinInput.Label>Secure code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        <FourSlots />
      </PinInput.Group>
      <PinInput.Description>This is a hint text to help user.</PinInput.Description>
    </PinInput>
  ),
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-10">
      {/* Size row — sm / md / lg, 4 digits */}
      <div className="flex flex-wrap items-start gap-8">
        {(["sm", "md", "lg"] as const).map((size) => (
          <PinInput key={size} size={size}>
            <PinInput.Label>Size {size}</PinInput.Label>
            <PinInput.Group maxLength={4}>
              <PinInput.Slot index={0} />
              <PinInput.Slot index={1} />
              <PinInput.Slot index={2} />
              <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>Hint text.</PinInput.Description>
          </PinInput>
        ))}
      </div>

      {/* 6-digit with separator */}
      <div className="flex flex-wrap items-start gap-8">
        {(["sm", "md", "lg"] as const).map((size) => (
          <PinInput key={size} size={size}>
            <PinInput.Label>6-digit · {size}</PinInput.Label>
            <PinInput.Group maxLength={6}>
              <PinInput.Slot index={0} />
              <PinInput.Slot index={1} />
              <PinInput.Slot index={2} />
              <PinInput.Separator />
              <PinInput.Slot index={3} />
              <PinInput.Slot index={4} />
              <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>Hint text.</PinInput.Description>
          </PinInput>
        ))}
      </div>

      {/* Compact sizes */}
      <div className="flex flex-wrap items-start gap-8">
        {(["xxxs", "xxs", "xs"] as const).map((size) => (
          <PinInput key={size} size={size}>
            <PinInput.Label>Size {size}</PinInput.Label>
            <PinInput.Group maxLength={4}>
              <PinInput.Slot index={0} />
              <PinInput.Slot index={1} />
              <PinInput.Slot index={2} />
              <PinInput.Slot index={3} />
            </PinInput.Group>
          </PinInput>
        ))}
      </div>

      {/* Invalid */}
      <PinInput size="md" isInvalid>
        <PinInput.Label>Invalid state</PinInput.Label>
        <PinInput.Group maxLength={4}>
          <PinInput.Slot index={0} />
          <PinInput.Slot index={1} />
          <PinInput.Slot index={2} />
          <PinInput.Slot index={3} />
        </PinInput.Group>
        <PinInput.Description isInvalid>Invalid code — please try again.</PinInput.Description>
      </PinInput>

      {/* Disabled */}
      <PinInput size="md" isDisabled>
        <PinInput.Label>Disabled state</PinInput.Label>
        <PinInput.Group maxLength={4}>
          <PinInput.Slot index={0} />
          <PinInput.Slot index={1} />
          <PinInput.Slot index={2} />
          <PinInput.Slot index={3} />
        </PinInput.Group>
        <PinInput.Description>Cannot interact.</PinInput.Description>
      </PinInput>
    </div>
  ),
};
