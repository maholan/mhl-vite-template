import { parseDate } from "@internationalized/date";

import { Calendar } from "@/components/ui/assets/icons";

import { InputDate, InputDateBase } from "./input-date";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof InputDate> = {
  title: "Base/Inputs/InputDate",
  component: InputDate,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible date field with label, input segments, and hint/error text.",
          "",
          "Built on React Aria's `DateField` + `DateInput` + `DateSegment` primitives.",
          "Supports three sizes (`sm`, `md`, `lg`), leading icon, tooltip, invalid,",
          "disabled, and keyboard shortcut badge.",
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
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    label: { control: "text" },
    hint: { control: "text" },
    tooltip: { control: "text" },
  },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Start date",
    hint: "Select a date to begin.",
  },
};

export const WithValue: Story = {
  args: {
    label: "Start date",
    value: parseDate("2025-01-15"),
  },
};

export const SizeSm: Story = {
  name: "Size sm",
  args: {
    label: "Start date",
    size: "sm",
    hint: "Small size.",
  },
};

export const SizeMd: Story = {
  name: "Size md (default)",
  args: {
    label: "Start date",
    size: "md",
  },
};

export const SizeLg: Story = {
  name: "Size lg",
  args: {
    label: "Start date",
    size: "lg",
    hint: "Large size.",
  },
};

export const WithLeadingIcon: Story = {
  name: "With leading icon",
  args: {
    label: "Event date",
    icon: Calendar,
  },
};

export const WithTooltip: Story = {
  name: "With tooltip",
  args: {
    label: "Start date",
    tooltip: "The date on which the project will start.",
  },
};

export const Invalid: Story = {
  args: {
    label: "Due date",
    isInvalid: true,
    hint: "Due date is required.",
  },
};

export const InvalidWithIcon: Story = {
  name: "Invalid with leading icon",
  args: {
    label: "Event date",
    icon: Calendar,
    isInvalid: true,
    hint: "Please select a valid date.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Start date",
    isDisabled: true,
    value: parseDate("2025-06-01"),
    hint: "This field cannot be edited.",
  },
};

export const WithShortcut: Story = {
  name: "With shortcut badge",
  args: {
    label: "Quick pick",
    shortcut: "⌘D",
  },
};

export const Required: Story = {
  args: {
    label: "Deadline",
    isRequired: true,
    hint: "This field is required.",
  },
};

export const NoLabel: Story = {
  name: "No label (InputDateBase standalone)",
  args: { children: "" },
  render: () => <InputDateBase aria-label="Date" size="md" />,
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Sizes */}
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Sizes</p>
        <InputDate label="Small" size="sm" />
        <InputDate label="Medium (default)" size="md" />
        <InputDate label="Large" size="lg" />
      </section>

      {/* With icon */}
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">With icon</p>
        <InputDate label="Start date" size="sm" icon={Calendar} />
        <InputDate label="Start date" size="md" icon={Calendar} />
        <InputDate label="Start date" size="lg" icon={Calendar} />
      </section>

      {/* Tooltip */}
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Tooltip</p>
        <InputDate label="Start date" tooltip="Pick the project start date." />
        <InputDate
          label="With icon + tooltip"
          icon={Calendar}
          tooltip="Pick the project start date."
        />
      </section>

      {/* States */}
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">States</p>
        <InputDate label="Required" isRequired hint="This field is required." />
        <InputDate label="Invalid" isInvalid hint="Please select a valid date." />
        <InputDate
          label="Disabled"
          isDisabled
          value={parseDate("2025-06-01")}
          hint="Cannot be edited."
        />
        <InputDate label="With shortcut" shortcut="⌘D" />
      </section>
    </div>
  ),
};
