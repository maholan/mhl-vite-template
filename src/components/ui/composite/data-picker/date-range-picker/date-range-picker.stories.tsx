import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useState } from "react";

import { DateRangePicker } from "./date-range-picker";

import type { Meta, StoryObj } from "@storybook/react";
import type { DateValue } from "react-aria-components";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DateRangePicker> = {
  title: "Composite/Calendar/Date Range Picker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Date range picker that opens a dual-month RangeCalendar in a popover.",
          "",
          "Includes a named-preset sidebar, desktop date inputs, and Apply / Cancel footer.",
          "Built on React Aria's `DateRangePicker` primitive + the MHL `RangeCalendar` component.",
          "Supports controlled and uncontrolled modes, `onApply` / `onCancel` callbacks,",
          "and full keyboard navigation.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-[600px] items-start justify-center pt-8">
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

// ── Helpers ───────────────────────────────────────────────────────────────────

const tz = getLocalTimeZone();

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  name: "With initial value",
  args: {
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const SizeMd: Story = {
  name: "Size md",
  args: {
    size: "md",
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const SizeLg: Story = {
  name: "Size lg",
  args: {
    size: "lg",
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const ColorPrimary: Story = {
  name: "Color primary trigger",
  args: {
    color: "primary",
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const WithMinMax: Story = {
  name: "With min / max constraints",
  args: {
    minValue: today(tz),
    maxValue: today(tz).add({ days: 60 }),
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const ReadOnly: Story = {
  name: "Read only",
  args: {
    isReadOnly: true,
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const PlacementBottomLeft: Story = {
  name: "Placement bottom left",
  args: {
    placement: "bottom left",
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const Controlled: Story = {
  name: "Controlled with callbacks",
  args: {},
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);
    const [log, setLog] = useState<string[]>([]);

    return (
      <div className="flex flex-col gap-4">
        <DateRangePicker
          value={value}
          onChange={setValue}
          onApply={(v) =>
            setLog((prev) => [
              ...prev,
              `Apply: ${v?.start?.toString() ?? "—"} → ${v?.end?.toString() ?? "—"}`,
            ])
          }
          onCancel={() => setLog((prev) => [...prev, "Cancel"])}
        />
        <div className="min-h-[5rem] w-80 rounded-lg border border-primary p-3 text-sm">
          <p className="mb-1 font-medium text-primary">
            Start:{" "}
            <span className="font-normal text-tertiary">{value?.start?.toString() ?? "none"}</span>
          </p>
          <p className="mb-1 font-medium text-primary">
            End:{" "}
            <span className="font-normal text-tertiary">{value?.end?.toString() ?? "none"}</span>
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
  args: {},
  render: () => {
    const todayDate = today(getLocalTimeZone());
    return (
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Default (no value)
          </p>
          <DateRangePicker />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            With value — sm (default)
          </p>
          <DateRangePicker
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Size md</p>
          <DateRangePicker
            size="md"
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Size lg</p>
          <DateRangePicker
            size="lg"
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Color primary
          </p>
          <DateRangePicker
            color="primary"
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Min / max constraints
          </p>
          <DateRangePicker minValue={todayDate} maxValue={todayDate.add({ days: 60 })} />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Disabled</p>
          <DateRangePicker
            isDisabled
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Read only</p>
          <DateRangePicker
            isReadOnly
            value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
          />
        </section>
      </div>
    );
  },
};
