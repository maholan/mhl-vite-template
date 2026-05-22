import React from "react";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";

import { Input, InputBase, TextField } from "./input";

import type { Meta, StoryObj } from "@storybook/react";

// ── Inline search icon for stories ────────────────────────────────────────────
function SearchIcon(props: React.HTMLAttributes<SVGElement>): React.JSX.Element {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MailIcon(props: React.HTMLAttributes<SVGElement>): React.JSX.Element {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Input> = {
  title: "Base/Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Full-composition text input: `Label` + `InputBase` + `HintText`.",
          "",
          "Built on React Aria's `TextField` + `Group` + `Input` primitives — full",
          "keyboard navigation, screen reader support, and validation state wiring",
          "out of the box.",
          "",
          "**Composition model** — for custom layouts use `TextField`, `Label`,",
          "`InputBase`, and `HintText` directly.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
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
    tooltip: { control: "text" },
    shortcut: { control: "text" },
    hideRequiredIndicator: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};

export const SizeLg: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    size: "lg",
  },
};

export const WithHint: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    hint: "Must be at least 8 characters.",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isRequired: true,
    hint: "We'll never share your email.",
  },
};

export const WithTooltip: Story = {
  args: {
    label: "API key",
    placeholder: "sk-••••••••",
    tooltip: "Find your API key in your account dashboard.",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Find anything…",
    icon: SearchIcon,
  },
};

export const WithLeadingIconAndTooltip: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    icon: MailIcon,
    tooltip: "Use your work email for team access.",
  },
};

export const WithShortcut: Story = {
  args: {
    label: "Quick search",
    placeholder: "Search…",
    shortcut: "⌘K",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isInvalid: true,
    hint: "Enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isDisabled: true,
    hint: "You cannot edit this field.",
  },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6" style={{ width: 640 }}>
      <Input label="Default" placeholder="Placeholder" hint="Helper text." />
      <Input label="Default md" placeholder="Placeholder" hint="Helper text." size="md" />
      <Input label="Required" placeholder="Placeholder" isRequired hint="This field is required." />
      <Input label="With tooltip" placeholder="Placeholder" tooltip="Additional context here." />
      <Input
        label="Leading icon"
        placeholder="Search…"
        icon={SearchIcon}
        hint="Search for anything."
      />
      <Input label="Shortcut" placeholder="Search…" shortcut="⌘K" />
      <Input
        label="Invalid"
        placeholder="you@example.com"
        isInvalid
        hint="Enter a valid email address."
      />
      <Input label="Disabled" placeholder="Placeholder" isDisabled hint="This field is disabled." />
    </div>
  ),
  parameters: { layout: "padded" },
};

// ── Composition model ─────────────────────────────────────────────────────────

export const CompositionModel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      {/* Minimal composition */}
      <TextField isRequired>
        <Label>Email address</Label>
        <InputBase placeholder="you@example.com" />
        <HintText>We'll never share your email.</HintText>
      </TextField>

      {/* Invalid composition */}
      <TextField isInvalid autoComplete="new-password">
        <Label>Password</Label>
        <InputBase type="password" placeholder="••••••••••••" />
        <HintText>Must be at least 8 characters.</HintText>
        <HintText isInvalid>Password is too short.</HintText>
      </TextField>
    </div>
  ),
  parameters: { layout: "padded" },
};
