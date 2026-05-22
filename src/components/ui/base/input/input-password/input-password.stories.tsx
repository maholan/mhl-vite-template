import React, { useState } from "react";

import { InputPassword } from "./input-password";

import type { Meta, StoryObj } from "@storybook/react";

// ── Story icon ─────────────────────────────────────────────────────────────────
// Inline key icon used only in Storybook to demonstrate the icon slot.
function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

const meta = {
  title: "Base/Inputs/InputPassword",
  component: InputPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible password input built on React Aria. " +
          "Features a visibility toggle button with controlled/uncontrolled support, " +
          "optional leading icon, and full keyboard + screen reader accessibility.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    size: {
      control: "radio",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isRequired: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    defaultIsVisible: { control: "boolean" },
    hideRequiredIndicator: { control: "boolean" },
  },
  args: {
    label: "Password",
    placeholder: "Enter your password",
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {};

export const SizeLg: Story = {
  args: { size: "lg" },
};

export const Required: Story = {
  args: { isRequired: true },
};

export const WithHint: Story = {
  args: {
    hint: "Must be at least 8 characters.",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    icon: KeyIcon,
    placeholder: "Enter your password",
  },
};

export const Destructive: Story = {
  args: {
    isInvalid: true,
    hint: "Password is incorrect. Please try again.",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    hint: "This field is currently unavailable.",
  },
};

export const DefaultVisible: Story = {
  name: "Default visible (show on mount)",
  args: {
    defaultIsVisible: true,
    hint: "Password is revealed by default.",
  },
};

/** Controlled visibility — external state drives the toggle. */
export const Controlled: Story = {
  name: "Controlled visibility",
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="flex w-80 flex-col gap-3">
        <InputPassword
          label="Password"
          placeholder="Enter your password"
          isVisible={visible}
          onVisibilityChange={setVisible}
          hint={visible ? "Password is currently visible." : "Password is hidden."}
        />
        <p className="text-sm text-tertiary">
          External state:{" "}
          <span className="font-medium text-secondary">{visible ? "visible" : "hidden"}</span>
        </p>
      </div>
    );
  },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-[720px]">
      {/* md column */}
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Size md</p>
        <InputPassword label="Default" placeholder="Enter your password" />
        <InputPassword
          label="Required"
          placeholder="Enter your password"
          isRequired
          hint="Must be at least 8 characters."
        />
        <InputPassword label="With leading icon" placeholder="Enter your password" icon={KeyIcon} />
        <InputPassword
          label="Invalid"
          placeholder="Enter your password"
          isInvalid
          isRequired
          hint="Password is incorrect."
        />
        <InputPassword
          label="Disabled"
          placeholder="Enter your password"
          isDisabled
          hint="This field is unavailable."
        />
      </div>

      {/* lg column */}
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">Size lg</p>
        <InputPassword label="Default" placeholder="Enter your password" size="lg" />
        <InputPassword
          label="Required"
          placeholder="Enter your password"
          isRequired
          size="lg"
          hint="Must be at least 8 characters."
        />
        <InputPassword
          label="With leading icon"
          placeholder="Enter your password"
          size="lg"
          icon={KeyIcon}
        />
        <InputPassword
          label="Invalid"
          placeholder="Enter your password"
          isInvalid
          isRequired
          size="lg"
          hint="Password is incorrect."
        />
        <InputPassword
          label="Disabled"
          placeholder="Enter your password"
          isDisabled
          size="lg"
          hint="This field is unavailable."
        />
      </div>
    </div>
  ),
};
