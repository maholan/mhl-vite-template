import { Label } from "./label";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Label> = {
  title: "Base/Inputs/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible form label built on React Aria's `Label` primitive.",
          "",
          "Automatically associated with the nearest React Aria field — no `htmlFor` required.",
          "",
          "**Features:**",
          "- Optional required `*` indicator — explicit or auto (driven by parent `data-required`)",
          "- Optional help tooltip icon revealing additional context on hover/focus",
          "- Automatically dims when the parent Field is disabled via `group-data-[disabled]:`",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text content.",
      table: { defaultValue: { summary: "Label" } },
    },
    isRequired: {
      control: "boolean",
      description:
        "Controls the `*` required indicator. `true` = always show, `false` = always hide, `undefined` = auto (parent data-required).",
      table: { defaultValue: { summary: "undefined" } },
    },
    tooltip: {
      control: "text",
      description: "Tooltip title text. When provided, renders a HelpCircle icon trigger.",
      table: { defaultValue: { summary: "—" } },
    },
    tooltipDescription: {
      control: "text",
      description: "Supporting description shown inside the tooltip body.",
      table: { defaultValue: { summary: "—" } },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Email address",
  },
};

export const Required: Story = {
  args: {
    children: "Password",
    isRequired: true,
  },
};

export const WithTooltip: Story = {
  args: {
    children: "Username",
    tooltip: "Must be between 3 and 20 characters.",
  },
};

export const WithTooltipAndDescription: Story = {
  args: {
    children: "Recovery email",
    tooltip: "We use this only for account recovery.",
    tooltipDescription: "This address is never shared with third parties.",
  },
};

export const RequiredWithTooltip: Story = {
  args: {
    children: "Email address",
    isRequired: true,
    tooltip: "We'll never share your email.",
    tooltipDescription: "Used only for login and account recovery.",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled field",
  },
  decorators: [
    (Story) => (
      // Simulate a disabled React Aria Field parent — sets data-disabled on the group.
      <div className="group" data-disabled="">
        <Story />
      </div>
    ),
  ],
};

export const DisabledWithTooltip: Story = {
  args: {
    children: "Disabled field",
    tooltip: "Tooltip stays accessible even when the field is disabled.",
  },
  decorators: [
    (Story) => (
      <div className="group" data-disabled="">
        <Story />
      </div>
    ),
  ],
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Row headers */}
      <div className="grid grid-cols-3 gap-8 text-center text-xs font-semibold text-tertiary">
        <span>Default</span>
        <span>Required</span>
        <span>With tooltip</span>
      </div>

      {/* Normal state */}
      <div className="grid grid-cols-3 gap-8 items-center">
        <Label>Email address</Label>
        <Label isRequired>Password</Label>
        <Label tooltip="Must be a valid email." tooltipDescription="We'll never share it.">
          Email address
        </Label>
      </div>

      {/* Auto-required (parent data-required) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-tertiary">
          Auto required (parent data-required)
        </span>
        <div className="group grid grid-cols-3 gap-8 items-center" data-required="">
          <Label>Email address</Label>
          <Label>Password</Label>
          <Label tooltip="Driven by parent field's required state.">Auto required label</Label>
        </div>
      </div>

      {/* Disabled (parent data-disabled) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-tertiary">Disabled (parent data-disabled)</span>
        <div className="group grid grid-cols-3 gap-8 items-center" data-disabled="">
          <Label>Email address</Label>
          <Label isRequired>Password</Label>
          <Label tooltip="Tooltip icon dims but stays accessible.">Email address</Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
