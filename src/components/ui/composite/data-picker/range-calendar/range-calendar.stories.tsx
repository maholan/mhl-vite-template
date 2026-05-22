import { getLocalTimeZone, parseDate, startOfWeek, today } from "@internationalized/date";
import { useState } from "react";

import { RangeCalendar } from "./range-calendar";

import type { Meta, StoryObj } from "@storybook/react";
import type { DateValue } from "react-aria-components";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof RangeCalendar> = {
  title: "Composite/Calendar/Range Calendar",
  component: RangeCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Range calendar that shows one month on mobile and two months side-by-side on desktop.",
          "",
          "Built on React Aria's `RangeCalendar` primitive and the MHL `CalendarCell` component.",
          "Supports controlled and uncontrolled modes, named presets, highlight dots,",
          "min/max constraints, and full keyboard navigation.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    showOutOfRangeDates: { control: "boolean" },
    showPresetsOnDesktop: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helpers ───────────────────────────────────────────────────────────────────

const tz = getLocalTimeZone();
const todayDate = today(tz);

const samplePresets = {
  week: {
    label: "This week",
    value: {
      start: startOfWeek(todayDate, "en-US"),
      end: startOfWeek(todayDate, "en-US").add({ days: 6 }),
    },
  },
  month: {
    label: "This month",
    value: {
      start: todayDate.set({ day: 1 }),
      end: todayDate.set({ day: 1 }).add({ months: 1 }).subtract({ days: 1 }),
    },
  },
  quarter: {
    label: "Last 30 days",
    value: {
      start: todayDate.subtract({ days: 30 }),
      end: todayDate,
    },
  },
};

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

export const SingleMonth: Story = {
  name: "Single month",
  args: {
    visibleDuration: { months: 1 },
    value: {
      start: parseDate("2025-06-10"),
      end: parseDate("2025-06-20"),
    },
  },
};

export const WithHighlightedDates: Story = {
  name: "With highlighted dates",
  args: {
    value: {
      start: parseDate("2025-06-01"),
      end: parseDate("2025-06-10"),
    },
    highlightedDates: [parseDate("2025-06-03"), parseDate("2025-06-08"), parseDate("2025-06-15")],
  },
};

export const WithPresetsOnDesktop: Story = {
  name: "With presets (desktop)",
  args: {
    showPresetsOnDesktop: true,
    presets: samplePresets,
  },
};

export const WithMinMax: Story = {
  name: "With min / max constraints",
  args: {
    minValue: todayDate,
    maxValue: todayDate.add({ days: 30 }),
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

export const Controlled: Story = {
  name: "Controlled with callbacks",
  args: {},
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <RangeCalendar value={value} onChange={setValue} />
        <div className="min-h-[3rem] w-full rounded-lg border border-primary p-3 text-sm">
          <p className="font-medium text-primary">
            Start:{" "}
            <span className="font-normal text-tertiary">{value?.start?.toString() ?? "none"}</span>
          </p>
          <p className="font-medium text-primary">
            End:{" "}
            <span className="font-normal text-tertiary">{value?.end?.toString() ?? "none"}</span>
          </p>
        </div>
      </div>
    );
  },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
          Default (no value)
        </p>
        <RangeCalendar aria-label="Pick a range" />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">With value</p>
        <RangeCalendar
          aria-label="Pick a range"
          value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Single month</p>
        <RangeCalendar
          aria-label="Pick a range"
          visibleDuration={{ months: 1 }}
          value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
          With presets (desktop)
        </p>
        <RangeCalendar
          aria-label="Pick a range"
          showPresetsOnDesktop
          presets={samplePresets}
          visibleDuration={{ months: 1 }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
          With highlighted dates
        </p>
        <RangeCalendar
          aria-label="Pick a range"
          value={{ start: parseDate("2025-06-01"), end: parseDate("2025-06-10") }}
          highlightedDates={[parseDate("2025-06-03"), parseDate("2025-06-08")]}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Disabled</p>
        <RangeCalendar
          aria-label="Pick a range"
          isDisabled
          value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Read only</p>
        <RangeCalendar
          aria-label="Pick a range"
          isReadOnly
          value={{ start: parseDate("2025-06-10"), end: parseDate("2025-06-20") }}
        />
      </section>
    </div>
  ),
};
