
import { InputBase } from "@/components/ui/base/input/base-input";

import { InputGroup } from "./input-group";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputGroup> = {
  title: "Base/Inputs/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible input group that wraps InputBase with optional leading / trailing addons " +
          "and an inline text prefix. Composes Label and HintText automatically.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    prefix: { control: "text" },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    hideRequiredIndicator: { control: "boolean" },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Website",
    hint: "Enter your website URL.",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args}>
        <InputBase placeholder="yoursite.com" />
      </InputGroup>
    </div>
  ),
};

export const WithLeadingAddon: Story = {
  args: {
    label: "Website",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args} leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
        <InputBase placeholder="yoursite.com" />
      </InputGroup>
    </div>
  ),
};

export const WithTrailingAddon: Story = {
  args: {
    label: "Amount",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup
        {...args}
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>
    </div>
  ),
};

export const WithBothAddons: Story = {
  args: {
    label: "Transfer amount",
    hint: "Enter the amount to transfer.",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup
        {...args}
        leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>
    </div>
  ),
};

export const WithInlinePrefix: Story = {
  args: {
    label: "Domain",
    prefix: "https://",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args}>
        <InputBase placeholder="yoursite.com" />
      </InputGroup>
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: "Email",
    isRequired: true,
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args}>
        <InputBase placeholder="you@example.com" type="email" />
      </InputGroup>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    label: "Email",
    isInvalid: true,
    hint: "Enter a valid email address.",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args} leadingAddon={<InputGroup.Prefix>@</InputGroup.Prefix>}>
        <InputBase placeholder="you@example.com" type="email" />
      </InputGroup>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Website",
    isDisabled: true,
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args} leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
        <InputBase placeholder="yoursite.com" />
      </InputGroup>
    </div>
  ),
};

export const SizeLg: Story = {
  args: {
    label: "Amount",
    hint: "Enter your transfer amount.",
    size: "lg",
  },
  render: (args) => (
    <div className="w-80">
      <InputGroup
        {...args}
        leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>
    </div>
  ),
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex w-[640px] flex-col gap-6">
      {/* Default */}
      <InputGroup label="Default" hint="Helper text goes here." size="md">
        <InputBase placeholder="Placeholder" />
      </InputGroup>

      {/* Leading addon */}
      <InputGroup
        label="With leading addon"
        size="md"
        leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
      >
        <InputBase placeholder="yoursite.com" />
      </InputGroup>

      {/* Trailing addon */}
      <InputGroup
        label="With trailing addon"
        size="md"
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>

      {/* Both addons */}
      <InputGroup
        label="With both addons"
        size="md"
        leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>

      {/* Inline prefix */}
      <InputGroup label="With inline prefix" prefix="https://" size="md">
        <InputBase placeholder="yoursite.com" />
      </InputGroup>

      {/* Invalid */}
      <InputGroup
        label="Invalid"
        isInvalid
        hint="This field is required."
        size="md"
        leadingAddon={<InputGroup.Prefix>@</InputGroup.Prefix>}
      >
        <InputBase placeholder="Placeholder" />
      </InputGroup>

      {/* Disabled */}
      <InputGroup
        label="Disabled"
        isDisabled
        size="md"
        leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
      >
        <InputBase placeholder="Placeholder" />
      </InputGroup>

      {/* Large */}
      <InputGroup
        label="Large size"
        size="lg"
        leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
        trailingAddon={
          <select
            defaultValue="USD"
            className="h-full cursor-pointer bg-transparent text-sm text-tertiary outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        }
      >
        <InputBase placeholder="0.00" type="number" />
      </InputGroup>
    </div>
  ),
};
