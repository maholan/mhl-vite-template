import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

import { DatePicker } from "./date-picker";

import type { Meta, StoryObj } from "@storybook/react";
import type { DateValue } from "react-aria-components";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DatePicker> = {
  title: "Composite/Calendar/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Date picker that opens a Calendar in a popover with Apply / Cancel footer.",
          "",
          "Built on React Aria's `DatePicker` primitive and the MHL `Calendar` component.",
          "Supports controlled and uncontrolled modes, `onApply` / `onCancel` callbacks,",
          "min/max date constraints, highlighted event dots, and full keyboard navigation.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-96 items-start justify-center pt-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      table: { defaultValue: { summary: "sm" } },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
      table: { defaultValue: { summary: "secondary" } },
    },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    placement: {
      control: "select",
      options: ["bottom right", "bottom left", "top right", "top left"],
      table: { defaultValue: { summary: "bottom right" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  name: "With initial value",
  args: {
    value: parseDate("2025-06-15"),
  },
};

export const SizeMd: Story = {
  name: "Size md",
  args: {
    size: "md",
    value: parseDate("2025-06-15"),
  },
};

export const SizeLg: Story = {
  name: "Size lg",
  args: {
    size: "lg",
    value: parseDate("2025-06-15"),
  },
};

export const ColorPrimary: Story = {
  name: "Color primary trigger",
  args: {
    color: "primary",
    value: parseDate("2025-06-15"),
  },
};

export const WithHighlightedDates: Story = {
  name: "With highlighted dates",
  args: {
    value: parseDate("2025-06-01"),
    highlightedDates: [parseDate("2025-06-03"), parseDate("2025-06-10"), parseDate("2025-06-18")],
  },
};

export const WithMinMax: Story = {
  name: "With min / max constraints",
  args: {
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ days: 30 }),
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: parseDate("2025-06-15"),
  },
};

export const ReadOnly: Story = {
  name: "Read only",
  args: {
    isReadOnly: true,
    value: parseDate("2025-06-15"),
  },
};

export const PlacementBottomLeft: Story = {
  name: "Placement bottom left",
  args: {
    placement: "bottom left",
    value: parseDate("2025-06-15"),
  },
};

export const Controlled: Story = {
  name: "Controlled with callbacks",
  args: { size: "sm" },
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const [log, setLog] = useState<string[]>([]);

    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          value={value}
          onChange={setValue}
          onApply={(v) => setLog((prev) => [...prev, `Apply: ${v?.toString() ?? "—"}`])}
          onCancel={() => setLog((prev) => [...prev, "Cancel"])}
        />
        <div className="min-h-[5rem] w-72 rounded-lg border border-primary p-3 text-sm">
          <p className="mb-1 font-medium text-primary">
            Selected:{" "}
            <span className="font-normal text-tertiary">{value?.toString() ?? "none"}</span>
          </p>
          <p className="font-medium text-primary">Log:</p>
          {log.length === 0 ? (
            <p className="text-tertiary">No events yet</p>
          ) : (
            log.map((entry, i) => (
              <p key={i} className="text-tertiary">
                {entry}
              </p>
            ))
          )}
        </div>
      </div>
    );
  },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { size: "sm" },
  render: () => {
    const todayDate = today(getLocalTimeZone());
    return (
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Default (no value)
          </p>
          <DatePicker />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            With value — sm (default)
          </p>
          <DatePicker value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Size md</p>
          <DatePicker size="md" value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Size lg</p>
          <DatePicker size="lg" value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Color primary
          </p>
          <DatePicker color="primary" value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            With event dots
          </p>
          <DatePicker
            value={todayDate}
            highlightedDates={[todayDate, todayDate.add({ days: 3 }), todayDate.add({ days: 7 })]}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Min / max constraints
          </p>
          <DatePicker minValue={todayDate} maxValue={todayDate.add({ days: 20 })} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Disabled</p>
          <DatePicker isDisabled value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Read only</p>
          <DatePicker isReadOnly value={parseDate("2025-06-15")} />
        </section>
      </div>
    );
  },
};
